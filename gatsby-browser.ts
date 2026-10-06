import { config } from "@fortawesome/fontawesome-svg-core"

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// Bundle icon sizing before Bulma so it is available before hydration.
import "@fortawesome/fontawesome-svg-core/styles.css"
import "./src/main.scss"

// Font Awesome styles are already included in the initial stylesheet.
config.autoAddCss = false
