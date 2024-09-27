import { visit } from "unist-util-visit";

export function remarkHighlightSyntaxPlugin() {
  return function transformer(tree) {
    visit(tree, "code", (node) => {
      // Your logic to highlight content within %{ ... }%
      console.log(node.value.match(/%\{(.*?)\}%/g));
      node.value = node.value.replaceAll(/%\{(.*?)\}%/g, (_, code) => `<mark>${code}</mark>`);
    });
  };
}
