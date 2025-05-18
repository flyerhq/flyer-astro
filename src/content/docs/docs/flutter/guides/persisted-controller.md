---
title: Persisted Controller 🔄
---

A controller in `flutter_chat_ui` acts as the source of truth for your chat data, primarily managing the messages. When implementing a persisted controller, understanding how your data source handles order is crucial. There are primarily two types of data sources to consider: ordered and non-ordered.

## Ordered Data Sources

An ordered data source maintains a specific sequence for its elements. A simple example is an array, which is utilized by the `InMemoryChatController` provided by the `flutter_chat_core` package.

With an array-based (and thus ordered) data source, operations are straightforward:
*   You can insert messages at any specific index.
*   You can update messages at any specific index.
*   You can simply return the array from the `messages` getter.

However, it's important to note that the `InMemoryChatController` is, by its nature, **not persisted**. While simple to work with, its data will be lost when the application session ends.

## Non-Ordered Data Sources (Common for Persisted Controllers)

For persisted controllers, you will most likely be working with some form of database.

### Databases with Implicit Ordering (e.g., Auto-Increment Keys)

If your chosen database supports inherent ordering (for instance, through auto-incrementing primary keys), and you don't anticipate needing to insert messages into the middle of an existing conversation, this will work similarly to the `InMemoryChatController`. You won't be able to insert or update at a specific index, but you can still simply return the ordered data directly from the database.

:::tip[Offline-First Strategy]
Be mindful of potential complications if you are implementing an offline-first strategy with backend synchronization. If messages created offline need to be inserted into historical positions upon syncing, simple auto-increment keys can lead to collisions or an inability to correctly place messages, resulting in a problematic data state.
:::

### Databases with No Inherent Ordering

Many databases will not guarantee any specific order when you retrieve data. They operate without auto-increment keys or an intrinsic sense of sequence.

In this scenario:
*   You typically add new messages to the database without specifying a position.
*   You **cannot** reliably implement functions like `insertMessage({int? index})` or `insertAllMessages({int? index})` because there's no stable concept of an "index" directly from the database.

**Recommended Approach:**

1.  **Insertion**: Add messages to the database as they arrive.
2.  **Retrieval (`messages` getter)**:
    *   Fetch all relevant messages from your data source.
    *   **Sort** these messages based on a reliable key before returning them. A common and effective choice is a `createdAt` timestamp, serialized to milliseconds for precise ordering.
3.  **Benefits**:
    *   This approach consistently ensures the correct message order in your UI.
    *   It robustly handles offline-first scenarios. When syncing with a backend, new and historical messages can be seamlessly integrated and correctly ordered because the sorting logic remains consistent.

A practical example of this approach using Hive CE can be found in the example project - [HiveChatController](https://github.com/flyerhq/flutter_chat_ui/blob/main/examples/flyer_chat/lib/hive_chat_controller.dart).

:::danger[Updating and Removing Messages]
When working with a persisted controller that relies on sorting (especially with non-ordered underlying data sources), the following is absolutely crucial for data integrity:

**Before you update or remove a message in your database, you MUST:**

1.  Obtain the **latest sorted list** of messages (i.e., the list as returned by your `messages` getter after sorting).
2.  Find the index of the message you wish to update or remove **from this sorted list**.
3.  Use this index for your internal logic and to identify the correct message in the database.

**Why is this critical?** If you attempt to derive an index or identify a message directly from the (potentially unsorted) database without consulting your canonical sorted list, you risk operating on the wrong message. This can lead to data corruption, where updates are applied incorrectly, or the wrong messages are deleted. Always use the sorted list as your reference point for any index-sensitive operations.
:::
