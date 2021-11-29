import React from "react"
import { Link } from "gatsby"

const Tags = ({ tags }) => {
  return (
    <div className="tags">
      {tags.map(tag => (
        <Link
          key={tag}
          to={`/tags/${tag}/`}
          className="tag is-primary"
          itemProp="keywords"
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default Tags