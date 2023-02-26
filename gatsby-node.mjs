import path from "path"
import { createFilePath } from "gatsby-source-filesystem"
import _ from "lodash"
import readingTime from "reading-time"
import { onlySelectPublishedArticlesInProd } from "./src/data/conditional.mjs"
import * as url from "url"
const BASE_PATH = url.fileURLToPath(new URL(".", import.meta.url))

export function onCreateWebpackConfig({ stage, actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(BASE_PATH, "src/components"),
        "@/templates": path.resolve(BASE_PATH, "src/templates"),
        "@/utils": path.resolve(BASE_PATH, "src/utils"),
        "@/data": path.resolve(BASE_PATH, "src/data"),
        "@/pages": path.resolve(BASE_PATH, "src/pages"),
      },
    },
  })
}

export async function createPages({ graphql, actions, reporter }) {
  const { createPage, createRedirect } = actions

  createRedirect({ fromPath: "/friends", toPath: "/links", isPermanent: true })
  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "blog" }
          extension: { in: ["mdx", "md"] }
          ${onlySelectPublishedArticlesInProd}
        }
        sort: { childMdx: { frontmatter: { date: DESC } } }
      ) {
        edges {
          node {
            childMdx {
              body
              id
              fields {
                slug
              }
              frontmatter {
                title
                published
              }
            }
            absolutePath
          }
        }
        group(field: { childMdx: { frontmatter: { tags: SELECT } } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error querying your blog posts`,
      result.errors
    )
    return
  }

  let posts = result.data.allFile.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach(({ node: { childMdx: post, absolutePath } }, index) => {
      const nextPostId = index === 0 ? null : posts[index - 1].id
      const previousPostId =
        index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: `blog${post.fields.slug}`,
        component: `${path.resolve(
          "./src/templates/blog-post.js"
        )}?__contentFilePath=${absolutePath}`,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const tags =  result.data.allFile.group
  if (tags.length > 0) {
    tags.forEach(({ tag, totalCount }) => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: path.resolve(`./src/templates/tag-page.js`),
        context: {
          tag,
          totalCount,
        },
      })
    })
  }
}

export async function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    // && node.fileAbsolutePath.indexOf('/pages/') !== -1) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
    createNodeField({
      node,
      name: `timeToRead`,
      value: Math.ceil(readingTime(node.body).minutes),
    })
  }
}

const pagesToAddContext = new Set([`/`, `/blogs/`, `/archive/`, `/tags/`])

export function onCreatePage({ page, actions }) {
  const { createPage, deletePage } = actions
  const newPage = Object.assign({}, page)

  if (pagesToAddContext.has(page.path)) {
    deletePage(page)

    newPage.context = {
      published: process.env.NODE_ENV !== "production" ? [true, false] : [true],
    }

    createPage(newPage)
  }
}

export function createSchemaCustomization({ actions }) {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      body: String
      id: String!
      excerpt: String
      fields: MdxFields!
    }

    type MdxFields {
      slug: String!
      timeToRead: Int!
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      published: Boolean!
      tags: [String!]!
      outdated: Boolean
      outdatedReason: String
    }
  `)
}
