import { defineCollection } from "astro/content/runtime";
import { z } from "astro/zod";

const guides = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { guides };
