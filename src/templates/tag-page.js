import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import BlogSummaryList from "../components/blog-summary/blog-summary-list"

const TagPage = ({ data, location, pageContext }) => {
  const title = "Tags"
  const posts = data.allMdx.nodes
  return (
    <Layout location={location} title={title}>
      <Seo title={title} />
      <h1 className="title">Tag: {pageContext.tag}</h1>
      <p className="subtitle is-5">Found {pageContext.totalCount} page{pageContext.totalCount > 1 ? "s" : ""} with tag
        "{pageContext.tag}"</p>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export const pageQuery = graphql`
    query ($tag: String) {
        allMdx(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {frontmatter: {tags: {in: [$tag]}}}
        ) {
            totalCount
            nodes {
                slug
                timeToRead
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