import * as React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Giscus from "@giscus/react"

import Layout from "@/components/layout"
import Seo from "@/components/seo"
import Tags from "@/components/tags/tags"
import BlogBottomNav from "@/components/blog-bottom-nav/blog-bottom-nav"
import TableOfContents from "@/components/table-of-contents/table-of-contents"

import formatDateAndTimeToRead from "@/utils/date-and-time-to-read"

import * as styles from "./blog-post.module.scss"
import "katex/dist/katex.min.css"
import "@code-hike/mdx/dist/index.css"
import "../admonition.scss"

const shortCodes = { Link } // Provide common components here

const BlogPostTemplate = ({ data, location, children }) => {
  const post = data.mdx
  const { frontmatter } = post
  const { previous, next } = data
  const toc = post.tableOfContents.items ? (
    <TableOfContents toc={post.tableOfContents.items} />
  ) : null
  const bottom = (
    <>
      <hr />
      <BlogBottomNav next={next} previous={previous} />
    </>
  )
  return (
    <Layout location={location} sidebar={toc} bottom={bottom}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post content"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className={styles.postHeader}>
          <h1 itemProp="headline">{frontmatter.title}</h1>
          <p>
            {formatDateAndTimeToRead(frontmatter.date, post.fields.timeToRead)}
          </p>
          <Tags tags={frontmatter.tags} />
        </header>
        {frontmatter.outdated && (
          <div className="admonition attention">
            <p className="admonition-title">Attention</p>
            <p>
              This article has been explicitly marked as outdated. It may
              contain outdated information. Please seek other sources for
              information on this topic for the latest information.
            </p>
            {frontmatter.outdatedReason && (
              <div>
                <p className="title is-6" style={{ fontWeight: "bold" }}>
                  Reason
                </p>
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {frontmatter.outdatedReason}
                </p>
              </div>
            )}
          </div>
        )}
        <MDXProvider components={shortCodes}>{children}</MDXProvider>
      </article>
      <Giscus
        repo="kxxt/kxxt-website"
        repoId="R_kgDOGcqT_g"
        category="Thread"
        categoryId="DIC_kwDOGcqT_s4COe_7"
        mapping="og:title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($id: String!, $previousPostId: String, $nextPostId: String) {
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
