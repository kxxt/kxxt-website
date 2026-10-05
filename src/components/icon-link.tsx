import React from "react"
import IconText from "./icon-text"
import type { IconTextProps } from "./icon-text"

export interface IconLinkProps extends IconTextProps {
  href: string
}

const IconLink = ({ icon, children, href, color }: IconLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="clear">
      <IconText icon={icon} color={color}>
        {children}
      </IconText>
    </a>
  )
}

export default IconLink
