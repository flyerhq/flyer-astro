---
title: Migration from v1 🔄
---

:::danger[Major Rewrite!]
Flyer Chat v2 is a significant departure from v1. While this guide covers key breaking changes in models and the `Chat` widget, expect to refactor other areas of your implementation as well. Direct migration is not possible.
:::

:::tip[Firebase Migration]
For additional insights into migrating your Firebase application with Flyer Chat v2, please refer to the discussion and resources available in this GitHub issue: [flyerhq/flutter_chat_ui#750](https://github.com/flyerhq/flutter_chat_ui/issues/750).
:::

This document highlights the most critical breaking changes to help you get started:
*   Key updates to the core data models.
*   Changes to the required parameters for the main `Chat` widget.

While this won't cover every difference, understanding these core changes is the essential first step in adapting your v1 codebase.

## Message Model Changes

*   **`author` -> `authorId`**: v2 now resolves user objects based on their ID.
*   **`createdAt`**: Type changed from `int` to `DateTime`. It serializes to milliseconds UTC timestamp in JSON.
*   **`status`**: Replaced by a combination of optional `DateTime?` fields (`deletedAt`, `failedAt`, `sentAt`, `deliveredAt`, `seenAt`, `updatedAt`). The package calculates the status based on which fields are set, allowing for more granular control (useful for features like message history).

### Image Message Specific Changes

*   **`name`**: Removed.
*   **`size`**: Removed.
*   **`uri` -> `source`**: Renamed to highlight that the image source can be varied (local, remote, base64 string, etc.).

### File Message Specific Changes

*   **`size`**: No longer required.
*   **`uri` -> `source`**: Renamed to highlight that the file source can be varied (local, remote, etc.).

### Video Message Specific Changes

*   **`name`, `size`**: No longer required.
*   **`uri` -> `source`**: Renamed to highlight that the video source can be varied (local, remote, etc.).

### Audio Message Specific Changes

*   **`name`**: Removed.
*   **`mimeType`**: Removed.
*   **`size`**: No longer required.
*   **`duration`**: Now serialized as `int` in seconds (instead of milliseconds).
*   **`uri` -> `source`**: Renamed to highlight that the audio source can be varied (local, remote, etc.).

## User Model Changes

*   **`imageUri` -> `imageSource`**: Renamed to highlight that the image source can be varied (local, remote, base64 string, etc.).
*   **`firstName`, `lastName` -> `name`**: Simplified to a single field.
*   **`createdAt`**: Type changed from `int` to `DateTime`. It serializes to milliseconds UTC timestamp in JSON.

## `Chat` Widget Parameter Changes

*   **`messages`**: Replaced by the required `chatController` parameter. See the [Architecture](/docs/flutter/getting-started/architecture) section for details on controller.
*   **`onSendPressed`**: No longer exists. The alternative is the optional `onMessageSent` callback.
*   **`user`**: Replaced by two required parameters:
    *   `currentUserId` (`UserID`): The ID of the currently logged-in user (equivalent to v1's `user.id`).
    *   `resolveUser` (`Future<User> Function(UserID id)`): An async function that takes a user ID and returns the corresponding `User` object. v2 uses IDs internally and calls this function (with in-memory caching) whenever user data is needed.

For anything else, please refer to the rest of this documentation, search or [open an issue on GitHub](https://github.com/flyerhq/flutter_chat_ui/issues).
