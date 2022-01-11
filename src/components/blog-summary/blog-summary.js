import React from "react"
import { Link } from "gatsby"
import * as styles from "./blog-summary.module.scss"
import Tags from "../tags/tags"
import formatDateAndTimeToRead from "../../utils/date-and-time-to-read"

const BlogSummary = ({ post }) => {
  const title = post.frontmatter.title || post.slug
  return (
    <article
      className={`${styles.blogSummary} box`}
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h2 className="title is-4">
          <Link to={`/blog/${post.slug}`} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>{formatDateAndTimeToRead(post.frontmatter.date, post.timeToRead)}</small>
        <Tags tags={post.frontmatter.tags} />
      </header>
      <section>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: post.frontmatter.description || post.excerpt
          }}
          itemProp="description"
        />
      </section>
    </article>
  )
}

export default BlogSummary