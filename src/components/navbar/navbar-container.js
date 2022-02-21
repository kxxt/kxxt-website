import React from "react"

const NavbarContainer = ({ children }) => (
  <nav
    className="navbar is-fixed-top-desktop has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    {children}
  </nav>
)

export default NavbarContainer
