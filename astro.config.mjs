import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
// import playformInline from "@playform/inline";
import tailwindcss from "@tailwindcss/vite";
//import node from "@astrojs/node";
//

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: true,
  },
  env: {
    schema: {
      NASA_API: envField.string({ context: "server", access: "secret" }),
      AZURE_API: envField.string({ context: "server", access: "secret" }),
    },
  },

  site: "https://nikostuff.com",

  // tailwind({
  //   applyBaseStyles: false
  // })
  // adapter: node({
  //   mode: "standalone"
  // })
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    // playformInline(),
  ],

  vite: {
    plugins: [
      tailwindcss({
        applyBaseStyles: false,
      }),
    ],
  },
});
