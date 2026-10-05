import React from "react"
import { graphql } from "gatsby"
import type { HeadProps, PageProps } from "gatsby"

import { Layout, HeadWithNavBarTop } from "@/components/layout"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

interface TagPageContext {
  tag: string
  totalCount: number
}

export function Head({
  pageContext,
}: HeadProps<Queries.TagPageQuery, TagPageContext>) {
  const title = `Tag ${pageContext.tag}`
  return <HeadWithNavBarTop title={title} />
}

const TagPage = ({
  data,
  location,
  pageContext,
}: PageProps<Queries.TagPageQuery, TagPageContext>) => {
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
  query TagPage($tag: String) {
    allMdx(
      filter: {
        fields: { sourceInstanceName: { eq: "blog" } }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        ...BlogSummaryFields
      }
    }
  }
`

export default TagPage
