import React from "react"
import { Link } from "gatsby"


const NavbarLinkButton = ({ children, to }) => (
  <Link to={to} className="navbar-item">
    {children}
  </Link>
)

export default NavbarLinkButton
