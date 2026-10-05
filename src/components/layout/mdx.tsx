import React from "react"
import { Layout } from "."
import type { LayoutProps } from "."

export default function MDXPageLayout({ children, ...props }: LayoutProps) {
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
