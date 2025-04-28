// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import { sidebar } from "./astro.sidebar";

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
      sidebar: sidebar,
      favicon: "/favicon.ico",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
