import React from "react"
import { Link } from "gatsby"


const TagLink = ({ tag, totalCount = 0, fontSize }) => {
  return (
    <Link key={tag}
          to={`/tags/${tag}/`}
          className="tag is-primary"
          style={{ fontSize }}
          itemProp="keywords">
      {totalCount ? `${tag} (${totalCount})` : tag}
    </Link>
  )
}

const Tags = ({ tags, withCount = false, fontSize = "14px" }) => {

  return (
    <div className="tags">
      {
        withCount
          ? tags.map(({ tag, totalCount }) => (
            <TagLink key={tag} tag={tag} totalCount={totalCount} fontSize={fontSize} />
          ))
          : tags.map(tag => (
            <TagLink key={tag} tag={tag} fontSize={fontSize} />
          ))
      }
    </div>
  )
}

export default Tags