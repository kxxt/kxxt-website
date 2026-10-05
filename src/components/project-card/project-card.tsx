import React from "react"
import * as styles from "./project-card.module.scss"
import Tags from "@/components/tags/tags"
import IconText from "@/components/icon-text"
import ModalImage from "react-modal-image"
import type { IconTextProps } from "../icon-text"

interface ProjectCardProps {
  img: string
  alt: string
  name: string
  description: string
  content: React.ReactNode
  links?: readonly (Omit<IconTextProps, "children"> & {
    link: string
    text: React.ReactNode
  })[]
  tags: readonly string[]
  datetime?: string
}

export default function ProjectCard({
  img,
  alt,
  name,
  description,
  content,
  links,
  tags,
  datetime,
}: ProjectCardProps) {
  return (
    <div className={`card ${styles.horizontal}`}>
      <ModalImage small={img} large={img} alt={alt} hideDownload={true} />
      <div className={styles.cardStacked}>
        <div className="card-content">
          <p className="title is-4">{name}</p>
          <p className="subtitle is-6">{description}</p>
          {datetime && <p className="is-italic">{datetime}</p>}
          <Tags tags={tags} withLink={false} />
          <div className="content">{content}</div>
        </div>
        <footer className="card-footer">
          {links &&
            links.map(({ link, text, ...props }, index) => (
              <a key={index} className="card-footer-item clear" href={link}>
                <IconText {...props}>{text}</IconText>
              </a>
            ))}
        </footer>
      </div>
    </div>
  )
}
