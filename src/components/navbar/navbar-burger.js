import React from "react"

const NavbarBurger = ({ toggle }) => (
  <a href="#" role="button" onClick={toggle} data-target="navbar-menu" className="navbar-burger" aria-label="menu"
     aria-expanded="false">
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
)

export default NavbarBurger