// see more here: https://docs.astro.build/en/guides/environment-variables/#intellisense-for-typescript

interface ImportMetaEnv {
  readonly PUBLIC_EXAMPLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
