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

*   It provides methods to **insert, update, remove, or set** messages. When these methods are called and the underlying data changes, the controller emits a `ChatOperation` event to signal the specific action that occurred.
*   The `ChatAnimatedList` widget (which is the primary UI component for displaying messages) observes these `ChatOperation` events.
*   `ChatAnimatedList` maintains its own internal array of messages, which is kept in sync with the `ChatController`'s data source by reacting to these events.
*   This design supports the asynchronous nature of `ChatController` operations. All data manipulation methods in the controller (insert, update, etc.) are `Future`s. If they take time to complete (e.g., writing to a database), directly relying on the controller's data source for UI updates could lead to inconsistencies or errors.
*   To manage this, `ChatAnimatedList` adds incoming operations (derived from the observed events) to an internal queue. It then processes these operations one by one, ensuring smooth and predictable UI updates even when the underlying data operations are asynchronous.
*   The controller also allows both users and internal package code to trigger message updates. For instance, an image message can determine its size and use the controller to save this information, preventing layout jumps later.
*   By default, you get an `InMemoryChatController`, which forgets messages when the app restarts.

:::tip[Persistence with Custom Controllers]
While `InMemoryChatController` is convenient for quick starts, creating your own `ChatController` implementation (e.g., using Hive CE as shown in the example, or by following [persisted controller guide](/docs/flutter/guides/persisted-controller)) is crucial for saving messages permanently across app restarts.
:::

## Reversed vs. Regular List

The `ChatAnimatedList` widget, which displays your messages, can be configured to operate in two main modes: reversed or regular. Both modes are designed to create a familiar chat experience where new messages appear near the input area and older messages scroll away. However, they achieve this with different internal mechanics, which impacts aspects like animations and pagination:

```dart
Chat(
  builders: Builders(
    chatAnimatedListBuilder: (context, itemBuilder) {
      return ChatAnimatedList( // or ChatAnimatedListReversed, default is regular
        itemBuilder: itemBuilder,
      );
    },
  ),
)
```

**1. Starting Point & Message Flow:**

*   **Reversed List:** The list's `0.0` scroll position is at the **visual bottom**. When the first message is added, it appears at this visual bottom. Subsequent new messages are also added at the visual bottom, visually pushing older messages upwards.
*   **Regular List:** The list's `0.0` scroll position is at the **visual top**. The first message added will appear at this visual top. Subsequent messages are added below the preceding ones, extending the list downwards. To ensure the newest messages are visible near the input area (the common chat UI behavior), this list type relies on mechanisms to automatically scroll to the bottom when new content arrives. This auto-scrolling behavior can be customized: `shouldScrollToEndWhenSendingMessage` affects both list types, while `shouldScrollToEndWhenAtBottom` only applies to the Regular List (it has no effect on the Reversed List, which uses animation for new messages). Both are `true` by default.

**2. Data Source Compatibility:**

Both list types work with the **same underlying data source**. You do not need to manually reverse your message array when switching to a reversed list. This allows you to toggle between modes without affecting your data handling logic.

**3. Visual Appearance with Few vs. Many Messages:**

*   **Few Messages:** With a regular list, messages will appear at the top of the chat area. With a reversed list, they will appear at the bottom, just above the input area.
*   **Many Messages:** If the messages fill the screen, the visual difference when scrolling might be less immediately obvious.

**4. Insert Animations:**

*   **Reversed List:** Since new messages appear at the visual bottom (where the user is typically focused), the list **always uses an insert animation**, smoothly pushing existing messages upwards.
*   **Regular List:** Insert animations are typically only visible when adding the first few messages to an empty chat. Once the list fills the screen, new messages added to the end might appear to come from "behind" the input area, with the view scrolling to them via a scroll controller, rather than a distinct item insertion animation at the point of entry.

**5. Pagination and Initial Scroll Position (`initialScrollToEndMode`):**

This is a critical difference, especially for chats with a long history.

*   **Regular List Behavior:** By default, Flutter lists start at scroll position `0.0` (the visual top). In a chat context, this means the user would initially see the oldest messages.
    *   The `initialScrollToEndMode` property (specific to the regular list configuration) attempts to mitigate this:
        *   `none`: The list starts at the top (oldest messages). Not ideal for chats.
        *   `jump`: The list attempts to instantly jump to the very end (newest messages).
        *   `animate`: The list animates a scroll from the top to the very end.
    *   **Challenge:** With a large number of messages (e.g., 200+), both `jump` and `animate` can feel laggy or produce a jarring visual effect as the list rapidly scrolls through content. This is generally not the expected behavior when opening a chat screen.
*   **Reversed List Behavior:** Since `0.0` is at the visual bottom, the list **naturally starts by showing the newest messages**. There is no need for an equivalent of `initialScrollToEndMode`, and this property will have no effect if set.

:::tip[Workaround for Regular List Lag on Initial Load]
If you must use a regular list and want to avoid the initial scroll lag, here's a potential workaround (not tested):
1.  Modify your `ChatController` to initially return only a small subset of the latest messages (e.g., the last 20).
2.  For this small set, `initialScrollToEndMode: jump` will appear practically instant.
3.  Implement the `onEndReached` callback. When the user scrolls upwards (towards older messages), load the next batch of historical messages from your local store.
4.  You can further extend this to fetch even older messages from a backend if the user continues to scroll up.
:::

**6. Keyboard Handling:**

*   **Reversed List:** The list is naturally anchored to the bottom. When the keyboard appears or disappears, the list content moves smoothly with it.
*   **Regular List:** You will need to implement custom logic using a `ScrollController` to manually adjust the scroll position and push content up when the keyboard is shown, and back down when it's hidden, to prevent the input from obscuring messages. For this, please follow this guide: [Regular List Keyboard Handling](/docs/flutter/guides/regular-list-keyboard).

## `cross_cache` for Image Caching

We provide a `cross_cache` package specifically designed for caching images across all platforms, including web. 🖼️

*   **Main Use**: This package is primarily used internally by `flyer_chat_image_message` to handle image caching efficiently.
*   **Flexibility**: If you prefer a different caching solution or want more control, you can create your own custom image message widget. Doing so means the `cross_cache` package won't be used by your implementation.

For more details, check out the [`cross_cache` README](https://github.com/flyerhq/flutter_chat_ui/blob/main/packages/cross_cache/README.md).
