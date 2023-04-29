/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const HeadWithDefaults = ({ description, lang, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
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
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <html lang={lang} />
      <title> {title ? `${title} | ${defaultTitle}` : defaultTitle} </title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summmary" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.author?.name || ``}
      />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

HeadWithDefaults.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

HeadWithDefaults.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default HeadWithDefaults
