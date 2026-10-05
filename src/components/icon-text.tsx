import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as styles from "./icon-text.module.scss"
import type { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface IconTextProps {
  icon: IconProp
  children?: React.ReactNode
  color?: string
}

const IconText = ({ icon, children, color }: IconTextProps) => {
  return (
    <span className={`icon-text ${styles.iconText}`}>
      <FontAwesomeIcon color={color} className="icon" icon={icon} />
      <span>{children}</span>
    </span>
  )
}

export default IconText
