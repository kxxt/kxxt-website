import React from "react"
import { faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons"
import { faAt } from "@fortawesome/free-solid-svg-icons"
import IconText from "../icon-text"
import * as styles from "./footer.module.scss"

const Footer = () => {
  return (
    <footer className={`footer ${styles.pageFooter}`}>
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <h4 className="subtitle">About</h4>
            &copy; {new Date().getFullYear()} kxxt
            <br />

            This is kxxt's personal website.
            <br />
            <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><img
              alt="Creative Commons License" style={{ borderWidth: 0, marginTop: "1rem" }}
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />Unless specified, the contents of
            this website are licensed under a <a
            rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons
            Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
          </div>
          <div className="column is-3">
            <h4 id="contact" className="subtitle">Contact</h4>
            <ul>
              <li>
                <a href="https://github.com/kxxt">
                  <IconText icon={faGithub}>kxxt</IconText>
                </a>
              </li>
              <li>
                <a
                  href="mailto:rsworktech@outlook.com">
                  <IconText icon={faAt}>rsworktech@outlook.com</IconText>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/kxxtchannel"><IconText icon={faTelegram}>My channel</IconText>
                </a>
              </li>
            </ul>
          </div>
          <div className="column is-6">
            <h4 className="subtitle">Some links</h4>
            <ul>
              <li> (Currently under construction)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer