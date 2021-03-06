const esmRequire = require("./esm-require")

const path = require("path")

// Get paths of Gatsby's required rules, which as of writing is located at:
// https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/
// gatsby/src/utils/eslint-rules
const gatsbyRequiredRules = path.join(
  process.cwd(),
  "node_modules",
  "gatsby",
  "dist",
  "utils",
  "eslint-rules"
)

module.exports = {
  siteMetadata: {
    title: `kxxt`,
    author: {
      name: `kxxt`,
      summary: `A student studying Data Science and Artificial Intelligence. Major Language: C# and Python. My personal chinese TG channel: https://t.me/kxxtchannel`,
    },
    description: `kxxt's personal website`,
    siteUrl: `https://www.kxxt.dev`,
  },
  plugins: [
    // {
    //   resolve: "gatsby-plugin-exclude",
    //   options: { paths: ["/content/**"] }
    // },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [
          require("remark-math"),
          require("remark-abbr"),
          esmRequire("remark-emoji").default,
        ],
        rehypePlugins: [esmRequire("rehype-katex").default],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-mermaid`,
            options: {
              mermaidOptions: {
                // Fix mermaid and bulma css conflicts.
                // .label styles in bulma will override .label styles in mermaid
                themeCSS:
                  ".label { font-size: inherit!important; font-weight: inherit!important; line-height: initial!important; }",
              },
            },
          },
          `gatsby-remark-graphviz`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-check-links`,
          "gatsby-remark-smartypants",
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-images`,
          {
            resolve: `gatsby-remark-embed-snippet`,
            options: {},
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              showLineNumbers: true,
              aliases: { sh: "bash" },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-page-creator`,
    //   options: {
    //     path: `${__dirname}/content/blog`
    //   }
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-mdx-embed`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-FLBVN7RJJQ", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
                  guid: node.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    slug
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "kxxt's blog",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
        createLinkInHead: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `kxxt`,
        short_name: `kxxt`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/profile-pic.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        // Gatsby required rules directory
        rulePaths: [gatsbyRequiredRules],
        // Default settings that may be omitted or customized
        stages: ["develop"],
        extensions: ["js", "jsx", "ts", "tsx"],
        exclude: ["node_modules", "bower_components", ".cache", "public"],
        // Any additional eslint-webpack-plugin options below
        // ...
      },
    },
  ],
}
