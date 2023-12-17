import React from "react"
import { graphql } from "gatsby"

import { Layout, HeadWithNavBarTop } from "@/components/layout"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

export function Head({ pageContext }) {
  const title = `Tag ${pageContext.tag}`
  return <HeadWithNavBarTop title={title} />
}

const TagPage = ({ data, location, pageContext }) => {
  const posts = data.allMdx.nodes
  return (
    <Layout location={location}>
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
    allMdx(
      filter: {
        fields: { sourceInstanceName: { eq: "blog" } }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
          timeToRead
          sourceInstanceName
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
`

export default TagPage
