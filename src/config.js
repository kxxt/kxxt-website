import { remarkCodeHike } from "@code-hike/mdx"
import theme from "shiki/themes/dracula.json"
import remarkEmoji from "remark-emoji"
import rehypeKaTeX from "rehype-katex"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkMath from "remark-math"

export const mdxOptions = {
  useDynamicImport: true,
  remarkPlugins: [
    remarkGfm,
    remarkMath,
    [
      remarkCodeHike,
      {
        theme,
        autoImport: false,
        lineNumbers: true,
        showCopyButton: true,
        skipLanguages: ["mermaid", "dot"],
      },
    ],
    // require("remark-abbr"),
    remarkEmoji,
    // wrapESMPlugin("remark-directive"),
  ],
  rehypePlugins: [
    rehypeKaTeX,
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
        properties: {
          className: "header-anchor",
          ariaHidden: true,
          tabIndex: -1,
        },
      },
    ],
  ],
}
export const allowedMdxFileExtensions = [".md", ".mdx"]
