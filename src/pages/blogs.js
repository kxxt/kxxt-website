import * as React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import HeadWithDefaults from "@/components/head"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

const title = "Blogs"

export function Head() {
  return <HeadWithDefaults title={title} />
}

const BlogsPage = ({ data, location }) => {
  const posts = data.allFile.nodes

  return (
    <Layout location={location}>
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
