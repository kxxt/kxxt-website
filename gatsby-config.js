const { remarkCodeHike } = require("@code-hike/mdx")
const theme = require("shiki/themes/solarized-light.json")

const path = require("path")
const {
  onlySelectPublishedArticlesInProd,
} = require("./src/data/conditional.js")

const wrapESMPlugin = name =>
  function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name)
      const plugin = mod.default(opts)
      return plugin(...args)
    }
  }

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
    "gatsby-plugin-sass",

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
        mdxOptions: {
          remarkPlugins: [
            require("remark-gfm"),
            require("remark-math"),
            [
              remarkCodeHike,
              {
                theme,
                lineNumbers: false,
                showCopyButton: true,
                skipLanguages: ["mermaid", "dot"],
              },
            ],
            // require("remark-abbr"),
            wrapESMPlugin("remark-emoji"),
            wrapESMPlugin("remark-unwrap-images"),
            require("remark-directive"),
            require("./src/utils/remark-mkdocs-material-admonition.js"),
          ],
          rehypePlugins: [
            wrapESMPlugin("rehype-katex"),
            require("rehype-slug"),
            [
              require("rehype-autolink-headings"),
              {
                behavior: "append",
                properties: {
                  className: "header-anchor",
                  ariaHidden: true,
                  tabIndex: -1,
                },
              },
            ],
          ],
        },
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
          // `gatsby-remark-check-links`,
          "gatsby-remark-smartypants",
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-images`,
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
    // `gatsby-plugin-mdx-embed`,
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
                  url: `${site.siteMetadata.siteUrl}/blog${node.fields.slug}`,
                  guid: node.slug,
                  // TODO: Add back rss content
                  custom_elements: [
                    {
                      "content:encoded": `${site.siteMetadata.siteUrl}/blog${node.fields.slug}`,
                    },
                  ],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  ${onlySelectPublishedArticlesInProd}
                ) {
                  nodes {
                    excerpt
                    fields {
                      slug
                    }
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
  ],
}
