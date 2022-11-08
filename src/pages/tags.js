import React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import Seo from "@/components/seo"
import Tags from "@/components/tags/tags"

const TagsPage = ({ data, location }) => {
  const title = "Tags"
  const tags = data.allMdx.group
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
    allMdx(filter: { frontmatter: { published: { in: $published } } }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

export default TagsPage
