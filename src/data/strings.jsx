import React from "react"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import IconLink from "@/components/icon-link"
import HorizontalIconLinks from "@/components/resume/HorizontalIconLinks"

const ExternalLink = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

const labels = {
  label_website: {
    zh: "个人网站",
    en: "Personal Website",
  },
  label_email: {
    zh: "邮箱",
    en: "Email",
  },
  label_about_me: {
    zh: "关于我(英文)",
    en: "About Me",
  },
  label_phone: {
    zh: "电话",
    en: "Phone",
  },
  label_education: {
    zh: "教育经历",
    en: "Education",
  },
  label_intern: {
    zh: "实习经历",
    en: "Internship",
  },
  label_competitions: {
    zh: "比赛经历",
    en: "Competitions",
  },
  label_skills: {
    zh: "技能",
    en: "Skills",
  },
  label_personal_projects: {
    zh: "个人项目",
    en: "Personal Projects",
  },
  label_course_projects: {
    zh: "课程大作业",
    en: "Course Projects",
  },
  label_other_experiences: {
    zh: "其他经历",
    en: "Other Experiences",
  },
  label_major: {
    zh: "$0 专业",
    en: "Majoring in $0",
  },
}
const education = {
  edu_sduwh: {
    zh: "山东大学(威海校区)",
    en: "Shandong University(WeiHai Campus)",
  },
  edu_major: {
    zh: "统计学(数据科学与人工智能)",
    en: "Statistics(Data Science and Artificial Intelligence)",
  },
  edu_status: {
    zh: "本科在读(大三)",
    en: "Undergraduate(Junior)",
  },
  edu_time: {
    zh: "2020.10 至今",
    en: "Oct. 2020 - Present",
  },
  edu_gpa: null,
}
const intern = {
  intern_archrv_time: {
    zh: "2023.3 至今",
    en: "Mar. 2023 - Present",
  },
  intern_archrv_job: {
    zh: "RISC-V Arch Linux 打包实习生",
    en: "RISC-V Arch Linux Packaging Intern",
  },
  intern_archrv_company: {
    zh: "中科院软件所 PLCT 实验室",
    en: "PLCT Lab, Institute of Software, Chinese Academy of Sciences",
  },
}
const competitions = {
  comp_rank: {
    zh: "排名",
    en: "Rank",
  },
  comp_writeup: {
    zh: "我的 Writeup",
    en: "My Writeup",
  },
  comp_welcome_to_read: {
    zh: "欢迎阅读",
    en: "Welcome to read ",
  },
}
const tags = {
  tag_ctf: {
    zh: "CTF 比赛",
    en: "CTF",
  },
}
const skills = {
  skill_programming_languages: {
    zh: "常用编程语言",
    en: "Commonly Used Programming Languages",
  },
  skill_other_programming_languages: {
    zh: "不太常用/会一部分的编程语言",
    en: "Other Programming Languages",
  },
  skill_apps: {
    zh: "软件",
    en: "Software",
  },
  skill_others: {
    zh: "其他",
    en: "Others",
  },
}
const personal_projects = {
  aspeak_desc: {
    zh: "2022 年 5 月至今. 一个 Azure 语音合成服务的 CLI. 最初我采用 Python 编写了它, 直接调用微软的 SDK 包. 最近我已经用 Rust 重写了它, 现在它直接使用 Websockets 与 Azure 的服务进行通信, 不再依赖微软的 SDK.",
    en: "May. 2022 - Present. It is a CLI for Azure speech synthesis service originally written in Python. I have rewritten it in Rust to use WebSockets directly so it no longer relies on the SDK from Microsoft.",
  },
  category_manager_desc: {
    zh: (
      <>
        2022 年 9 月 -- 2023 年 2 月. 在{" "}
        <ExternalLink href="https://github.com/jobisoft">
          John Bieling
        </ExternalLink>{" "}
        和其他用户的赞助下, 我为 ThunderBird 102 之后的版本重写了这个扩展.
        该扩展的主要功能是管理联系人的分类,
        让用户能够一次给一个分类包含的所有人发送邮件.
      </>
    ),
    en: (
      <>
        Sept. 2022 -- Feb. 2023. Sponsored by the extension's author{" "}
        <ExternalLink href="https://github.com/jobisoft">
          John Bieling
        </ExternalLink>{" "}
        and users, I rewrote this extension for ThunderBird 102 and later. The
        main function of this extension is to manage the categories of contacts,
        allowing users to send emails to all people included in a category at
        once.
      </>
    ),
  },
  personal_website_desc: {
    zh: (
      <>
        2021 年 11 月至今. 我使用{" "}
        <ExternalLink href="https://www.gatsbyjs.com/">Gatsby.js</ExternalLink>
        框架搭建了我的个人网站, 网站的内容使用{" "}
        <ExternalLink href="https://mdxjs.com/">MDX</ExternalLink> 编写. 代码在
        <IconLink
          icon={faGithub}
          color="black"
          href="https://github.com/kxxt/kxxt-website"
        >
          GitHub
        </IconLink>
        上开源. 这份简历其实也是使用 MDX 编写, 然后在浏览器中打印为 PDF 的.
        如果您想进一步了解我, 欢迎查看
        <ExternalLink href="https://www.kxxt.dev/about/">
          我的关于页面(英文)
        </ExternalLink>
        .
      </>
    ),
    en: (
      <>
        Nov. 2021 - present. I built my personal website using the{" "}
        <ExternalLink href="https://www.gatsbyjs.com/">Gatsby.js</ExternalLink>{" "}
        framework and <ExternalLink href="https://mdxjs.com/">MDX</ExternalLink>
        . The code is open source on{"  "}
        <IconLink
          icon={faGithub}
          color="black"
          href="https://github.com/kxxt/kxxt-website"
        >
          GitHub
        </IconLink>
        . This resume is also written in MDX and printed as a PDF in the
        browser. If you want to know more about me, please check{" "}
        <ExternalLink href="https://www.kxxt.dev/about/">
          my about page
        </ExternalLink>
        .
      </>
    ),
  },
  obsidian_advanced_paste_desc: {
    zh: (
      <>
        开坑于 2023 年 1 月. 我使用{" "}
        <ExternalLink href="https://obsidian.md/">Obsidian</ExternalLink>
        作为自己的知识管理软件, 为了解决我在向 Obsidian
        中粘贴内容时遇到的一些问题, 我编写了这个插件.
        这个插件内置了几个常用的粘帖命令并允许用户编写脚本来处理粘贴的内容.
      </>
    ),
    en: (
      <>
        Started in January 2023. I use the{" "}
        <ExternalLink href="https://obsidian.md/">Obsidian</ExternalLink> as my
        second brain, and to solve some problems I encountered when pasting
        content into Obsidian, I developed this plugin. This plugin includes
        several commonly used paste commands and allows users to write scripts
        to transform the pasted content.
      </>
    ),
  },
}
const locales = {
  ...labels,
  ...education,
  ...intern,
  ...competitions,
  ...tags,
  ...skills,
  ...personal_projects,
  getText(locale, key) {
    if (this[key] && this[key][locale]) {
      return this[key][locale]
    }
    return key
  },
}
export { locales }
