import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import BlogSummaryList from "../components/blog-summary/blog-summary-list"

const BlogsPage = ({ data, location }) => {
  const posts = data.allMdx.nodes
  const title = "Blogs"

  return (
    <Layout location={location} title={title}>
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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { in: $published } } }
    ) {
      nodes {
        ...BlogSummaryFields
      }
    }
  }
`
