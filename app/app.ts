import * as application from 'application';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import { isActive } from './sidedrawer/sidedrawer';
require("nativescript-dom");

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': 'font-awesome.css'
};
TNSFontIcon.loadCss();

application.resources['fonticon'] = fonticon;
application.resources['isActive'] = isActive;
application.start({ moduleName: 'main-page' });