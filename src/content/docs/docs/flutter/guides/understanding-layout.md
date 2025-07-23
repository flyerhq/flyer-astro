---
title: Understanding layout 📚
---

This guide explains how Flyer Chat uses the `builders` parameter of `Chat` to layout the messages.

# ChatMessage


The `ChatMessage` widget build with `ChatMessageBuilder` is the foundational layout container for a single message Widget (depending on type) in the Flyer Chat UI. It is designed to be highly flexible and customizable, allowing you to insert custom widgets around the main message content and control alignment, animation, and grouping.

---

## Purpose

- **Aligns** the message based on the sender (left/right).
- **Animates** appearance and removal (fade, scale, size).
- **Manages padding** for grouped or standalone messages.
- **Handles gestures** (tap, double-tap, long-press).
- **Allows custom widgets** in key positions around the message.

---

## Widget Slots

You can provide widgets for the following slots:

- **headerWidget**: Appears above everything (e.g., date headers) and is not animated.
- **topWidget**: Appears above the message row (e.g., username, reply preview).
- **leadingWidget**: Appears to the left/start of the message (e.g., avatar).
- **child**: The main message content (text bubble, image, etc.): Will use each message's type builder.
- **trailingWidget**: Appears to the right/end of the message
- **bottomWidget**: Appears below the message row

---

## Layout Diagram

Below is a diagram showing the placement of each widget slot:


|                |         headerWidget         |                |
|----------------|:---------------------------:|----------------|
|                |          topWidget          |                |
| leadingWidget  |           child             | trailingWidget |
|                |        bottomWidget         |                |

---

## Example Usages

* [Add avatars](./add-avatars.md)
* [Add usernames](./add-usernames.md)
* [Add date separtors](./add-date-separators.md)

# Type specific builders

`Builder` exposes one parameter per message type allowing you to choose how it's rendered. The resulting widget will be the child widget in the `ChatMessage`.

You can build your own widgets or use the corresponding Flyer Chat packages.

## Example for ImageMessage

```dart
Chat(
        backgroundColor: Colors.transparent,
        builders: Builders(
          chatAnimatedListBuilder: (context, itemBuilder) {
            return ChatAnimatedList(
              itemBuilder: itemBuilder,
              insertAnimationDurationResolver: (message) {
                if (message is SystemMessage) return Duration.zero;
                return null;
              },
            );
          },
          imageMessageBuilder:
              (
                context,
                message,
                index, {
                required bool isSentByMe,
                MessageGroupStatus? groupStatus,
              }) => FlyerChatImageMessage(message: message, index: index),
        )
)

```
