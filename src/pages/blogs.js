import * as React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import Seo from "@/components/seo"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

const BlogsPage = ({ data, location }) => {
  const posts = data.allFile.nodes
  const title = "Blogs"

  return (
    <Layout location={location}>
      <Seo title={title} />
      <h1 className="title">{title}</h1>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export default BlogsPage

export const pageQuery = graphql`
  query ($published: [Boolean!]!) {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "blog" }
        extension: { in: ["mdx", "md"] }
        childMdx: { frontmatter: { published: { in: $published } } }
      }
      sort: { childMdx: { frontmatter: { date: DESC } } }
    ) {
      nodes {
        childMdx {
          ...BlogSummaryFields
        }
      }
    }
  }
`
