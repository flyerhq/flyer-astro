---
title: Status Indicators 🔔
---

This guide explains how Flyer Chat handles and displays message status indicators (like sending spinners, error icons, or delivery/read ticks).

## How Status Works

Instead of a single `status` field (like an enum), Flyer Chat determines the message status based on a combination of nullable `DateTime?` fields and a `bool` flag on the `Message` object. This approach offers more granular control and flexibility.

The key fields involved are:
*   `bool sending`: Indicates the message is currently being sent.
*   `DateTime? failedAt`: Timestamp when the message failed to send.
*   `DateTime? sentAt`: Timestamp when the message was successfully sent from the device.
*   `DateTime? deliveredAt`: Timestamp when the message was delivered to the recipient(s).
*   `DateTime? seenAt`: Timestamp when the message was seen/read by the recipient(s).

The `Chat` widget automatically displays the appropriate visual indicator based on which of these fields are set (and their order of precedence):
*   `sending == true`: Shows a **sending spinner** ⏳.
*   `failedAt != null`: Shows an **error icon** ❗.
*   `seenAt != null`: Shows a **double tick** (read indicator) ✔️✔️.
*   `deliveredAt != null`: Shows a **single tick** (delivered indicator) ✔️.
*   `sentAt != null`: Shows a **single tick** (sent indicator) ✔️.

:::tip[Difference between sent and delivered]
Both `sentAt` and `deliveredAt` show a single tick by default. The distinction is semantic, allowing you to implement features like delayed notifications (similar to Slack) where a message might be "sent" but not yet "delivered" to trigger a push notification. You can omit one or another if you don't need such functionality.
:::

:::info[Other `DateTime?` fields]
Other `DateTime?` fields like `createdAt`, `updatedAt`, and `deletedAt` track the message's lifecycle but do not directly correspond to a *visual* status indicator shown by the default `ChatMessage` widget.
:::

## Positioning and Visibility

By default, the status indicator appears inside the message bubble, positioned at the **bottom end**.

You can customize this behavior using parameters available on most default Flyer Chat message widgets (like `SimpleTextMessage`, `FlyerChatTextMessage`, `FlyerChatImageMessage`, etc.):

*   **`timeAndStatusPosition`**: This parameter controls where the timestamp and status indicator are rendered relative to the message content. You can set it to:
    *   `TimeAndStatusPosition.end` (Default)
    *   `TimeAndStatusPosition.start`
    *   `TimeAndStatusPosition.inline` (Places it directly after the message content, where applicable, e.g., for text messages).
*   **`showStatus` (`bool`)**: Set this to `false` to hide the status indicator completely. This is useful if you don't need status indicators, or if you prefer to display the status *outside* the message bubble using a custom `chatMessageBuilder`.

These parameters give you flexibility in integrating the status display with your specific message design.

## Examples

**Example 1: Show a single tick for every message**

```dart
_chatController.insert(
  TextMessage(
    // Better to use UUID or similar for the ID - IDs must be unique.
    id: '${Random().nextInt(1000) + 1}',
    authorId: 'user1',
    createdAt: DateTime.now().toUtc(),
    sentAt: DateTime.now().toUtc(), // <- Add this line
    text: 'Hello, world!',
  ),
);
```

**Example 2: Show status inline for text messages**

:::info[Text message widgets]
`SimpleTextMessage` is already provided by the `flutter_chat_ui` package. However, if you need additional features like markdown support, you can install and use the `flyer_chat_text_message` package.
:::

```dart
// Optionally install the flyer_chat_text_message package
import 'package:flyer_chat_text_message/flyer_chat_text_message.dart';

Chat(
  // ...
  builders: Builders(
    textMessageBuilder: (context, message, index) {
      return SimpleTextMessage( // or FlyerChatTextMessage
        message: message,
        index: index,
        timeAndStatusPosition: TimeAndStatusPosition.inline,
      );
    },
  ),
),
```

:::tip[Customize other message types]
Use other builders like `imageMessageBuilder`, `fileMessageBuilder`, etc. to customize other message types.
:::

**Example 3: Hide status indicators for text messages**

```dart
Chat(
  // ...
  builders: Builders(
    textMessageBuilder: (context, message, index) {
      return SimpleTextMessage( // or FlyerChatTextMessage
        message: message,
        index: index,
        showStatus: false,
      );
    },
  ),
),
```

**Example 4: Move status outside the message bubble**

```dart
Chat(
  // ...
  builders: Builders(
    // We need to use chatMessageBuilder to change anything outside the message bubble.
    chatMessageBuilder: (
      context,
      message,
      index,
      animation,
      child, {
      groupStatus,
      isRemoved,
    }) {
      final currentStatus = message.status;
      return ChatMessage(
        message: message,
        index: index,
        animation: animation,
        groupStatus: groupStatus,
        isRemoved: isRemoved,
        // Here we add a widget that will be displayed at the end of the message bubble.
        trailingWidget:
          currentStatus != null
            ? Padding(
              // Adding some padding so the icon looks nicer.
              padding: const EdgeInsets.fromLTRB(4, 0, 0, 8),
              child: Icon(
                // getIconForStatus is a helper function provided by
                // flutter_chat_ui that returns an icon based on the message status.
                getIconForStatus(currentStatus),
                // Consider using theme based on the system brightness.
                color: ChatTheme.light().colors.onSurface,
                size: 12,
              ),
            )
            // If there is no status, we display a SizedBox
            // so the messages are aligned properly.
            : const SizedBox(width: 12),
        child: child,
      );
    },
    // Remember to hide the default status indicator inside the text message bubble!
    textMessageBuilder: (context, message, index) {
      return SimpleTextMessage( // or FlyerChatTextMessage
        message: message,
        index: index,
        showStatus: false,
      );
    },
    // Hide statuses for other message widgets if needed.
    // imageMessageBuilder: (context, message, index) {
    //   return FlyerChatImageMessage(
    //     message: message,
    //     index: index,
    //     showStatus: false,
    //   );
    // },
  ),
),
```

:::tip[Using other message properties]
You can use `message.authorId == currentUserId` to determine if the message is sent by the current user and adjust the status display accordingly (e.g., only show detailed status for outgoing messages). The possibilities for conditional rendering are vast.
:::
