import Layout from "@/components/layout"
import Seo from "@/components/seo"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"

const TagPage = ({ tag, cnt }) => {
  const title = `Tag ${tag}`
  const posts = []
  return (
    <Layout title={title}>
      <Seo title={title} />
      <h1 className="title">Tag: {tag}</h1>
      <p className="subtitle is-5">
        Found {"TODO"} page
        {cnt > 1 ? "s" : ""} with tag &quot;{tag}
        &quot;
      </p>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export default TagPage
