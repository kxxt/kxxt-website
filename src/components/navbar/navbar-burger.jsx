import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurger } from "@fortawesome/free-solid-svg-icons"
import React from "react"

const NavbarBurger = ({ toggle }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    href="#"
    role="button"
    onClick={toggle}
    data-target="navbar-menu"
    className="navbar-burger"
    aria-label="menu"
    aria-expanded="false"
  >
    <FontAwesomeIcon icon={faBurger} />
  </a>
)

export default NavbarBurger
