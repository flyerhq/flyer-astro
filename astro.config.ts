// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Host Grotesk",
        cssVariable: "--font-header1",
      },
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-body1",
      },
      {
        provider: fontProviders.google(),
        name: "IBM Plex Mono",
        cssVariable: "--font-body2",
        weights: [400, 500],
      },
    ],
  },
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
