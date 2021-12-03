import React from "react"
import BlogSummary from "./blog-summary"

const BlogSummaryList = ({ posts }) => (
  <ol style={{ listStyle: `none` }}>
    {posts.map(post => {
      return (
        <li key={post.slug}>
          <BlogSummary post={post} />
        </li>
      )
    })}
  </ol>
)

export default BlogSummaryList