import fs from "fs"
import path from "path"
import { allowedMdxFileExtensions } from "../../config"

export const postsDir = path.join(process.cwd(), "public", "content", "blog")
export const postFilePaths = fs
  .readdirSync(postsDir, { withFileTypes: true })
  .filter(obj => obj.isDirectory())
  .flatMap(({ name }) =>
    fs.readdirSync(path.join(postsDir, name)).map(file => [name, file])
  )
  .filter(([, file]) => allowedMdxFileExtensions.includes(path.extname(file)))
