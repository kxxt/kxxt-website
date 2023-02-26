import process from "process"

const DEBUG = process.env.NODE_ENV !== "production"

const onlySelectPublishedArticlesInProd = DEBUG
  ? ""
  : "childMdx: { frontmatter: {published: {eq: true}}}"

export { onlySelectPublishedArticlesInProd }
