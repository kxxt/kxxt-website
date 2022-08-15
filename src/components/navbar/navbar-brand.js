import { Link } from "next/link"
import { Image } from "next/image"
import React from "react"

const NavbarBrand = ({ children }) => {
  return (
    <div className="navbar-brand">
      <Link className="navbar-item" href="/">
        <a>
          <Image
            alt="kxxt logo"
            width={48}
            src="../../images/profile-pic.png"
          />
        </a>
      </Link>
      {children}
    </div>
  )
}

export default NavbarBrand
