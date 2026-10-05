import React from "react"
import { Link } from "gatsby"
import * as styles from "./tags.module.scss"

interface TagProps {
  tag: string
  totalCount?: number
  fontSize?: React.CSSProperties["fontSize"]
}

const TagLink = ({ tag, totalCount = 0, fontSize }: TagProps) => {
  return (
    <Link
      to={`/tags/${tag}/`}
      className={`tag is-primary`}
      style={{ fontSize }}
      itemProp="keywords"
    >
      {totalCount ? `${tag} (${totalCount})` : tag}
    </Link>
  )
}

const Tag = ({
  tag,
  fontSize,
}: Omit<TagProps, "tag"> & { tag: React.ReactNode }) => {
  return (
    <span className={`tag is-primary`} style={{ fontSize }} itemProp="keywords">
      {tag}
    </span>
  )
}

interface TagsOptions {
  fontSize?: React.CSSProperties["fontSize"]
  inline?: boolean
  className?: string
}

type TagsProps = TagsOptions &
  (
    | {
        withCount: true
        withLink?: boolean
        tags?: readonly { tag: string | null; totalCount: number }[] | null
      }
    | {
        withCount?: false
        withLink: false
        tags?: readonly React.ReactNode[] | null
      }
    | {
        withCount?: false
        withLink?: true
        tags?: readonly string[] | null
      }
  )

const Tags = (props: TagsProps) => {
  const {
    fontSize = "14px",
    inline = false,
    withLink = true,
    className = "",
  } = props
  if (!props.tags) return null
  const Container = inline ? "span" : "div"
  const TagComponent = withLink ? TagLink : Tag
  return (
    <Container
      className={`tags ${className} ${inline ? styles.tagsInline : ""}`}
    >
      {props.withCount
        ? props.tags.map(({ tag, totalCount }) =>
            tag === null ? null : (
              <TagComponent
                key={tag}
                tag={tag}
                totalCount={totalCount}
                fontSize={fontSize}
              />
            ),
          )
        : props.withLink === false
          ? props.tags.map((tag, index) => (
              <Tag
                key={
                  typeof tag === "string" || typeof tag === "number"
                    ? tag
                    : index
                }
                tag={tag}
                fontSize={fontSize}
              />
            ))
          : props.tags.map(tag => (
              <TagLink key={tag} tag={tag} fontSize={fontSize} />
            ))}
    </Container>
  )
}

export default Tags
