# NativeScript Theme: Core V2
[![npm](https://img.shields.io/npm/v/nativescript-theme-core.svg)](https://www.npmjs.com/package/nativescript-theme-core)
[![npm](https://img.shields.io/npm/dt/nativescript-theme-core.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-theme-core)

Home of the core NativeScript theme 2.0 beta. The documentation of the beta theme will live here, until it gets final.

- [Breaking Changes](#breaking-changes)
- [Usage](#usage)
- [Changing Core Theme](#changing-core-theme)
- [More Root Classes](#more-root-classes)
- [Helper Functions and Mixins](#helper-functions-and-mixins)
- [Kendo UI ThemeBuilder Support](#kendo-ui-themebuilder-support)
- [Theme Classes and Compatibility](#theme-classes-and-compatibility)
- [Why Beta](#why-beta)
- [Screenshots 📸](#screenshots)
- [Changelog 📝](https://github.com/NativeScript/theme/blob/master/CHANGELOG.md)
- [Contributing 🍺](#contributing)
- [Publishing 📚](#publishing)
- [Contributors 💖](#awesome-contributors)
- [License 📋](#license)

## Breaking changes

* The theme is now **applied using Element selectors**, if you need the old classes approach - it has moved to .compat CSS/SCSS files, e.g. `core.compat.css` and `blue.compat.css`.
* Theme 2.0 beta **requires some JavaScript to be loaded** which helps with the styling.
* Theme 2.0 replaces node-sass with **sass** which is more up to date feature-wise and doesn't have a native dependency. 

## Usage

The core theme supports light and dark core styling and skins on top of that. In order to use the 2.0 beta theme, 
you will also need to include a small JS file in your project:

```javascript
    import "nativescript-theme-core";
```

This JS takes care of updating several classes on the app root elements, until their 
[inclusion in tns-core-modules](https://github.com/NativeScript/NativeScript/issues/7313). 

To load the theme styling, just load the core and skin CSS:

```css
    @import "~nativescript-theme-core/css/core.css";
    @import "~nativescript-theme-core/css/blue.css";
```

or alternatively SCSS:

```scss
    @import "~nativescript-theme-core/core";
    @import "~nativescript-theme-core/blue";
```

The theme will style your application using Element selectors - you don't need to add CSS classes on every element you
need to style.

Additionally, if you need to create you own skin, you can start from the core theme - it includes the sizing and 
initial styling of the components without colorizing them too much.

## Changing Core Theme

Changing the core theme from light to dark is now easier - instead of loading a new file, just get the root view and 
set the `.ns-dark` class to it - this will change all colorization to dark tones. For instance, if your page root is 
RadSideDrawer, just add a class to it, like this:

```html
<drawer:RadSideDrawer class="ns-dark" xmlns:drawer="nativescript-ui-sidedrawer">
    ...
</drawer:RadSideDrawer>
```

If your root is a frame, you can do this

```html
<Frame class="ns-dark" defaultPage="root"></Frame>
```

You can also do it from JavaScript like this, for instance:

```javascript
import { getRootView } from "tns-core-modules/application";

getRootView().className += " ns-dark";
```

This of course won't remove your previously added classes. Also make sure the root view is already initialized by then.

For **Angular**, if your root is a `page-router-outlet`, you can set the .ns-dark class on it - it will pass it down to the 
Frame it renders. 

## More Root Classes

In addition to `.ns-light` and `.ns-dark` classes, the theme's little JavaScript file introduces `.ns-root` on the root element,
`.ns-android/.ns-ios` depending on the current platform (which the theme extensively uses) and additionally 
`.ns-portrait/.ns-landscape` and `.ns-phone/.ns-tablet`, which should be self-explanatory. 
Of course `.ns-portrait/.ns-landscape` get updated on orientation change, so you can use it to show a two pane layout 
in landscape, for instance. The newest addition is `.ns-statusbar-transparent` since 2.0.4 - add this class to your root 
element, if you have enabled transparent status bar in the OS and your ActionBar gets underneath it.   

## Helper Functions and Mixins

There are several functions and mixins in the core theme, that can be used in your projects, as long as you're using SASS/SCSS.

You can easily get light/dark colors:

```scss
Button {
    color: light(primary);

    .ns-dark & {
        color: dark(primary);
    }
}
```

or alternatively set them both in one go - does the same as the upper example:

```scss
Button {
    @include colorize($color: primary);
}
```

You can darken/lighten a color depending on its background (darken for light theme and lighten for dark theme):

```scss
Button {
    @include colorize($contrasted-border-color: focus background 20%);
}
```

The above example uses the contrasted function to check the contrast level of the background and adjust the lightness of 
the focus color (the accent) according to it.

## Kendo UI ThemeBuilder Support

The theme now supports inheriting the [Kendo UI ThemeBuilder](https://themebuilder.telerik.com/) theme variables. Just head
there, customize your Keno UI SASS theme and hit the Download button. You will get a ZIP with two files in it - the theme CSS 
that you can use to style your web app, and `variables.scss` - the one you need for your NativeScript theme. It will look 
something like this:

```scss
$base-theme:Default;
$skin-name:test;
$swatch-name:Default Purple;
$border-radius: 10px;
$accent: #bf70cc;
$info: #3e80ed;
$success: #5ec232;
$warning: #fdce3e;
$error: #d51923;
$text-color: #656565;
$bg-color: #ffffff;
$base-text: #656565;
$base-bg: #f6f6f6;
$hovered-text: #656565;
$hovered-bg: #ededed;
$selected-text: #ffffff;
$selected-bg: #bf70cc;
$series-a: #ff6358;
$series-b: #ffd246;
$series-c: #78d237;
$series-d: #28b4c8;
$series-e: #2d73f5;
$series-f: #aa46be;
```

Take this file, add the following row under it:

```scss
@import '~nativescript-theme-core/index';
```

And load the file after your core theme. It should just work&trade;. If it doesn't - head for the issues section.

## Theme Classes and Compatibility

The old generic theme classes have been retired to avoid clashes with user code. They now live in the .compat world - 
if you want to use them, you should load them separately, like this:

```scss
    @import "~nativescript-theme-core/core.compat";
    @import "~nativescript-theme-core/blue.compat";
```

There might be bugs with these in the beta, you might want to hold off upgrading if you want to use the old classes.

As of 2.0, the theme now utilizes a simplified BEM approach for the new element classes, that might be needed here or there.
For instance, the buttons need `.-primary` and `.-outline` modifiers, instead of the old `.btn-primary` and 
`.btn-outline` classes. All element classes (which are not needed by default, except if you want to style a component 
to look like another one) are namespaced, so for instance a button is `.nt-button`, an action bar is `.nt-action-bar` and a ListView is 
`.nt-list-view`.

## Why Beta

* Firstly, we want to gather feedback from the community and create a theme that is useful and if possible - beautiful.
* Secondly, the theme needs the classes inside the core modules to work properly without loading additional JavaScript.
* And thirdly - {N} core modules should have a way to propagate OS theme changes inside the app, so that it can act accordingly.

Hopefully these can be achieved until {N} 6.1. 

## Screenshots

![](screenshots/ios-1.png)
![](screenshots/ios-2.png)
![](screenshots/ios-3.png)
<br>
![](screenshots/android-1.png)
![](screenshots/android-2.png)
![](screenshots/android-3.png)

## Contributing

Clone this repo, and then use the `tns run` command to launch the demo app on your device or emulator of choice.

```
tns run ios

// or

tns run android
```

If you’d like to toggle the color scheme from light to dark, open the sidedrawer, scroll down to "Themes" at the bottom, and toggle away.

## Publishing

*NOTE*: Only authorized authors can publish updates.

**IMPORTANT**: Always make sure you have run the demo app in iOS or Android to verify any changes as well as ensure the latest `css` has been built before doing the following:

* Bump version in `nativescript-theme-core.json`
* Adjust `nativescript-theme-core.md` if any changes to the published `README` are needed.

```
npm run builder
cd nativescript-theme-core
npm publish
```

**IMPORTANT**: Never modify the contents of `nativescript-theme-core` folder directly. The builder creates that everytime and any change you make there will be overwritten.

Setup changelog generation:

```
npm install -g conventional-changelog-cli
```

Generate changelog workflow:

1. Make changes
2. Commit those changes - using [these conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153).
3. Make sure Travis turns green
4. Bump version in `package.json` and `nativescript-theme-core.json`
5. `conventional-changelog -p angular -i CHANGELOG.md -s`
6. Commit package.json and CHANGELOG.md files
7. Tag
8. Push

## Awesome Contributors

[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |[<img alt="TheOriginalJosh" src="https://avatars.githubusercontent.com/u/1486275?v=3&s=117" width="117">](https://github.com/TheOriginalJosh) |[<img alt="tjvantoll" src="https://avatars.githubusercontent.com/u/544280?v=3&s=117" width="117">](https://github.com/tjvantoll) |[<img alt="NathanaelA" src="https://avatars.githubusercontent.com/u/850871?v=3&s=117" width="117">](https://github.com/NathanaelA) |[<img alt="triniwiz" src="https://avatars.githubusercontent.com/u/6695919?v=3&s=117" width="117">](https://github.com/triniwiz) |[<img alt="sis0k0" src="https://avatars.githubusercontent.com/u/7893485?v=3&s=117" width="117">](https://github.com/sis0k0) |
:---: |:---: |:---: |:---: |:---: |:---: |
[NathanWalker](https://github.com/NathanWalker) |[TheOriginalJosh](https://github.com/TheOriginalJosh) |[tjvantoll](https://github.com/tjvantoll) |[NathanaelA](https://github.com/NathanaelA) |[triniwiz](https://github.com/triniwiz) |[sis0k0](https://github.com/sis0k0) |
[<img alt="sitefinitysteve" src="https://avatars.githubusercontent.com/u/1542376?v=3&s=117" width="117">](https://github.com/sitefinitysteve) |[<img alt="vakrilov" src="https://avatars.githubusercontent.com/u/4092076?v=3&s=117" width="117">](https://github.com/vakrilov) |[<img alt="bradmartin" src="https://avatars.githubusercontent.com/u/6006148?v=3&s=117" width="117">](https://github.com/bradmartin) |[<img alt="firescript" src="https://avatars.githubusercontent.com/u/1789978?v=3&s=117" width="117">](https://github.com/firescript) |[<img alt="valentinstoychev" src="https://avatars.githubusercontent.com/u/4980822?v=3&s=117" width="117">](https://github.com/valentinstoychev) |[<img alt="enchev" src="https://avatars.githubusercontent.com/u/5804953?v=3&s=117" width="117">](https://github.com/enchev) |
[sitefinitysteve](https://github.com/sitefinitysteve) |[vakrilov](https://github.com/vakrilov) |[　bradmartin　](https://github.com/bradmartin) |[　firescript　　](https://github.com/firescript) |[valentinstoychev](https://github.com/valentinstoychev) |[　　enchev　　](https://github.com/enchev) |
[<img alt="bundyo" src="https://avatars.githubusercontent.com/u/98318?s=117" width="117">](https://github.com/bundyo) | | | | | |
[　　bundyo　　](https://github.com/bundyo) | | | | | |

## LICENSE

Apache 2.0
