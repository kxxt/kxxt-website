import Link from "next/link"
import Image from "next-image-export-optimizer"
import React from "react"
import profilePhoto from "@/images/profile-pic.png"

const NavbarBrand = ({ children }) => {
  return (
    <div className="navbar-brand">
      <Link href="/">
        <a className="navbar-item">
          <Image alt="kxxt logo" width={48} height={48} src={profilePhoto} />
        </a>
      </Link>
      {children}
    </div>
  )
}

export default NavbarBrand
