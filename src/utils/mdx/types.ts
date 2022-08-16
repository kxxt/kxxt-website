// Adapted from gatsby-plugin-mdx/src/types.ts in PR gatsbyjs/gatsby#35650

import type { VFile, VFileData } from "vfile"

interface IMdxVFileDataMeta {
  [key: string]: unknown
}

interface IMdxVFileData extends VFileData {
  meta?: IMdxVFileDataMeta
}

export interface IMdxVFile extends VFile {
  data: IMdxVFileData
}

export interface IMdxMetadata {
  [key: string]: unknown
}
