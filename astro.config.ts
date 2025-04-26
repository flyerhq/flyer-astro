// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "tokyo-night",
      },
    },
  },
  site: "https://flyer.chat",
  trailingSlash: "ignore",
  integrations: [
    react(),
    starlight({
      title: "Flyer Chat",
      customCss: [
        // Path to your Tailwind base styles:
        "./src/styles/global.css",
      ],
      logo: {
        dark: "./public/logo-light.svg",
        light: "./public/logo-dark.svg",
        replacesTitle: true,
      },
      expressiveCode: {
        themes: ["tokyo-night", "one-light"],
      },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/flyerhq" },
      ],
      sidebar: [
        {
          label: "Introduction",
          slug: "introduction",
        },
        {
          label: "Getting started",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Simple example", slug: "getting-started/simple-example" },
            {
              label: "Flyer Chat architecture",
              slug: "getting-started/architecture",
            },
            { label: "Customisation", slug: "getting-started/customisation" },
            { label: "Migration from V1", slug: "getting-started/migration" },
          ],
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Status indicators", slug: "guides/status-indicators" },
            { label: "Dynamic theming", slug: "guides/dynamic-theming" },
            { label: "More guides", slug: "guides/more-guides" },
          ],
        },
      ],
      favicon: "/favicon.ico",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
