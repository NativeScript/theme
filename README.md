# NativeScript Core Theme

Home of the core NativeScript theme, currently **under active development**.

## Setup

Clone this repo, and then use the `tns run` command to launch the demo app on your device or emulator of choice.

```
tns run ios

// or

tns run android
```

## Toggle Theme
* Run the demo, scroll down to "Themes" at the bottom, toggle away

**Important Note**: This project uses a custom `nativescript-dev-sass.js` `before-prepare` hook, so never remove the `hooks` folder as that customization belongs with the repo. Also, notice that the project has no dependency on `nativescript-dev-sass` plugin to prevent the custom hook from getting overwritten.

