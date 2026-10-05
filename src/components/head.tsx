/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

export interface HeadWithDefaultsProps {
  description?: string | null
  lang?: string
  title: string
  children?: React.ReactNode
}

const HeadWithDefaults = ({
  description = "",
  lang = "en",
  title,
  children,
}: HeadWithDefaultsProps) => {
  const { site } = useStaticQuery<Queries.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          author {
            name
          }
        }
      }
    }
  `)

  const metaDescription = description || site?.siteMetadata?.description || ""
  const defaultTitle = site?.siteMetadata?.title || "kxxt"

  return (
    <>
      <html lang={lang} />
      <title children={title ? `${title} | ${defaultTitle}` : defaultTitle} />
      <meta property="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summmary" />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:creator"
        content={site?.siteMetadata?.author?.name || ``}
      />
      <meta property="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default HeadWithDefaults
