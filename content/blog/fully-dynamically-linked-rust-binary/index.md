---
title: "Fully Dynamically Linked Rust Binary: An Experiment"
date: 2025-02-08
tags: [rust, linkage]
published: true
---

In the rust world, crates are usually statically linked into the produced binary.
There is some dynamic linking support in rust called `dylib`
but there's no stable Rust ABI like the C ABI.

The primary use case for `dylib` is speeding up incremental compilation,
for example, by making a large crate a dylib and prefer dynamic linking: https://github.com/bevyengine/bevy/issues/791.
But many crates only support the `lib` (which is `rlib` underhood) crate type.
It will take lots of effort to just add `dylib` to the `crate-type` field of those crates.
It is sad that `dylib` is neither widely supported nor widely used,
making producing a fully dynamically linked rust binary pretty hard.

But there is actually a viable workaround, we can create a wrapper dylib crate and add
the rlib crate as a dependency to it. [cargo-add-dynamic](https://github.com/rksm/cargo-add-dynamic)
provides a cargo command to do it.
(And don't miss Robert's blog post: [
Speeding up incremental Rust compilation with dylibs](https://robert.kra.hn/posts/2022-09-09-speeding-up-incremental-rust-compilation-with-dylibs/))

So this made me wonder if I could use some tricks to produce a fully dynamically linked rust binary
and inspired me to do this experiment and wrote this blog post.

To do that, the first step is to hack on cargo to make crates support `dylib` by default.

# Hack on Cargo to make `dylib` first-class citizen

The following patch makes cargo think that every crate can be built as `dylib`
(except `proc-macro`, which is already some sort of `dylib`).

```diff
diff --git a/src/cargo/core/manifest.rs b/src/cargo/core/manifest.rs
index 0273d8fa4..e6ee07c89 100644
--- a/src/cargo/core/manifest.rs
+++ b/src/cargo/core/manifest.rs
@@ -832,11 +832,16 @@ impl Target {
 
     pub fn lib_target(
         name: &str,
-        crate_targets: Vec<CrateType>,
+        mut crate_targets: Vec<CrateType>,
         src_path: PathBuf,
         edition: Edition,
     ) -> Target {
         let mut target = Target::with_path(src_path, edition);
+        if !crate_targets.contains(&CrateType::Dylib)
+            && !crate_targets.contains(&CrateType::ProcMacro)
+        {
+            crate_targets.push(CrateType::Dylib);
+        }
         target
             .set_kind(TargetKind::Lib(crate_targets))
             .set_name(name)
```

Apply the patch to cargo repository and build cargo.

Then let's do a build of [`tracexec`][1] using our patched cargo:

```bash
RUSTFLAGS="-C prefer-dynamic" ~/repos/cargo/target/release/cargo build --no-default-features -F recommended
```

Wow, what do we get? tons of build errors complaining about panic handler and memory allocator:

```rust
error: `#[panic_handler]` function required, but not found

error: unwinding panics are not supported without std
  |
  = help: using nightly cargo, use -Zbuild-std with panic="abort" to avoid unwinding
  = note: since the core library is usually precompiled with panic="unwind", rebuilding your crate with panic="abort" may not be enough to fix the problem

error: could not compile `cfg-if` (lib) due to 2 previous errors
warning: build failed, waiting for other jobs to finish...
error: no global memory allocator found but one is required; link to std or add `#[global_allocator]` to a static item that implements the GlobalAlloc trait
```

So what's happening here? The failing crates have one thing in common. They are `#[no_std]`.

It turns out that rust requires `dylib` to ship memory allocator and panic handler with them.
However, no_std crates don't ship them. And if a rust binary crates depends on any `dylib`, it
will just use the allocator from the `dylib`.

For the purpose of simplifying this experiment, let's make an incompatible hack in rustc
to shift the responsibility of shipping the allocator from `dylib` to `bin` crates:

# Hack on Rustc to fix compilation

First clone rustc repo and setup it:

```bash
./x setup
```

Then let's first bypass the check for weak lang items with the following patch:

```diff
diff --git a/compiler/rustc_passes/src/weak_lang_items.rs b/compiler/rustc_passes/src/weak_lang_items.rs
index 701f500e4f6..8492645168d 100644
--- a/compiler/rustc_passes/src/weak_lang_items.rs
+++ b/compiler/rustc_passes/src/weak_lang_items.rs
@@ -63,12 +63,10 @@ fn verify(tcx: TyCtxt<'_>, items: &lang_items::LanguageItems) {
     // We only need to check for the presence of weak lang items if we're
     // emitting something that's not an rlib.
     let needs_check = tcx.crate_types().iter().any(|kind| match *kind {
-        CrateType::Dylib
-        | CrateType::ProcMacro
-        | CrateType::Cdylib
-        | CrateType::Executable
-        | CrateType::Staticlib => true,
-        CrateType::Rlib => false,
+        CrateType::ProcMacro | CrateType::Cdylib | CrateType::Executable | CrateType::Staticlib => {
+            true
+        }
+        CrateType::Dylib | CrateType::Rlib => false,
     });
     if !needs_check {
         return;
```

This also nicely aligns with the current compiler behavior of `rlib`.

And then we can apply a simple hack to avoid shipping allocator in `dylib`:

```diff
diff --git a/compiler/rustc_codegen_llvm/src/allocator.rs b/compiler/rustc_codegen_llvm/src/allocator.rs
index 149ded28356..02977af0410 100644
--- a/compiler/rustc_codegen_llvm/src/allocator.rs
+++ b/compiler/rustc_codegen_llvm/src/allocator.rs
@@ -143,7 +143,7 @@ fn create_wrapper_function(
             // -> ! DIFlagNoReturn
             attributes::apply_to_llfn(callee, llvm::AttributePlace::Function, &[no_return]);
         }
-        llvm::set_visibility(callee, llvm::Visibility::Hidden);
+        // llvm::set_visibility(callee, llvm::Visibility::Hidden);
 
         let llbb = llvm::LLVMAppendBasicBlockInContext(llcx, llfn, c"entry".as_ptr());
 
diff --git a/compiler/rustc_codegen_ssa/src/base.rs b/compiler/rustc_codegen_ssa/src/base.rs
index df945920ee8..d2f22fcbc9d 100644
--- a/compiler/rustc_codegen_ssa/src/base.rs
+++ b/compiler/rustc_codegen_ssa/src/base.rs
@@ -589,11 +589,13 @@ pub fn allocator_kind_for_codegen(tcx: TyCtxt<'_>) -> Option<AllocatorKind> {
     // linkage, then it's already got an allocator shim and we'll be using that
     // one instead. If nothing exists then it's our job to generate the
     // allocator!
-    let any_dynamic_crate = tcx.dependency_formats(()).iter().any(|(_, list)| {
-        use rustc_middle::middle::dependency_format::Linkage;
-        list.iter().any(|&linkage| linkage == Linkage::Dynamic)
-    });
-    if any_dynamic_crate { None } else { tcx.allocator_kind(()) }
+    // let any_dynamic_crate = tcx.dependency_formats(()).iter().any(|(_, list)| {
+    //     use rustc_middle::middle::dependency_format::Linkage;
+    //     list.iter().any(|&linkage| linkage == Linkage::Dynamic)
+    // });
+    // if any_dynamic_crate { None } else { tcx.allocator_kind(()) }
+    // FIXME: this is broken.
+    if tcx.crate_types().contains(&CrateType::Dylib) { None } else { tcx.allocator_kind(()) }
 }
 
 pub fn codegen_crate<B: ExtraBackendMethods>(
diff --git a/compiler/rustc_metadata/src/creader.rs b/compiler/rustc_metadata/src/creader.rs
index 6bad8312790..b1d1b13f8c6 100644
--- a/compiler/rustc_metadata/src/creader.rs
+++ b/compiler/rustc_metadata/src/creader.rs
@@ -1039,6 +1039,7 @@ fn inject_allocator_crate(&mut self, krate: &ast::Crate) {
             // attribute.
             if !attr::contains_name(&krate.attrs, sym::default_lib_allocator)
                 && !self.cstore.iter_crate_data().any(|(_, data)| data.has_default_lib_allocator())
+                && !self.crate_types().contains(&CrateType::Dylib)
             {
                 self.dcx().emit_err(errors::GlobalAllocRequired);
             }
```

Then lets build rustc and the libaries:

```bash
./x build library
```

And try to build [`tracexec`][1] again:

```bash
RUSTFLAGS="-C prefer-dynamic" RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc"  ~/repos/cargo/target/release/cargo build --no-default-features -F recommended
```

We get different error messages compared with our last attempt! Some progress.

```rust
error: cannot satisfy dependencies so `core` only shows up once
  |
  = help: having upstream crates all available in one format will likely make this go away

error: cannot satisfy dependencies so `compiler_builtins` only shows up once
  |
  = help: having upstream crates all available in one format will likely make this go away

error: cannot satisfy dependencies so `rustc_std_workspace_core` only shows up once
  |
  = help: having upstream crates all available in one format will likely make this go away

   Compiling castaway v0.2.3
   Compiling glob v0.3.2
   Compiling byteorder v1.5.0
   Compiling adler v1.0.2
   Compiling compact_str v0.8.1
error: could not compile `proc-macro2` (lib) due to 3 previous errors
warning: build failed, waiting for other jobs to finish...
error: could not compile `thread_local` (lib) due to 3 previous errors
error: cannot satisfy dependencies so `alloc` only shows up once
  |
  = help: having upstream crates all available in one format will likely make this go away

error: could not compile `anstream` (lib) due to 4 previous errors
error: could not compile `compact_str` (lib) due to 4 previous errors
error: could not compile `hashbrown` (lib) due to 3 previous errors
```

So rust complains about `core` shows up multiple times. What's happening here?

This crates are only available in `rlib` format:

```bash
$ ls $($HOME/repos/rust/build/host/stage1/bin/rustc --print sysroot)/lib/rustlib/x86_64-unknown-linux-gnu/lib
libaddr2line-c91b788851f7904e.rlib          libLLVM-19-rust-1.86.0-nightly.so                   librustc_std_workspace_core-f7e78d502abf18e6.rlib
libadler2-d47d687540035b01.rlib             libLLVM.so.19.1-rust-1.86.0-nightly                 librustc_std_workspace_std-049319bd3a163eb0.rlib
liballoc-8ae98a87b086b4d1.rlib              libmemchr-160865971a3ae96e.rlib                     libstd-950bb6857c98752a.rlib
libcfg_if-5adc64450af856cc.rlib             libminiz_oxide-1dbc0b65f4547185.rlib                libstd-950bb6857c98752a.so
libcompiler_builtins-5fd4ea5dad09fda3.rlib  libobject-c24d08e1de61f42a.rlib                     libstd_detect-8530cabc0f242d4a.rlib
libcore-2114cd0a35d93fdd.rlib               libpanic_abort-666e79e748b81556.rlib                libsysroot-18a43d447a228675.rlib
libgetopts-1876d7fe046ae5b1.rlib            libpanic_unwind-418b8e3a89f5bb0c.rlib               libtest-6189ad5df8c13f97.rlib
libgimli-4084b21aeb28456b.rlib              libproc_macro-2899cd3d61b97a28.rlib                 libunicode_width-cf9cee23fb0cd917.rlib
libhashbrown-d0ec3bd8da3bf75a.rlib          librustc_demangle-be44cfb889eff25b.rlib             libunwind-9716ab3288b29753.rlib
liblibc-cf24750aaebed4b7.rlib               librustc_std_workspace_alloc-f380f2fded06cb20.rlib  self-contained
```

And when building multiple `dylib`s, each `dylib` would statically link `core` crate, which is what the error message is saying:

```
cannot satisfy dependencies so `core` only shows up once
```

The solution, from the perspective of this experiment, is dynamically linking `core`, `alloc` and other built-in crates.

One complication, though, `compiler-builtins` crate is not in the rustc repo. Let's add it as a git submodule:

```bash
git submodule add https://github.com/rust-lang/compiler-builtins library/compiler-builtins
git submodule update library/compiler-builtins/
```

And mark all those built-in crates as available in `dylib` format:

```diff
Submodule library/compiler-builtins contains modified content
diff --git a/library/compiler-builtins/Cargo.toml b/library/compiler-builtins/Cargo.toml
index fcbc602..0895b38 100644
--- a/library/compiler-builtins/Cargo.toml
+++ b/library/compiler-builtins/Cargo.toml
@@ -26,6 +26,7 @@ include = [
 links = 'compiler-rt'
 
 [lib]
+crate-type = ["rlib", "dylib"]
 test = false
 
 [dependencies]
@@ -75,9 +76,6 @@ public-test-deps = []
 name = "intrinsics"
 required-features = ["compiler-builtins"]
 
-[workspace]
-members = ["testcrate"]
-
 [profile.release]
 panic = 'abort'
 
Submodule library/stdarch contains modified content
diff --git a/library/stdarch/crates/std_detect/Cargo.toml b/library/stdarch/crates/std_detect/Cargo.toml
index 88d30a1f..594d58eb 100644
--- a/library/stdarch/crates/std_detect/Cargo.toml
+++ b/library/stdarch/crates/std_detect/Cargo.toml
@@ -25,7 +25,7 @@ cfg-if = "1.0.0"
 
 # When built as part of libstd
 core = { version = "1.0.0", optional = true, package = "rustc-std-workspace-core" }
-compiler_builtins = { version = "0.1.2", optional = true }
+compiler_builtins = { version = "0.1.2", path = "../../../compiler-builtins", optional = true }
 alloc = { version = "1.0.0", optional = true, package = "rustc-std-workspace-alloc" }
 
 [target.'cfg(not(windows))'.dependencies]
```

```diff
diff --git a/.gitmodules b/.gitmodules
index f9bd42edab3..2f233337de7 100644
--- a/.gitmodules
+++ b/.gitmodules
@@ -51,3 +51,6 @@
 	path = src/gcc
 	url = https://github.com/rust-lang/gcc.git
 	shallow = true
+[submodule "library/compiler-builtins"]
+	path = library/compiler-builtins
+	url = https://github.com/rust-lang/compiler-builtins
diff --git a/library/Cargo.lock b/library/Cargo.lock
index 8b78908e6d7..b5e180867fd 100644
--- a/library/Cargo.lock
+++ b/library/Cargo.lock
@@ -62,8 +62,6 @@ dependencies = [
 [[package]]
 name = "compiler_builtins"
 version = "0.1.145"
-source = "registry+https://github.com/rust-lang/crates.io-index"
-checksum = "da0705f5abaaab7168ccc14f8f340ded61be2bd3ebea86b9834b6acbc8495de8"
 dependencies = [
  "cc",
  "rustc-std-workspace-core",
diff --git a/library/Cargo.toml b/library/Cargo.toml
index 1205f7c9ed6..e2f64eefc9b 100644
--- a/library/Cargo.toml
+++ b/library/Cargo.toml
@@ -46,3 +46,4 @@ rustc-demangle.debug = 0
 rustc-std-workspace-core = { path = 'rustc-std-workspace-core' }
 rustc-std-workspace-alloc = { path = 'rustc-std-workspace-alloc' }
 rustc-std-workspace-std = { path = 'rustc-std-workspace-std' }
+compiler_builtins = { path = "compiler-builtins" }
diff --git a/library/alloc/Cargo.toml b/library/alloc/Cargo.toml
index db7eaf52fb2..b89b886a290 100644
--- a/library/alloc/Cargo.toml
+++ b/library/alloc/Cargo.toml
@@ -8,6 +8,9 @@ autotests = false
 autobenches = false
 edition = "2021"
 
+[lib]
+crate-type = ["rlib", "dylib"]
+
 [dependencies]
 core = { path = "../core" }
 compiler_builtins = { version = "=0.1.145", features = ['rustc-dep-of-std'] }
diff --git a/library/compiler-builtins b/library/compiler-builtins
new file mode 160000
index 00000000000..a6700143080
--- /dev/null
+++ b/library/compiler-builtins
@@ -0,0 +1 @@
+Subproject commit a67001430806f3d2492228f53f8d3469d826cd85
diff --git a/library/core/Cargo.toml b/library/core/Cargo.toml
index b7c6db6c78d..5140d223d99 100644
--- a/library/core/Cargo.toml
+++ b/library/core/Cargo.toml
@@ -12,6 +12,7 @@ autobenches = false
 edition = "2021"
 
 [lib]
+crate-type = ["rlib", "dylib"]
 test = false
 bench = false
 
diff --git a/library/rustc-std-workspace-core/Cargo.toml b/library/rustc-std-workspace-core/Cargo.toml
index ff5cfcbd641..38d8a7a3c66 100644
--- a/library/rustc-std-workspace-core/Cargo.toml
+++ b/library/rustc-std-workspace-core/Cargo.toml
@@ -9,6 +9,7 @@ edition = "2021"
 
 [lib]
 path = "lib.rs"
+crate-type = ["rlib", "dylib"]
 
 [dependencies]
 core = { path = "../core" }
diff --git a/library/unwind/Cargo.toml b/library/unwind/Cargo.toml
index 66e8d1a3ffe..bc02918ae55 100644
--- a/library/unwind/Cargo.toml
+++ b/library/unwind/Cargo.toml
@@ -9,6 +9,7 @@ include = [
 ]
 
 [lib]
+crate-type = ["rlib", "dylib"]
 test = false
 bench = false
 doc = false
```

Then we should build a new rust compiler with the previously build rust compiler that already contains our hacks.

```bash
cp -r build/host/{stage1,dyn-stage0}
echo -e \
"[build]
rustc=\"$PWD/build/host/dyn-stage0/bin/rustc\"
cargo=\"$PWD/build/host/stage0/bin/cargo\"
" >> config.toml
./x build library
```

We could see that the dylib flavor of those crates are now available:

```bash
ls build/host/stage1/lib/rustlib/*/lib/*.so
build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/liballoc-19a1f21999d282aa.so
build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/libcompiler_builtins-0bd363012bb31d63.so
build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/libcore-42de9da435192e03.so
build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/libLLVM-19-rust-1.86.0-nightly.so
build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/librustc_std_workspace_core-ce1c60b286ad6c3e.so
build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/libstd-73940afa9ce77d13.so
build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/libunwind-fa782fb0b248221f.so
```

Now let's try to build something again.

```bash
RUSTFLAGS="-C prefer-dynamic" RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" ~/repos/cargo/target/release/cargo build --no-default-features -F recommended
```

A linker error shows up. Another progress.

```rust
error: linking with `cc` failed: exit status: 1
  |
  = note:  "cc" "-m64" "/tmp/rustcCQop0t/symbols.o" "<36 object files omitted>" ...
  = note: some arguments are omitted. use `--verbose` to show all linker arguments
  = note: rust-lld: error: undefined reference: vsnprintf_wrapper
          >>> referenced by /home/kxxt/repos/tracexec/target/debug/deps/liblibbpf_rs-b3d521faea2c0507.so (disallowed by --no-allow-shlib-undefined)
          collect2: error: ld returned 1 exit status
```

What's happening this time?

By looking at `libbpf-rs`'s dependencies, it is clear that this comes from `vsprintf` crate.
This crate compiles a C wrapper and links it into the crate.
Explicitly specify the linkeage between the C wrapper and the crate solves it: https://github.com/dylanmckay/vsprintf/pull/3

Finally it builds :tada: :tada: :tada:, although we are seeing a lot of warnings about file path collision:

```
warning: output filename collision.
The lib target `getrandom` in package `getrandom v0.3.1` has the same output filename as the lib target `getrandom` in package `getrandom v0.3.1`.
Colliding filename is: /home/kxxt/repos/tracexec/target/debug/libgetrandom.so.dwp
The targets should have unique names.
Consider changing their names to be unique or compiling them separately.
This may become a hard error in the future; see <https://github.com/rust-lang/cargo/issues/6313>.
```

The dylib gets built multiple times and later build overwrite previous build: https://github.com/rust-lang/cargo/issues/6313

It's time to run it. Because the dylibs are not in runtime linker search path,
we need to set `LD_LIBRARY_PATH`:

```bash
$ export LD_LIBRARY_PATH="$PWD/target/debug/deps:$HOME/repos/rust/build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/"
$ target/debug/tracexec -V
tracexec 0.8.2
```

Otherwise, it works!

```bash
$ lddtree target/debug/tracexec
target/debug/tracexec (interpreter => /lib64/ld-linux-x86-64.so.2)
    libserde_json-acc3f2d198ea8e01.so => /home/kxxt/repos/tracexec/target/debug/deps/libserde_json-acc3f2d198ea8e01.so
        libmemchr-c720362f28293c75.so => /home/kxxt/repos/tracexec/target/debug/deps/libmemchr-c720362f28293c75.so
        libryu-8d7857c254aa4d70.so => /home/kxxt/repos/tracexec/target/debug/deps/libryu-8d7857c254aa4d70.so
    libshell_words-8e6e3412a8b905f4.so => /home/kxxt/repos/tracexec/target/debug/deps/libshell_words-8e6e3412a8b905f4.so
    libftree-6e623e8c4567e863.so => /home/kxxt/repos/tracexec/target/debug/deps/libftree-6e623e8c4567e863.so
    libbetter_panic-9b8f49aaf3e7dc62.so => /home/kxxt/repos/tracexec/target/debug/deps/libbetter_panic-9b8f49aaf3e7dc62.so
        libbacktrace-ac382bffedb94616.so => /home/kxxt/repos/tracexec/target/debug/deps/libbacktrace-ac382bffedb94616.so
            libminiz_oxide-fdb0e3b53d498640.so => /home/kxxt/repos/tracexec/target/debug/deps/libminiz_oxide-fdb0e3b53d498640.so
                libadler-ad40b00062a533c5.so => /home/kxxt/repos/tracexec/target/debug/deps/libadler-ad40b00062a533c5.so
            libgimli-6ec2510dd6332567.so => /home/kxxt/repos/tracexec/target/debug/deps/libgimli-6ec2510dd6332567.so
        libaddr2line-46d342f5f36f6ae6.so => /home/kxxt/repos/tracexec/target/debug/deps/libaddr2line-46d342f5f36f6ae6.so
        libonce_cell-47058072c0ebe757.so => /home/kxxt/repos/tracexec/target/debug/deps/libonce_cell-47058072c0ebe757.so
    libconsole-21f60b8c8ea1d23b.so => /home/kxxt/repos/tracexec/target/debug/deps/libconsole-21f60b8c8ea1d23b.so
    libshell_quote-4b25084d632dd25c.so => /home/kxxt/repos/tracexec/target/debug/deps/libshell_quote-4b25084d632dd25c.so
    libclap_complete-725248d16b5d1b37.so => /home/kxxt/repos/tracexec/target/debug/deps/libclap_complete-725248d16b5d1b37.so
        libanstream-ad291851850dcde2.so => /home/kxxt/repos/tracexec/target/debug/deps/libanstream-ad291851850dcde2.so
            libanstyle_query-a77e662a2808a46c.so => /home/kxxt/repos/tracexec/target/debug/deps/libanstyle_query-a77e662a2808a46c.so
            libcolorchoice-0d081ae74d5be4e8.so => /home/kxxt/repos/tracexec/target/debug/deps/libcolorchoice-0d081ae74d5be4e8.so
            libanstyle_parse-dc30f43125e2fc88.so => /home/kxxt/repos/tracexec/target/debug/deps/libanstyle_parse-dc30f43125e2fc88.so
        libanstyle-1a4f36634bd1bebe.so => /home/kxxt/repos/tracexec/target/debug/deps/libanstyle-1a4f36634bd1bebe.so
    libtoml-ce8684b21817bfd3.so => /home/kxxt/repos/tracexec/target/debug/deps/libtoml-ce8684b21817bfd3.so
    libtoml_edit-1f6330653c98f3ec.so => /home/kxxt/repos/tracexec/target/debug/deps/libtoml_edit-1f6330653c98f3ec.so
        libwinnow-e0465708aaaa009d.so => /home/kxxt/repos/tracexec/target/debug/deps/libwinnow-e0465708aaaa009d.so
        libm.so.6 => /usr/lib/libm.so.6
    libserde_spanned-d925a17483504d3e.so => /home/kxxt/repos/tracexec/target/debug/deps/libserde_spanned-d925a17483504d3e.so
    libtoml_datetime-d6b3c97c2d956b08.so => /home/kxxt/repos/tracexec/target/debug/deps/libtoml_datetime-d6b3c97c2d956b08.so
    libvt100-289598bf2c87775f.so => /home/kxxt/repos/tracexec/target/debug/deps/libvt100-289598bf2c87775f.so
        liblog-c0a028885594c532.so => /home/kxxt/repos/tracexec/target/debug/deps/liblog-c0a028885594c532.so
    libvte-f3419d5bc00c228b.so => /home/kxxt/repos/tracexec/target/debug/deps/libvte-f3419d5bc00c228b.so
    libtui_scrollview-d6138458919b94b0.so => /home/kxxt/repos/tracexec/target/debug/deps/libtui_scrollview-d6138458919b94b0.so
    libtui_widget_list-0965ea37178ceb5d.so => /home/kxxt/repos/tracexec/target/debug/deps/libtui_widget_list-0965ea37178ceb5d.so
    libtui_prompts-8803a49dd1f473a4.so => /home/kxxt/repos/tracexec/target/debug/deps/libtui_prompts-8803a49dd1f473a4.so
    libtui_popup-43863650ec1cc7f4.so => /home/kxxt/repos/tracexec/target/debug/deps/libtui_popup-43863650ec1cc7f4.so
    libarboard-1b4719c61bd07fa0.so => /home/kxxt/repos/tracexec/target/debug/deps/libarboard-1b4719c61bd07fa0.so
        libfixedbitset-1ff0d41487651856.so => /home/kxxt/repos/tracexec/target/debug/deps/libfixedbitset-1ff0d41487651856.so
        libos_pipe-a013fbb120e4f18e.so => /home/kxxt/repos/tracexec/target/debug/deps/libos_pipe-a013fbb120e4f18e.so
        libx11rb-2b37914cd96701ec.so => /home/kxxt/repos/tracexec/target/debug/deps/libx11rb-2b37914cd96701ec.so
            librustix-6000be1a9cf0f788.so => /home/kxxt/repos/tracexec/target/debug/deps/librustix-6000be1a9cf0f788.so
                liblinux_raw_sys-d3e4c637654a6973.so => /home/kxxt/repos/tracexec/target/debug/deps/liblinux_raw_sys-d3e4c637654a6973.so
        libbitflags-d627e9c457d42f5d.so => /home/kxxt/repos/tracexec/target/debug/deps/libbitflags-d627e9c457d42f5d.so
    libwl_clipboard_rs-fe9e053f63961ba6.so => /home/kxxt/repos/tracexec/target/debug/deps/libwl_clipboard_rs-fe9e053f63961ba6.so
        libgetrandom-8c632fef5dacd8d6.so => /home/kxxt/repos/tracexec/target/debug/deps/libgetrandom-8c632fef5dacd8d6.so
        libnix-185937521ed6c1e0.so => /home/kxxt/repos/tracexec/target/debug/deps/libnix-185937521ed6c1e0.so
        libwayland_protocols_wlr-563a7b61eb11245d.so => /home/kxxt/repos/tracexec/target/debug/deps/libwayland_protocols_wlr-563a7b61eb11245d.so
            libwayland_protocols-d04c2d8e7998bafa.so => /home/kxxt/repos/tracexec/target/debug/deps/libwayland_protocols-d04c2d8e7998bafa.so
        libsmallvec-3f89d879e61c9b8c.so => /home/kxxt/repos/tracexec/target/debug/deps/libsmallvec-3f89d879e61c9b8c.so
    libtree_magic_mini-a7aabb7aeb0ec751.so => /home/kxxt/repos/tracexec/target/debug/deps/libtree_magic_mini-a7aabb7aeb0ec751.so
        libnom-dc09bd90e8799180.so => /home/kxxt/repos/tracexec/target/debug/deps/libnom-dc09bd90e8799180.so
    libtempfile-7511149883fe0565.so => /home/kxxt/repos/tracexec/target/debug/deps/libtempfile-7511149883fe0565.so
    libfastrand-3b1deac65f6d44ac.so => /home/kxxt/repos/tracexec/target/debug/deps/libfastrand-3b1deac65f6d44ac.so
    libwayland_client-ab59928182b3ab25.so => /home/kxxt/repos/tracexec/target/debug/deps/libwayland_client-ab59928182b3ab25.so
    libwayland_backend-a097a92aea59a10e.so => /home/kxxt/repos/tracexec/target/debug/deps/libwayland_backend-a097a92aea59a10e.so
    libx11rb_protocol-6ecab9e56b0e53ac.so => /home/kxxt/repos/tracexec/target/debug/deps/libx11rb_protocol-6ecab9e56b0e53ac.so
    libtokio_util-36cea23098840251.so => /home/kxxt/repos/tracexec/target/debug/deps/libtokio_util-36cea23098840251.so
        libparking_lot_core-f41d2dbe0e082a9c.so => /home/kxxt/repos/tracexec/target/debug/deps/libparking_lot_core-f41d2dbe0e082a9c.so
    liblibseccomp-3304e2d6f908a9f8.so => /home/kxxt/repos/tracexec/target/debug/deps/liblibseccomp-3304e2d6f908a9f8.so
    libregex_cursor-5b1ebcad1f2306d2.so => /home/kxxt/repos/tracexec/target/debug/deps/libregex_cursor-5b1ebcad1f2306d2.so
    libfiledescriptor-bc22f9bbcdadbf08.so => /home/kxxt/repos/tracexec/target/debug/deps/libfiledescriptor-bc22f9bbcdadbf08.so
    libkxxt_owo_colors-624aeb1fb1e54c95.so => /home/kxxt/repos/tracexec/target/debug/deps/libkxxt_owo_colors-624aeb1fb1e54c95.so
    libdirectories-9acae6a231912ffd.so => /home/kxxt/repos/tracexec/target/debug/deps/libdirectories-9acae6a231912ffd.so
    libdirs_sys-21c54a7652e3dc92.so => /home/kxxt/repos/tracexec/target/debug/deps/libdirs_sys-21c54a7652e3dc92.so
    libclap_builder-3d79374b71e342c9.so => /home/kxxt/repos/tracexec/target/debug/deps/libclap_builder-3d79374b71e342c9.so
        libstrsim-ceb3ba28a6b2fe3f.so => /home/kxxt/repos/tracexec/target/debug/deps/libstrsim-ceb3ba28a6b2fe3f.so
    libclap_lex-a1af0d8fc6200632.so => /home/kxxt/repos/tracexec/target/debug/deps/libclap_lex-a1af0d8fc6200632.so
    libahash-fb6bf31483230012.so => /home/kxxt/repos/tracexec/target/debug/deps/libahash-fb6bf31483230012.so
        libgetrandom-cc53e3f3aa6be2e3.so => /home/kxxt/repos/tracexec/target/debug/deps/libgetrandom-cc53e3f3aa6be2e3.so
    libserde-0d8afcd971fbdbb8.so => /home/kxxt/repos/tracexec/target/debug/deps/libserde-0d8afcd971fbdbb8.so
    libtokio-e541de9ee0ce34fd.so => /home/kxxt/repos/tracexec/target/debug/deps/libtokio-e541de9ee0ce34fd.so
        libsocket2-5a52a89f698a69d9.so => /home/kxxt/repos/tracexec/target/debug/deps/libsocket2-5a52a89f698a69d9.so
        libmio-d15023d78bb80bb3.so => /home/kxxt/repos/tracexec/target/debug/deps/libmio-d15023d78bb80bb3.so
        liblock_api-9b2465de8933e165.so => /home/kxxt/repos/tracexec/target/debug/deps/liblock_api-9b2465de8933e165.so
    libbytes-a0e020370682cb8e.so => /home/kxxt/repos/tracexec/target/debug/deps/libbytes-a0e020370682cb8e.so
    libnix-4097190348e6e0fe.so => /home/kxxt/repos/tracexec/target/debug/deps/libnix-4097190348e6e0fe.so
    liblibbpf_rs-d06f6230f96e0a26.so => /home/kxxt/repos/tracexec/target/debug/deps/liblibbpf_rs-d06f6230f96e0a26.so
        libvsprintf-3e571d72a8734db3.so => /home/kxxt/repos/tracexec/target/debug/deps/libvsprintf-3e571d72a8734db3.so
        liblibbpf_sys-bc534e850969f81a.so => /home/kxxt/repos/tracexec/target/debug/deps/liblibbpf_sys-bc534e850969f81a.so
    libenumflags2-7f3a5fd08c08ebef.so => /home/kxxt/repos/tracexec/target/debug/deps/libenumflags2-7f3a5fd08c08ebef.so
    libcolor_eyre-94a0213fd3068e3a.so => /home/kxxt/repos/tracexec/target/debug/deps/libcolor_eyre-94a0213fd3068e3a.so
        libcolor_spantrace-deed1262e3afe040.so => /home/kxxt/repos/tracexec/target/debug/deps/libcolor_spantrace-deed1262e3afe040.so
        libowo_colors-014d7b7376e2124d.so => /home/kxxt/repos/tracexec/target/debug/deps/libowo_colors-014d7b7376e2124d.so
        libindenter-98512325070ed1c3.so => /home/kxxt/repos/tracexec/target/debug/deps/libindenter-98512325070ed1c3.so
    libtracing_error-fe8eed9e2ddaa7d7.so => /home/kxxt/repos/tracexec/target/debug/deps/libtracing_error-fe8eed9e2ddaa7d7.so
    libtracing_subscriber-3c40a7bdac9bbf68.so => /home/kxxt/repos/tracexec/target/debug/deps/libtracing_subscriber-3c40a7bdac9bbf68.so
        libsharded_slab-5adad4162610e590.so => /home/kxxt/repos/tracexec/target/debug/deps/libsharded_slab-5adad4162610e590.so
        libmatchers-5d861047a1fda3f0.so => /home/kxxt/repos/tracexec/target/debug/deps/libmatchers-5d861047a1fda3f0.so
        libthread_local-91e2f274bb860e7f.so => /home/kxxt/repos/tracexec/target/debug/deps/libthread_local-91e2f274bb860e7f.so
    libregex_automata-bdf714a8e38ede73.so => /home/kxxt/repos/tracexec/target/debug/deps/libregex_automata-bdf714a8e38ede73.so
        libregex_syntax-d9290e6a809a8d65.so => /home/kxxt/repos/tracexec/target/debug/deps/libregex_syntax-d9290e6a809a8d65.so
    libregex-6b64c0b95da8f29b.so => /home/kxxt/repos/tracexec/target/debug/deps/libregex-6b64c0b95da8f29b.so
    libregex_automata-ebf79763c19e9406.so => /home/kxxt/repos/tracexec/target/debug/deps/libregex_automata-ebf79763c19e9406.so
    libaho_corasick-40baf799a649092e.so => /home/kxxt/repos/tracexec/target/debug/deps/libaho_corasick-40baf799a649092e.so
    libregex_syntax-d632841d93cbd447.so => /home/kxxt/repos/tracexec/target/debug/deps/libregex_syntax-d632841d93cbd447.so
    libnu_ansi_term-131f71bbcfa65b8c.so => /home/kxxt/repos/tracexec/target/debug/deps/libnu_ansi_term-131f71bbcfa65b8c.so
    libtracing_log-c8fc862c2cb51c0f.so => /home/kxxt/repos/tracexec/target/debug/deps/libtracing_log-c8fc862c2cb51c0f.so
    libtracing-22ba9d95c195a937.so => /home/kxxt/repos/tracexec/target/debug/deps/libtracing-22ba9d95c195a937.so
    libtracing_core-e4d7bd1a48f55e67.so => /home/kxxt/repos/tracexec/target/debug/deps/libtracing_core-e4d7bd1a48f55e67.so
    libeyre-b58880bead23cd46.so => /home/kxxt/repos/tracexec/target/debug/deps/libeyre-b58880bead23cd46.so
    libobject-a1e538998b4bf474.so => /home/kxxt/repos/tracexec/target/debug/deps/libobject-a1e538998b4bf474.so
    librustc_demangle-450d1b9e27096ad2.so => /home/kxxt/repos/tracexec/target/debug/deps/librustc_demangle-450d1b9e27096ad2.so
    libratatui-4573413f72a1028d.so => /home/kxxt/repos/tracexec/target/debug/deps/libratatui-4573413f72a1028d.so
        libitertools-cb78cc8cb21f5b9c.so => /home/kxxt/repos/tracexec/target/debug/deps/libitertools-cb78cc8cb21f5b9c.so
        libcassowary-f493ecea50668aa7.so => /home/kxxt/repos/tracexec/target/debug/deps/libcassowary-f493ecea50668aa7.so
        libunicode_width-e839ed4356eec8b1.so => /home/kxxt/repos/tracexec/target/debug/deps/libunicode_width-e839ed4356eec8b1.so
    libunicode_width-0803897045eafb18.so => /home/kxxt/repos/tracexec/target/debug/deps/libunicode_width-0803897045eafb18.so
    libhashbrown-df526c36bba5e56d.so => /home/kxxt/repos/tracexec/target/debug/deps/libhashbrown-df526c36bba5e56d.so
    libfoldhash-b5249cc921f2222b.so => /home/kxxt/repos/tracexec/target/debug/deps/libfoldhash-b5249cc921f2222b.so
    libcompact_str-a26b68935e060aa7.so => /home/kxxt/repos/tracexec/target/debug/deps/libcompact_str-a26b68935e060aa7.so
    libunicode_segmentation-7dff8b54da4fe5de.so => /home/kxxt/repos/tracexec/target/debug/deps/libunicode_segmentation-7dff8b54da4fe5de.so
    libcrossterm-a2f36e9db742c57e.so => /home/kxxt/repos/tracexec/target/debug/deps/libcrossterm-a2f36e9db742c57e.so
        libsignal_hook_mio-b5e051c8f93a3424.so => /home/kxxt/repos/tracexec/target/debug/deps/libsignal_hook_mio-b5e051c8f93a3424.so
        libsignal_hook-b06a5fbefe19a3c5.so => /home/kxxt/repos/tracexec/target/debug/deps/libsignal_hook-b06a5fbefe19a3c5.so
    libparking_lot-4e1bddb20d56d1ca.so => /home/kxxt/repos/tracexec/target/debug/deps/libparking_lot-4e1bddb20d56d1ca.so
    libsignal_hook_registry-3f8e1921356c7a19.so => /home/kxxt/repos/tracexec/target/debug/deps/libsignal_hook_registry-3f8e1921356c7a19.so
    liblibc-44aecbf63639e1e2.so => /home/kxxt/repos/tracexec/target/debug/deps/liblibc-44aecbf63639e1e2.so
    libstd-73940afa9ce77d13.so => /home/kxxt/repos/rust/build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/libstd-73940afa9ce77d13.so
    liballoc-19a1f21999d282aa.so => /home/kxxt/repos/rust/build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/liballoc-19a1f21999d282aa.so
    libcore-42de9da435192e03.so => /home/kxxt/repos/rust/build/host/stage1/lib/rustlib/x86_64-unknown-linux-gnu/lib/libcore-42de9da435192e03.so
    libseccomp.so.2 => /usr/lib/libseccomp.so.2
    libbpf.so.1 => /usr/lib/libbpf.so.1
        libelf.so.1 => /usr/lib/libelf.so.1
            libzstd.so.1 => /usr/lib/libzstd.so.1
        libz.so.1 => /usr/lib/libz.so.1
    libgcc_s.so.1 => /usr/lib/libgcc_s.so.1
    libc.so.6 => /usr/lib/libc.so.6
```

But sometimes the compilation still fails:

```rust
error[E0464]: multiple candidates for `dylib` dependency `clap` found
 --> /home/kxxt/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/clap_complete-4.5.44/src/aot/shells/fish.rs:3:5
  |
3 | use clap::{builder, Arg, Command, ValueHint};
  |     ^^^^
  |
  = note: candidate #1: /home/kxxt/repos/tracexec/target/debug/deps/libclap-d7e4b562e2875cd4.rlib
  = note: candidate #2: /home/kxxt/repos/tracexec/target/debug/deps/libclap-d7e4b562e2875cd4.so
```

For some reason rustc thinks the `rlib` is a candidate for a `dylib`.
But wait, why are there still `rlib`s?
Actually we don't need those `rlib`s.

It turns out that cargo passes `--crate-type lib --crate-type dylib` to rustc,
which makes rustc to output both `rlib` and `dylib`.
Let's apply a dirty patch to cargo to produce `dylib` only:

```diff
diff --git a/src/cargo/core/manifest.rs b/src/cargo/core/manifest.rs
index e6ee07c89..25c64e931 100644
--- a/src/cargo/core/manifest.rs
+++ b/src/cargo/core/manifest.rs
@@ -837,6 +837,7 @@ impl Target {
         edition: Edition,
     ) -> Target {
         let mut target = Target::with_path(src_path, edition);
+        crate_targets.retain(|t| !matches!(t, CrateType::Lib | CrateType::Rlib));
         if !crate_targets.contains(&CrateType::Dylib)
             && !crate_targets.contains(&CrateType::ProcMacro)
         {
```

Clean and build again. This time, all `rlib`s are gone:

```bash
$ ls target/debug/deps/*.rlib
ls: cannot access 'target/debug/deps/*.rlib': No such file or directory
```

# Performance Evaluation

First, let's compare the full build time:

The dynamically-linked build is slightly slower than the statically-linked build. (approx. $0.15$ seconds)

```bash
$ RUSTFLAGS="-C prefer-dynamic" RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" hyperfine --warmup 3 --runs 10 --prepare "cargo clean || true"  "~/repos/cargo/target/release/cargo build --no-default-features -F recommended"
Benchmark 1: ~/repos/cargo/target/release/cargo build --no-default-features -F recommended
  Time (mean ± σ):     36.445 s ±  0.175 s    [User: 493.619 s, System: 30.036 s]
  Range (min … max):   36.079 s … 36.641 s    10 runs
$ RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" hyperfine --warmup 3 --runs 10 --prepare ""  "cargo +nightly build --no-default-features -F recommended"
Benchmark 1: cargo +nightly build --no-default-features -F recommended
  Time (mean ± σ):     36.291 s ±  0.233 s    [User: 520.884 s, System: 29.615 s]
  Range (min … max):   36.074 s … 36.910 s    10 runs
```

Then let's compare incremental build without actual code change:

```bash
$ cargo clean
$ RUSTFLAGS="-C prefer-dynamic" RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" ~/repos/cargo/target/release/cargo build --no-default-features -F recommended
$ RUSTFLAGS="-C prefer-dynamic" RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" hyperfine --warmup 10 --runs 30 --prepare "touch src/tui/app.rs"  "~/repos/cargo/target/release/cargo build --no-default-features -F recommended"
Benchmark 1: ~/repos/cargo/target/release/cargo build --no-default-features -F recommended
  Time (mean ± σ):      1.617 s ±  0.020 s    [User: 1.426 s, System: 0.371 s]
  Range (min … max):    1.578 s …  1.649 s    30 runs
$ cargo clean
$ RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" cargo +nightly build --no-default-features -F recommended
$ RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" hyperfine --warmup 10 --runs 30 --prepare "touch src/tui/app.rs"  "cargo +nightly  build --no-default-features -F recommended"
Benchmark 1: cargo +nightly  build --no-default-features -F recommended
  Time (mean ± σ):      1.821 s ±  0.045 s    [User: 1.845 s, System: 1.440 s]
  Range (min … max):    1.778 s …  2.035 s    30 runs
```

The dynamically-linked build is slightly faster than the statically-linked build. (approx. $0.2$ seconds)

So dynamic-linking saves us about $11\%$ of build time in incremental case.

How about we actually change some code?

```bash
$ cargo clean
$ RUSTFLAGS="-C prefer-dynamic" RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" ~/repos/cargo/target/release/cargo build --no-default-features -F recommended
$ RUSTFLAGS="-C prefer-dynamic" RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" hyperfine --warmup 10 --runs 30 \
    --prepare "~/repos/cargo/target/release/cargo build --no-default-features -F recommended && git revert -n dc144e6401aa" \
    --conclude "git reset --hard" \
    "~/repos/cargo/target/release/cargo build --no-default-features -F recommended"
Benchmark 1: ~/repos/cargo/target/release/cargo build --no-default-features -F recommended
  Time (mean ± σ):      4.968 s ±  0.047 s    [User: 26.919 s, System: 1.507 s]
  Range (min … max):    4.903 s …  5.090 s    30 runs
$ cargo clean
$ RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" cargo +nightly build --no-default-features -F recommended
$ RUSTC="$HOME/repos/rust/build/host/stage1/bin/rustc" hyperfine --warmup 10 --runs 30 \
    --prepare "cargo +nightly build --no-default-features -F recommended && git revert -n dc144e6401aa" \
    --conclude "git reset --hard" \
    "cargo +nightly build --no-default-features -F recommended"
Benchmark 1: cargo +nightly build --no-default-features -F recommended
  Time (mean ± σ):      5.223 s ±  0.028 s    [User: 27.596 s, System: 2.527 s]
  Range (min … max):    5.166 s …  5.289 s    30 runs
```

This time dynamic-linking saves us `0.25` seconds, or about merely $5\%$.

# Conclusion

So the time saved from doing full dynamic linking is very little for me.
But it might still have advantages for other people's use cases.

[1]: https://github.com/kxxt/tracexec
