import React from "react"
import * as styles from "./table-of-contents.module.scss"

const TOCLink = ({ item }) => (
  <a href={item.url}>{item.title}</a>
)

const ItemList = ({ item, level }) => {
  if (item.items == null || level === 6) {
    return (
      <li><TOCLink item={item} /></li>
    )
  }
  return (
    <details>
      <summary>
        <TOCLink item={item} />
      </summary>
      <ul>
        {item?.items?.map(it => (
          <ItemList item={it} level={level + 1} />
        ))}
      </ul>
    </details>
  )
}

const TableOfContents = ({ toc }) => {
  if (toc == null) return null
  return (
    <div>
      <details open>
        <summary className="menu-label">
          <h2>Table of Contents</h2>
        </summary>
        <ul>
          {toc.map(item => (
            <li key={item.url}><ItemList item={item} level={1} /></li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export default TableOfContents