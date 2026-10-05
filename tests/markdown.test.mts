import assert from "node:assert/strict"
import test from "node:test"
import { compile } from "@mdx-js/mdx"
import config from "../gatsby-config.mts"

test("Gatsby Markdown configuration renders admonition markup", async () => {
  const mdxPlugin = config.plugins?.find(
    plugin =>
      typeof plugin === "object" && plugin.resolve === "gatsby-plugin-mdx",
  )
  assert.ok(mdxPlugin && typeof mdxPlugin === "object")
  const options = mdxPlugin.options?.mdxOptions
  assert.ok(options)

  const output = String(
    await compile(":::note\nKeep this content.\n:::", options),
  )
  assert.match(output, /className: "admonition note"/)
  assert.match(output, /className: "admonition-title"/)
  assert.match(output, /children: "Note"/)
  assert.match(output, /Keep this content\./)
})
