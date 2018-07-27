import * as application from 'application';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import { isActive } from './sidedrawer/sidedrawer';
require("nativescript-dom");
var frameCommon = require("ui/frame/frame-common");

if (!frameCommon.FrameBase.prototype.eachChild) {
  frameCommon.FrameBase.prototype.eachChild =
      frameCommon.FrameBase.prototype.eachChildView;
}

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': 'font-awesome.css'
};
TNSFontIcon.loadCss();

application.getResources().fonticon = fonticon;
application.getResources().isActive = isActive;

var themes = require('nativescript-themes');
themes.applyTheme(themes.getAppliedTheme('light.css'));

application.run({ moduleName: "app-root" });