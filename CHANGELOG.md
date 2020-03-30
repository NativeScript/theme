<a name="2.3.3"></a>
## [2.3.3](https://github.com/NativeScript/theme/compare/v2.3.2...v2.3.3) (2020-03-17)

### Fixes

* Fix wrong ActionBar colors, introduced with node-sass fix
* Fix missing bootstrap bg-primary accented background-color 

<a name="2.3.2"></a>
## [2.3.2](https://github.com/NativeScript/theme/compare/v2.2.1...v2.3.2) (2020-02-20)

### Fixes

* CSS variables output with **node-sass** is causing crashes

<a name="2.3.1"></a>
## [2.3.1](https://github.com/NativeScript/theme/compare/v2.2.1...v2.3.1) (2020-01-13)

### Features

* Add support for hard changing the mode in {N} 6.2+ (Theme.Light/Theme.Dark/Theme.Auto).
* toggleMode now takes into account systemAppearance to decide the alternate mode (6.2+).

<a name="2.2.1"></a>
## [2.2.1](https://github.com/NativeScript/theme/compare/v2.2.0...v2.2.1) (2019-11-13)

### Features

* Add default style for modal dialogs

<a name="2.2.0"></a>
## [2.2.0](https://github.com/NativeScript/theme/compare/v2.1.2...v2.2.0) (2019-10-29)

### Breaking changes

* Separate default core styling again to reduce the core CSS with 20k

### Features

* Ship pre-parsed JSON files for all CSS (used with css2json-loader)
* Return $accent input variable, use $focus as internal abstraction
* Rename $ab-background and $ab-color to respectively $complementary and $complementary-color, keep backwards compatibility
* Introduce $...-dark input colors to be able to override the main dark mode colors specifically 

### Fixes

* Stop importing view-common in app, use view instead
* Add more padding to action items
* Make the dark complementary color closer to the light one
* Make HtmlView white in dark mode, as its internal colors are currently not dependent on mode
* Fix PickerField modal in dark mode
* Fix SegmentedBar selection colors (it doesn't support changing the color in selected state)

<a name="2.1.2"></a>
## [2.1.2](https://github.com/NativeScript/theme/compare/v2.1.1...v2.1.2) (2019-10-16)

### Features

* Make the Button color modifiers work as such (applies to primary and outline buttons)

### Fixes

* Fix the iOS landscape custom ActionBar items displacement
* Fix the not properly distributed custom ActionBar title and iOS buttons
* Update blue skin accent color (to blue:)
* Make the outline button borders use accent color
* Return the thumb/-thumb classes for Listview (Playground compatibility)
* Fix app-compat to use scoped packages
* Make the default Image height only 20pt
* Increase the side drawer header padding
* Add -circle class to complement -rounded/rounded
* Fix the esm to cjs transpilation (was breaking Angular projects in Playground)

### Potential breaking changes

* Remove border-radius-rounded variable - use border-radius-sm instead (they had 1pt difference).

<a name="2.1.1"></a>
## [2.1.1](https://github.com/NativeScript/theme/compare/v2.1.0...v2.1.1) (2019-10-14)

### Features

* Export CSS variables in Core CSS

### Fixes

* Fix divider colors
* Add 5pt Button default padding
* Remove default font-weight from .ns-root
* Fix vertical SideDrawer header centering in iOS - remove height, use padding

### Breaking changes

* Remove default FontAwesome 4 rule as it doesn't belong in the theme. Leave it for compat mode.

<a name="2.1.0"></a>
## [2.1.0](https://github.com/NativeScript/theme/compare/v2.0.24...v2.1.0) (2019-10-11)

Version 2.0.24 Beta was promoted to stable and was published as a scoped @nativescript/theme package.

<a name="2.0.24 beta"></a>
## [2.0.24 beta](https://github.com/NativeScript/theme/compare/v2.0.23...v2.0.24) (2019-10-10)

### Features

* Add platform API classes in .ns-{platform}-{sdkVersion} format to the root element, which should allow
 targeting both platform and sdkVersion
* Make .hr to depend on background color by default

### Fixes

* Fix SideDrawer styling to be more like in templates
* Update Kendo skin colors to be more alike their web counterparts
* Fix .ns-statusbar-transparent to not target or break API 19
* Fix compat theme setting in app
* Make sure app-compat to target compat theming with the variable

<a name="2.0.23 beta"></a>
## [2.0.23 beta](https://github.com/NativeScript/theme/compare/v2.0.22...v2.0.23) (2019-09-30)

### Fixes

* Don't set default colors to labels, as it overrides dialog colors in iOS
* Make the ActionBar colors defaults so they can be overridden

<a name="2.0.22 beta"></a>
## [2.0.22 beta](https://github.com/NativeScript/theme/compare/v2.0.21...v2.0.22) (2019-09-26)

### Fixes

* Added a workaround for node-sass still not getting updated to 3.6.x - to be able to import variables
as listed in the README
* Fix large border-radius not applied in iOS, up the small to 4pt (to differ from Android defaults) (thanks @kulikala)
* Remove the default Image margin - not needed and confusing
* Sync app and app-compat, some housekeeping

<a name="2.0.21 beta"></a>
## [2.0.21 beta](https://github.com/NativeScript/theme/compare/v2.0.20...v2.0.21) (2019-09-21)

### Features

* Add focus state support for the RadDataForm
* Adjust RadAutoCompleteTextView paddings after its CSS fixes in 5.1.1

### Fixes

* Remove bold from ActionBar title to make it consistent across OSes
* Fix .action-bar-title in compat
* Fix the missing Roboto font in iOS - font now set to sans-serif normal
* Fix RadAutoCompleteTextView clear button in iOS

<a name="2.0.20 beta"></a>
## [2.0.20 beta](https://github.com/NativeScript/theme/compare/v2.0.19...v2.0.20) (2019-09-13)

### Fixes

* Fix a node-sass incompatibility

<a name="2.0.19 beta"></a>
## [2.0.19 beta](https://github.com/NativeScript/theme/compare/v2.0.18...v2.0.19) (2019-09-13)

### Features

* Export CSS variables to .ns-modal too

<a name="2.0.18 beta"></a>
## [2.0.18 beta](https://github.com/NativeScript/theme/compare/v2.0.17...v2.0.18) (2019-09-12)

### Features

* Apply a default skin over the Core theme, similar to core in 1.x
* Add styling for custom ActionBar (GridLayout, Label and Buttons in the TitleView), check the example

### Fixes

* Fix some issues in the app
* Move all colorization in the skins
* Fix some issues in Slider, SearchBar, SegmentedBar
* Fix the aqua accent

<a name="2.0.17 beta"></a>
## [2.0.17 beta](https://github.com/NativeScript/theme/compare/v2.0.16...v2.0.17) (2019-09-06)

### Features

* Export all variable maps to CSS variables. Check the [README.md](README.md#css-variables) for a full list.
* Revise font-sizes, make them the same for both platforms

### Fixes

* Fix the modal ActionBar with ns-statusbar-transparent
* Fix the aqua skin colors
* Revamp the Button animations to work in ActionBar
* Return accent var in maps
* Remove the ghost StackLayout padding in RadListView

<a name="2.0.16 beta"></a>
## [2.0.16 beta](https://github.com/NativeScript/theme/compare/v2.0.15...v2.0.16) (2019-09-04)

### Features

* Add .t-36 class

### Fixes

* Fix the dark DateTimePicker's missing icons
* Fix a crash on orientation change

<a name="2.0.15 beta"></a>
## [2.0.15 beta](https://github.com/NativeScript/theme/compare/v2.0.14...v2.0.15) (2019-09-04)

### Fixes

* Fix TextField borders
* Compat fixes

<a name="2.0.14 beta"></a>
## [2.0.14 beta](https://github.com/NativeScript/theme/compare/v2.0.13...v2.0.14) (2019-09-03)

### Features

* Add typings to make Angular projects in Playground happy

### Fixes

* Fix setMode resets the classes set manually on root

<a name="2.0.13 beta"></a>
## [2.0.13 beta](https://github.com/NativeScript/theme/compare/v2.0.12...v2.0.13) (2019-09-03)

### Fixes

* Workaround the folder issue in Playground

<a name="2.0.12 beta"></a>
## [2.0.12 beta](https://github.com/NativeScript/theme/compare/v2.0.11...v2.0.12) (2019-09-03)

### Features

* Add scss/variables folder with SCSS skin variables for easier import  
* Add variable map for generic variables, accessible with const()
* Add toggleMode to the API with optional boolean state enforcer, used like this:

```javascript
    import Theme from 'nativescript-theme-core';

    Theme.toggleMode(); // to toggle between the modes

    // or

    Theme.toggleMode(true);  // to ensure dark mode
    Theme.toggleMode(false); // to ensure light mode
```

### Fixes

* Fix dark mode for Switches and several other components
* Fix ActionBar Label title background, fix dark buttons
* Fix the colorize function to produce better organized code, to work with consts and to properly 
    prepend .ns-dark on root classes

<a name="2.0.11 beta"></a>
## [2.0.11 beta](https://github.com/NativeScript/theme/compare/v2.0.10...v2.0.11) (2019-09-01)

### Features

* Add JS transpilation to work in non-transpiling projects and Playground 

### Fixes

* Fix setMode in Playground
* Move bootstrap-based skin outside of theme-core to make the theme importable in Playground

<a name="2.0.10 beta"></a>
## [2.0.10 beta](https://github.com/NativeScript/theme/compare/v2.0.9...v2.0.10) (2019-09-01)

### Features

* Revise the Button styling, now all buttons have elevation in Android

### Fixes

* Fix the missing root view crash
* Only load root class modifier if no support in core modules
* Fix the jumping iOS Switch
* Fix the Switch styling

<a name="2.0.9 beta"></a>
## [2.0.9 beta](https://github.com/NativeScript/theme/compare/v2.0.8...v2.0.9) (2019-08-29)

### Features

* Add small API for setMode. Usage:

    ```javascript
    import Theme from "nativescript-theme-core";
    
    Theme.setMode(Theme.Dark); // Or Theme.Light
    ```
    
    It would set light or dark mode even before the app is initialized.

### Fixes

* Simplify ClassList, use Set
* Fix dark mode for TabView, BottomNavigation and Tabs if they are root views

<a name="2.0.8 beta"></a>
## [2.0.8 beta](https://github.com/NativeScript/theme/compare/v2.0.7...v2.0.8) (2019-08-28)

### Fixes

* Remove folder imports while the Playground has issues with them

<a name="2.0.7 beta"></a>
## [2.0.7 beta](https://github.com/NativeScript/theme/compare/v2.0.6...v2.0.7) (2019-08-28)

### Fixes

* Fix headings
* Fix the RadAutoCompleteTextView iOS TokenClearButton
* Fix compat .btn styling, other compat fixes

<a name="2.0.6 beta"></a>
## [2.0.6 beta](https://github.com/NativeScript/theme/compare/v2.0.5...v2.0.6) (2019-08-22)

### Features

* Add styling and demo for nativescript-ui-autocomplete

### Maintenance

* Fix the bootstrap links in the bootstrap-based theme (Playground compatibility)
* Update dependencies

<a name="2.0.5 beta"></a>
## [2.0.5 beta](https://github.com/NativeScript/theme/compare/v2.0.4...v2.0.5) (2019-07-30)

### Maintenance

* Remove PostCSS loader, as it doesn't do anything at this point
* Fix the repo URL 

<a name="2.0.4 beta"></a>
## [2.0.4 beta](https://github.com/NativeScript/theme/compare/v2.0.0...v2.0.4) (2019-07-30)

### Maintenance

* All SASS imports are now from same folder qualifiers to allow working in a folder (e.g. in Playground) 

<a name="2.0.0 beta"></a>
## [2.0.0 beta](https://github.com/NativeScript/theme/compare/1.0.4...v2.0.0) (2019-07-17)

### Breaking Changes

* The theme is now **applied using Element selectors**, for instance Button, Label, etc. This means it will style the app it is added to directly, without the need to add classes to every element. The old classes are moved to .compat CSS/SCSS. New namespaced classes are introduced to avoid clashes with user CSS.
* The theme supports a core light or dark theme and skins on top of it - **2 files should be imported for it to work**. A simple change of a class on root level controls if the core theme is light or dark. Skins can be changed on the fly, without changing the core theme. However special steps are needed with the new Webpack workflow. 
* Theme 2.0 beta **requires some JavaScript to be loaded** which helps with the styling. It should be included in [core modules](https://github.com/NativeScript/NativeScript/issues/7313) before the theme goes final.
* Theme 2.0 replaces node-sass with **dart-sass** which is more up to date feature-wise and doesn't have a native dependency. 

### Features

* Introduced several classes that are set on the root view and used to control light/dark theme and other platform features.
* Several helper SASS functions and mixins are introduced to ease app/component styling
* Theme is now compatible with Kendo UI ThemeBuilder, allowing for shared Web/Mobile themes
* Added styling for the new Tabs and BottomNavigation.
* Added styling for several nativescript-ui components that are CSS stylable - RadListView, RadDataForm.
* Added styling for nativescript-picker and nativescript-datetimepicker components.

<a name="1.0.4"></a>
## [1.0.4](https://github.com/NativeScript/theme/compare/1.0.3...v1.0.4) (2017-04-18)

### Maintenance

* maintenance release

<a name="1.0.3"></a>
## [1.0.3](https://github.com/NativeScript/theme/compare/1.0.2...v1.0.3) (2017-03-01)


### Bug Fixes

* **ListView:** dark skin ListView background ([79d5d8e](https://github.com/NativeScript/theme/commit/79d5d8e))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/NativeScript/theme/compare/1.0.1...v1.0.2) (2016-12-06)


### Bug Fixes

* 2.4.0 is minimum required version ([b399a3d](https://github.com/NativeScript/theme/commit/b399a3d))
* forms spacing when same controls are used in a vertical stack ([ce9db89](https://github.com/NativeScript/theme/commit/ce9db89))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/NativeScript/theme/compare/1.0.0...v1.0.1) (2016-11-27)


### Bug Fixes

* **ActionBar:** action-bar-title vertical-align centered for android, plus name migrate in platform ([e7a96c3](https://github.com/NativeScript/theme/commit/e7a96c3))


### Features

* **Colors:** add color classes for color/background-color with demo page ([997b336](https://github.com/NativeScript/theme/commit/997b336))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/NativeScript/theme/compare/109baea...1.0.0) (2016-11-23)


### Bug Fixes

* add node-sass dep ([453d8c0](https://github.com/NativeScript/theme/commit/453d8c0))
* android button shadow/border, updated demo app to 2.4.0 ([46369ba](https://github.com/NativeScript/theme/commit/46369ba))
* correct version in compiled css for published versions ([d8ab630](https://github.com/NativeScript/theme/commit/d8ab630))
* custom sass hook ([69166e0](https://github.com/NativeScript/theme/commit/69166e0))
* dark skin for list view and custom actionbar ([9ed6676](https://github.com/NativeScript/theme/commit/9ed6676))
* demo styles no longer published with compiled css ([4ab677d](https://github.com/NativeScript/theme/commit/4ab677d))
* drawer for demo ([#50](https://github.com/NativeScript/theme/issues/50)) ([346fef8](https://github.com/NativeScript/theme/commit/346fef8))
* gitignore ([53ec861](https://github.com/NativeScript/theme/commit/53ec861))
* listview ([109baea](https://github.com/NativeScript/theme/commit/109baea))
* postinstall ([19bdd3f](https://github.com/NativeScript/theme/commit/19bdd3f))
* print correct version on publish ([571a41b](https://github.com/NativeScript/theme/commit/571a41b))
* switch disabled on ([65df221](https://github.com/NativeScript/theme/commit/65df221))
* tabs setup ([a8d4f20](https://github.com/NativeScript/theme/commit/a8d4f20))
* text fixes ([6c956b5](https://github.com/NativeScript/theme/commit/6c956b5))
* theme page ([6cbc4ad](https://github.com/NativeScript/theme/commit/6cbc4ad))
* theme skins now apply properly ([4979153](https://github.com/NativeScript/theme/commit/4979153))
* **ActionBar:** action-bar-title ([4e5eb2c](https://github.com/NativeScript/theme/commit/4e5eb2c))
* **js:** Append theme sheet to app.css ([#102](https://github.com/NativeScript/theme/issues/102)) ([15b9695](https://github.com/NativeScript/theme/commit/15b9695))
* **ListView:** item padding/margin fixes ([b382028](https://github.com/NativeScript/theme/commit/b382028))


### Features

* **ci:** Set up travis build ([#103](https://github.com/NativeScript/theme/issues/103)) ([64fbf30](https://github.com/NativeScript/theme/commit/64fbf30))
* build support for distribution ([#61](https://github.com/NativeScript/theme/issues/61)) ([1397438](https://github.com/NativeScript/theme/commit/1397438))
* **Organization:** renaming and organization of theme files per discussion ([08552a9](https://github.com/NativeScript/theme/commit/08552a9))
* forms and demo app improvements ([#51](https://github.com/NativeScript/theme/issues/51)) ([e6eda4d](https://github.com/NativeScript/theme/commit/e6eda4d))
* **Page:** page level classes ([cc625d8](https://github.com/NativeScript/theme/commit/cc625d8))
* **Skins:** ActionBar skins with theme'd sets ([#108](https://github.com/NativeScript/theme/issues/108)) ([3e7b2b8](https://github.com/NativeScript/theme/commit/3e7b2b8))
* **Skins:** theme aware classes, also fixes to button styles for android ([8580319](https://github.com/NativeScript/theme/commit/8580319))
* actionbar improvements. modal to test out action-bar class on custom setup. also fixed errors with demo. ([525200b](https://github.com/NativeScript/theme/commit/525200b))
* base color variables, label classes, and beginning actionbar ([063ac15](https://github.com/NativeScript/theme/commit/063ac15))
* multiples of 4 spacing utility classes, also heading variables ([7c27856](https://github.com/NativeScript/theme/commit/7c27856))
* pages for forms, sliders, switches ([3840497](https://github.com/NativeScript/theme/commit/3840497))
* pages for other components ([999fc9b](https://github.com/NativeScript/theme/commit/999fc9b))
* platform specific base ([ff13779](https://github.com/NativeScript/theme/commit/ff13779))
* text utility classes ([d5b4b37](https://github.com/NativeScript/theme/commit/d5b4b37))


### BREAKING CHANGES

* ActionBar: action-title > action-bar-title

  Before:

  ```
  <Label class=“action-title”></Label>
  ```

  After:

  ```
  <Label class=“action-bar-title”></Label>
  ```



