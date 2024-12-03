import { defineConfig, envField } from 'astro/config'
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import critters from "astro-critters";
//import node from "@astrojs/node";
//


// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      NASA_API: envField.string({ context: "server", access: "secret" }),
    }
  },

  site: "https://nikostuff.com",

  integrations: [mdx(), sitemap(), solidJs(), tailwind({
    applyBaseStyles: false
  }), critters()],

  // adapter: node({
  //   mode: "standalone"
  // })
});