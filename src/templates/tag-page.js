import React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import Seo from "@/components/seo"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

const TagPage = ({ data, location, pageContext }) => {
  const title = `Tag ${pageContext.tag}`
  const posts = data.allFile.nodes
  return (
    <Layout location={location}>
      <Seo title={title} />
      <h1 className="title">Tag: {pageContext.tag}</h1>
      <p className="subtitle is-5">
        Found {pageContext.totalCount} page
        {pageContext.totalCount > 1 ? "s" : ""} with tag &quot;{pageContext.tag}
        &quot;
      </p>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($tag: String) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "blog" }
        extension: { in: ["mdx", "md"] }
        childMdx: { frontmatter: { tags: { in: [$tag] } } }
      }
      sort: { childMdx: { frontmatter: { date: DESC } } }
    ) {
      nodes {
        childMdx {
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            description
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default TagPage
