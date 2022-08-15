import Layout from "../components/layout"
import Seo from "../components/seo"
import {siteTitle} from "./data"

export default function NotFoundPage({ location }) {

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}
