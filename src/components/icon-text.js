import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IconText = ({ icon, children }) => {
  return (
    <span className="icon-text">
      <FontAwesomeIcon className="icon" icon={icon} />
      <span>{children}</span>
    </span>
  )
}

export default IconText