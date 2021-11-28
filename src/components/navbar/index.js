import React, { useState } from "react"
import NavbarLinkButton from "./navbar-link-button"
import NavbarTitle from "./navbar-title"
import NavbarStart from "./navbar-start"
import NavbarContainer from "./navbar-container"
import NavbarEnd from "./navbar-end"
import NavbarMobileMenu from "./navbar-burger"
import NavbarBrand from "./navbar-brand"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import IconText from "../icon-text"

const Navbar = ({ centerLinks, title }) => {
  const [isActive, setIsActive] = useState(false)
  const toggleActive = () => setIsActive(!isActive)
  return (
    <NavbarContainer>
      <NavbarBrand>
        <NavbarTitle title={title} />
        <NavbarMobileMenu toggle={toggleActive} links={centerLinks} />
      </NavbarBrand>

      <div className={"navbar-menu " + (isActive ? "is-active" : "")} id="navbar-menu">
        <NavbarStart>
          <NavbarLinkButton to="home">Home</NavbarLinkButton>
        </NavbarStart>
        <NavbarEnd>
          <a className="navbar-item" href="https://github.com/kxxt">
            <IconText icon={faGithub}>GitHub</IconText>
          </a>
        </NavbarEnd>
      </div>
    </NavbarContainer>
  )
}

export default Navbar
