import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

import critters from "astro-critters";

// https://astro.build/config
export default defineConfig({
  site: "https://nikostuff.com",
  integrations: [mdx(), sitemap(), solidJs(), tailwind({
    applyBaseStyles: false
  }), critters()],
  // legacy: {
  //   collections: true
  // }
});