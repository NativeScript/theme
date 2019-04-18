// if (global.TNS_WEBPACK) {
//     // Register tns-core-modules UI framework modules
//     require("tns-core-modules/bundle-entry-points");
//
//     global.registerModule("themed-menu",
//         () => require("./themed-menu/themed-menu.js"));
// }

import "@abraham/reflection";

export * from "./ThemeIcon/ThemeIcon";
export * from "./ThemeMenu/ThemeMenu";
export * from "./ThemeInput/ThemeInput";
export * from "./ThemeModalPage/ThemeModalPage";
export * from "./ThemeCustomActionBar/ThemeCustomActionBar";

// function addPlatformClass() {
//     return function (cls) {
//         cls.prototype.className = isAndroid ? "-android" : "-ios";
//     };
// }
//
// decorate([
//     addPlatformClass()
// ], Frame);
