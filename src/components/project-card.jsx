import React from "react"
import * as styles from "./project-card.module.scss"
import Tags from "./tags/tags"
import IconText from "./icon-text"

export default function ProjectCard({
  img,
  name,
  description,
  content,
  links,
  tags,
  datetime,
}) {
  return (
    <div className={`card ${styles.horizontal}`}>
      {img}
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
