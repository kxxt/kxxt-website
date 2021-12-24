import React from "react"
import { faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons"
import { StaticImage } from "gatsby-plugin-image"
import { faAt, faRss } from "@fortawesome/free-solid-svg-icons"
import IconText from "../icon-text"
import * as styles from "./footer.module.scss"

const Footer = () => {
  return (
    <footer className={`footer ${styles.pageFooter}`}>
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <p className="subtitle">About</p>
            &copy; {new Date().getFullYear()} kxxt
            <br />

            This is kxxt's personal website.
            <br />
            <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><StaticImage
              alt="Creative Commons License" style={{ borderWidth: 0, marginTop: "1rem", width: 88, height: 31 }}
              src="../../images/cc-by-nc-sa-4.png" /></a><br />Unless specified, the contents of
            this website are licensed under a <a
            rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons
            Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
          </div>
          <div className="column is-3">
            <p id="contact" className="subtitle">Contact</p>
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
            <p className="subtitle">Some links</p>
            <ul>
              <li><a href="/rss.xml"><IconText icon={faRss}>RSS Feed</IconText></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer