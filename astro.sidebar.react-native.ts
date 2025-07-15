import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const reactNativeSidebar = [
  {
    label: "Introduction",
    slug: "docs/react-native/introduction",
  },
  // {
  //   label: "Getting Started",
  //   items: [
  //     {
  //       label: "Installation",
  //       slug: "docs/react-native/getting-started/installation",
  //     },
  //     {
  //       label: "Quick Start",
  //       slug: "docs/react-native/getting-started/quick-start",
  //     },
  //     {
  //       label: "Configuration",
  //       slug: "docs/react-native/getting-started/configuration",
  //     },
  //   ],
  // },
  // {
  //   label: "Guides",
  //   items: [
  //     {
  //       label: "Customization",
  //       slug: "docs/react-native/guides/customization",
  //     },
  //     {
  //       label: "Theming",
  //       slug: "docs/react-native/guides/theming",
  //     },
  //   ],
  // },
] satisfies StarlightUserConfig["sidebar"];
