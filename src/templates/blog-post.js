import * as React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/tags"

import * as styles from "./blog-post.module.scss"
import BlogPostNav from "../components/blog-post-nav"

const shortcodes = { Link } // Provide common components here

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data


  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post content"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className={styles.postHeader}>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date} · {post.timeToRead} min read</p>
          <Tags tags={post.frontmatter.tags} />
        </header>
        <MDXProvider components={shortcodes}>
          <MDXRenderer frontmatter={post.frontmatter}>{post.body}</MDXRenderer>
        </MDXProvider>
        <hr />
      </article>
      <BlogPostNav next={next} previous={previous} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                title
            }
        }
        mdx(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            timeToRead
            body
            frontmatter {
                title
                tags
                date(formatString: "MMMM DD, YYYY")
                description
            }
        }
        previous: mdx(id: { eq: $previousPostId }) {
            slug
            timeToRead
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
            }
        }
        next: mdx(id: { eq: $nextPostId }) {
            slug
            timeToRead
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`
