---
title: Simple Example 📝
---

This section demonstrates the simplest possible setup for Flyer Chat using the core `Chat` widget. To get started, you need to provide three essential parameters:

1.  **`chatController`**: This manages the messages displayed in the chat. For this basic example, we'll use the provided `InMemoryChatController`.
    *   `InMemoryChatController` is easy to use but it **does not save messages** when the app closes or restarts.
    *   For persistent storage across sessions, you would create your own controller implementation (see the [Architecture](/docs/getting-started/architecture) section or the example project for details).
2.  **`currentUserId` (`UserID`)**: The ID of the currently logged-in user (who will be the author of messages sent via the composer).
3.  **`resolveUser` (`Future<User> Function(UserID id)`)**: An asynchronous function that takes a user ID and must return the corresponding `User` object. Flyer Chat uses user IDs internally and calls this function whenever it needs the full user data (e.g., for displaying name or avatar), caching the results in memory.

The following code snippet shows how to combine these elements for a minimal, functioning chat interface.

```dart
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_chat_core/flutter_chat_core.dart';
import 'package:flutter_chat_ui/flutter_chat_ui.dart';

class MyChat extends StatefulWidget {
  const MyChat({super.key});

  @override
  MyChatState createState() => MyChatState();
}

class MyChatState extends State<MyChat> {
  final _chatController = InMemoryChatController();

  @override
  void dispose() {
    _chatController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Chat(
        chatController: _chatController,
        currentUserId: 'user1',
        onMessageSend: (text) {
          _chatController.insert(
            TextMessage(
              // Better to use UUID or similar for the ID - IDs must be unique.
              id: '${Random().nextInt(1000) + 1}',
              authorId: 'user1',
              createdAt: DateTime.now().toUtc(),
              text: text,
            ),
          );
        },
        resolveUser: (UserID id) async {
          return User(id: id, firstName: 'John', lastName: 'Doe');
        },
      ),
    );
  }
}

```
