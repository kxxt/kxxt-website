import assert from "node:assert/strict"
import test from "node:test"
import type { Root } from "mdast"
import { unified } from "unified"

import {
  getIdPaths,
  getIds,
  parseTableOfContents,
} from "../src/components/table-of-contents/logic.ts"
import formatDateAndTimeToRead from "../src/utils/date-and-time-to-read.ts"
import remarkMkdocsMaterialAdmonition from "../src/utils/remark-mkdocs-material-admonition.mts"

test("table of contents handles missing data and headings without a URL", () => {
  assert.deepEqual(parseTableOfContents(null), [])
  assert.deepEqual(parseTableOfContents({ items: [] }), [])
  assert.deepEqual(getIds(), [])
  assert.deepEqual(getIdPaths(), {})

  const toc = parseTableOfContents([
    null,
    "invalid",
    {
      title: "Unlinked section",
      items: [
        {
          title: "Introduction",
          url: "#intro",
          items: [{ title: "Details", url: "#details" }],
        },
      ],
    },
    { title: "Conclusion", url: "#conclusion" },
  ])
  assert.deepEqual(getIds(toc), [
    { id: "intro", level: 1 },
    { id: "details", level: 2 },
    { id: "conclusion", level: 0 },
  ])
  assert.deepEqual(getIdPaths(toc), {
    intro: ["intro"],
    details: ["intro", "details"],
    conclusion: ["conclusion"],
  })
})

test("article metadata supports notes without a reading time", () => {
  assert.equal(
    formatDateAndTimeToRead("October 5, 2026", 3),
    "October 5, 2026 · 3 min read",
  )
  assert.equal(
    formatDateAndTimeToRead("October 5, 2026", null),
    "October 5, 2026",
  )
  assert.equal(formatDateAndTimeToRead(null, 3), "3 min read")
  assert.throws(() => formatDateAndTimeToRead(null, null), /both not provided/)
})

test("Markdown admonitions retain custom classes and nested content", async () => {
  const tree: Root = {
    type: "root",
    children: [
      {
        type: "containerDirective",
        name: "warning",
        attributes: { class: "custom" },
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "Keep this content." }],
          },
        ],
      },
    ],
  }
  const result = await unified().use(remarkMkdocsMaterialAdmonition).run(tree)
  const admonition = result.children[0]
  assert.ok(admonition?.type === "containerDirective")
  assert.equal(admonition.data?.hName, "div")
  assert.deepEqual(admonition.data?.hProperties?.className, [
    "admonition",
    "warning",
    "custom",
  ])
  assert.deepEqual(admonition.children[0], {
    type: "paragraph",
    children: [{ type: "text", value: "Warning" }],
    data: { hProperties: { className: "admonition-title" } },
  })
  assert.deepEqual(admonition.children[1], {
    type: "paragraph",
    children: [{ type: "text", value: "Keep this content." }],
  })
})
