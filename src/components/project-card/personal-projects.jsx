import {
  faGithub,
  faGithubAlt,
  faPython,
  faRust,
} from "@fortawesome/free-brands-svg-icons"
import {
  faBox,
  faHome,
  faLink,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons"
import React from "react"
import ProjectCard from "./project-card"
import ProjectCards from "./project-cards"
import aspeakImg from "@/imgs/projects/aspeak.png"
import catManImg from "@/imgs/projects/category-manager.jpg"
import chatGPTActionImg from "@/imgs/projects/chatgpt-action.png"
import advancedPasteImg from "@/imgs/projects/advanced-paste.png"
import websiteImg from "@/imgs/projects/website.png"
import wslDiskShrinkerImg from "@/imgs/projects/wsl-disk-shrinker.png"
import slidevTemplateImg from "@/imgs/projects/slidev-template.png"
import TransparentLink from "./transparent-link"

export default function PersonalProjects() {
  return (
    <ProjectCards>
      <ProjectCard
        img={aspeakImg}
        alt="aspeak help text"
        name="aspeak"
        description="A simple text-to-speech client for Azure TTS API."
        content={
          <>
            <p>
              The{" "}
              <a href="https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/">
                Azure Text-to-Speech demo
              </a>{" "}
              shows how powerful Azure TTS API is and it was once very popular
              on the web. A lot of people invented their own ways(e.g. User
              Scripts) to utilize the demo page to download the synthesized
              audio.
            </p>
            <p>
              aspeak was created to make it easier to use Azure TTS API in the
              command-line. It was originally written in Python, but I have
              rewritten it in Rust to practice my Rust skills.
            </p>
          </>
        }
        tags={["tts", "azure", "rust", "cli", "python"]}
        links={[
          {
            link: "https://github.com/kxxt/aspeak",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://docs.rs/aspeak",
            text: "Docs.rs",
            icon: faRust,
            color: "brown",
          },
          {
            link: "https://crates.io/crates/aspeak",
            text: "Crates.io",
            icon: faRust,
            color: "orange",
          },
          {
            link: "https://pypi.org/project/aspeak/",
            text: "PyPI",
            icon: faPython,
            color: "dodgerblue",
          },
        ]}
        datetime="From May 1, 2022, still maintained"
      />
      <ProjectCard
        img={catManImg}
        alt="Category Manager"
        name="Category Manager"
        description="A thunderbird extension to manage categories of your contacts."
        content={
          <>
            <p>
              At first, I made some pull requests to{" "}
              <a href="https://github.com/jobisoft/EAS-4-TbSync">
                EAS-4-TbSync
              </a>{" "}
              and{" "}
              <a href="https://github.com/jobisoft/TbSync/tree/TB102">TbSync</a>{" "}
              to fix the calendar sync issue caused by incompatibility with
              Thunderbird 102.
            </p>
            <p>
              Later, the author of the two add-ons,{" "}
              <a href="https://github.com/jobisoft">John Bieling</a>, sponsored
              me to rewrite his Category Manager add-on for Thunderbird 102.
            </p>
            <p>
              By rewriting the add-on, I learned a lot about Thunderbird add-on
              development and the web extension API.
            </p>
          </>
        }
        tags={["thunderbird", "add-on", "javascript", "webextension"]}
        links={[
          {
            link: "https://github.com/jobisoft/CategoryManager",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://addons.thunderbird.net/en-US/thunderbird/addon/categorymanager/",
            text: "Add-on Page",
            icon: faPuzzlePiece,
            color: "skyblue",
          },
        ]}
        datetime="From Sep 26, 2022, still maintained"
      />
      <ProjectCard
        img={chatGPTActionImg}
        alt="An example"
        name="chatgpt-action"
        description="Let ChatGPT review PRs for you."
        content={
          <>
            <p>
              When ChatGPT went viral, I was inspired to create a GitHub Action
              that uses ChatGPT to automatically review PRs.
            </p>
            <p>
              At that time, I don't know how to author a GitHub Action. So I
              read the documentation roughly and wrote a GitHub Action that just
              works. Code quality is not a focus for this project. I just wanted
              to create a prototype to see if ChatGPT can be used to review PRs.
              And to my surprise, it works to some extent!
            </p>
            Here are some demos:
            <ul>
              <li>
                <TransparentLink href="https://github.com/kxxt/chatgpt-action/pull/12" />
              </li>
              <li>
                <TransparentLink href="https://github.com/kxxt/chatgpt-action/pull/10" />
              </li>
              <li>
                <TransparentLink href="https://github.com/kxxt/chatgpt-action/pull/9" />
              </li>
              <li>
                <TransparentLink href="https://github.com/kxxt/chatgpt-action/pull/20" />
              </li>
              <li>
                <TransparentLink href="https://github.com/kxxt/chatgpt-action/pull/22" />
              </li>
            </ul>
          </>
        }
        tags={["code-review", "ai", "github-action", "javascript", "chatgpt"]}
        links={[
          {
            link: "https://github.com/kxxt/chatgpt-action",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://github.com/marketplace/actions/chatgpt-integration",
            text: "Marketplace",
            icon: faGithubAlt,
            color: "green",
          },
        ]}
        datetime="From Dec 7, 2022 to Dec 13, 2022, Unmaintained."
      />
      <ProjectCard
        img={advancedPasteImg}
        alt="Command palette showing the commands of Advanced Paste Plugin for Obsidian"
        name="Advanced Paste Plugin for Obsidian"
        description="This plugin provides advanced paste commands and enables you to create custom transforms for pasting."
        content={
          <>
            <p>
              I use Obsidian as my second brain. I have a lot of notes in
              Obsidian. I often copy and paste text from other applications to
              Obsidian. And I found that pasting from PDF is a pain and pasting
              from web pages often result in excessive blank lines. So I created
              this plugin to solve these problems and enable the users to create
              their own custom transforms for pasting.
            </p>
          </>
        }
        tags={["obsidian", "plugin", "typescript", "javascript"]}
        links={[
          {
            link: "https://github.com/kxxt/obsidian-advanced-paste",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
        ]}
        datetime="From Jan 16, 2023, still maintained"
      />
      <ProjectCard
        img={websiteImg}
        alt="A screenshot of my personal website"
        name="My Personal Website"
        description="The website you are visiting right now."
        content={
          <>
            <p>
              When I take my personal website seriously, I decided to use Gatsby
              to rebuild it because I love the principles of Gatsby.
            </p>
            <p>
              MDX is an amazing technology that allows me to write blog posts in
              Markdown and embed custom React components in the posts. The page
              you are visiting right now is also written in MDX and the card you
              are looking at is a React component.
            </p>
            <p>
              {" "}
              I also use Bulma as the CSS framework because I love the feel and
              look of it.
            </p>
          </>
        }
        tags={["gatsby.js", "react", "sass", "mdx", "bulma"]}
        links={[
          {
            link: "https://github.com/kxxt/kxxt-website",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://www.kxxt.dev/",
            text: "Home",
            icon: faHome,
            color: "green",
          },
        ]}
        datetime="From Nov 28, 2021, actively maintained"
      />
      <ProjectCard
        img={wslDiskShrinkerImg}
        alt="A screenshot of WSL Disk Shrinker"
        name="WSL Disk Shrinker"
        description="Reduce WSL disk usage. "
        content={
          <p>
            When I use WSL, I found that the disk usage of WSL is always
            growing. Inspired by{" "}
            <a href="https://stephenreescarter.net/how-to-shrink-a-wsl2-virtual-disk/">
              this blog post
            </a>
            , I created this GUI tool to help me shrink the disk usage of WSL.
          </p>
        }
        tags={["C#", "WPF", "WSL", "windows"]}
        links={[
          {
            link: "https://github.com/kxxt/WSLDiskShrinker",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://community.chocolatey.org/packages/wsldiskshrinker",
            text: "Chocolatey",
            icon: faBox,
            color: "brown",
          },
        ]}
        datetime="From May 24, 2021, finished"
      />
      <ProjectCard
        img={slidevTemplateImg}
        alt="A screenshot of the directory listing and a slide."
        name="Slidev Template Repo"
        description="A template repo for slidev slides with automatic GitHub Pages deployment and directory listing generation."
        content={
          <>
            <p>
              <a href="https://sli.dev">Slidev</a> is a great tool for creating
              slides in Markdown and Vue. I usually use it as a replacement for
              PowerPoint.
            </p>
            <p>
              I created this template repo to make it easier to deploy multiple
              slidev slides to their respective sub-routes on GitHub Pages.
            </p>
            <p>
              By the way, this template repo also generates a nice directory
              listing for GitHub Pages.
            </p>
          </>
        }
        tags={["slidev", "template-repo", "github-actions"]}
        links={[
          {
            link: "https://github.com/kxxt/slidev-template-repo",
            text: "GitHub",
            icon: faGithub,
            color: "black",
          },
          {
            link: "https://kxxt.github.io/slidev-template-repo/",
            text: "Example",
            icon: faLink,
            color: "pink",
          },
        ]}
        datetime="From Feb 27, 2023, still maintained"
      />
    </ProjectCards>
  )
}
