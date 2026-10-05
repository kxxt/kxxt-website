import assert from "node:assert/strict"
import { mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import test from "node:test"
import { buildSchema } from "graphql"
import { writeTypeScriptTypes } from "gatsby/dist/utils/graphql-typegen/ts-codegen.js"
import config from "../gatsby-config.mts"

test("Gatsby generates hook query types before and after Vercel wraps the hooks", async () => {
  const typegen = config.graphqlTypegen
  assert.ok(typegen && typeof typegen === "object")
  assert.ok(typegen.documentSearchPaths)

  const directory = await mkdtemp(path.join(tmpdir(), "kxxt-vercel-typegen-"))
  const hooks = path.join(directory, "gatsby-node.ts")
  const output = path.join(directory, "gatsby-types.d.ts")
  const schema = buildSchema("type Query { siteTitle: String }")
  const options = {
    generateOnBuild: true,
    typesOutputPath: "gatsby-types.d.ts",
    documentSearchPaths: typegen.documentSearchPaths.map(pattern =>
      path.join(directory, pattern),
    ),
  }

  const checkTypes = async () => {
    await writeTypeScriptTypes(directory, schema, new Map(), options)
    const declarations = await readFile(output, "utf8")
    assert.match(declarations, /type CreateBlogPagesQuery =/)
    assert.match(declarations, /type CreateNotePagesQuery =/)
  }

  try {
    await writeFile(
      hooks,
      `export const createPages = async ({ graphql }) => {
        await graphql(\`query CreateBlogPages { __typename }\`)
        await graphql(\`query CreateNotePages { __typename }\`)
      }
      `,
    )
    await checkTypes()

    await rename(hooks, `${hooks}.__vercel_builder_backup__.ts`)
    await writeFile(
      hooks,
      `import * as vercelBuilder from '@vercel/gatsby-plugin-vercel-builder/gatsby-node.js'
      export * from './gatsby-node.ts.__vercel_builder_backup__.ts'
      export const onPostBuild = vercelBuilder.onPostBuild
      `,
    )
    await checkTypes()
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
