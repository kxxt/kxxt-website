import Layout from "../../components/layout"
import Seo from "../../components/seo"
import BlogSummaryList from "../../components/blog-summary/blog-summary-list"

const TagPage = ({ data, location, pageContext }) => {
  const title = `Tag ${pageContext.tag}`
  const posts = data.allMdx.nodes
  return (
    <Layout location={location} title={title}>
      <Seo title={title} />
      <h1 className="title">Tag: {pageContext.tag}</h1>
      <p className="subtitle is-5">
        Found {pageContext.totalCount} page
        {pageContext.totalCount > 1 ? "s" : ""} with tag &quot;{pageContext.tag}
        &quot;
      </p>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export default TagPage
