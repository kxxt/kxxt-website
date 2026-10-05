import React from "react"
import { Link } from "gatsby"

import * as styles from "./blog-bottom-nav.module.scss"

const navContentConfig = {
  prev: {
    flexDirection: "row",
    content: "←",
    padding: "Right",
  },
  next: {
    flexDirection: "row-reverse",
    content: "→",
    padding: "Left",
  },
} as const

const BlogBottomNavContent = ({
  post,
  pos,
  source,
}: {
  post: Queries.BlogQuickInfoFieldsFragment
  pos: keyof typeof navContentConfig
  source: string
}) => {
  return (
    <li className="box">
      <Link
        to={`/${source}${post.fields.slug}`}
        rel={pos}
        style={{
          flexDirection: navContentConfig[pos].flexDirection,
        }}
      >
        <span
          className={styles.arrow}
          style={{ [`padding${navContentConfig[pos].padding}`]: "0.7rem" }}
        >
          {navContentConfig[pos].content}
        </span>
        <div>
          <p className="subtitle is-5">{post.frontmatter?.title}</p>
          <p>
            <small>{post.frontmatter?.date}</small>
          </p>
          <p>{post.fields.timeToRead} min read</p>
        </div>
      </Link>
    </li>
  )
}

const BlogBottomNav = ({
  next,
  previous,
  source = "blog",
}: {
  next?: Queries.BlogQuickInfoFieldsFragment | null
  previous?: Queries.BlogQuickInfoFieldsFragment | null
  source?: string
}) => {
  return (
    <nav className={styles.bottomNav}>
      <ul className={styles.blogPostNav}>
        {previous ? (
          <BlogBottomNavContent post={previous} pos="prev" source={source} />
        ) : (
          <li />
        )}
        {next && (
          <BlogBottomNavContent post={next} pos="next" source={source} />
        )}
      </ul>
    </nav>
  )
}

export default BlogBottomNav
