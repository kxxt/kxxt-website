import React from "react"
import IconText from "./icon-text"

const IconLink = ({ icon, children, href, color = null }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="clear">
      <IconText icon={icon} color={color}>
        {children}
      </IconText>
    </a>
  )
}

export default IconLink
