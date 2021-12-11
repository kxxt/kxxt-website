import React from "react"

import ActiveIdChainContext from "./active-id-chain-context"
import * as styles from "./toc-link.module.scss"

const TOCLink = ({ item }) => {
  const activeIdChain = React.useContext(ActiveIdChainContext)
  const id = item.url.slice(1)
  return <a className={activeIdChain?.includes(id) ? styles.tocItemActive : null}
            href={item.url}>{item.title}</a>
}


export default TOCLink