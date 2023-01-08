// https://stackoverflow.com/questions/74385208/puppeteer-error-on-heroku-could-not-find-chromium

const { join } = require("path")

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: __dirname.startsWith("/vercel")
    ? join(__dirname, ".cache", "puppeteer")
    : "~/.cache/puppeteer",
}
