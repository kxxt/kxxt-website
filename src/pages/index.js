import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ReactTyped from "react-typed"
import { StaticImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const line1 = `Welcome to my <strong style="color: orangered;">personal website</strong>!<br/>`
  const line2 = `${line1}I'm a <strong style="color: cyan;">software developer</strong>.`
  const line3 = `${line2}<br/>I speak <em style="color: cornflowerblue;">English</em> and <em style="color: palevioletred;">Chinese</em>.`
  const langs = [
    `<strong style="background: green;">C#</strong>`,
    `<strong style="background: dodgerblue;">Py</strong><strong style="background: gold;color: black;">thon</strong>`,
    `<strong style="background: purple;">F#</strong>`,
    `<strong style="background: yellow;color: black;">JavaScript</strong>`
  ]
  const langsLines = langs.map(lang => `${line3}<br/>I use ${lang}.^1000`)
  const langsSummaryLine = `${line3}<br/>I use ${langs.join(", ")}.`
  const learnings = [
    `<strong style="background: mediumpurple;">Haskell</strong>`,
    `<strong style="background: saddlebrown;">Rust</strong>`,
    `<strong style="background: purple;">F#</strong>`,
    `<strong style="color: goldenrod;">Computer Science</strong>`,
    `<strong style="color: deepskyblue;">React</strong> and <strong style="color: mediumspringgreen;">Vue</strong>`
  ]
  const learningsLines = learnings.map(learning => `${langsSummaryLine}<br/>I'm learning ${learning}.^1000`)
  const learningsSummaryLine = `${langsSummaryLine}<br/>I'm learning ${learnings.join(", ")}.`
  const softwareLine = `${learningsSummaryLine}<br/>I'm the creator and maintainer of <a href="https://github.com/kxxt/WSLDiskShrinker"><strong style="background: darkturquoise;color: palegoldenrod;text-decoration-line: underline;">WSL Disk Shrinker</strong></a>.`
  const strings = [
    line1,
    line2,
    `${line1}I'm a sophomore from <strong>Shandong University</strong>.`,
    `${line1}I'm a student majoring in <span style="color: hotpink;">data science</span> and <span style="color: lightseagreen;">artificial intelligence.</span>`,
    `${line2}<br/>`,
    line3,
    ...langsLines,
    langsSummaryLine,
    ...learningsLines,
    learningsSummaryLine,
    softwareLine
  ]
  const hero = (
    <section id="index-hero" className="hero is-link is-fullheight-with-navbar">
      <div className="hero-body">
        <StaticImage alt="kxxt profile picture" width={128} src="../images/profile-pic.png" />
        <p className="title">
          Hi, I'm <strong>kxxt</strong>
        </p>
        <p className="subtitle">
          <ReactTyped
            // style={{ fontSize: "1.35rem", lineHeight: "1.8rem", textAlign: "center" }}
            // typedRef={typedRef()}
            // loop
            typeSpeed={70}
            className="subtitle"
            backSpeed={40}
            strings={strings}
            smartBackspace
            shuffle={false}
            backDelay={1}
            fadeOut={false}
            fadeOutDelay={100}
            loopCount={0}
            showCursor
            cursorChar="|"
          />
        </p>

      </div>
      <div className="hero-foot">
        Photo by <a
        href="https://unsplash.com/@erikskof?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Erik
        Škof</a> on <a
        href="https://unsplash.com/t/experimental?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      </div>
    </section>
  )

  return (
    <Layout location={location} title={siteTitle} hero={hero}>
      <Seo title="All posts" />

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    description
                }
            }
        }
    }
`
