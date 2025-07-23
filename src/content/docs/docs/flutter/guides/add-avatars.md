
---
title: Add Avatars 👩‍🎤
---

Avatars are usually displayed outside the message's bubble, therefore there are built in the `chatMessageBuilder`. 

It's up to you to define your own logic to display (or not) the avatar based on the message.

The `Avatar` widget is exposed by the library but your are free to build any widget you like.


## Example usage


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
                final shouldShowAvatar =
                    !isSystemMessage && isLastInGroup && isRemoved != true;
                final isCurrentUser = message.authorId == _currentUser.id;

                Widget? avatar;
                if (shouldShowAvatar) {
                  avatar = Padding(
                    padding: EdgeInsets.only(
                      left: isCurrentUser ? 8 : 0,
                      right: isCurrentUser ? 0 : 8,
                    ),
                    child: Avatar(userId: message.authorId),
                  );
                } else if (!isSystemMessage) {
                  avatar = const SizedBox(width: 40);
                }

                return ChatMessage(
                  message: message,
                  index: index,
                  animation: animation,
                  isRemoved: isRemoved,
                  groupStatus: groupStatus,
                  leadingWidget: !isCurrentUser
                      ? avatar
                      : isSystemMessage
                      ? null
                      : const SizedBox(width: 40),
                  trailingWidget: isCurrentUser
                      ? avatar
                      : isSystemMessage
                      ? null
                      : const SizedBox(width: 40),
                  receivedMessageScaleAnimationAlignment:
                      (message is SystemMessage)
                      ? Alignment.center
                      : Alignment.centerLeft,
                  receivedMessageAlignment: (message is SystemMessage)
                      ? AlignmentDirectional.center
                      : AlignmentDirectional.centerStart,
                  horizontalPadding: (message is SystemMessage) ? 0 : 8,
                  child: child,
                );
              },
```