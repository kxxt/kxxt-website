import { promises as fs } from "fs"
import matter from "gray-matter"
import path from "path"
import { getBlogPath } from "./path"
import { postsDir } from "./posts"

const getMetaData = async ([dir, file]) => {
  const content = await fs.readFile(path.join(postsDir, dir, file), "utf8")
  const {
    data: { date, ...others },
  } = matter(content)
  return {
    date: String(date),
    ...others,
    path: getBlogPath(dir, file),
  }
}

export default getMetaData
