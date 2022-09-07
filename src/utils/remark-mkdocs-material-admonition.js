const visit = require("unist-util-visit")
const h = require("hastscript")

module.exports = function remarkMkdocsMaterialAdmonition() {
  return tree => {
    visit(tree, node => {
      if (node.type === "containerDirective") {
        const data = node.data || (node.data = {})
        data.hName = "div"
        data.hProperties = h("div", node.attributes).properties
        data.hProperties.className ??= []
        data.hProperties.className.unshift("admonition", node.name)
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
      }
    })
  }
}
