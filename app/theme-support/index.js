/**********************************************************************************
 * (c) 2016-2018, Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 3.0.0                                      Nathan@master-technology.com
 *********************************************************************************/
"use strict";

/* jshint camelcase: false */
/* global UIDevice, UIDeviceOrientation, getElementsByTagName, android */

var fs = require("tns-core-modules/file-system");
var fsa = require("tns-core-modules/file-system/file-system-access").FileSystemAccess;
var frameCommon = require("tns-core-modules/ui/frame/frame-common");
var appSettings = require("tns-core-modules/application-settings");
var application = require("tns-core-modules/application");
var StyleScope = require("tns-core-modules/ui/styling/style-scope");

// This allows some basic CSS to propogate properly from the frame; but not the localStyles CSS.  See bug NativeScript#5911 & #5912
if (!frameCommon.FrameBase.prototype.eachChild) {
//	frameCommon.FrameBase.prototype.eachChild = frameCommon.FrameBase.prototype.eachChildView;
}

var Themes = function() {
    this._curAppPath = fs.knownFolders.currentApp().path + "/";
};


Themes.prototype.getAppliedTheme = function(defaultTheme) {
    defaultTheme = defaultTheme || "";

    if (appSettings.hasKey("__NS.themes")) {
        var theme = appSettings.getString("__NS.themes", defaultTheme);
        if (theme == null || theme === "") { return defaultTheme; }
        return theme;
    }
    return defaultTheme;
};

Themes.prototype.applyTheme = function(cssFile, options) {
    if (!cssFile) { console.log("No Theme css file provided");  return; }
    if ( !application.hasLaunched() ) {

    	    var self = this;
    	    var applyTheme =  function() {
    		    internalLoadCss(cssFile, self._curAppPath);
			        if (!(options && options.noSave)) {
				    appSettings.setString("__NS.themes", cssFile);
			}
			        application.off("loadAppCss", applyTheme);
		    };

		         application.on("loadAppCss", applyTheme);
		         return;
	    }

    internalLoadCss(cssFile, this._curAppPath);
    if (!(options && options.noSave)) {
        appSettings.setString("__NS.themes", cssFile);
    }
};


var _priorTheme = "!!NO_THEME_LOADED!!";
/**
 * Set the  theme .css file
 * @param cssFile - css file to load
 * @param path - application path
 */
function internalLoadCss(cssFile, path) {
	    if (!frameCommon.topmost()) {
		    setTimeout(function() {
			    internalLoadCss(cssFile, path);
		}, 50);
		    return;
	}

    var FSA = new fsa();
    var cssFileName = cssFile;

    if (cssFileName.startsWith("~/")) {
        cssFileName = fs.path.join(path, cssFileName.replace("~/", ""));
    } else if (cssFileName.startsWith("./")) {
        cssFileName = cssFileName.substring(2);
    }

    if (!cssFileName.startsWith(path)) {
        cssFileName = fs.path.join(path, cssFileName);
    }

	// Remove old Selectors
	     var changed = StyleScope.removeTaggedAdditonalCSS(_priorTheme);

	// Load the new Selectors
    if (cssFileName && FSA.fileExists(cssFileName)) {
        var file = fs.File.fromPath(cssFileName);
        var textCSS = file.readTextSync();
        if (textCSS) {
				// Add new Selectors
				                StyleScope.addTaggedAdditionalCSS(textCSS, cssFileName);

				                changed = true;
				                _priorTheme = cssFileName;

			            }
    }


	    if (changed) {
		    var frame = frameCommon.topmost();
		    if (frame) {
			    if (frame._styleScope) {
				    frame._styleScope._localCssSelectorVersion++;
				    frame._styleScope.ensureSelectors();
				    frame._onCssStateChange();
			}
			    var backStack = frame.backStack;
			    if (backStack) {
				    for (var i = 0; i < backStack.length; i++) {
					    var page = backStack[i].resolvedPage;
					    if (page) {
						//page._onCssStateChange();
						// I suspect this method is probably safer; but the above actually does work...
						    page.on("navigatingTo", updatedCSSState);
					}
				}
			}

			    var page = frame.currentPage;
			    if (page) {
				    page._onCssStateChange();
			}
		}
	}
}

function updatedCSSState(args) {
	    var page = args.object;
	    page._onCssStateChange();
	    page.off("navigatingTo", updatedCSSState);
}

// Export the theme system
module.exports = new Themes();
