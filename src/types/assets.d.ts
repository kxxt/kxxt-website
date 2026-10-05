declare const __PATH_PREFIX__: string

declare module "*.module.scss" {
  const classes: { readonly [className: string]: string }
  export = classes
}

declare module "*.scss"
declare module "*.css"
declare module "typeface-montserrat"
declare module "typeface-merriweather"

declare module "*.png" {
  const src: string
  export default src
}

declare module "*.jpg" {
  const src: string
  export default src
}

declare module "*.webp" {
  const src: string
  export default src
}
