# NativeScript Theme V1 to V2 Migration Guide

The new NativeScript Theme 2 has some breaking changes and this guide is here to help you with the transition process.

There are several key points that are different in Theme 2, so we are going to cover them here one by one.

1. To load the Theme now you need to import 2 files instead of just one. [learn more](#import-two-files-instead-of-one)
1. Theme 2 includes compat styling that uses old Theme 1 classes for styling [learn more](#compat-styling)
1. Still only one file to import if you create a custom skin. [learn more](#create-a-custom-skin-with-one-import)
1. Load all Theme 2 variables and mixins with just one file. [learn more](#load-all-variables-and-mixins)
1. Theme 2 is mostly using Element selectors for styling instead of classes. [learn more](#element-selectors)
1. Theme styling is meant to has lowest possible specificity, but not in dark mode. [learn more](#css-specificity)
1. There are still classes, but they are using a modified BEM syntax. [learn more](#classes-using-modified-bem)
1. There are several helper functions that you can use to style both light & dark modes. [learn more](#helper-functions)
1. There is a lightweight API to change between light/dark modes. [learn more](#mode-change-api)
1. Allmost all internal variables are export as custom CSS variables [learn more](#custom-css-variables)

## Import Two Files Instead of One

Theme 2 is divided in two files - core styling and skin. Core styling is needed for things like initial layout and 
sizing of NativeScript components, while the skin is defining the colors applied. The skin also exports all internal 
variables as CSS custom variables on the root view of the app and all modals (respectively .ns-root and .ns-modal classes).
In addition, there are no separate ios/android files, as there are very little differences between the styling of the
two platforms and also Theme 2 supports iOS/Android light/dark modes out of the box.

In Theme 1, you loaded the core.android.css/core.ios.css (or scss) depending on the platform, like this:

```css
@import "~nativescript-theme-core/css/core.android.css";
```
or

```css
@import "~nativescript-theme-core/css/blue.android.css";
```

to load the core or blue skins in Android. In Theme 2, you should change these imports to:

```css
@import "~@nativescript/theme/css/core.css";
@import "~@nativescript/theme/css/default.css";
```
for the core skin (now called `default`) or

```css
@import "~@nativescript/theme/css/core.css";
@import "~@nativescript/theme/css/blue.css";
```

for the `blue` skin. In addition, as you can see, the theme package is now scoped to @nativescript organization as are
the core modules.

To load SCSS in Theme 2, the imports are now a bit different:

```scss
@import "~@nativescript/theme/core";
@import "~@nativescript/theme/blue";
```

As you may notice - the files are now in the root of the Theme package as opposed to Theme 1, where they were in an 
scss folder.

## Compat Styling

If you prefer to use the old classes for styling, you can import `.compat` core theme and skin in order to do so.

```css
@import "~@nativescript/theme/css/core.compat.css";
@import "~@nativescript/theme/css/blue.compat.css";
```

or alternatively in SCSS

```scss
@import "~@nativescript/theme/core.compat";
@import "~@nativescript/theme/blue.compat";
```


## Create a Custom Skin with One Import

As Theme 1 before it, Theme 2 also allows customization through SCSS variables. However, due to changing its internals to
use maps, you can change the variables only before the rest of the Theme is loaded.

```scss
// Colors
$accent: #369;

// This color was named $ab-background in Theme 1
$complementary: fuchsia;

// Core styles
@import '~@nativescript/theme/index';
```

The code above is enough to create a custom skin with blue accent and pink ActionBar.

Here is a list of all variables that can be changed.

| SCSS variable | Type | Default | Usage
|---|---|---|---
| $compat | boolean | false | Specifies that compat styling should be generated
| $font-size | length | 12 | Initial font size in dip
| $btn-font-size | length | $font-size + 2 | Button font size
| $btn-min-width | length | 64 | Button min-width
| $btn-height | length | 52 | Button height
| $btn-padding-x | length | 5 | Horizontal button padding
| $btn-padding-y | length | 0 | Vertical button padding 
| $btn-margin-x | length | 16 | Horizontal button margin
| $btn-margin-y | length | 8 | Vertical button margin
| $border-width | length | 1 | Border width wherever it is used (buttons if `$enable-rounded` is on, inputs, `.hr`)
| $border-radius | length | null | General Border radius, could be in px, dip, % or rem/em (latter converts to dip), forces `$enable-rounded` to true
| $border-radius-sm | length | 4 | Small border radius, used for `.-rounded-sm` modifier 
| $border-radius-lg | length | 50% | Large border radius, used for `.-rounded-lg` modifier
| $disabled-opacity | 0 - 1 | 0.5 | Opacity of the disabled components 
| | | |
| $background| color | white | Light background 
| $primary | color | 85% negative $background | Light text color
| $secondary | color | 30% darker $primary | Light secondary text color
| $background-dark | color | #303030 | Dark background
| $primary-dark | color | 85% negative $background-dark | Dark text color
| $secondary-dark | color | 30% darker $primary-dark | Dark secondary text color
| $accent | color | #30bcff | Light main accent color (depends on {N} skin)
| $accent-dark | color | 10% lighter $accent | Dark main accent color (depends on {N} skin)
| $complementary | color | white | Light second accent color - used mainly for ActionBar (depends on {N} skin)
| $complementary-color | color | 100% negative $complementary | Text color on $complementary background (depends on {N} skin)
| $complementary-dark | color | $complementary | Dark second accent color (depends on {N} skin)
| $complementary-color-dark | color | 100% negative $complementary-dark | Text color on $complementary-dark background (depends on {N} skin)

In addition, several variables are mapped to the Theme variables in order to support Kendo skins or old Theme vars.

| Kendo Default | Kendo Bootstrap | Kendo Material | Theme 1 | Theme 2
|---|---|---|---|---
| $accent | $accent | $primary-palette-name, base hue 500 | $accent | $accent
| $accent | $card-cap-bg | $secondary-palette-name, base hue 500 | $ab-background | $complementary
| $bg-color | $body-bg | | $background | $background
| $text-color | $body-color | | $primary | $primary
| | | $material-dark-complimentary, base-bg | $btn-color | $btn-color  
| | | | $ab-color | $complementary-color

So now, you can export a skin from [Kendo UI ThemeBuilder](https://themebuilder.telerik.com), get the contents of 
variables.scss in the skin zip file (you don't need the big CSS file in there) and easily create a skin by the same 
single import underneath.

```scss
$base-theme:Bootstrap;
$skin-name:indigo;
$swatch-name:Indigo;
$border-radius: 0.25rem;
$accent: #25c55b;
$secondary: #465372;
$info: #5bc0de;
$success: #5cb85c;
$warning: #f0ad4e;
$error: #d9534f;
$body-bg: #5c7091;
$body-color: #ffffff;
$component-bg: #536182;
$component-color: #ffffff;
$card-cap-bg: #465372;
$card-cap-color: #ffffff;
$series-a: #25c55b;
$series-b: #5bc0de;
$series-c: #0275d8;
$series-d: #f0ad4e;
$series-e: #e67d4a;
$series-f: #d9534f;

@import '~@nativescript/theme/index';
```

> Note: When creating a custom skin you don't need to import any other file than `~@nativescript/theme/index` and 
it should be imported after you make changes to the variables!

## Load Variables and Mixins

In order to load all core Theme variables and mixins, you only need this import:

```scss
@import '~@nativescript/theme/scss/variables';
```

In addition, you can load the Theme variables and mixins for every skin.

```scss
@import '~@nativescript/theme/scss/variables/blue';
```

as opposed to

```scss
@import '~nativescript-theme-core/scss/light';
```

in Theme 1.

Also different from Theme 1 is the way you will access variables in SCSS - by using special functions that retrieve 
the variable from its place in the internal map. There are 3 such function `const()`, `light()` and `dark()`. Const
function is used to retrieve general variables, like colors or border-radius, for instance. The other two can be used
to retrieve specific light/dark variable. So this code with Theme 1:

```scss
.my-label {
    color: $ruby;
}
```

should be done like this in Theme 2:

```scss
.my-label {
    color: const(ruby);
}
```

Alternatively, using skin specific colors in Theme 1:

```scss
.my-label {
    background: $background;
}
```

should be replaced with:

```scss
.my-label {
    background: light(background);
}
```

or if you want to support dark mode:

```scss
.my-label {
    background-color: light(background);

    @at-root .ns-dark & {
        background-color: dark(background);    
    }
}
```

In addition Theme 2 provides a helper function to do setting both light and dark colors in one go, like this:

```scss
.my-label {
    colorize($background-color: background)
}
```

This snippet does the same as the one above it. You can read more about the helper functions later in the 
[Helper Functions](#helper-functions) part.

## Element Selectors

## CSS Specificity

## Classes Using Modified BEM

## Helper Functions

## Mode Change API

## Custom CSS Variables
