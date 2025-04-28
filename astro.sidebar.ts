import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const sidebar = [
  {
    label: "Introduction",
    slug: "docs/introduction",
  },
  {
    label: "Getting Started",
    items: [
      // Each item here is one entry in the navigation menu.
      { label: "Simple Example", slug: "docs/getting-started/simple-example" },
      {
        label: "Flyer Chat Architecture",
        slug: "docs/getting-started/architecture",
      },
      { label: "Customisation", slug: "docs/getting-started/customisation" },
      { label: "Migration from V1", slug: "docs/getting-started/migration" },
    ],
  },
  {
    label: "Guides",
    items: [
      // Each item here is one entry in the navigation menu.
      { label: "Status Indicators", slug: "docs/guides/status-indicators" },
      { label: "Dynamic Theming", slug: "docs/guides/dynamic-theming" },
      { label: "More Guides", slug: "docs/guides/more-guides" },
    ],
  },
] satisfies StarlightUserConfig["sidebar"];
