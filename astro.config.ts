// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import { options } from "./astro.starlight";

// https://astro.build/config
export default defineConfig({
  markdown: {
    // shikiConfig: {
    //   themes: {
    //     light: "github-light",
    //     dark: "github-dark",
    //   },
    // },
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "tokyo-night",
      },
    },
  },
  site: "https://flyer.chat",
  trailingSlash: "ignore",
  integrations: [react(), sitemap(), starlight(options)],
  vite: {
    plugins: [tailwindcss()],
  },
});
