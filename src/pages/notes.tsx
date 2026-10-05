import type { PageProps } from "gatsby"
import * as React from "react"
import { graphql } from "gatsby"

import { Layout, HeadWithNavBarTop } from "@/components/layout"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

const title = "Short notes"

export function Head() {
  return <HeadWithNavBarTop title={title} />
}

const BlogsPage = ({ data, location }: PageProps<Queries.NotesPageQuery>) => {
  const notes = data.allMdx.nodes

  return (
    <Layout location={location}>
      <h1 className="title">{title}</h1>
      <BlogSummaryList posts={notes} />
    </Layout>
  )
}

export default BlogsPage

export const pageQuery = graphql`
  query NotesPage {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fields: { sourceInstanceName: { eq: "notes" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        ...BlogSummaryFields
      }
    }
  }
`
