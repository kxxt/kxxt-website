import React from "react"
import Link from "next/link"

const NavbarLinkButton = ({ children, to }) => (
  <Link href={to}>
    <a className="navbar-item">{children}</a>
  </Link>
)

export default NavbarLinkButton
