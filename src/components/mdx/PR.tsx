import React from "react"
import IconLink from "../icon-link"
import { faCodePullRequest } from "@fortawesome/free-solid-svg-icons"
import type { IssueProps } from "./Issue"

export default function PR({
  number,
  open,
  repo,
  full,
  half,
  title,
}: IssueProps & { title?: string }) {
  return (
    <IconLink
      icon={faCodePullRequest}
      href={`https://github.com/${repo}/pull/${number}`}
      color={open ? "#1a7f37" : "#8250df"}
    >
      {`${full ? repo : half ? repo.split("/")[1] : ""}#${number}`}
      {title ? ` ${title}` : null}
    </IconLink>
  )
}
