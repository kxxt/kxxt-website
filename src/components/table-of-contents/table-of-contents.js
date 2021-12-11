import React from "react"
import * as styles from "./table-of-contents.module.scss"

import TOCLink from "./toc-link"
import ActiveIdChainContext from "./active-id-chain-context"
import { getIds, getIdPaths } from "./logic"
import useActiveId from "./use-active-id-hook"

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
  const ids = getIds(toc, 0)
  const activeId = useActiveId(ids)
  const idPaths = getIdPaths(toc)
  console.log(idPaths)
  if (toc == null) return null
  return (
    <div>
      <details open={true}>
        <summary className={`menu-label ${styles.title}`}>
          <h2>Table of Contents</h2>
        </summary>
        <ul>
          <ActiveIdChainContext.Provider value={idPaths[activeId]}>
            {toc.map(item => (
              <li key={item.url}><ItemList item={item} level={1} /></li>
            ))}
          </ActiveIdChainContext.Provider>
        </ul>
      </details>
    </div>
  )
}

export default TableOfContents