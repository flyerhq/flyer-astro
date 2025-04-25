// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://flyer.chat",
  trailingSlash: "ignore",
  integrations: [
    starlight({
      title: "Flyer Chat",
      customCss: [
        // Path to your Tailwind base styles:
        "./src/styles/global.css",
      ],
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/flyerhq" },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
            { label: "Status Indicators", slug: "guides/status-indicators" },
            { label: "Dynamic Theming", slug: "guides/dynamic-theming" },
            { label: "More guides", slug: "guides/more-guides" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
