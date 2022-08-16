import React from "react"
import Link from "next/link"
import styles from "./blog-summary.module.scss"
import Tags from "../tags"
import formatDateAndTimeToRead from "../../utils/date-and-time-to-read"

const BlogSummary = ({ post }) => {
  const title = post.title
  return (
    <article
      className={`${styles.blogSummary} box`}
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h2 className="title is-4">
          <Link href={`/blog/${post.path}`}>
            <a itemProp="url">
              <span itemProp="headline">{title}</span>
            </a>
          </Link>
        </h2>
        <small>
          {formatDateAndTimeToRead(post.date, post.timeToRead ?? "unknown")}
        </small>
        <Tags tags={post.tags} />
      </header>
      <section>
        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: post.description || post.excerpt,
          }}
          itemProp="description"
        />
      </section>
    </article>
  )
}

export default BlogSummary
