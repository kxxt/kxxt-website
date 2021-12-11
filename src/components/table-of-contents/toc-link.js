import React from "react"

import * as styles from "./toc-link.module.scss"

const TOCLink = ({ item, isActive, ended }) => {
  const active = isActive ? styles.active : null
  return <a className={`${styles.link} ${ended ? styles.ended : styles.notEnded} ${active}`}
            href={item.url}>{item.title}</a>
}


export default TOCLink