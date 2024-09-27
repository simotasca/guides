import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import remarkBreaks from "remark-breaks";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeCodeCopyButton } from "./plugins/rehype/code-copy-button.mjs";
import { remarkHighlightSyntaxPlugin } from "./plugins/rehype/code-highlight.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://guides-quarto-raggio.onrender.com/",
  integrations: [mdx(), tailwind()],
  markdown: {
    remarkPlugins: [remarkBreaks, remarkHighlightSyntaxPlugin],
    rehypePlugins: [rehypeCodeCopyButton, rehypeSlug, rehypeAutolinkHeadings, [rehypeToc, { headings: ["h2", "h3"] }]],
  },
});
