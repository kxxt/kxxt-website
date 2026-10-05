import React from "react"
import BlogSummary from "./blog-summary"

const BlogSummaryList = ({
  posts,
}: {
  posts: readonly Queries.BlogSummaryFieldsFragment[]
}) => (
  <ol style={{ listStyle: `none` }}>
    {posts.map(post => {
      return (
        <li key={post.fields.slug}>
          <BlogSummary post={post} />
        </li>
      )
    })}
  </ol>
)

export default BlogSummaryList
