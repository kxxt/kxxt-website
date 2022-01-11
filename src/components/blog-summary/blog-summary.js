import React from "react"
import { Link } from "gatsby"
import * as styles from "./blog-summary.module.scss"
import Tags from "../tags/tags"

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
        <small>{post.frontmatter.date} · {post.timeToRead} min read</small>
        {post.frontmatter.tags && <Tags tags={post.frontmatter.tags} />}
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