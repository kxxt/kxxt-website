import { remarkCodeHike } from "@code-hike/mdx"
import theme from "shiki/themes/dracula.json"
import remarkEmoji from "remark-emoji"
import rehypeKaTeX from "rehype-katex"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkMath from "remark-math"
import remarkUnwrapImages from "remark-unwrap-images"
import { toc } from "mdast-util-toc"
import { visit } from "unist-util-visit"
import remarkInferTocMeta from "@/utils/mdx/remark-infer-toc-meta"
import rehypeMdxMetadataExtractor from "@/utils/mdx/rehype-metadata-extractor"

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
    [remarkInferTocMeta, { toc, visit }],
    // require("remark-abbr"),
    remarkEmoji,
    remarkUnwrapImages,
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
    rehypeMdxMetadataExtractor,
  ],
}
export const allowedMdxFileExtensions = [".md", ".mdx"]
