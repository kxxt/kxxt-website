import React from "react"

export default function TransparentLink({ href, ...props }) {
  return (
    <a href={href} {...props}>
      {href}
    </a>
  )
}
