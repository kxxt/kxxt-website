import { graphql } from "gatsby"

export const blogFields = graphql`
  fragment BlogFields on Mdx {
    excerpt
    body
    tableOfContents
    fields {
      timeToRead
    }
    frontmatter {
      title
      tags
      date(formatString: "MMMM DD, YYYY")
      description
    }
  }
`

export const blogQuickInfoFields = graphql`
  fragment BlogQuickInfoFields on Mdx {
    fields {
      slug
      timeToRead
    }
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`

export const blogSummaryFields = graphql`
  fragment BlogSummaryFields on Mdx {
    excerpt
    fields {
      slug
      timeToRead
    }
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
      description
      tags
    }
  }
`
