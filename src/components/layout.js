import * as React from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import { Helmet } from "react-helmet"
import * as styles from "./layout.module.scss"

const Layout = ({ location, children, hero = null, sidebar = null, bottom = null }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  return (
    <>
      <Helmet>
        <body className="has-navbar-fixed-top-desktop" />
      </Helmet>
      <Navbar title="kxxt" />
      {hero}
      <div id="main-container" className="container">
        <div className="columns" data-is-root-path={isRootPath}>
          <main className="column is-12-touch is-9-desktop">{children}</main>
          {sidebar &&
            <aside className={`column is-hidden-touch is-3 ${styles.sidebar}`}>{sidebar}</aside>
          }
        </div>
        {bottom}
      </div>
      <Footer />
    </>
  )
}

export default Layout
