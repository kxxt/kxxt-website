import React from "react"
import * as styles from "./A4.module.scss"

export default function A4({ children }) {
  return (
    <div className={styles.page}>
      <div className={`${styles.subpage} content`}>{children}</div>
    </div>
  )
}
