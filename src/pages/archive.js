import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import ArchiveItem from "../components/archive/archive-item"

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

const ArchivePage = ({ data, location }) => {
  const title = "Archive"
  const posts = data.allMdx.nodes
  let currentYear = null,
    currentMonth = null,
    list = []
  for (let post of posts) {
    let date = new Date(post.frontmatter.date)
    const year = date.getFullYear(),
      month = date.getMonth()
    if (currentYear !== year) {
      currentYear = year
      currentMonth = null
      list.push(<h2>{year}</h2>)
    }
    if (currentMonth !== month) {
      currentMonth = month
      list.push(<h3>{months[month - 1]}</h3>)
    }
    list.push(<ArchiveItem post={post} date={date} />)
  }
  return (
    <Layout title={title} location={location}>
      <Seo title={title} />
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
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
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
`
