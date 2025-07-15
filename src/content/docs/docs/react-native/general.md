# General

This monorepo provides a modular chat UI implementation built entirely with TypeScript. The project is divided into several packages:

- **flyer-chat-core** – shared models, theme configuration and reactive store powered by `@legendapp/state`.
- **react-native-chat-primitives** – unstyled and accessible building blocks for React Native chats.
- **react-native-chat-ui** – opinionated components composed from primitives.
- **flyer-chat-text-message** and **flyer-chat-image-message** – opinionated defaults for text and image messages. You can implement your own message contents if you need something custom.

## Goals

- Well structured and easy to understand codebase.
- Easy to extend and customize for different apps.
- High performance with minimal dependencies.
- Fully themable through context and default themes.
