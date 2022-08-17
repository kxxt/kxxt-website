import { promises as fs } from "fs"
import matter from "gray-matter"
import path from "path"
import { getBlogPath } from "./path"
import { postsDir, postFilePaths } from "./posts"
import { serializeMetaData } from "./metadata"
import readingTime from "reading-time"

const getMetaData = async ([dir, file], { content } = { content: false }) => {
  const source = await fs.readFile(path.join(postsDir, dir, file), "utf8")
  const {
    data: { date, ...others },
    content: markdown,
  } = matter(source)
  return {
    ...others,
    date: new Date(date),
    path: getBlogPath(dir, file),
    content: content ? markdown : undefined,
  }
}

const preprocessAllMetaData = async ({ timeToRead } = { timeToRead: true }) => {
  const promises = postFilePaths.map(x =>
    getMetaData(x, { content: timeToRead })
  )
  let posts = await Promise.all(promises)
  posts.sort((a, b) => b.date - a.date)
  if (timeToRead)
    posts = posts.map(({ content, ...others }) => ({
      ...others,
      timeToRead: readingTime(content).text,
    }))
  return posts.map(serializeMetaData)
}

export { getMetaData, preprocessAllMetaData }
