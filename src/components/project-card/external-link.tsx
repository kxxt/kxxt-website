import React from "react"

export default function ExternalLink({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a {...props} target="_blank">
      {children}
    </a>
  )
}
