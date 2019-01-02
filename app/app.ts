import * as app from "application";
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import { isActive } from './sidedrawer/sidedrawer';
require("nativescript-dom");

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': 'font-awesome.css'
};
TNSFontIcon.loadCss();

const resources = app.getResources();
resources['fonticon'] = fonticon;
resources['isActive'] = isActive;
app.setResources(resources);


app.run({ moduleName: "main-page" });
