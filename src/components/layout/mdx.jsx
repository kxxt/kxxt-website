import React from "react"
import { Layout } from "."

export default function MDXPageLayout({ children, ...props }) {
  return (
    <Layout {...props}>
      <article
        className="blog-post content"
        itemScope
        itemType="http://schema.org/Article"
      >
        {children}
      </article>
    </Layout>
  )
}
