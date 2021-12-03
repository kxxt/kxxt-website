const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require(`lodash`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
        {
            allMdx(
                sort: { fields: [frontmatter___date], order: ASC }
            ) {
                nodes {
                    id
                    slug
                }

                group(field: frontmatter___tags) {
                    tag: fieldValue
                    totalCount
                }

            }
        }
    `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error querying your blog posts`, result.errors)
    return
  }

  const posts = result.data.allMdx.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: `blog/${post.slug}`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId
        }
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
          tag, totalCount
        }
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`, node, value
    })
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
