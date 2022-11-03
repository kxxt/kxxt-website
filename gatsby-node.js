const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require(`lodash`)
const readingTime = require(`reading-time`)
const {
  onlySelectPublishedArticlesInProd,
} = require(`./src/data/conditional.js`)

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
      },
    },
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }${onlySelectPublishedArticlesInProd}) {
        edges {
          node {
            body
            id
            fields {
              slug
            }
            frontmatter {
              title
              published
            }
            parent {
              ... on File {
                absolutePath
              }
            }
          }
        }

        group(field: frontmatter___tags) {
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

  let posts = result.data.allMdx.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const nextPostId = index === 0 ? null : posts[index - 1].node.id
      const previousPostId =
        index === posts.length - 1 ? null : posts[index + 1].node.id

      createPage({
        path: `blog${post.node.fields.slug}`,
        component: `${path.resolve(
          "./src/templates/blog-post.js"
        )}?__contentFilePath=${post.node.parent.absolutePath}`,
        context: {
          id: post.node.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const tags = result.data.allMdx.group
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
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
const pagesToAddContext = [`/`, `/blogs/`, `/archive/`, `/tags/`]
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const newPage = Object.assign({}, page)

  if (pagesToAddContext.includes(page.path)) {
    deletePage(page)

    newPage.context = {
      published: process.env.NODE_ENV !== "production" ? [true, false] : [true],
    }

    createPage(newPage)
  }
}

exports.createSchemaCustomization = ({ actions }) => {
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
      slug: String
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
  `)
}
