import * as React from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import { Helmet } from "react-helmet"

const Layout = ({ location, children, hero = null }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <>
      <Helmet>
        <body className="has-navbar-fixed-top-desktop" />
      </Helmet>
      <Navbar title="kxxt" />
      {hero}
      <div id="main-container" className="container" data-is-root-path={isRootPath}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
