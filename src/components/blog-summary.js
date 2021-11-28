import React from "react"
import { Link } from "gatsby"
import * as styles from "./blog-summary.module.scss"

const BlogSummary = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  return (
    <article
      className={`${styles.blogSummary} box`}
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h2 className="title is-4">
          <Link to={post.fields.slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>{post.frontmatter.date}</small>
        <div className="tags">
          {post.frontmatter.tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${tag}/`}
              className="tag is-primary"
              itemProp="keywords"
            >
              {tag}
            </Link>
          ))}
        </div>
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