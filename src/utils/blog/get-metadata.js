import { promises as fs } from "fs"
import matter from "gray-matter"
import path from "path"
import { getBlogPath } from "./path"
import { postsDir, postFilePaths } from "./posts"
import { serializeMetaData } from "./metadata"

const getMetaData = async ([dir, file]) => {
  const content = await fs.readFile(path.join(postsDir, dir, file), "utf8")
  const {
    data: { date, ...others },
  } = matter(content)
  return {
    ...others,
    date: new Date(date),
    path: getBlogPath(dir, file),
  }
}

const preprocessAllMetaData = async () => {
  const promises = postFilePaths.map(getMetaData)
  let posts = await Promise.all(promises)
  posts.sort((a, b) => b.date - a.date)
  return posts.map(serializeMetaData)
}

export { getMetaData, preprocessAllMetaData }
