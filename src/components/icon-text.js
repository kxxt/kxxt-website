import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as styles from "./icon-text.module.scss"

const IconText = ({ icon, children, color = null }) => {
  return (
    <span className={`icon-text ${styles.iconText}`}>
      <FontAwesomeIcon color={color} className="icon" icon={icon} />
      <span>{children}</span>
    </span>
  )
}

export default IconText