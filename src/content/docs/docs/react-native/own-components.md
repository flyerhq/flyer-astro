# Building Your Own Components

The primitives provided by `@flyerhq/react-native-chat-primitives` expose all
of the structure and accessibility features required for a chat interface, but
they purposely ship with no styling or animation. You are encouraged to
compose these building blocks into bespoke components that fit your app.

You can also take the opinionated components from
`@flyerhq/react-native-chat-ui` and extend them. Every part of the UI offers
style props or render callbacks so you can swap in your own implementation
whenever needed.

When crafting your own components you may want to:

- Apply your brand colors and typography. The easiest approach is to create your own theme and pass it to the `Chat` component.
- Wrap primitives in animated containers to provide custom transitions.
- Replace the default message bubble with an alternate design.
- Add gestures or behaviour tailored to your chat experience.
- Manage keyboard behavior for custom input adjustments.

The API is flexible enough to start with the provided components and gradually
replace them with your own creations as requirements grow.
