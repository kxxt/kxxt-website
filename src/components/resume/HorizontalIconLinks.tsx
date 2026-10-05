import React from "react"
import IconLink from "@/components/icon-link"
import type { IconLinkProps } from "@/components/icon-link"

export default function HorizontalIconLinks({
  items,
}: {
  items: readonly IconLinkProps[]
}) {
  return (
    <div className="columns is-mobile is-centered">
      {items.map((item, index) => (
        <div className="column is-narrow" key={index}>
          <IconLink {...item} />
        </div>
      ))}
    </div>
  )
}
