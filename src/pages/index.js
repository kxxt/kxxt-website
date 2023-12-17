import * as React from "react"
import { graphql } from "gatsby"
import { useState } from "react"

import { Layout, HeadWithNavBarTop } from "@/components/layout"
import ReactTyped from "react-typed-component"
import { StaticImage } from "gatsby-plugin-image"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

import * as styles from "./index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFastForward } from "@fortawesome/free-solid-svg-icons"

export function Head() {
  return <HeadWithNavBarTop title="Home" />
}

const BlogIndex = ({ data, location }) => {
  let [typingSpeed, setTypingSpeed] = useState(70)
  const posts = data.allMdx.nodes
  const line1 = `Welcome to my <strong style="color: orangered;">personal website</strong>!<br/>`
  const line2 = `${line1}I'm a <strong style="color: cyan;">software developer</strong>.`
  const line3 = `${line2}<br/>I speak <em style="color: cornflowerblue;">English</em> and <em style="color: palevioletred;">Chinese</em>.`
  const langs = [
    // `<strong style="background: green;">C#</strong>`,
    `<strong style="background: dodgerblue;">Py</strong><strong style="background: gold;color: black;">thon</strong>`,
    `<strong style="background: yellow;color: black;">JavaScript</strong>`,
    `<strong style="background: #e84d22;color: white;">Rust</strong>`,
  ]
  const langsLines = langs.map(lang => `${line3}<br/>I use ${lang}.^1000`)
  const langsSummaryLine = `${line3}<br/>I use ${langs.join(", ")}.`
  const learnings = [
    // `<strong style="background: mediumpurple;">Haskell</strong>`,
    `<strong style="background: #e84d22;color: white;">Rust</strong>`,
    // `<strong style="background: purple;">F#</strong>`,
    `<strong style="color: goldenrod;">Computer Science</strong>`,
    `<strong style="color: deepskyblue;">React</strong> and <strong style="color: mediumspringgreen;">Vue</strong>`,
  ]
  const learningsLines = learnings.map(
    learning => `${langsSummaryLine}<br/>I'm learning ${learning}.^1000`,
  )
  const learningsSummaryLine = `${langsSummaryLine}<br/>I'm learning ${learnings.join(
    ", ",
  )}.`
  const softwareLine = `${learningsSummaryLine}<br/>Check out these cool projects of mine: <a href="https://github.com/kxxt/aspeak"><strong style="background: darkolivegreen;color: azure;text-decoration-line: underline;">aspeak</strong></a> and <a href="https://github.com/kxxt/tracexec"><strong style="background: darkturquoise;color: palegoldenrod;text-decoration-line: underline;">tracexec</strong></a>.`
  const websiteLine = `${learningsSummaryLine}<br/>I built this site with <strong style="color: mediumpurple;">Gatsby.js</strong> and <strong style="color: cyan;">Bulma.</strong>`
  const osLine = `${learningsSummaryLine}<br>Proudly using <span style="color: #26a0ef">Garuda Linux</span>, <span style="color: #63a4a9">Lineage OS</span> and <span style="color: #f75c2e">Firefox</span>.`
  const strings = [
    line1,
    line2,
    `${line1}I'm a senior from <strong>Shandong University</strong>.`,
    `${line1}I'm a student majoring in <span style="color: hotpink;">data science</span> and <span style="color: lightseagreen;">artificial intelligence.</span>`,
    `${line2}<br/>`,
    line3,
    ...langsLines,
    langsSummaryLine,
    ...learningsLines,
    learningsSummaryLine,
    softwareLine,
    websiteLine,
    osLine,
  ]
  const hero = (
    <section
      className={`${styles.indexHero} hero is-link is-fullheight-with-navbar`}
    >
      <div className="hero-body">
        <StaticImage
          alt="kxxt profile picture"
          width={128}
          src="../images/profile-photo-no-bg.png"
        />
        <p className="title">
          Hi, I&apos;m <strong>kxxt</strong>
        </p>
        <button className="button is-primary" onClick={() => setTypingSpeed(0)}>
          <FontAwesomeIcon icon={faFastForward} className="icon" size="xs" />
        </button>
        <p className="subtitle">
          <ReactTyped
            typeSpeed={typingSpeed}
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
        Photo by{" "}
        <a href="https://unsplash.com/@erikskof?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Erik Škof
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/t/experimental?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </div>
    </section>
  )

  return (
    <Layout location={location} hero={hero}>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($published: [Boolean!]!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {
        fields: { sourceInstanceName: { eq: "blog" } }
        frontmatter: { published: { in: $published } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        ...BlogSummaryFields
      }
    }
  }
`
