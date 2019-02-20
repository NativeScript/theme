/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import * as app from "tns-core-modules/application";
//import { TNSFontIcon, fonticon } from "nativescript-fonticon";
// import { isActive,capitalize } from "./app-root/app-root";
import "nativescript-dom";

// TNSFontIcon.debug = false;
// TNSFontIcon.paths = {
//     "fa": "assets/css/font-awesome.css"
// };
// TNSFontIcon.loadCss();

//const resources = app.getResources();
//resources["fonticon"] = fonticon;
// resources["isActive"] = isActive;
// resources["capitalize"] = capitalize;

//app.setResources(resources);

require("./bundle-config");

app.run({ moduleName: "app-root/app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
