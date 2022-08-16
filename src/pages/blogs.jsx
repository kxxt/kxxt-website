import Layout from "@/components/layout"
import Seo from "@/components/seo"
import BlogSummaryList from "@/components/blog-summary/blog-summary-list"
import { preprocessAllMetaData } from "@/utils/blog/get-metadata"

const BlogsPage = ({ posts }) => {
  const title = "Blogs"
  return (
    <Layout title={title}>
      <Seo title={title} />
      <h1 className="title">{title}</h1>
      <BlogSummaryList posts={posts} />
    </Layout>
  )
}

export default BlogsPage

export async function getStaticProps() {
  const posts = await preprocessAllMetaData()

  return {
    props: {
      posts,
    },
  }
}
