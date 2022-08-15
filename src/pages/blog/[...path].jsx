import assert from "assert"
import path, { join } from "path"
import fs from "fs"
import matter from "gray-matter"

import Link from "next/link"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Giscus from "@giscus/react"
import { CH } from "@code-hike/mdx/components"

import Layout from "@/components/layout"
import Seo from "@/components/seo"
import Tags from "@/components/tags"
import BlogBottomNav from "@/components/blog-bottom-nav"
// import TableOfContents from "@/components/table-of-contents"

import formatDateAndTimeToRead from "@/utils/date-and-time-to-read"
import { postsDir, postFilePaths } from "../../utils/blog/posts"
import { mdxOptions, allowedMdxFileExtensions } from "../../config"

import * as styles from "./[...path].module.scss"
import "katex/dist/katex.min.css"

// const shortcodes = { Link } // Provide common components here

const BlogPost = ({ location, source, frontmatter }) => {
  const { previous, next } = {}
  const toc = null
  // const toc = post.tableOfContents.items ? (
  //   <TableOfContents toc={post.tableOfContents.items} />
  // ) : null
  const bottom = (
    <>
      <hr />
      <BlogBottomNav next={next} previous={previous} />
    </>
  )
  return (
    <Layout location={location} sidebar={toc} bottom={bottom}>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <article
        className="blog-post content"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className={styles.postHeader}>
          <h1 itemProp="headline">{frontmatter.title}</h1>
          <p>
            {
              formatDateAndTimeToRead(
                frontmatter.date,
                "Unknown"
              ) /* TODO: Time to read */
            }
          </p>
          <Tags tags={frontmatter.tags} />
        </header>
        <MDXRemote {...source} components={{ CH, Link }}></MDXRemote>
      </article>
      <Giscus
        repo="kxxt/kxxt-website"
        repoId="R_kgDOGcqT_g"
        category="Thread"
        categoryId="DIC_kwDOGcqT_s4COe_7"
        mapping="og:title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </Layout>
  )
}

export default BlogPost

export async function getStaticProps({ params }) {
  const { path } = params
  assert(path.length <= 2)
  let fileName
  if (path.length == 1) path.push("index")
  fileName = join(postsDir, ...path)

  let fullName
  for (const ext of allowedMdxFileExtensions) {
    fullName = `${fileName}${ext}`
    if (fs.existsSync(fullName)) break
  }

  const source = fs.readFileSync(fullName)
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, {
    mdxOptions,
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontmatter: data,
    },
  }
}

export async function getStaticPaths() {
  const paths = postFilePaths.map(([dir, file]) => ({
    params: {
      path:
        path.parse(file).name == "index"
          ? [dir]
          : [dir, file.replace(/\.[^/.]+$/, "")],
    },
  }))
  return {
    paths,
    fallback: false,
  }
}
