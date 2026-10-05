import * as React from "react"
import Navbar from "../navbar"
import Footer from "../footer"

import SidebarContext from "./sidebar-context"
import * as styles from "./layout.module.scss"
import HeadWithDefaults from "../head"
import type { HeadWithDefaultsProps } from "../head"

export interface LayoutProps {
  location: { pathname: string }
  children?: React.ReactNode
  hero?: React.ReactNode
  sidebar?: React.ReactNode
  bottom?: React.ReactNode
}

const HeadWithNavBarTop = ({ children, ...props }: HeadWithDefaultsProps) => {
  return (
    <HeadWithDefaults {...props}>
      <body className="has-navbar-fixed-top-desktop" />
      {children}
    </HeadWithDefaults>
  )
}

const Layout = ({
  location,
  children,
  hero = null,
  sidebar = null,
  bottom = null,
}: LayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true)
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const toggleSidebar = () => {
    setIsSidebarExpanded(expanded => !expanded)
  }
  return (
    <>
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

export { HeadWithNavBarTop, Layout }
