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
          username="kxxt"
          socialLink="https://github.com/kxxt"
          description="暂时把我自己摆在这里，看看效果"
          link="/"
          icon={
            <StaticImage
              src="../images/profile-pic.png"
              alt="kxxt"
              width={48}
              height={48}
            />
          }
        />
      </div>
      <hr />
      <div>
        <h2 className="title is-4">友链申请</h2>
        <p className="content">
          您可以
          <a href="https://github.com/kxxt/kxxt-website/issues/new?assignees=kxxt&labels=link+exchange&template=exchange-website-link.md&title=%5BLink+Exchange%5D">
            在此网站的 GitHub 仓库发 Issue{" "}
          </a>
          来申请友链互换，如果我看你眼熟而且你的网站上有至少两篇高质量内容，我会同意你的友链申请。
        </p>
      </div>
    </Layout>
  )
}

export default FriendPage
