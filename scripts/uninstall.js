/*************************************************************************************
 * Licensed under the APACHE license
 *
 * Version 0.0.1                                         Nathan@master-technology.com
 ************************************************************************************/
"use strict";

// Simple require statements, built into node
var fs = require('fs');
var path = require('path');
var os = require('os');

// Do we have detect SCSS support
var hasSCSS = false;

// Get our Paths
var cwd = process.cwd() + '/';
var primaryDir = path.normalize(cwd+"../../");
var appDir = primaryDir + 'app/';

// Test for has SCSS support
try {
    var data = require(primaryDir + "package.json");

    if (data && (data.devDependencies && data.devDependencies['nativescript-dev-sass']) || (data.dependencies && data.dependencies['nativescript-dev-sass']) ) {
        hasSCSS = true;
    }
} catch (err) {
    hasSCSS = false;
}


// ------------------------------------------------------
// Handle the CSS files
// ------------------------------------------------------

deleteFolder(cwd+"css", appDir+"css");

// Update our main app.css to delete the import the theme
if (fs.existsSync(appDir+"app.css")) {
    var BOM='';
    var cssData = fs.readFileSync(appDir + "app.css").toString();
	

	// Search for only our themes
	var idx = cssData.indexOf("@import '~/css/core.light.css';");
	if (idx === -1) {
		idx = cssData.indexOf("@import '~/css/core.dark.css';");
	}
	
    if (idx !== -1) {
		var idxOffset = cssData.indexOf(";", idx)+1;
		if (idx === 0) {		
		  cssData = cssData.substring(idxOffset, cssData.length);	
		} else {
		  cssData = cssData.substring(0, idx)+cssData.substring(idxOffset, cssData.length);
		}		
        fs.writeFileSync(appDir + "app.css", cssData.trim());
    }
}

// ------------------------------------------------------
// Handle the font files
// ------------------------------------------------------
deleteFolder(cwd+"fonts", appDir+"fonts");

// ------------------------------------------------------
// Handle the SCSS files
// ------------------------------------------------------

if (hasSCSS) {
	var extraFiles=["_bootstrap-map.scss", "core.dark.android.scss", "core.dark.ios.scss", "core.light.android.scss", "core.light.ios.scss"];
	deleteFolder(cwd+"theme-core-scss", appDir+"theme-core-scss");
	
	for (var i=0;i<extraFiles.length;i++) {
		if (fs.existsSync(appDir+extraFiles[i])) {
			try {
				fs.unlinkSync(appDir+extraFiles[i]);
			} catch (err) {
				console.log("Unable to uninstall ", appDir + extraFiles[i]);
			}
		}
	}
	
}


// -------------------------------------------------------
// Support Functions
// -------------------------------------------------------

/**
 * This deletes a folder and recurses if needed
 * @param src (string) - Source folder
 * @param dest (string) - Destination folder
 */
function deleteFolder(src, dest) {
	
    // No source/dest Folder exists, don't delete it!
    if (!fs.existsSync(src)) { return false; }
	if (!fs.existsSync(dest)) { return false; }

    var files = fs.readdirSync(src);
    files.forEach(function(file){
        var curPath = src + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // check to see if we need to recurse
            deleteFolder(curPath, dest + "/" + file);
        } else if (fs.existsSync(dest +"/"+file)) {
			try {
				fs.unlinkSync(dest+"/"+file);
			} catch (err) {
				console.log("Unable to uninstall ", dest+"/"+file);
			}
		}		           
    });
	
	// Clear the folder, will fail if not empty	
	try {
	  fs.rmdirSync(dest);
	} catch (err) {
		console.log("Unable to delete: ", dest);
	}
	
    return true;
}
