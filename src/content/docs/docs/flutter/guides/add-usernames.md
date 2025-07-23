---
title: Add usernames
---

## Above the bubble

To add usernames abobe the message bubble, you can use `topWidget` or `headerWidget` of the `ChatMessage`.

It's up to you to implement the logic to display or not the username, and which widget to user. The library exposes a `Username` widget.

```dart
chatMessageBuilder:
              (
                context,
                message,
                index,
                animation,
                child, {
                bool? isRemoved,
                required bool isSentByMe,
                MessageGroupStatus? groupStatus,
              }) {
                final isSystemMessage = message.authorId == 'system';
                final isFirstInGroup = groupStatus?.isFirst ?? true;
                final isLastInGroup = groupStatus?.isLast ?? true;
                final isCurrentUser = message.authorId == _currentUser.id;
                final shouldShowUsername =
                    !isSystemMessage && isFirstInGroup && isRemoved != true;

                return ChatMessage(
                  message: message,
                  index: index,
                  animation: animation,
                  isRemoved: isRemoved,
                  groupStatus: groupStatus,
                  topWidget: shouldShowUsername
                      ? Padding(
                          padding: EdgeInsets.only(
                            bottom: 4,
                            left: isCurrentUser ? 0 : 48,
                            right: isCurrentUser ? 48 : 0,
                          ),
                          child: Username(userId: message.authorId),
                        )
                      : null,

                  child: child,
                );
              },
```

## In the message bubble

To display the username within the bubble the logic remains the same but we will use the `topWidget` parameter for each individual message builder.

**Example for textMessage**

```dart
  Widget _textMessageBuilder(
    BuildContext context,
    TextMessage message,
    int index, {
    required bool isSentByMe,
    MessageGroupStatus? groupStatus,
  }) {
    final isSystemMessage = message.authorId == 'system';
    final isFirstInGroup = groupStatus?.isFirst ?? true;
    final isLastInGroup = groupStatus?.isLast ?? true;
    final isCurrentUser = message.authorId == _currentUser.id;
    final shouldShowUsername = 
    !isSystemMessage && isFirstInGroup && isRemoved != true;

    return FlyerChatTextMessage(
      topWidget: shouldShowUsername ? YourWidget() : null
      message: message,
      index: index
    );
  }
  ```