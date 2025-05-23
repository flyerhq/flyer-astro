import type { StarlightUserConfig } from "@astrojs/starlight/types";
import { sidebar } from "./astro.sidebar";
import starlightLinksValidatorPlugin from "starlight-links-validator";
import starlightLlmsTxt from "starlight-llms-txt";

const description =
  "Open-source chat SDK for Flutter and React Native. Build fast, real-time apps and AI agents with a high-performance, customizable, cross-platform UI.";

export const options: StarlightUserConfig = {
  plugins: [starlightLinksValidatorPlugin(), starlightLlmsTxt()],
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
  description,
  lastUpdated: true,
  tableOfContents: true,
  credits: false,
  disable404Route: true,
  markdown: {
    headingLinks: true,
  },
  prerender: true,
  pagination: true,
};
