import React from "react"
import Link from "next/link"

const NavbarLinkButton = ({ children, to }) => (
  <Link href={to} className="navbar-item">
    <a>{children}</a>
  </Link>
)

export default NavbarLinkButton
