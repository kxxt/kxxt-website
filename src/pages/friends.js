import React from "react"

import FriendCard from "@/components/friend-card"
import Layout from "@/components/layout/layout"
import Seo from "@/components/seo"

const FriendPage = ({ data, location }) => {
  const title = "Friends"
  return (
    <Layout location={location} title={title}>
      <Seo title={title} />
      <h1 className="title">{title}</h1>
    </Layout>
  )
}

export default FriendPage
