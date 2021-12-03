import { graphql } from "gatsby"

export const blogFields = graphql`
    fragment BlogFields on Mdx {
        excerpt(pruneLength: 160)
        timeToRead
        body
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
        slug
        timeToRead
        frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
        }
    }
`

export const blogSummaryFields = graphql`
    fragment BlogSummaryFields on Mdx {
        excerpt(pruneLength: 160)
        slug
        timeToRead
        frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
        }
    }
`