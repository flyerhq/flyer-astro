---
title: Dynamic Theming 🎨
description: This guide explains how to handle light/dark modes and customize the visual appearance of Flyer Chat using its theming system.
---

This guide explains how to handle light/dark modes and customize the visual appearance of Flyer Chat using its theming system.

## Automatic Dark Mode Support

Flyer Chat can adapt to the system's light or dark mode automatically. You have two main options:

1.  **Switch themes based on brightness:** Manually select `ChatTheme.light()` or `ChatTheme.dark()` depending on the current `Brightness`.
2.  **Use your app's `ThemeData`:** Pass your application's `ThemeData` to `ChatTheme.fromThemeData()` to automatically align Flyer Chat's styling.

```dart
@override
Widget build(BuildContext context) {
  // Option 1: Select theme based on system brightness
  final brightness = MediaQuery.platformBrightnessOf(context);
  final chatTheme = brightness == Brightness.dark
      ? ChatTheme.dark()
      : ChatTheme.light();

  // Option 2: Use theme derived from your app's ThemeData
  // final appTheme = Theme.of(context);
  // final chatTheme = ChatTheme.fromThemeData(appTheme);

  return Chat(
    // ...
    theme: chatTheme, // Pass the selected or derived theme
  );
}
```

## Customizing the Base Theme

You can modify the default light or dark themes using `copyWith`. This is useful for applying broad changes, like matching a brand color.

**Example 1: Changing a color for the currently active theme (light OR dark)**

If you have a `chatTheme` variable determined by brightness (as in the example above), using `copyWith` on it will modify whichever theme (`light` or `dark`) is currently active.

```dart
chatTheme.copyWith(
  colors: chatTheme.colors.copyWith(
    primary: Colors.red, // Changes primary for the active theme
  ),
);
```

**Example 2: Changing a color *only* for the light theme**

To target a specific mode, apply `copyWith` directly to the colors of `ChatTheme.light()` or `ChatTheme.dark()`. Alternatively, use the provided `withLightColors` or `withDarkColors` extensions.

```dart
final brightness = MediaQuery.platformBrightnessOf(context);
final chatTheme = brightness == Brightness.dark
  ? ChatTheme.dark() // Use default dark theme
  : ChatTheme.light().withLightColors(
      primary: Colors.red, // Primary is red only when light theme is active
    );
```

:::tip[Setting a Font Family]
Both `ChatTheme.dark()` and `ChatTheme.light()` constructors accept a `fontFamily` parameter. This allows you to easily set a custom font family for the entire chat UI, even if you don't use `ChatTheme.fromThemeData()`.
:::

## Widget-Specific Overrides

While `ChatTheme` sets the base style, you often need to customize individual widgets. Many default Flyer Chat widgets (like `SimpleTextMessage`, `FlyerChatTextMessage`, `FlyerChatImageMessage`, etc.) accept specific styling parameters that override the `ChatTheme`.

This is done using the `builders` parameter on the `Chat` widget.

**Example: Changing background color for sent text messages**

This overrides the theme's default background for sent messages without affecting the theme's `primary` color globally.

```dart
Chat(
  // ...
  builders: Builders(
    textMessageBuilder: (context, message, index) {
      return SimpleTextMessage(
        message: message,
        index: index,
        sentBackgroundColor: Colors.red,
      );
    },
  ),
  theme: chatTheme, // Base theme still applied
)
```

:::tip[Discovering Widget Parameters]
Explore the parameters accepted by each default widget usable within `builders` (like `SimpleTextMessage`, `FlyerChatTextMessage`, `FlyerChatImageMessage`, `Composer`, `ChatMessage`, etc.) to see the full range of available widget-specific customizations. If a customization you need isn't available via a parameter, please raise an issue on [GitHub](https://github.com/flyerhq/flutter-chat-ui/issues).
:::
