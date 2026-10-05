import React from "react"
import * as styles from "./project-cards.module.scss"

export default function ProjectCards({ children }: React.PropsWithChildren) {
  return <div className={styles.cardList}>{children}</div>
}
