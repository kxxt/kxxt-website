import React from "react"
import { StaticImage } from "gatsby-plugin-image"

export default function FriendCard({ icon, name, description }) {
  return (
    <div class="card">
      <StaticImage src="../images/friends/kxxt.png" />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  )
}
