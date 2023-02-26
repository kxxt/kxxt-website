import React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import Seo from "@/components/seo"
import Tags from "@/components/tags/tags"

const TagsPage = ({ data, location }) => {
  const title = "Tags"
  const tags = data.allFile.group
  return (
    <Layout location={location}>
      <Seo title={title} />
      <h1 className="title">All Tags</h1>
      <Tags tags={tags} withCount={true} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($published: [Boolean!]!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "blog" }
        extension: { in: ["mdx", "md"] }
        childMdx: { frontmatter: { published: { in: $published } } }
      }
      sort: { childMdx: { frontmatter: { date: DESC } } }
    ) {
      group(field: { childMdx: { frontmatter: { tags: SELECT } } }) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

export default TagsPage
