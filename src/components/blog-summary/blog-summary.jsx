import React from "react"
import { Link } from "gatsby"
import * as styles from "./blog-summary.module.scss"
import Tags from "../tags/tags"
import formatDateAndTimeToRead from "@/utils/date-and-time-to-read"

const BlogSummary = ({ post }) => {
  const title =
    post.frontmatter.title || post?.headings?.[0]?.value || post.slug
  return (
    <article
      className={`${styles.blogSummary} box`}
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h2 className={`title is-4 ${styles.title}`}>
          <Link to={`/blog${post.fields.slug}`} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <div className={styles.summaryFlex}>
          <small className={styles.timeToRead}>
            {formatDateAndTimeToRead(
              post.frontmatter.date,
              post.fields.timeToRead ?? "unknown"
            )}
          </small>
          <Tags tags={post.frontmatter.tags} className={styles.tags} />
        </div>
      </header>
      <section>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: post.frontmatter.description || post.excerpt,
          }}
          itemProp="description"
        />
      </section>
    </article>
  )
}

export default BlogSummary
