import React from "react"
import { Link } from "gatsby"
import * as styles from "./tags.module.scss"

const TagLink = ({ tag, totalCount = 0, fontSize }) => {
  return (
    <Link
      key={tag}
      to={`/tags/${tag}/`}
      className={`tag ${styles.tag}`}
      style={{ fontSize }}
      itemProp="keywords"
    >
      {totalCount ? `${tag} (${totalCount})` : tag}
    </Link>
  )
}

const Tag = ({ tag, fontSize }) => {
  return (
    <span
      key={tag}
      className={`tag ${styles.tag}`}
      style={{ fontSize }}
      itemProp="keywords"
    >
      {tag}
    </span>
  )
}

const Tags = ({
  tags,
  withCount = false,
  fontSize = "14px",
  inline = false,
  withLink = true,
}) => {
  if (!tags) return null
  const Container = ({ children, ...props }) =>
    inline ? (
      <span {...props}>{children}</span>
    ) : (
      <div {...props}>{children}</div>
    )
  const TagComponent = withLink ? TagLink : Tag
  return (
    <Container className={`tags ${inline ? styles.tagsInline : ""}`}>
      {withCount
        ? tags.map(({ tag, totalCount }) => (
            <TagComponent
              key={tag}
              tag={tag}
              totalCount={totalCount}
              fontSize={fontSize}
            />
          ))
        : tags.map(tag => (
            <TagComponent key={tag} tag={tag} fontSize={fontSize} />
          ))}
    </Container>
  )
}

export default Tags
