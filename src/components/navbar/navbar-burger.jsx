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
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
)

export default NavbarBurger
