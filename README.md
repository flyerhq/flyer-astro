# Flyer Chat Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This is the official documentation website for **Flyer Chat**, an open-source chat UI SDK for Flutter and React Native applications. The site provides comprehensive guides, API documentation, and examples for building fast, real-time chat interfaces and AI agents.

## About Flyer Chat

Flyer Chat is a high-performance, customizable, cross-platform chat SDK designed for:

- **Real-time messaging applications**
- **AI assistants and LLM-based chatbots**
- **Customer support platforms**
- **Community chat features**

### Key Features

- 🔄 **Backend-agnostic**: Connect to any backend service
- 🧬 **Adaptable**: Perfect for messengers, AI agents, and support platforms
- 🎨 **Highly Customizable**: Extensive theme options and builder functions
- 🧩 **Modular**: Pick and choose the features you need
- ⚡ **Performance Optimized**: Built for speed and smooth animations
- 🌐 **Cross-Platform**: Supports iOS, Android, Web, macOS, Windows, and Linux
- 📜 **Open Source**: Free to use under the Apache 2.0 License

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
