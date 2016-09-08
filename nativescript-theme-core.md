# NativeScript Theme: Core

Core NativeScript theme including a light (default) and dark option for iOS and Android.

## Install

`npm install nativescript-theme-core --save-dev`

## Documentation

https://github.com/NativeScript/theme/wiki/Class-Names

## License

This is Licensed under the Apache License

## CSS

By default we will automatically add an import of the **light** theme in your `app/app.css` file; if you would like the **dark** them you can change the first line in your app.css file from 
 `@import '~/css/core.light.css';` to `@import '~/css/core.dark.css'; `
 
## SCSS Support

If your project is using SCSS, then we will create a SCSS folder with the same Light and Dark theme in SCSS format, you can import them from `SCSS folder
If you are not using SCSS we won't bother installing this folder.  If you decide to use SCSS at a later point just install the 'nativescript-dev-sass' project and reinstall this theme and we will automatically detect the SASS support. 