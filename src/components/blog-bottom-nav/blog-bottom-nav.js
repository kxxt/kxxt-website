import React from "react"
import { Link } from "gatsby"

import * as styles from "./blog-bottom-nav.module.scss"

const navContentConfig = {
  prev: {
    flexDirection: "row",
    content: "←",
    padding: "Right"
  },
  next: {
    flexDirection: "row-reverse",
    content: "→",
    padding: "Left"
  }
}

const BlogBottomNavContent = ({ post, pos }) => {

  return (
    <li className="box">
      <Link to={`/blog/${post.slug}`} rel={pos} style={{
        flexDirection: navContentConfig[pos].flexDirection
      }}>

        <span className={styles.arrow}
              style={{ [`padding${navContentConfig[pos].padding}`]: "0.7rem" }}>
          {navContentConfig[pos].content}
        </span>
        <div>
          <p className="subtitle is-5">{post.frontmatter.title}</p>
          <p><small>{post.frontmatter.date}</small></p>
          <p>{post.timeToRead} min read</p>
        </div>
      </Link>
    </li>


  )
}

const BlogBottomNav = ({ next, previous }) => {
  return (
    <nav>
      <ul className={styles.blogPostNav}>
        {previous ? <BlogBottomNavContent post={previous} pos="prev" /> : <li />}
        {next && <BlogBottomNavContent post={next} pos="next" />}
      </ul>
    </nav>
  )
}

export default BlogBottomNav