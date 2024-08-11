---
title: "What is the maximum possible value of RLIMIT_NOFILE?"
date: 2024-08-11
description: "RLIMIT_NOFILE limits how many files a process could open. What's the maximum value of it?"
tags: [linux, kernel, rlimit]
published: true
---

When developing the eBPF backend for tracexec, I want to know the best way to efficiently iterate over
all open file descriptors of a single process. The naive way is to iterate from 0 to `fdtable->max_fds` (It's an `unsigned int`),
which should be smaller than a hard limit enforced by `RLIMIT_NOFILE`.

That makes me wonder the maximum possible value of `RLIMIT_NOFILE`. A google search leads me to this StackExchange question: [Largest allowed maximum number of open files in Linux](https://unix.stackexchange.com/questions/334187/largest-allowed-maximum-number-of-open-files-in-linux/).
But unfortunately, there's no answer that could convince me. So I decided to dive into the kernel code and seek the answer myself.


`include/asm-generic/resource.h` defines the boot time defaults of `RLIMIT_NOFILE`:

```c
[RLIMIT_NOFILE]		= {   INR_OPEN_CUR,   INR_OPEN_MAX },
```

`INR_OPEN_CUR` and `INR_OPEN_MAX` are defined in `include/uapi/linux/fs.h`:

```c
#define INR_OPEN_CUR 1024	/* Initial setting for nfile rlimits */
#define INR_OPEN_MAX 4096	/* Hard limit for nfile rlimits */
```

But that's not the maximium possible value of `RLIMIT_NOFILE`.

To answer the question, we need to take a look at `kernel/sys.c`,
where `do_prlimit` is the function resposible for handling our request to bump `RLIMIT_NOFILE`.

```c
/* make sure you are allowed to change @tsk limits before calling this */
static int do_prlimit(struct task_struct *tsk, unsigned int resource,
		      struct rlimit *new_rlim, struct rlimit *old_rlim)
{
	struct rlimit *rlim;
	int retval = 0;

	if (resource >= RLIM_NLIMITS)
		return -EINVAL;
	resource = array_index_nospec(resource, RLIM_NLIMITS);

	if (new_rlim) {
		if (new_rlim->rlim_cur > new_rlim->rlim_max)
			return -EINVAL;
		if (resource == RLIMIT_NOFILE &&
				new_rlim->rlim_max > sysctl_nr_open)
			return -EPERM;
	}
    ...
}
```

We can see that the hard maximum possible value of `RLIMIT_NOFILE` is `sysctl_nr_open`, which is defined in `fs/file.c`:

So by kernel default, the maximum value of `RLIMIT_NOFILE` is `1048576`.

But `fs.nr_open` sysctl could be raised upto `sysctl_nr_open_max`.

`sysctl fs.nr_open` returns `1073741816` on my laptop. I don't know what program set it.

Now let's calculate the maximum possible value of `sysctl_nr_open` on x86_64 architecture:

```c
unsigned int sysctl_nr_open __read_mostly = 1024*1024;
unsigned int sysctl_nr_open_min = BITS_PER_LONG;
/* our min() is unusable in constant expressions ;-/ */
#define __const_min(x, y) ((x) < (y) ? (x) : (y))
unsigned int sysctl_nr_open_max =
	__const_min(INT_MAX, ~(size_t)0/sizeof(void *)) & -BITS_PER_LONG;
```

- `BITS_PER_LONG` is `64` on x86_64 so `-BITS_PER_LONG` is `0xffffffffffffffc0`
- `~(size_t)0/sizeof(void *))` is `2305843009213693952` (`0x2000000000000000`)
- It is bigger than `INT_MAX`.
- so `sysctl_nr_open_max` is `INT_MAX & 0xffffffffffffffc0 = 2147483584` on x86_64.

This could be verified by running:

```c
$ sudo sysctl fs.nr_open=2147483584 
fs.nr_open = 2147483584
$ sudo sysctl fs.nr_open=2147483585
sysctl: setting key "fs.nr_open": Invalid argument
```

So the max possible value of `RLIMIT_NOFILE` is `2147483584`,
only possible if and only if `sysctl fs.nr_open=2147483585`.

This answer is based on Linux source code at commit `34ac1e82e5a78d5ed7f647766f5b1b51ca4d983a`.
Future/Past linux versions might have a different limit.

Thanks for reading!
