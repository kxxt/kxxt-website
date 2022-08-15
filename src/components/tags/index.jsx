import Link from "next/link"
import styles from "./tags.module.scss"

const TagLink = ({ tag, totalCount = 0, fontSize }) => {
  return (
    <Link
      key={tag}
      href={`/tags/${tag}/`}
      className={`tag ${styles.tag}`}
      style={{ fontSize }}
      itemProp="keywords"
    >
      <a>{totalCount ? `${tag} (${totalCount})` : tag}</a>
    </Link>
  )
}

const Tags = ({
  tags,
  withCount = false,
  fontSize = "14px",
  inline = false,
}) => {
  if (!tags) return null
  return (
    <div className={`tags ${inline ? styles.tagsInline : ""}`}>
      {withCount
        ? tags.map(({ tag, totalCount }) => (
            <TagLink
              key={tag}
              tag={tag}
              totalCount={totalCount}
              fontSize={fontSize}
            />
          ))
        : tags.map(tag => <TagLink key={tag} tag={tag} fontSize={fontSize} />)}
    </div>
  )
}

export default Tags
