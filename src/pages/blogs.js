import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogSummaryList from "../components/blog-summary/blog-summary-list"

const BlogsPage = ({ location }) => {
  // TODO: get POSTS
  const posts = []
  const title = "Blogs"

  return (
    <Layout location={location} title={title}>
      <Seo title={title} />
      <h1 className="title">{title}</h1>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export default BlogsPage