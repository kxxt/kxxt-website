import Layout from "@/components/layout"
import Seo from "@/components/seo"
import ArchiveItem from "@/components/archive/archive-item"
import { preprocessAllMetaData } from "@/utils/blog/get-metadata"
import { deserializeMetaData } from "@/utils/blog/metadata"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const ArchivePage = ({ posts }) => {
  const title = "Archive"
  let currentYear = null,
    currentMonth = null,
    list = []
  posts = posts.map(deserializeMetaData)
  for (let post of posts) {
    let date = new Date(post.date)
    const year = date.getFullYear(),
      month = date.getMonth()
    if (currentYear !== year) {
      currentYear = year
      currentMonth = null
      list.push(<h2 key={year}>{year}</h2>)
    }
    if (currentMonth !== month) {
      currentMonth = month
      list.push(<h3 key={`${year}-${month}`}>{months[month - 1]}</h3>)
    }
    list.push(<ArchiveItem post={post} date={date} key={post.path} />)
  }
  return (
    <Layout title={title}>
      <Seo title={title} />
      <h1 className="title">{title}</h1>
      <p className="subtitle is-6">
        This is the archive page. You can find all the posts here.
      </p>
      <div className="content">{list}</div>
    </Layout>
  )
}

export default ArchivePage

export async function getStaticProps() {
  const posts = await preprocessAllMetaData()
  return {
    props: {
      posts,
    },
  }
}
