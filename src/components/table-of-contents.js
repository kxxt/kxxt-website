import React from "react"


const TOCLink = ({ item }) => (
  <a href={item.url}>{item.title}</a>
)

const ItemList = ({ item, level }) => {
  if (item.items == null || level === 6) {
    return (
      <TOCLink item={item} />
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
    <div className="table-of-contents">
      <details>
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