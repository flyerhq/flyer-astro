---
title: Add date separators 📆
---

Usually date separators are displayed above the message bubbles and are centered horizontally within the chat's view.

The best way to achieve this is to use the either the `topWidget` or `headerWidget` parameter of the `ChatMessage` (see [Understanding Layout](./understanding-layout.md)). It's up to you to defined the logic of how and when to display the separator.

## Example

```dart
 Widget _chatMessageBuilder(
    BuildContext context,
    Message message,
    int index,
    Animation<double> animation,
    Widget child, {
    bool? isRemoved,
    required bool isSentByMe,
    MessageGroupStatus? groupStatus,
  }) {


    return ChatMessage(
      message: message,
      index: index,
      animation: animation,
      groupStatus: groupStatus,
      headerWidget: _getDisplayDateHeader(index),
      child: child,
    );
  }
```

```dart
Widget? _getDisplayDateHeader(int index) {
    try {
      final DateTime now = DateTime.now();
      final Message? currentMessage = _controller?.messages[index];
      if (currentMessage == null) return null;
      final currentMessageDate = currentMessage.createdAt!;

      final Message? previousMessage =
          index > 0 ? _controller?.messages[index - 1] : null;
      const differenceThreshold = 15;

      final previousMessageDate = previousMessage?.createdAt!;

      String? dateString;

      // It's today, display the time if messages are more than X minutes appart
      // We could also use the groupStatus
      if (currentMessageDate.isSameDay(now)) {
        if (previousMessageDate == null ||
            currentMessageDate.difference(previousMessageDate).inMinutes >=
                differenceThreshold) {
          dateString = DateFormat.jm().format(currentMessageDate.toLocal());
        }
        return null;
      }
      // Else one header per day
      if (previousMessageDate != null &&
          currentMessageDate.isSameDay(previousMessageDate)) {
        return null;
      }

      if (currentMessageDate.isSameWeek(now)) {
        dateString =
            DateFormat.EEEE().add_jm().format(currentMessageDate.toLocal());
      }
      if (currentMessageDate.isSameYear(now)) {
        dateString = DateFormat('d MMMM').format(currentMessageDate.toLocal());
      }
      dateString = DateFormat.yMd().format(currentMessageDate.toLocal());

      return YourHeaderWidget(dateString: dateString);
    } catch (e) {
      log.e('Error getting display date header', error: e);
      return null;
    }
  }
```