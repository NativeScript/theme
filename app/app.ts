import * as application from 'application';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import { isActive } from './sidedrawer/sidedrawer';
require("nativescript-dom");

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': 'font-awesome.css'
};
TNSFontIcon.loadCss();

const resources = application.getResources();
resources['fonticon'] = fonticon;
resources['isActive'] = isActive;
application.setResources(resources);

application.start({ moduleName: 'main-page' });
