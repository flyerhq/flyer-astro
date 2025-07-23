import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const sidebar = [
  {
    label: "Introduction",
    slug: "docs/flutter/introduction",
  },
  {
    label: "Getting Started",
    items: [
      // Each item here is one entry in the navigation menu.
      {
        label: "Simple Example",
        slug: "docs/flutter/getting-started/simple-example",
      },
      {
        label: "Flyer Chat Architecture",
        slug: "docs/flutter/getting-started/architecture",
      },
      {
        label: "Customisation",
        slug: "docs/flutter/getting-started/customisation",
      },
      {
        label: "Migration from V1",
        slug: "docs/flutter/getting-started/migration",
      },
    ],
  },
  {
    label: "Guides",
    items: [
      // Each item here is one entry in the navigation menu.
      {
        label: "Persisted Controller",
        slug: "docs/flutter/guides/persisted-controller",
      },
      {
        label: "Status Indicators",
        slug: "docs/flutter/guides/status-indicators",
      },
      { label: "Dynamic Theming", slug: "docs/flutter/guides/dynamic-theming" },
      { label: "More Guides", slug: "docs/flutter/guides/more-guides" },
    ],
  },
  {
    label: "Layout",
    items: [
      {
        label: "Understanding Layout",
        slug: "docs/flutter/layout/understanding-layout",
      },
 
      { label: "Dynamic Theming", slug: "docs/flutter/guides/dynamic-theming" },
      { label: "Add Avatars", slug: "docs/flutter/guides/add-avatars" },
      { label: "Add Usernames", slug: "docs/flutter/guides/add-usernames" },
      { label: "Add Date Separators", slug: "docs/flutter/guides/add-date-separators" },
    ],
  },
] satisfies StarlightUserConfig["sidebar"];
