/*************************************************************************************
 * Licensed under the APACHE license
 *
 * Version 0.0.7                                         Nathan@master-technology.com
 ************************************************************************************/
"use strict";

// Simple require statements, built into node
var fs = require('fs');
var path = require('path');
var os = require('os');

// Check for the Buggy TNS Behavior...
checkIfTNSBug();

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

// Create our CSS folder
copyFolder(cwd+"css", appDir+"css");

// Update our main app.css to import the light theme
if (fs.existsSync(appDir+"app.css")) {
    var BOM='';
    var cssData = fs.readFileSync(appDir + "app.css").toString();

    // Strip the BOM at the beginning of the file
    if (cssData.charCodeAt(0) === 0xFEFF) {
        // Newer NodeJS
        BOM = String.fromCharCode(0xFEFF);
        cssData = cssData.slice(1);
    } else if (cssData[0] === 0xEF && cssData[1] === 0xBB && cssData[2] === 0xBF) {
        // Older NodeJS
        BOM = String.fromCharCode(0xEF) + String.fromCharCode(0xBB) + String.fromCharCode(0xBF);
        cssData = cssData.slice(3);
    }

    if (cssData.indexOf("@import '~/css/core.") === -1) {
        cssData = BOM + "@import '~/css/core.light.css'; \r\n\r\n" + cssData;
        fs.writeFileSync(appDir + "app.css", cssData);
    }
}

// ------------------------------------------------------
// Handle the FONTS files
// ------------------------------------------------------
copyFolder(cwd + "fonts", appDir + "fonts");

// ------------------------------------------------------
// Handle the SCSS files
// ------------------------------------------------------

if (hasSCSS) {
    copyFolder(cwd+"theme-core-scss", appDir+"theme-core-scss");
	copyFile(cwd, appDir, "_bootstrap-map.scss");
	copyFile(cwd, appDir, "core.dark.android.scss");
	copyFile(cwd, appDir, "core.dark.ios.scss");
	copyFile(cwd, appDir, "core.light.android.scss");
	copyFile(cwd, appDir, "core.light.ios.scss");
}




// -------------------------------------------------------
// Support Functions
// -------------------------------------------------------

/**
 * This copies a folder and recurses if needed
 * @param src (string) - Source folder
 * @param dest (string) - Destination folder
 */
function copyFolder(src, dest) {
    // No source Folder exists, can't copy it!
    if (!fs.existsSync(src)) { return false; }

    var files = fs.readdirSync(src);
    files.forEach(function(file){
        var curPath = src + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // check to see if we need to recurse
            copyFolder(curPath, dest + "/" + file);
        } else { // copy file
            copyFile(src, dest, file);
        }
    });
    return true;
}

/**
 * This copies a file if need be
 * @param src (string) - Source folder
 * @param dest (string) - destination folder
 * @param file (string) - file to copy
 */
function copyFile(src, dest, file) {
    if (!fs.existsSync(dest)) {
        mkRecursiveDirectories(dest);
    }
    fs.writeFileSync(dest+"/"+file, fs.readFileSync(src + "/" + file));
}

/**
 * This creates a recursive folder structure
 * @param path
 */
function mkRecursiveDirectories(path) {
    var data = path.replace('\\','/').split('/');
    var newPath = '';
    for (var i=0;i<data.length;i++) {
        newPath += data[i] + "/";
        if (fs.existsSync(newPath)) { continue; }
        fs.mkdirSync(newPath);
    }
}

/**
 * Check for The TNS double install buggy behavior...
 */
function checkIfTNSBug() {
	// Generic Node Temp folder
	var cwd = process.cwd();
	if (cwd.indexOf(os.tmpdir()) === 0) {
		process.exit(0);
	}

	// Windows & Linux
	var env = process.env["TMP"];
	if (env && process.argv[1].indexOf(env) === 0) {
		process.exit(0);	
	}

	// Windows & Linux
	env = process.env["TEMP"];
	if (env && process.argv[1].indexOf(env) === 0) {
		process.exit(0);	
	}
	
	// Mac Directory
	env = process.env["TMPDIR"];
	if (env && (process.argv[1].indexOf(env) === 0 || process.argv[1].indexOf("/private"+env) === 0)) {
		process.exit(0);
	}
	
	
}