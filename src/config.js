import { remarkCodeHike } from "@code-hike/mdx"
import theme from "shiki/themes/dracula.json"
import remarkEmoji from "remark-emoji"
import rehypeKaTeX from "rehype-katex"

export const mdxOptions = {
  useDynamicImport: true,
  remarkPlugins: [
    require("remark-gfm"),
    require("remark-math"),
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
    require("rehype-slug"),
    [
      require("rehype-autolink-headings"),
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
