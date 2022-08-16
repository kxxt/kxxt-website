import path from "path"

export function getBlogPathSegments(dir, file) {
  return path.parse(file).name == "index"
    ? [dir]
    : [dir, file.replace(/\.[^/.]+$/, "")]
}

export function getBlogPath(dir, file) {
  return path.join(...getBlogPathSegments(dir, file))
}
