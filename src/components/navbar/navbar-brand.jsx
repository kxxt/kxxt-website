import Link from "next/link"
import Image from "next/image"
import React from "react"
import profilePhoto from "@/images/profile-pic.png"

const NavbarBrand = ({ children }) => {
  return (
    <div className="navbar-brand">
      <Link className="navbar-item" href="/">
        <a>
          <Image alt="kxxt logo" width={48} height={48} src={profilePhoto} />
        </a>
      </Link>
      {children}
    </div>
  )
}

export default NavbarBrand
