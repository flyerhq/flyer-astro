---
title: Flyer Chat Architecture 🏗️
---

Flyer Chat is built with two core packages:

*   `flutter_chat_ui`: The main package you'll use for the chat interface. It's kept simple with few dependencies for better performance.
*   `flutter_chat_core`: Contains shared models and helper functions used by all Flyer Chat packages.

We also offer extra packages for common message types, like `flyer_chat_text_message`, `flyer_chat_image_message` and others. These start with `flyer_chat` to highlight that they are opinionated solutions.

Feel free to use our packages or create your own custom widgets for message types! 🎨

## `flutter_chat_core` Details

This package is the foundation and includes:

1.  **Message Model**: Defines different message types (text, image, file, system, etc.) and their specific details. ✉️
2.  **User Model**: Identifies users and message authors. 👤
3.  **Customization Options**:
    *   `ChatTheme`: Customize colors, fonts, and shapes to match your app's look. 🖌️
    *   `Builders`: Use your own custom widgets for parts of the chat, like message bubbles, composer, message widgets, etc. 🛠️

## `ChatController` Explained

The `ChatController` is key for managing messages:

*   It lets you **add, update, or remove** messages in the chat. 🔄
*   It allows both users and internal package code to update messages. For instance, an image message can determine its size and use the controller to save this, preventing layout jumps later.
*   By default, you get an `InMemoryChatController`, which forgets messages when the app restarts.

:::tip[Persistence with Custom Controllers]
While `InMemoryChatController` is convenient for quick starts, creating your own `ChatController` implementation (e.g., using Sembast or Hive as shown in the example) is crucial for saving messages permanently across app restarts.
:::

## `cross_cache` for Image Caching

We provide a `cross_cache` package specifically designed for caching images across all platforms, including web. 🖼️

*   **Main Use**: This package is primarily used internally by `flyer_chat_image_message` to handle image caching efficiently.
*   **Flexibility**: If you prefer a different caching solution or want more control, you can create your own custom image message widget. Doing so means the `cross_cache` package won't be used by your implementation.

For more details, check out the [`cross_cache` README](https://github.com/flyerhq/flutter_chat_ui/blob/main/packages/cross_cache/README.md).
