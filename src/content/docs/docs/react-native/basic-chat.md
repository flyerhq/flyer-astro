---
title: Create a Chat
---

With the building blocks provided by this repository you can put together a complete chat interface. The easiest way is to use the `Chat` component from `@flyerhq/react-native-chat-ui` and pass it your message data and callbacks.

## Basic Usage

```tsx
import { Chat } from "@flyerhq/react-native-chat-ui";
import { DefaultTheme } from "flyer-chat-core";

export function MyChat({ messages$ }) {
  return (
    <Chat
      currentUserId="user-id"
      messages$={messages$}
      onSendPress={(text) => console.log("send", text)}
      theme={DefaultTheme}
    />
  );
}
```

## Customization

Every piece of the interface can be swapped for your own components using render props:

```tsx
<Chat
  renderMessage={(props) => <Message {...props} />}
  renderComposer={() => <CustomComposer />}
  theme={customTheme}
/>
```

You can also build the entire chat manually by combining the primitives from `@flyerhq/react-native-chat-primitives`.

Once your components are in place, `Chat` handles message grouping, gestures and scrolling so you can focus on integrating your backend and business logic.
