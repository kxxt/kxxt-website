// This file is from https://github.com/OI-wiki/gatsby-oi-wiki/blob/3f782b20263dbe820c1b6eb3baba2b0b53f1ceaf/gatsby-theme-oi-wiki/esmRequire.js
// gatsby-theme-oi-wiki is licensed under Apache License 2.0
// https://github.com/OI-wiki/gatsby-oi-wiki/blob/master/LICENSE

/**
 * @file export compiled ES modules as a workaround before Gatsby properly handles it
 */

const esm = require("esm")
const fs = require("fs")
const Module = require("module")


// Node: bypass [ERR_REQUIRE_ESM]
const orig = Module._extensions[".js"]
Module._extensions[".js"] = function(module, filename) {
  try {
    return orig(module, filename)
  } catch (e) {
    if (e.code === "ERR_REQUIRE_ESM") {
      const content = fs.readFileSync(filename, "utf8")
      module._compile(content, filename)
    }
  }
}

const _esmRequire = esm(module, {
  cjs: true,
  mode: "all"
})

// don't pollute Module
Module._extensions[".js"] = orig


module.exports = function esmRequire(id) {
  return _esmRequire(id)
}
