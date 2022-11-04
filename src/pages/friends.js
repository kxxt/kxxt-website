import React from "react"

import { StaticImage } from "gatsby-plugin-image"

import FriendCard from "@/components/friend-card"
import Layout from "@/components/layout/layout"
import Seo from "@/components/seo"

import * as styles from "./friends.module.scss"

const FriendPage = ({ location }) => {
  const title = "Friends"
  return (
    <Layout location={location} title={title}>
      <Seo title={title} />
      <h1 className="title">{title}</h1>
      <div className={`${styles.friendContainer} tile is-ancestor`}>
        <FriendCard
          name="kxxt"
          github="kxxt"
          description="Undergraduate & Developer"
          link="/"
          icon={
            <StaticImage
              src="../images/friends/kxxt.png"
              alt="kxxt"
              width={48}
              height={48}
            />
          }
        />
      </div>
    </Layout>
  )
}

export default FriendPage
