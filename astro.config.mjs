import { defineConfig, envField } from 'astro/config'
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import playformInline from "@playform/inline";
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
  }), playformInline()],

  // adapter: node({
  //   mode: "standalone"
  // })
});