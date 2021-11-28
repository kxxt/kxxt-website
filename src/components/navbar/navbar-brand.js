import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"

const NavbarBrand = ({ children }) => {
  return (
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <StaticImage alt="kxxt logo" width={48} src="../../images/profile-pic.png" />
      </Link>
      {children}
    </div>
  )
}

export default NavbarBrand