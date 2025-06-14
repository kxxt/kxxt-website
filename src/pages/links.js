import React from "react"

import { StaticImage } from "gatsby-plugin-image"

import FriendCard from "@/components/friend-card"
import { Layout, HeadWithNavBarTop } from "@/components/layout"
import { shuffle } from "lodash"

import * as styles from "./links.module.scss"

const IconTag = ({ size }) => {
  const sizeStr = `${size}x${size}`
  return (
    <a href={`/icons/icon-${sizeStr}.png`} className="tag is-light is-primary">
      {sizeStr}
    </a>
  )
}

export function Head() {
  return <HeadWithNavBarTop title="Links" />
}

const LinkPage = ({ location }) => {
  const cards = [
    <FriendCard
      name="宝硕"
      key="宝硕"
      subtitle="@renbaoshuo"
      socialLink="https://github.com/renbaoshuo"
      description="学习，就是发现自己越来越菜的过程。"
      link="https://blog.baoshuo.ren/?utm_source=friends"
      isCircle={true}
      icon={
        <StaticImage
          src="../images/links/baoshuo.webp"
          alt="baoshuo"
          width={48}
          height={48}
        />
      }
    />,
    <FriendCard
      name="Josh W. Comeau"
      key="Josh W. Comeau"
      subtitle="front-end developer"
      description="Check out his amazing blog posts about flexbox and more!"
      link="https://www.joshwcomeau.com/"
      isCircle={true}
      icon={
        <StaticImage
          src="../images/links/joshwcomeau.png"
          alt="avatar of Josh W. Comeau"
          width={48}
          height={48}
        />
      }
    />,
    <FriendCard
      name="The Overflow"
      key="The Overflow"
      description="Stack Overflow's Blog"
      link="https://stackoverflow.blog"
      isCircle={false}
      icon={
        <StaticImage
          src="../images/links/logo-stackoverflow.png"
          alt="The Overflow"
          width={48}
          height={52}
        />
      }
    />,
    <FriendCard
      name="lancern"
      key="lancern"
      subtitle="@lancern"
      socialLink="https://github.com/lancern"
      description="Programming life"
      link="https://lancern.xyz/"
      isCircle={false}
      icon={
        <StaticImage
          src="../images/links/lancern.jpg"
          alt="lancern"
          width={48}
          height={48}
        />
      }
    />,
    <FriendCard
      name="QuarticCat"
      key="QuarticCat"
      subtitle="@QuarticCat"
      socialLink="https://github.com/QuarticCat"
      description=""
      link="https://blog.quarticcat.com/"
      isCircle={false}
      icon={
        <StaticImage
          src="../images/links/QuarticCat.png"
          alt="QuarticCat"
          width={48}
          height={48}
        />
      }
    />,
    <FriendCard
      name="山楂片的博客"
      key="山楂片的博客"
      subtitle="@sunziping2016"
      socialLink="https://github.com/sunziping2016"
      description=""
      link="https://szp15.com/"
      isCircle={false}
      icon={
        <StaticImage
          src="../images/links/山楂片的博客.png"
          alt="山楂片的博客"
          width={48}
          height={48}
        />
      }
    />,
    <FriendCard
      name="RTXUX's Blog"
      key="rtxux"
      subtitle="@rtxux"
      socialLink="https://github.com/rtxux"
      description=""
      link="https://https://blog.rtxux.xyz/"
      isCircle={true}
      icon={
        <StaticImage
          src="../images/links/rtxux.jpg"
          alt="rtxux"
          width={48}
          height={48}
        />
      }
    />,
  ]
  return (
    <Layout location={location}>
      <h2 className="title">Excellent Blogs</h2>
      <p className="subtitle">
        The following blogs are displayed in random order and are not ranked.
      </p>
      <div className={`${styles.friendContainer} tile is-ancestor`}>
        {shuffle(cards)}
      </div>
      {/* <h2 className="title">Useful Documentations</h2> */}
      <hr />
      <div>
        <h2 className="title is-4">友链申请</h2>
        <p className="subtitle is-6">Link Exchange</p>
        <p className="content">
          您可以
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/kxxt/kxxt-website/issues/new?assignees=kxxt&labels=link+exchange&template=exchange-website-link.md&title=%5BLink+Exchange%5D"
          >
            在此网站的 GitHub 仓库发 Issue{" "}
          </a>
          来申请友链互换，如果我看你眼熟而且你的网站上有至少两篇高质量内容，我会同意你的友链申请。
          <br />
          我是社恐，可能在换友链方面不太主动，欢迎各位 dalao 来和我互换友链。
        </p>
        <h2 className="title is-4">我的友链信息</h2>
        <ul>
          <li>网站名称: kxxt 的小站</li>
          <li>我的昵称: kxxt</li>
          <li>
            一句话：
            一个没有分页功能的我时不时想起来（hopefully）就会写点东西的小破站
          </li>
          <li>
            网站图标:{" "}
            <div className="tags is-inline">
              {[48, 72, 96, 144, 192, 256, 384, 512].map(size => (
                <IconTag size={size} key={size} />
              ))}
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default LinkPage
