import { graphql } from "gatsby"

export const blogFields = graphql`
  fragment BlogFields on Mdx {
    excerpt(pruneLength: 160)
    body
    tableOfContents
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
    }
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`

export const blogSummaryFields = graphql`
  fragment BlogSummaryFields on Mdx {
    excerpt(pruneLength: 160)
    fields {
      slug
    }
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
      description
      tags
    }
  }
`
