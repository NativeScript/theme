# NativeScript Theme: Core

Core NativeScript theme including a light (default) and dark option for iOS and Android.

## Install

`npm install nativescript-theme-core --save`

## Documentation

https://github.com/NativeScript/theme/wiki/Documentation

## License

This is Licensed under the Apache License

## CSS

By default we will automatically add an import of the **light** theme in your `app/app.css` file; if you would like the **dark** them you can change the first line in your app.css file from 
 `@import '~/css/core.light.css';` to `@import '~/css/core.dark.css'; `
 
## SCSS Support

If your project is using SCSS, then we will create a `scss` folder with the same light and dark theme in `scss` format. You can then import from the `scss` folder.
If you are not using SCSS, we won't bother installing this folder. If you decide to use SCSS at a later point just install the [nativescript-dev-sass](https://github.com/toddanglin/nativescript-dev-sass) project and reinstall this theme and we will automatically detect the SASS support. 