import React from "react"
import { graphql } from "gatsby"

import { Layout, HeadWithNavBarTop } from "@/components/layout"
import Tags from "@/components/tags/tags"

const title = "Tags"

export function Head() {
  return <HeadWithNavBarTop title={title} />
}

const TagsPage = ({ data, location }) => {
  const tags = data.allMdx.group
  return (
    <Layout location={location}>
      <h1 className="title">All Tags</h1>
      <Tags tags={tags} withCount={true} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($published: [Boolean!]!) {
    allMdx(
      filter: {
        fields: { sourceInstanceName: { eq: "blog" } }
        frontmatter: { published: { in: $published } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

export default TagsPage
