// https://stackoverflow.com/questions/74385208/puppeteer-error-on-heroku-could-not-find-chromium

const { join } = require("path")
const os = require("os")

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: __dirname.startsWith("/vercel")
    ? join(__dirname, "node_modules", ".puppeteer")
    : join(os.homedir(), ".cache", "puppeteer"),
}
