import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import remarkBreaks from "remark-breaks";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      langs: ["bash"],
    },
    remarkPlugins: [remarkBreaks],
    rehypePlugins: [
      rehypeCodeCopyButton,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [rehypeToc, { headings: ["h2", "h3"] }],
    ],
  },
});

const preLanguageRegex = /```(?:([a-zA-Z0-9_-]+)\n|)/;
function rehypeCodeCopyButton() {
  return (tree, file) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "pre" && node.children[0]?.tagName === "code") {
        const markdown = file.toString().slice(node.position.start.offset, node.position.end.offset);
        const language = markdown.match(preLanguageRegex)?.at(1) || "code";

        const codeLang = {
          type: "element",
          tagName: "p",
          children: [{ type: "text", value: language }],
        };

        const copyButton = {
          type: "element",
          tagName: "button",
          properties: { className: "copy-button", onclick: "copyCode(this)" },
          children: [{ type: "text", value: "Copy" }],
        };

        const headerDiv = {
          type: "element",
          tagName: "div",
          properties: {
            className: "code-block-header",
          },
          children: [codeLang, copyButton],
        };

        const wrapperDiv = {
          type: "element",
          tagName: "div",
          properties: {
            className: "code-block-wrapper",
          },
          children: [headerDiv, node],
        };

        // Replace the original code block with the wrapper div
        parent.children[index] = wrapperDiv;
      }
    });
  };
}
