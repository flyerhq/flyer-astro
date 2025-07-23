---
title: Add reactions 👍
---

:::tip[Reactions position]
Flyer Chat assumes reactions to be displayed under the bubble, overlapping the bubble.
Should you want to display the reactions another way it may be achievable using the the parameters of `ChatMessage` but this has not been tested by the team. 
:::


:::danger
To give user's full flexibility in the reactions behavior he library does not automatically call the controller to perform message update when the user interacts with reactions. It's up to you to implement the logic you prefer.

For example:
WhatsApp/Signal: open reactions' list on tap and long press. Allow only one reaction.
Slack: react on tap, open list on long press. Allow several reactions.
:::


Adding reactions to your messages is a two step process.

This example uses the `flyer_chat_reactions` package to add reactions to your messages.

## Displaying reactions under the message bubble

Flyer Chat uses the `reactionsBuilder` on to display the reactions.
Those will appear under the message bubble, overlapping and you can fully customize what happens when a user interacts with them.

```dart  
Widget _reactionsBuilder(
      BuildContext context, Message message, bool isSentByMe) {
    final reactions = reactionsFromMessageReactions(
      reactions: message.reactions,
      currentUserId: "the_user_id",
    );
    return FlyerChatReactionsRow(
      reactions: reactions,
      alignment: isSentByMe ? MainAxisAlignment.start : MainAxisAlignment.end,
      onReactionTap: (reaction) => _handleReactionTap(message, reaction),
      removeOrAddLocallyOnTap: true, // Allows to visually remove the reaction on tap so it's visually instantaneous. This will not update the controller.
      onReactionLongPress: (reaction) =>
          // The package exposes a method to show all the reactions list
          showReactionsList(context: context, reactions: reactions),
      onSurplusReactionTap: () =>
          showReactionsList(context: context, reactions: reactions),
    );
  }

  void _handleReactionTap(Message message, String reaction) {
    // Implement you message update logic here
  }
```

### Displaying the reactions dialog to add a reaction

Once again it's up to you when to display this dialog, usually on a message long press.

```dart
  void _handleMessageLongPress(
    BuildContext context,
    Message message, {
    int? index,
    LongPressStartDetails? details,
    bool isSentByMe = false,
  }) async {
    final currentUserId = 'user_id';
    showReactionsDialog(
      context,
      message,
      isSentByMe: isSentByMe,
      // reactions: ['😄','😂'] // You can change default reactions here
      userReactions: getUserReactions(message.reactions, currentUserId),
      onReactionTap: (reaction) => _handleReactionTap(message, reaction),
      onMoreReactionsTap: () async {
        // Called when the 'more' reactions is tapped. It's up to you to decide what to do. Usually use an emoji-picker as showcased here.
        final picked = await _showEmojiPicker();
        if (picked != null) {
          _handleReactionTap(message, picked);
        }
      },
      menuItems: _getMenuItems(message), // Display context menu items
    );
  }

  Future<String?> _showEmojiPicker() {
    return showModalBottomSheet(
      context: context,
      useSafeArea: true,
      builder: (context) => EmojiPicker(
        onEmojiSelected: (Category? category, Emoji emoji) {
          Navigator.of(context).pop(emoji.emoji);
        },
        config: Config(
          height: 250,
          checkPlatformCompatibility: false,
          viewOrderConfig: const ViewOrderConfig(),
          skinToneConfig: const SkinToneConfig(),
          categoryViewConfig: const CategoryViewConfig(),
          bottomActionBarConfig: const BottomActionBarConfig(enabled: false),
          searchViewConfig: const SearchViewConfig(),
        ),
      ),
    );
  }

    
```
