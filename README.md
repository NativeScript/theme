## NativeScript Themes

### Setup

```
tns emulate ios

// or

tns run android
```

**Important Note**: This project uses a custom `nativescript-dev-sass.js` `before-prepare` hook so never remove the `hooks` folder since that customization belongs with the repo. Also notice that the project has no dependency on `nativescript-dev-sass` plugin to prevent the custom hook from getting overwritten.

