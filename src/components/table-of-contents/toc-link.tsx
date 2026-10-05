import React from "react"

import * as styles from "./toc-link.module.scss"
import type { TableOfContentsItem } from "./logic"

const TOCLink = ({
  item,
  isActive,
  ended,
}: {
  item: TableOfContentsItem
  isActive: boolean
  ended?: boolean
}) => {
  const active = isActive ? styles.active : ""
  return (
    <a
      className={`${styles.link} ${ended ? styles.ended : ""} ${active}`}
      href={item.url}
    >
      {item.title}
    </a>
  )
}

export default TOCLink
