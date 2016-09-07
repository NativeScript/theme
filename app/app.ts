import * as application from 'application';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
require( "nativescript-dom" );

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': 'font-awesome.css'
};
TNSFontIcon.loadCss();

application.resources['fonticon'] = fonticon;
application.start({ moduleName: 'main-page' });