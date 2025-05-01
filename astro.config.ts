// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightLinksValidator from "starlight-links-validator";

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
    sitemap(),
    starlight({
      plugins: [starlightLinksValidator(), starlightLlmsTxt()],
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
      editLink: {
        baseUrl: "https://github.com/flyerhq/flyer-astro/tree/main",
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
