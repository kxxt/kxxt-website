import React from "react"
import IconLink from "../icon-link"
import { faCircleDot } from "@fortawesome/free-solid-svg-icons"

export default function Issue({ number, open, repo, full, half }) {
  return (
    <IconLink
      icon={faCircleDot}
      href={`https://github.com/${repo}/issues/${number}`}
      color={open ? "#1a7f37" : "#8250df"}
    >{`${full ? repo : half ? repo.split("/")[1] : ""}#${number}`}</IconLink>
  )
}
