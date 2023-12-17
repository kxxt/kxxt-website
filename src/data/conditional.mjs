import process from "process"

const DEBUG = process.env.NODE_ENV !== "production"

const onlySelectPublishedArticlesInProd = DEBUG
  ? ""
  : "frontmatter: {published: {eq: true}}"

export { onlySelectPublishedArticlesInProd }
