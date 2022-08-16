import React from "react"
import Navbar from "../navbar"
import Footer from "../footer"
import { useEffect } from "react"
import { useRouter } from "next/router"

import SidebarContext from "./sidebar-context"
import styles from "./layout.module.scss"

const Layout = ({
  children,
  Hero = () => {},
  sidebar = null,
  bottom = null,
}) => {
  useEffect(() => document.body.classList.add("has-navbar-fixed-top-desktop"))
  const router = useRouter()
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true)
  const isRootPath = router.pathname === "/"
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded)
  }
  return (
    <>
      <Navbar title="kxxt" />
      {Hero()}
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
