import { visit } from "unist-util-visit"
import { h } from "hastscript"
import type { Root } from "mdast"
import type { Plugin } from "unified"
import type {} from "mdast-util-directive"
import type {} from "mdast-util-to-hast"

const remarkMkdocsMaterialAdmonition: Plugin<[], Root> = function () {
  return tree => {
    visit(tree, "containerDirective", node => {
      const data = node.data || (node.data = {})
      data.hName = "div"
      const properties = h("div", node.attributes ?? {}).properties
      const className = properties.className
      properties.className = [
        "admonition",
        node.name,
        ...(Array.isArray(className)
          ? className
          : className
            ? [String(className)]
            : []),
      ]
      data.hProperties = properties
      node.children ??= []
      node.children.unshift({
        type: "paragraph",
        children: [
          {
            type: "text",
            value: node.name.charAt(0).toUpperCase() + node.name.slice(1),
          },
        ],
        data: { hProperties: { className: "admonition-title" } },
      })
    })
  }
}

export default remarkMkdocsMaterialAdmonition
