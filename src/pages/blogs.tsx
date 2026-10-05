import type { PageProps } from "gatsby"
import * as React from "react"
import { graphql } from "gatsby"

import { Layout, HeadWithNavBarTop } from "@/components/layout"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

const title = "Blogs"

export function Head() {
  return <HeadWithNavBarTop title={title} />
}

const BlogsPage = ({ data, location }: PageProps<Queries.BlogsPageQuery>) => {
  const posts = data.allMdx.nodes

  return (
    <Layout location={location}>
      <h1 className="title">{title}</h1>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export default BlogsPage

export const pageQuery = graphql`
  query BlogsPage($published: [Boolean!]!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {
        fields: { sourceInstanceName: { eq: "blog" } }
        frontmatter: { published: { in: $published } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        ...BlogSummaryFields
      }
    }
  }
`
