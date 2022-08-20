import Layout from "@/components/layout"
import Seo from "@/components/seo"
import data from "../data"

export default function NotFoundPage() {
  return (
    <Layout title={data.title}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}
