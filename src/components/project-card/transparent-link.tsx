import React from "react"

export default function TransparentLink({
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <a href={href} {...props}>
      {href}
    </a>
  )
}
