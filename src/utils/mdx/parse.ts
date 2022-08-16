// Adapted from gatsby-plugin-mdx/src/__tests__/remark-infer-toc-meta.ts in PR gatsbyjs/gatsby#35650

import { createProcessor } from "@mdx-js/mdx"
import { toc } from "mdast-util-toc"
import { visit } from "unist-util-visit"
import remarkInferTocMeta from "./remark-infer-toc-meta"
import rehypeMdxMetadataExtractor from "./rehype-metadata-extractor"

const processor = createProcessor({
  remarkPlugins: [[remarkInferTocMeta, { toc, visit }]],
  rehypePlugins: [rehypeMdxMetadataExtractor],
})

export default processor
