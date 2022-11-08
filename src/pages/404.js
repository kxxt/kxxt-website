import * as React from "react"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import Seo from "@/components/seo"

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <Seo title="404: Not Found" />
      <h1 className="title">404: Not Found</h1>
      <p className="content">
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
