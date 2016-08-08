# NativeScript Core Theme

Home of the core NativeScript theme, currently **under active development**.

## Setup

Clone this repo, and then use the `tns emulate` or `tns run` command to launch the demo app on your device or emulator of choice.

```
tns emulate ios

// or

tns run android
```

**Important Note**: This project uses a custom `nativescript-dev-sass.js` `before-prepare` hook, so never remove the `hooks` folder as that customization belongs with the repo. Also, notice that the project has no dependency on `nativescript-dev-sass` plugin to prevent the custom hook from getting overwritten.

