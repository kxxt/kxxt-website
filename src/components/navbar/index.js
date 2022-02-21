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
import {
  faArchive,
  faAt,
  faBlog,
  faHome,
  faTags,
} from "@fortawesome/free-solid-svg-icons"

const Navbar = ({ centerLinks, title }) => {
  const [isActive, setIsActive] = useState(false)
  const toggleActive = () => setIsActive(!isActive)
  return (
    <NavbarContainer>
      <NavbarBrand>
        <NavbarTitle title={title} />
        <NavbarMobileMenu toggle={toggleActive} links={centerLinks} />
      </NavbarBrand>

      <div
        className={"navbar-menu " + (isActive ? "is-active" : "")}
        id="navbar-menu"
      >
        <NavbarStart>
          <NavbarLinkButton to="/">
            <IconText icon={faHome} color="lightseagreen">
              Home
            </IconText>
          </NavbarLinkButton>
          <NavbarLinkButton to="/blogs">
            <IconText icon={faBlog} color="hotpink">
              Blogs
            </IconText>
          </NavbarLinkButton>
          <NavbarLinkButton to="/archive">
            <IconText icon={faArchive} color="brown">
              Archive
            </IconText>
          </NavbarLinkButton>
          <NavbarLinkButton to="/tags">
            <IconText icon={faTags} color="dodgerblue">
              Tags
            </IconText>
          </NavbarLinkButton>
          <a href="#contact" className="navbar-item">
            <IconText icon={faAt} color="gold">
              Contact
            </IconText>
          </a>
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
