# NativeScript Theme V1 to V2 Migration Guide

The new NativeScript Theme v2 introduces some breaking changes and this guide is here to help you with the transition process.

There are several key points that are different in NativeScript Theme v2, so we are going to cover them here one by one.

1. Loading Theme v2 now requires import of two files instead of just one. [learn more](#import-two-files-instead-of-one)
1. Theme v2 includes compat styling support that uses old Theme v1 classes for styling [learn more](#compat-styling)
1. Still only one file to import if you create a custom skin. [learn more](#create-a-custom-skin-with-one-import)
1. Load all Theme v2 variables and mixins with just one file. [learn more](#load-all-variables-and-mixins)
1. Theme v2 mostly uses Element selectors for styling instead of classes. [learn more](#element-selectors)
1. Theme v2 styling is meant to have lowest possible specificity, but not in dark mode. [learn more](#css-specificity)
1. There are still classes, but they are using a modified BEM syntax. [learn more](#classes-using-modified-bem)
1. There are several helper functions that you can use to style both light & dark modes. [learn more](#helper-functions)
1. There is a lightweight API to change between light/dark modes. [learn more](#mode-change-api)
1. Almost all internal variables are export as custom CSS variables [learn more](#custom-css-variables)

## Import Two Files Instead of One

Theme v2 functionality is divided in two files - core styling and skin. Core styling is necessary for things like initial layout and sizing of NativeScript components, while the skin defines the applied colors. The skin also exports all internal 
variables as CSS custom variables on the app root view and all modal dialogs (respectively `.ns-root` and `.ns-modal` classes). In addition, there are no separate ios/android files, as there are very few differences between the styling of the
two platforms; Theme v2 also supports iOS/Android light/dark modes out of the box.

In Theme v1, you loaded the core.android.css/core.ios.css (or scss) depending on the platform, like this:

```css
@import "~nativescript-theme-core/css/core.android.css";
```
or

```css
@import "~nativescript-theme-core/css/blue.android.css";
```

to load the core or blue skins in Android. In Theme v2, you should change these imports to:

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

To load SCSS in Theme v2, the imports are now a bit different:

```scss
@import "~@nativescript/theme/core";
@import "~@nativescript/theme/blue";
```

As you may notice - the files are now in the root of the Theme package as opposed to Theme v1, where they were in an 
scss folder.

## Compat Styling

If you prefer to use the old styling mechanism with classes, you can import `.compat` core theme and skin in order to do so.

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

As Theme v1 before it, Theme v2 also allows customization through SCSS variables. However, due to changing its internals to
use maps, you can change the variables only before the rest of the Theme is loaded.

```scss
// Colors
$accent: #369;

// This color was named $ab-background in Theme v1
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

| Kendo Default | Kendo Bootstrap | Kendo Material | Theme v1 | Theme v2
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

in Theme v1.

Also different from Theme v1 is the way you will access variables in SCSS - by using special functions that retrieve 
the variable from its place in the internal map. There are 3 such function `const()`, `light()` and `dark()`. Const
function is used to retrieve general variables, like colors or border-radius, for instance. The other two can be used
to retrieve specific light/dark variable. So this code with Theme v1:

```scss
.my-label {
    color: $ruby;
}
```

should be done like this in Theme v2:

```scss
.my-label {
    color: const(ruby);
}
```

Alternatively, using skin specific colors in Theme v1:

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

In addition Theme v2 provides a helper mixin to do setting both light and dark colors in one go, like this:

```scss
.my-label {
    colorize($background-color: background)
}
```

This snippet does the same as the one above it. You can read more about the helper functions and the mixin later in
the [Helper Functions](#helper-functions) section.

## Element Selectors

Theme v1 was using specific classes that the user had to add on every element in order to get it styled. Theme v2
takes a very different approach - all elements are styled by default using Element selectors (like `ActionBar {}` or 
`RadListView` for instance) and adding classes is not required. This brings us to something you may hit along the 
way - since all elements are already styled, you may need to override some of their styling. And since NativeScript 
doesn't support !important, you can do this with a CSS feature called specificity. 

## CSS Specificity

CSS specificity determines the weight a CSS selector has and if it can override another one. Here is 
an [excellent article](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/) on the 
subject, but TLDR; it boils down to this table: 

| Selector Type | Specificity
|---|---
| Element | 1
| Class, Pseudo, Attribute | 10
| ID | 100
| Inline CSS | 1000

Count every type of selector in your rule and what you get is the weight of this selector over the rest. 
Also keep in mind that with selectors with the same weight, wins the one further down the stylesheet or 
in one of the next CSS files loaded. For instance here:

```css
Label {
    color: red;
}

Label {
    color: green;
}
```

wins green because specified later, but here:

```css
.ns-root Label {
    color: red;
}

Label {
    color: green;
}
```

wins red, due to higher specificity of 11. For this reason keep in mind, that in Theme v2 dark styling starts with
specificity 11 due to its starting `.ns-dark` class.

## Classes Using Modified BEM

The old Theme v1 classes are gone (except in `compat` mode), but there are new classes in their place that use a 
namespaced modified BEM methodology. These are left for the cases in which you want a custom component or for instance 
Label to look like the original ones. For instance the old `.action-bar` class is now called `.nt-action-bar` and 
the old `.action-item` is now `.nt-action-bar__item` where `nt-` is the NativeScript Theme namespace. The only 
difference from a standard [BEM methodology](http://getbem.com/) is that instead of coupling modifiers to the blocks,
in Theme v2 modifiers are decoupled and start with a dash.

A list of the new blocks follows:

| Blocks and Elements | Compat (Theme v1) class | {N} Elements
|---|---|---
| .nt-action-bar | .action-bar | ActionBar
| .nt-action-bar__item | .action-item | ActionItem 
| .nt-button | .btn | Button 
| .nt-label | .label | Label 
| .nt-page | .page | Page  
| .nt-activity-indicator | .activity-indicator | ActivityIndicator 
| .nt-segmented-bar | .segmented-bar | SegmentedBar 
| .nt-progress | .progress | Progress 
| .nt-slider | .slider | Slider 
| .nt-search-bar | .search-bar | SearchBar
| .nt-switch | .switch | Switch 
| .nt-tab-view | .tab-view | TabView 
| .nt-list-view | .list-group | ListView, RadListView
| .nt-form | .form | A group of form elements 
| .nt-input | .input-field | A block of a TextField with a Label
| .nt-drawer | .side-drawer | RadSideDrawer
| .nt-drawer__header | .sidedrawer-header | RadSideDrawer header area
| .nt-drawer__header-image | .sidedrawer-header-image | RadSideDrawer header image (user thumb)
| .nt-drawer__list-item | .sidedrawer-list-item | RadSideDrawer list item
| .nt-drawer__content | | RadSideDrawer content area
| .nt-icon | | An icon
| .nt-bottom-navigation | | BottomNavigation
| .nt-tab-strip | | TabStrip
| .nt-tab-strip__item | | TabStripItem 
| .nt-tab-content__item | | TabContentItem 

Here is a list of modifiers and where they work:

| Modifiers | Compat (Theme v1) class | Elements they Work on | What it Does
|---|---|---|---
| .-primary | .btn-primary | Buttons | Specifies a primary (accent colored) button
| .-outline | .btn-outline | Buttons | Specifies an outlined button
| .-simple | .btn-simple | Buttons | Specifies a simple (transparent) button 
| .-active | .btn-active | Buttons | Specifies activated by default button (as if pressed) 
| .-rounded-sm | .btn-rounded-sm | Buttons, TextFields | Specifies a small border radius for the element (default 4)
| .-rounded-lg | .btn-rounded-lg / .input-rounded | Buttons, TextFields | Specifies a large border radius for the element (default 50%)
| .-{skin} | .btn-{skin} | Buttons | Specifies a skin accent colored button - like `.-ruby`, `.-forest`, etc.
| .-border | .input-border | TextFields | Specifies a TextField with border on all sides
| .-sides | .input-sides | TextFields | Specifies an .nt-input/.input-field with Label on the left side
| .-left | .sidedrawer-left | RadSideDrawer header | Aligns RadSideDrawer header left (default center)
| .-thumb | .thumb | Image in ListView | Specifies that the image should be a small thumbnail 
| .-separator | | row in ListView | Adds a bottom border to a row

## Helper Functions

In Theme v2 there are several functions that can help you cope with the changing of dark/light modes for a single 
skin. 

### alternate() and scale-alternate()

With these two functions you can alter a color, depending on its contrast - it will lighten it, if it is darker or 
darken it, if it is lighter. The functions use SASS adjust-color() and scale-color() respectively in order to do so
and are used like this:

```scss
.my-label {
    color: alternate(light(background)); // Default amount is 60% for both lighten/darken
}

.another-label {
    color: alternate(light(background), 100%); // Set lighten/darken amount
}

.third-label {
    color: alternate(light(background), 100%, 50%); // Set lighten/darken amounts separately
}
```

### contrasted() and scale-contrasted()

With these two additional functions, one can alter a color, depending on the contrast of another color - again with 
adjust-color() and scale-color() respectively. Use like this:

```scss
.my-label {
    color: contrasted(dark(accent), dark(background)); // Default amount is 60% for both lighten/darken
}

.another-label {
    color: contrasted(dark(accent), dark(background), 100%); // Set lighten/darken amount
}

.third-label {
    color: scale-contrasted(dark(accent), dark(background), 100%, 50%); // Set lighten/darken amounts separately
}
```

### Usage in colorize()

All 4 of these functions can be used in combination with the aforementioned colorize() mixin to affect both 
light and dark theme modes. This is done by specifying the function in the beginning of the property name. 
For instance, if we want to specify lighter accent color for dark backgrounds and darker color for light 
backgrounds, in addition to setting the background color to light one and dark one depending on the mode, 
you can do it in one go like this:

```scss
.my-label {
    @include colorize(
        $contrasted-color: accent background 20% 30%, // Call contrasted() function for the color property for light/dark
        $background-color: background                 // Just set the background-color to light/dark
    );
}
```

Please note that you shouldn't use commas between the values here. Also, make sure you combine multiple color sets like this, as in this way the mixin can group them in a single rule instead of several.

## Mode Change API

Check out [this section in the README](README.md#setting-dark-or-light-mode-from-javascript) for more information.

## Custom CSS Variables

The Theme now exports all its internal variables to custom CSS ones in the `.ns-root` and `.ns-modal` classes.
This is also done for Kendo based skins. You can use them to inherit your styles from the Theme, if using CSS.
A list of the supported custom CSS variables follows:

| Simple Colors | Constants | Light Colors | Dark Colors |
|---------|---------|---------|---------|
| --color-black | --const-font-size | --light-primary | --dark-primary |
| --color-white | --const-background-alt-10 | --light-background | --dark-background |
| --color-grey | --const-btn-color-secondary | --light-accent | --dark-accent |
| --color-grey-light | --const-btn-color-disabled | --light-complementary-color | --dark-complementary-color |
| --color-charcoal | --const-btn-font-size | --light-complementary | --dark-complementary |
| --color-transparent | --const-btn-min-width | --light-background-alt-5 | --dark-background-alt-5 |
| --color-aqua | --const-btn-height | --light-background-alt-10 | --dark-background-alt-10 |
| --color-blue | --const-btn-padding-x | --light-background-alt-20 | --dark-background-alt-20 |
| --color-brown | --const-btn-padding-y | --light-secondary | --dark-secondary |
| --color-forest | --const-btn-margin-x | --light-disabled | --dark-disabled |
| --color-grey-dark | --const-btn-margin-y | --light-text-color | --dark-text-color |
| --color-purple | --const-btn-radius | --light-headings-color | --dark-headings-color |
| --color-lemon | --const-headings-margin-bottom | --light-tab-text-color | --dark-tab-text-color |
| --color-lime | --const-headings-font-weight | --light-accent-dark | --dark-accent-dark |
| --color-orange | --const-border-width | --light-accent-light | --dark-accent-light |
| --color-ruby | --const-border-radius | --light-accent-transparent | --dark-accent-transparent |
| --color-sky | --const-border-radius-sm | --light-primary-accent | --dark-primary-accent |
| --color-error | --const-border-radius-lg | --light-background-accent | --dark-background-accent |
|  | --const-disabled-opacity | --light-background-dark-accent | --dark-background-dark-accent |
|  | --const-icon-font-size | --light-item-active-color | --dark-item-active-color |
|  | --const-icon-font-size-lg | --light-item-active-background | --dark-item-active-background |
|  |  | --light-btn-color | --dark-btn-color |
|  |  | --light-item-active-icon-color | --dark-item-active-icon-color |
|  |  | --light-btn-color-inverse | --dark-btn-color-inverse |
|  |  | --light-btn-color-secondary | --dark-btn-color-secondary |

Use them like this:

```css
.my-accented-class {
    color: var(--light-accent);
}
```
