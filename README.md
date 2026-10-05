# kxxt-website

My personal website powered by gatsby, hosted on vercel.

## :computer: Tech Stack

- Gatsby
- TypeScript
- Bulma
- MDX
- SCSS

## Development

Use Node.js 22 (see `.nvmrc`) and Yarn 4.

```sh
yarn install --immutable
yarn develop
```

Application code, Gatsby configuration, and build hooks use strict TypeScript.
`gatsby-config.mjs` loads the typed ESM configuration in `gatsby-config.mts`
through `tsx`, preserving compatibility with ESM-only Markdown plugins.
Gatsby generates `src/gatsby-types.d.ts` from the GraphQL schema and named
queries during development and production builds. Keep this generated file in
version control so type checking also works immediately after a fresh checkout.
Run Gatsby after changing queries and commit the regenerated declarations.

```sh
yarn typecheck
yarn test
yarn build
```

`yarn build` also checks types after generating the production site. For limited
resources, use `yarn build:limited` to use one Gatsby worker and one Parcel
worker, process queries, images, and downloads serially, limit native thread
pools, and cap each Node.js heap at 3 GiB.
