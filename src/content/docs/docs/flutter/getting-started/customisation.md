---
title: Customisation 🎨
---

Flyer Chat offers several ways to tailor the chat interface to your needs:

## 1. Using `ChatTheme`

Adjust the overall look and feel by passing a `ChatTheme` object to the `Chat` widget. This controls:

*   **Colors**:
    *   Quickly match your brand by overriding Material theme colors (`primary`, `surface`, etc.).
    *   Use `ChatTheme.light()` / `ChatTheme.dark()` for light/dark themes.
    *   Use `ChatTheme.fromThemeData()` to automatically sync with your app's `ThemeData`.
    *   Use `copyWith` to selectively customize specific properties.
*   **Typography**:
    *   Provide custom `TextStyle`s for `body` and `label` styles for consistent text rendering.
*   **Shape**:
    *   Set message bubble `borderRadius` via the `shape` property (e.g., `shape: BorderRadius.zero`).
    *   Note: Affects only message bubbles; other elements like the composer require separate styling.

## 2. Using `Builders`

For more control over specific UI parts, use the `builders` parameter on the `Chat` widget:

*   It provides numerous builder functions, each targeting a specific UI element (composer, message types, message bubble, etc.).
*   Use these builders to replace default components with your own custom widgets.
*   Builder names are self-descriptive (e.g., `composerBuilder`, `textMessageBuilder`), indicating the part they control.
*   This allows fundamental changes to the chat's look and behavior.

## 3. Using Parameters within Default Widgets

Often, you only need to tweak default Flyer Chat widgets (`FlyerChatImageMessage`, `Composer`, etc.) using their parameters, rather than replacing them entirely with a builder.

*   **General Idea**: Most default widgets provided by Flyer Chat accept parameters for fine-tuning.
*   **Example: `FlyerChatImageMessage`**: Pass parameters like `borderRadius`, `placeholderColor`, `loadingIndicatorColor`, `showStatus`, etc., to adjust its appearance when used (e.g., inside an `imageMessageBuilder`).
*   **Example: `Composer`**: When using the default `Composer` (e.g., via `composerBuilder`), it offers numerous parameters for customization (e.g., `hintColor`, `focusNode`, `topWidget`, `backgroundColor` and many more).
*   **Example: `ChatMessage`**:
    *   Customize the default `ChatMessage` (used via `chatMessageBuilder`) with parameters like `leadingWidget`, `trailingWidget`, `topWidget`, `bottomWidget`, and many others.
    *   Crucially, the `chatMessageBuilder` receives the specific `message` object.
    *   This allows inspecting message properties (author, type, metadata) to conditionally customize the output (e.g., pass different parameters, add specific widgets).
    *   Offers highly flexible, per-message layout possibilities.

Combine these methods to achieve your desired look and feel. Always check the specific parameters available on the default widgets and builders for the full range of options.
