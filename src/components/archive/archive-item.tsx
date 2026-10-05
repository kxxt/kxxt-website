import React from "react"
import { Link } from "gatsby"
import Tags from "../tags/tags"
import * as styles from "./archive-item.module.scss"

type ArchivePost = NonNullable<
  Queries.ArchivePageQuery["allFile"]["nodes"][number]["childMdx"]
>

const ArchiveItem = ({ post, date }: { post: ArchivePost; date: Date }) => (
  <div>
    <h4 className={styles.title}>
      <span className={styles.date}>
        {date.toLocaleDateString("en-us", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </span>
      <Link to={`/blog${post.fields.slug}`}>{post.frontmatter?.title}</Link>
    </h4>
    <p>
      Tags: <Tags tags={post.frontmatter?.tags} fontSize="12px" inline={true} />
    </p>
  </div>
)

export default ArchiveItem
