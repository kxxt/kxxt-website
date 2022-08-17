import assert from "assert"
import { join } from "path"
import { promises as fs, existsSync } from "fs"
import matter from "gray-matter"
import readingTime from "reading-time"

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
import { getBlogPathSegments } from "@/utils/blog/path"
import { mdxOptions, allowedMdxFileExtensions } from "../../config"

import styles from "./[...path].module.scss"
import "katex/dist/katex.min.css"

const BlogPost = ({ source, frontMatter, meta }) => {
  const { previous, next } = {}
  const frontmatter = JSON.parse(frontMatter)
  const toc = meta.toc.items ? <TableOfContents toc={meta.toc.items} /> : null
  const resDir = "/content/blog/" + meta.dir
  const bottom = (
    <>
      <hr />
      <BlogBottomNav next={next} previous={previous} />
    </>
  )
  return (
    <Layout sidebar={toc} bottom={bottom}>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <article
        className="blog-post content"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className={styles.postHeader}>
          <h1 itemProp="headline">{frontmatter.title}</h1>
          <p>
            {formatDateAndTimeToRead(frontmatter.date, meta.timeToRead)} |{" "}
            <a href={resDir + "/" + meta.fileName}>MDX Source Code</a>
          </p>
          <Tags tags={frontmatter.tags} />
        </header>
        <MDXRemote
          {...source}
          components={{
            CH,
            Link,
            img: ({ src, alt, ...rest }) => {
              const path = resDir + "/" + src

              return (
                <div
                  style={{
                    width: "80%",
                    margin: "0 auto",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={alt}
                    src={path}
                    height={"100%"}
                    width={"100%"}
                    {...rest}
                  />
                </div>
              )
            },
          }}
        ></MDXRemote>
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

  let ext
  for (ext of allowedMdxFileExtensions) {
    if (existsSync(`${fileName}${ext}`, fs.constants.R_OK)) break
  }

  const source = await fs.readFile(`${fileName}${ext}`, "utf8")
  const { content, data } = matter(source)
  const {
    data: { meta },
    ...mdxSource
  } = await serialize(content, {
    mdxOptions,
    // scope: data,
  })
  return {
    props: {
      source: mdxSource,
      frontMatter: JSON.stringify(data),
      meta: {
        ...meta,
        timeToRead: readingTime(content).text,
        dir: path[0],
        fileName: path[1] + ext,
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = postFilePaths.map(([dir, file]) => ({
    params: {
      path: getBlogPathSegments(dir, file),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}
