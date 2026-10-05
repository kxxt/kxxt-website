import path from "node:path"
import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import readingTime from "reading-time"
import { onlySelectPublishedArticlesInProd } from "./src/data/conditional"

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve("src/components"),
        "@/templates": path.resolve("src/templates"),
        "@/utils": path.resolve("src/utils"),
        "@/data": path.resolve("src/data"),
        "@/pages": path.resolve("src/pages"),
        "@/imgs": path.resolve("src/images"),
      },
    },
  })
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage, createRedirect } = actions

  createRedirect({ fromPath: "/friends", toPath: "/links", isPermanent: true })
  // Get all markdown blog posts sorted by date
  const blog = await graphql<Queries.CreateBlogPagesQuery>(`
    query CreateBlogPages {
      allMdx(
        filter: {
          fields: { sourceInstanceName: { eq: "blog" } }
          ${onlySelectPublishedArticlesInProd}
        }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            body
            id
            fields {
              slug
              absolutePath
            }
            frontmatter {
              title
              published
            }
          }
        }
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (blog.errors || !blog.data) {
    reporter.panicOnBuild(
      `There was an error querying your blog posts`,
      blog.errors,
    )
    return
  }

  const posts = blog.data.allMdx.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.mts)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach(({ node: post }, index) => {
      const nextPostId = posts[index - 1]?.node.id ?? null
      const previousPostId = posts[index + 1]?.node.id ?? null

      createPage({
        path: `blog${post.fields.slug}`,
        component: `${path.resolve(
          "./src/templates/blog-post.tsx",
        )}?__contentFilePath=${post.fields.absolutePath}`,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const tags = blog.data.allMdx.group
  if (tags.length > 0) {
    tags.forEach(({ tag, totalCount }) => {
      if (tag === null) return
      createPage({
        path: `/tags/${tag}/`,
        component: path.resolve(`./src/templates/tag-page.tsx`),
        context: {
          tag,
          totalCount,
        },
      })
    })
  }

  // Get all markdown notes sorted by date
  const noteData = await graphql<Queries.CreateNotePagesQuery>(`
    query CreateNotePages {
      allMdx(
        filter: { fields: { sourceInstanceName: { eq: "notes" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            body
            id
            fields {
              slug
              absolutePath
            }
            frontmatter {
              title
            }
          }
        }
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (noteData.errors || !noteData.data) {
    reporter.panicOnBuild(
      `There was an error querying your notes`,
      noteData.errors,
    )
    return
  }

  const notes = noteData.data.allMdx.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/notes" (defined in gatsby-config.mts)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (notes.length > 0) {
    notes.forEach(({ node: note }, index) => {
      const nextNoteId = notes[index - 1]?.node.id ?? null
      const previousNoteId = notes[index + 1]?.node.id ?? null

      createPage({
        path: `notes${note.fields.slug}`,
        component: `${path.resolve(
          "./src/templates/blog-post.tsx",
        )}?__contentFilePath=${note.fields.absolutePath}`,
        context: {
          id: note.id,
          previousPostId: previousNoteId,
          nextPostId: nextNoteId,
        },
      })
    })
  }
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
  reporter,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    // && node.fileAbsolutePath.indexOf('/pages/') !== -1) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    const parent = node.parent ? getNode(node.parent) : undefined
    if (
      !parent ||
      typeof parent.sourceInstanceName !== "string" ||
      typeof parent.absolutePath !== "string"
    ) {
      reporter.panicOnBuild(`MDX node ${node.id} has no source file`)
      return
    }
    const { sourceInstanceName, absolutePath } = parent

    createNodeField({
      node,
      name: "absolutePath",
      value: absolutePath,
    })

    createNodeField({
      node,
      name: "sourceInstanceName",
      value: sourceInstanceName,
    })

    if (sourceInstanceName === "blog" && typeof node.body === "string") {
      createNodeField({
        node,
        name: `timeToRead`,
        value: Math.ceil(readingTime(node.body).minutes),
      })
    }
  }
}

const pagesToAddContext = new Set([`/`, `/blogs/`, `/archive/`, `/tags/`])

export const onCreatePage: GatsbyNode["onCreatePage"] = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (pagesToAddContext.has(page.path)) {
    deletePage(page)

    createPage({
      ...page,
      context: {
        ...page.context,
        published:
          process.env.NODE_ENV !== "production" ? [true, false] : [true],
      },
    })
  }
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.mts

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
      absolutePath: String!
      timeToRead: Int
      sourceInstanceName: String!
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
