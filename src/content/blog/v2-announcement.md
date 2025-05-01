---
title: Introducing Flyer Chat v2 - Built for Flexibility, Performance, and the Future 🚀
excerpt: We are pleased to announce the release of Flyer Chat v2, a significant update to our open-source chat UI package for Flutter. This new version provides enhanced flexibility, improved performance, and the capability to build diverse chat interfaces.
publishDate: 'May 1 2025'
---

We are pleased to announce the release of **Flyer Chat v2**, a significant update to our open-source chat UI package for Flutter. This new version provides enhanced flexibility, improved performance, and the capability to build diverse chat interfaces.

## The Journey: Why v2?

When Flyer Chat started in 2020, the initial goal was simple: simplify the process of adding chat interfaces to applications. The aim was a package requiring minimal configuration – primarily a user ID and messages – with the package handling the rest.

However, it quickly became clear that "one size fits all" doesn't apply to chat. Different projects required distinct layouts, unique features, and extensive customization options. Attempting to accommodate these variations through parameters led to increasingly complex components and reduced maintainability. Furthermore, implementing features like audio messages often requires dependencies that only support iOS/Android, which conflicted with our goal of supporting *all* Flutter platforms, including web and desktop.

So, reflecting on these challenges, we decided a fresh start was needed – one focused on **flexibility, performance, and being ready for the future**. ✨

## Meet the New Architecture: How v2 Works

Flyer Chat v2 introduces a new architecture centered around three core concepts:

1.  **`ChatController`**: This controller is now central to managing message state. It handles message insertion, updates, and deletion. It enables internal state updates, such as an image message determining its dimensions post-loading. Crucially, it provides the foundation for **persistent storage**. While an `InMemoryChatController` is provided for quick setup (losing state on restart), you can readily implement custom controllers using storage solutions like Sembast or Hive for persistence (see examples).

2.  **The Builder Pattern**: Gain granular control over the UI. V2 allows replacing *any* UI component using dedicated `builders`. Whether you need a custom input field or want to display additional message metadata, simply provide your own widget implementation via builders like `composerBuilder` or `textMessageBuilder`. You can also adapt the default implementations by copying the source code and modifying specific parts. 🛠️

3.  **Modular Message Packages**: Addressing the challenge with platform-specific features like audio messages, v2 introduces optional, separate packages for common message types (e.g., `flyer_chat_text_message`, `flyer_chat_image_message`). You install only the packages and dependencies you require. This keeps the core UI package lean and provides flexibility in choosing implementations. If you target only mobile, you can use a package with native dependencies. If you need web compatibility, you can create or utilize a cross-platform implementation. This modularity also simplifies community contributions for new message types. 📦

[Learn more about the new architecture here](https://flyer.chat/docs/flutter/getting-started/architecture/).

## Performance and Modern Use Cases

Beyond flexibility, v2 prioritizes key improvements:

*   **Performance**: Leveraging the `provider` package for state management ensures efficient updates, rebuilding only necessary widgets. This results in smoother animations and improved responsiveness.
*   **AI Assistant Ready**: V2 was designed considering the rise of AI assistants. Features like **text streaming** are supported, making Flyer Chat suitable for modern AI conversational interfaces alongside traditional messaging applications. 🤖
*   **True Cross-Platform Support**: A core goal achieved in v2 is robust support for *all* Flutter platforms: iOS, Android, Web, macOS, Windows, and Linux. Features like image uploading, downloading, and others are designed to work seamlessly everywhere. 🌐

## Ensuring Production Readiness

A significant limitation of v1 was its primary focus on UI without extensive testing against real-world backend interactions. V2 addresses this directly. Alongside the UI package, we developed a complete [example messenger application](https://github.com/flyerhq/flutter_chat_ui/tree/main/examples/flyer_chat) using a custom backend (with temporary chats for testing).This allowed us to test the chat UI against various practical scenarios.

We also built an [AI assistant example](https://github.com/flyerhq/flutter_chat_ui/tree/main/examples/flyer_chat) using Gemini to validate its suitability for generative AI use cases.

This real-world testing process has been invaluable, leading to a more robust, refined API and ensuring Flyer Chat v2 is truly production-ready. ✅

## Customization Options

In addition to builders, v2 offers robust theming capabilities:

*   **`ChatTheme`**: Easily customize colors, typography, and message bubble shapes via the `ChatTheme` object. Use predefined themes (`light`, `dark`), derive from your app's `ThemeData`, or use `copyWith` for specific overrides.
*   **Widget Parameters**: Many default message widgets (e.g., `SimpleTextMessage`, `FlyerChatImageMessage`) accept parameters (like `borderRadius`, `backgroundColor`, `showStatus`) for fine-tuning directly within builders.

Combine `ChatTheme`, `Builders`, and widget parameters to achieve the desired appearance.

[Explore all customization options in detail here](https://flyer.chat/docs/flutter/getting-started/customisation/).

## Migrating from v1

Please note: Flyer Chat v2 is a **major rewrite**. Due to fundamental architectural changes, direct migration from v1 is not possible; refactoring your implementation is required.

Key breaking changes include:

*   **Message Model**: `author` is now `authorId`, `createdAt` is a `DateTime`.
*   **`Chat` Widget**: No more `messages` list; use the required `chatController`. No more `onSendPressed`; use the `onMessageSent` callback. No more `user`; use `currentUserId` and the `resolveUser` function.

Please consult the [Migration Guide](https://flyer.chat/docs/flutter/getting-started/migration/) in our documentation for assistance. 🔄

## Future Roadmap

V2 provides a solid foundation for future development. Our immediate priorities include adding highly requested features:

*   **Reactions** 👍
*   **Replies** ↩️
*   **Audio Messages** (as a separate package) 🎤

We also plan to introduce packages for Video and Location messages. However, the builder pattern empowers you to implement and integrate any custom message type immediately.

## Get Started with v2!

Flyer Chat v2 enables you to build performant, custom chat UIs more efficiently. Whether for real-time messaging, AI assistants, or support platforms, v2 offers the necessary flexibility.

*   [**Read the Docs**](https://flyer.chat/docs/flutter/introduction/)
*   [**See the Example**](https://github.com/flyerhq/flutter_chat_ui/tree/main/examples/flyer_chat)
*   [**Find it on Pub.dev**](https://pub.dev/packages/flutter_chat_ui)
*   [**Help out on GitHub**](https://github.com/flyerhq/flutter_chat_ui)

We are excited about the possibilities v2 offers and look forward to seeing your creations! 🎉
