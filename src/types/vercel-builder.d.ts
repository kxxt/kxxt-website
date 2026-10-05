// Vercel injects this CommonJS hook during deployment without TypeScript types.
declare module "@vercel/gatsby-plugin-vercel-builder/gatsby-node.js" {
  import type { BuildArgs, PluginOptions } from "gatsby"

  export function onPostBuild(
    args: BuildArgs,
    options?: PluginOptions,
  ): Promise<void>
}
