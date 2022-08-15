import Layout from "@/components/layout"
import Seo from "@/components/seo"
import Tags from "@/components/tags"

const TagsPage = ({ location }) => {
  const title = "Tags"
  // TODO: get Tags
  const tags = []
  return (
    <Layout location={location} title={title}>
      <Seo title={title} />
      <h1 className="title">All Tags</h1>
      <Tags tags={tags} withCount={true} />
    </Layout>
  )
}

export default TagsPage
