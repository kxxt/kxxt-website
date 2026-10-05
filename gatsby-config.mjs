// Gatsby's TypeScript config compiler emits CommonJS; MDX plugins need native ESM.
import { tsImport } from "tsx/esm/api"

export default (await tsImport("./gatsby-config.mts", import.meta.url)).default
