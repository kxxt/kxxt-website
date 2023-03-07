import React from "react"
import BlogSummary from "./blog-summary"

const BlogSummaryList = ({ posts }) => (
  <ol style={{ listStyle: `none` }}>
    {posts.map(({ childMdx: post }) => {
      return (
        <li key={post.fields.slug}>
          <BlogSummary post={post} />
        </li>
      )
    })}
  </ol>
)

export default BlogSummaryList
