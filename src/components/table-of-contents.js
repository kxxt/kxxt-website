import React from "react"
import * as styles from "./table-of-contents.module.scss"

const TOCLink = ({ item, isActive }) => (
  <a className={isActive ? styles.tocItemActive : null} href={item.url}>{item.title}</a>
)

const ItemList = ({ item, level, activeIds }) => {
  const isActive = Boolean(activeIds[item.url.slice(1)])
  console.log(item.url, activeIds[item.url.slice(1)], activeIds)
  if (item.items == null || level === 6) {
    return (
      <li><TOCLink item={item} isActive={isActive} /></li>
    )
  }
  return (
    <details>
      <summary>
        <TOCLink item={item} isActive={isActive} />
      </summary>
      <ul>
        {item?.items?.map(it => (
          <ItemList item={it} level={level + 1} activeIds={activeIds} />
        ))}
      </ul>
    </details>
  )
}

const getIds = (items, level) => {
  return items.reduce(
    (acc, item) => {
      if (item.url) {
        // url has a # as first character, remove it to get the raw CSS-id
        acc.push({ id: item.url.slice(1), level })
      }
      if (item.items) acc.push(...getIds(item.items, level + 1))
      return acc
    },
    []
  )
}

const useActiveIds = items => {
  const [activeIds, setActiveIds] = React.useState(Object.fromEntries(items.map(item => [item.url, false])))
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setActiveIds({})
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIds(prev => ({
              [entry.target.id]: true,
              ...prev
            }))
          } else {
            setActiveIds(prev => ({
              [entry.target.id]: false,
              ...prev
            }))
          }
        })
        // console.log(activeIds)
      },
      {rootMargin: '52px 0px 0px 0px'}
    )
    console.log("START")
    items.forEach((item) => {
      //console.log(item)
      observer.observe(document.getElementById(item.id))
    })
    console.log("END")
    return () => {
      items.forEach((item) => {
        observer.unobserve(document.getElementById(item.id))
      })
    }
  }, [])
  return activeIds
}

const TableOfContentsInner = React.memo(({ toc, activeIds }) => {
  if (toc == null) return null
  console.log("Render inner")
  return (
    <div>
      <details open>
        <summary className="menu-label">
          <h2>Table of Contents</h2>
        </summary>
        <ul>
          {toc.map(item => (
            <li key={item.url}><ItemList item={item} level={1} activeIds={activeIds} /></li>
          ))}
        </ul>
      </details>
    </div>
  )
})

const TableOfContents = ({ toc }) => {
  const ids = getIds(toc, 1)
  console.log(ids)
  const activeIds = useActiveIds(ids)
  console.log("Render TOC")
  if (toc == null) return null
  return (
    <TableOfContentsInner toc={toc} activeIds={activeIds} />
  )
}

export default TableOfContents