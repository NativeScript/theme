# NativeScript Theme: Core
[![npm](https://img.shields.io/npm/v/nativescript-theme-core.svg)](https://www.npmjs.com/package/nativescript-theme-core)
[![npm](https://img.shields.io/npm/dt/nativescript-theme-core.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-theme-core)

Home of the core NativeScript theme, currently **under active development**. Want to get started? Check out the [theme’s documentation on the official NativeScript docs site](http://docs.nativescript.org/ui/theme).

- [Screenshots 📸](#screenshots)
- [Contributing 🍺](#contributing)
- [Publishing 📚](#publishing)
- [Contributors 💖](#awesome-contributors)
- [License 📋](#license)

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
:---: |:---: |:---: |:---: |:---: |:---: |
[sitefinitysteve](https://github.com/sitefinitysteve) |[vakrilov](https://github.com/vakrilov) |[bradmartin](https://github.com/bradmartin) |[firescript](https://github.com/firescript) |[valentinstoychev](https://github.com/valentinstoychev) |[enchev](https://github.com/enchev) |

## LICENSE

Apache 2.0
