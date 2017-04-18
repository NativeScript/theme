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



