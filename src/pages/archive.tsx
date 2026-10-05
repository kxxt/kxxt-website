import type { PageProps } from "gatsby"
import React from "react"
import { Layout, HeadWithNavBarTop } from "@/components/layout"
import { graphql } from "gatsby"
import ArchiveItem from "@/components/archive/archive-item"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const title = "Archive"

export function Head() {
  return <HeadWithNavBarTop title="Archive" />
}

const ArchivePage = ({
  data,
  location,
}: PageProps<Queries.ArchivePageQuery>) => {
  const posts = data.allFile.nodes
  let currentYear: number | null = null
  let currentMonth: number | null = null
  const list: React.ReactNode[] = []
  for (const { childMdx: post } of posts) {
    if (!post?.frontmatter?.date) continue
    const date = new Date(post.frontmatter.date)
    const year = date.getFullYear(),
      month = date.getMonth()
    if (currentYear !== year) {
      currentYear = year
      currentMonth = null
      list.push(<h2 key={`year-${year}`}>{year}</h2>)
    }
    if (currentMonth !== month) {
      currentMonth = month
      list.push(<h3 key={`month-${year}-${month}`}>{months[month]}</h3>)
    }
    list.push(<ArchiveItem key={post.fields.slug} post={post} date={date} />)
  }
  return (
    <Layout location={location}>
      <h1 className="title">{title}</h1>
      <p className="subtitle is-6">
        This is the archive page. You can find all the posts here.
      </p>
      <div className="content">{list}</div>
    </Layout>
  )
}

export default ArchivePage

export const pageQuery = graphql`
  query ArchivePage($published: [Boolean!]!) {
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
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            tags
          }
        }
      }
    }
  }
`
