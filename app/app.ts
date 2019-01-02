import * as app from 'tns-core-modules/application';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import { isActive } from './sidedrawer/sidedrawer';
require("nativescript-dom");
var frameCommon = require("tns-core-modules/ui/frame/frame-common");

if (!frameCommon.FrameBase.prototype.eachChild) {
  frameCommon.FrameBase.prototype.eachChild =
      frameCommon.FrameBase.prototype.eachChildView;
}

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': 'font-awesome.css'
};
TNSFontIcon.loadCss();

const resources = app.getResources();
resources['fonticon'] = fonticon;
resources['isActive'] = isActive;
app.setResources(resources);

var themes = require('nativescript-themes');
themes.applyTheme(themes.getAppliedTheme('light.css'));

app.run({ moduleName: "main-page" });
