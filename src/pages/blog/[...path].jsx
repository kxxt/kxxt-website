import assert from "assert"
import path, { join } from "path"
import { promises as fs, existsSync } from "fs"
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
import TableOfContents from "@/components/table-of-contents"

import formatDateAndTimeToRead from "@/utils/date-and-time-to-read"
import { postsDir, postFilePaths } from "@/utils/blog/posts"
import processor from "@/utils/mdx/parse"
import { mdxOptions, allowedMdxFileExtensions } from "../../config"

import styles from "./[...path].module.scss"
import "katex/dist/katex.min.css"

const BlogPost = ({ location, source, frontMatter, meta }) => {
  const { previous, next } = {}
  const frontmatter = JSON.parse(frontMatter)
  const toc = meta.toc.items ? <TableOfContents toc={meta.toc.items} /> : null
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
    if (existsSync(fullName, fs.constants.R_OK)) break
  }

  const source = await fs.readFile(fullName)
  const { content, data } = matter(source)
  // TODO: remove double compilation of MDX
  await processor.process(content)
  const mdxSource = await serialize(content, {
    mdxOptions,
    // scope: data,
  })
  const meta = processor.data("mdxMetadata")
  return {
    props: {
      source: mdxSource,
      frontMatter: JSON.stringify(data),
      meta,
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
