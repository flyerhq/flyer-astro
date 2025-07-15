import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const reactNativeSidebar = [
  {
    label: "Introduction",
    slug: "docs/react-native/introduction",
  },
  {
    label: "Getting Started",
    items: [
      {
        label: "Installation",
        slug: "docs/react-native/getting-started/installation",
      },
    ],
  },
  {
    label: "General",
    slug: "docs/react-native/general",
  },
  {
    label: "Create a Chat",
    slug: "docs/react-native/basic-chat",
  },
  {
    label: "Building Your Own Components",
    slug: "docs/react-native/own-components",
  },
] satisfies StarlightUserConfig["sidebar"];
