import * as React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/tags/tags"
import BlogBottomNav from "../components/blog-bottom-nav/blog-bottom-nav"
import TableOfContents from "../components/table-of-contents/table-of-contents"

import * as styles from "./blog-post.module.scss"
import "katex/dist/katex.min.css"

const shortcodes = { Link } // Provide common components here

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const { previous, next } = data
  const toc = post.tableOfContents.items ? <TableOfContents toc={post.tableOfContents.items} /> : null
  const bottom = (
    <>
      <hr />
      <BlogBottomNav next={next} previous={previous} />
    </>
  )
  return (
    <Layout location={location} sidebar={toc} bottom={bottom}>
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
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostById(
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
            ...BlogFields
        }
        previous: mdx(id: { eq: $previousPostId }) {
            ...BlogQuickInfoFields
        }
        next: mdx(id: { eq: $nextPostId }) {
            ...BlogQuickInfoFields
        }
    }
`
