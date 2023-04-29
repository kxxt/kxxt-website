import * as React from "react"
import Navbar from "../navbar"
import Footer from "../footer"

import SidebarContext from "./sidebar-context"
import * as styles from "./layout.module.scss"

const Layout = ({
  location,
  children,
  hero = null,
  sidebar = null,
  bottom = null,
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true)
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded)
  }
  return (
    <>
      <body className="has-navbar-fixed-top-desktop" />
      <Navbar title="kxxt" />
      {hero}
      <div id="main-container" className="container">
        <div className="columns" data-is-root-path={isRootPath}>
          <main
            className={`column is-12-touch ${
              sidebar && isSidebarExpanded ? "is-9-desktop" : "is-12-desktop"
            }`}
          >
            {children}
          </main>
          {sidebar && (
            <SidebarContext.Provider
              value={{
                isSidebarExpanded: isSidebarExpanded,
                toggleSidebar,
              }}
            >
              <aside
                className={`column is-hidden-touch ${
                  isSidebarExpanded ? "is-3" : "is-narrow"
                } ${styles.sidebar}`}
              >
                {sidebar}
              </aside>
            </SidebarContext.Provider>
          )}
        </div>
        {bottom}
      </div>
      <Footer />
    </>
  )
}

export default Layout
