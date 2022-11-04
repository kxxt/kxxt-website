import React from "react"
import * as styles from "./friend-card.module.scss"

export default function FriendCard({
  icon,
  name,
  description,
  className,
  github,
  link,
}) {
  return (
    <div className={`card ${styles.card} ${className}`}>
      <div className={`card-content`}>
        {/* Gatsby doesn't allow me to forward src to StaticImage. 
            But I don't want to use a dynamic image here either. 
            So this is a workaround: let the caller pass a StaticImage to us.*/}
        <div className={`media ${styles.media}`}>
          <a href={link}>
            <div className="media-left">
              <figure className="image is-48x48">{icon}</figure>
            </div>
          </a>
          <div className="media-content">
            <p className={`title is-4 ${styles.name}`}>
              <a href={link}>{name}</a>
            </p>
            <p className="subtitle is-6">
              {github && <a href={`https://github.com/${github}`}>@{github}</a>}
            </p>
          </div>
        </div>
        <div className="content">{description}</div>
      </div>
    </div>
  )
}
