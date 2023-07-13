import React from "react"
import * as styles from "./table-of-contents.module.scss"

import TOCLink from "./toc-link"
import ActiveIdChainContext from "./active-id-chain-context"
import { getIds, getIdPaths } from "./logic"
import useActiveId from "./use-active-id-hook"
import SidebarContext from "../layout/sidebar-context"

const ItemList = ({ item, level }) => {
  const activeIdChain = React.useContext(ActiveIdChainContext)
  const isActive = activeIdChain?.includes(item.url.slice(1))
  if (item.items == null || level === 6) {
    const result = <TOCLink item={item} isActive={isActive} ended />
    return level === 1 ? result : <li>{result}</li>
  }
  return (
    <details className={styles.tocDetails} open={isActive}>
      <summary className={isActive ? styles.active : null}>
        <TOCLink item={item} isActive={isActive} />
      </summary>
      <ul>
        {item?.items?.map(it => (
          <ItemList key={it.url} item={it} level={level + 1} />
        ))}
      </ul>
    </details>
  )
}

const TableOfContents = ({ toc }) => {
  const ids = getIds(toc, 0)
  const activeId = useActiveId(ids)
  const idPaths = getIdPaths(toc)
  const { toggleSidebar } = React.useContext(SidebarContext)
  if (toc == null) return null
  return (
    <div className={styles.toc}>
      <details className={styles.tocTopLevel} open>
        {/* The sidebar can be toggled via the space key if it has focus. jsx-a11y */}
        {/* eslint-disable-next-line */}
        <summary
          className={`menu-label ${styles.tocTitle}`}
          onClick={toggleSidebar}
        >
          <h2>Table of Contents</h2>
        </summary>
        <ul>
          <ActiveIdChainContext.Provider value={idPaths[activeId]}>
            {toc.map(item => (
              <li key={item.url}>
                <ItemList item={item} level={1} />
              </li>
            ))}
          </ActiveIdChainContext.Provider>
        </ul>
      </details>
    </div>
  )
}

export default TableOfContents
