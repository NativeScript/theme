/*************************************************************************************
 * Licensed under the APACHE license
 *
 * Version 0.0.8                                         Nathan@master-technology.com
 ************************************************************************************/
"use strict";

// Simple require statements, built into node
var fs = require('fs');
var path = require('path');
var os = require('os');

// Check for the Duplicate Temp Install issue...
checkIfTempInstall();

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

// Update our main app.css to import the light theme if another theme is not already imported
var appSheetPath = appDir + "app.css";
var themeBasePath = "~/css/core.";
if (!themeImported(appSheetPath, themeBasePath)) {
    var themePath = `@import '${themeBasePath}light.css';`;

    fs.appendFileSync(appSheetPath, os.EOL);
    fs.appendFileSync(appSheetPath, themePath);
    fs.appendFileSync(appSheetPath, os.EOL);
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
 * Checks whether a theme sheet is imported in another sheet
 * @param sheetPath (string) - The main sheet
 * @param themeBasePath (string) - The base name of the theme
 */
function themeImported(sheetPath, themeBasePath) {
    if (!fs.existsSync(sheetPath)) {
        return false;
    }

    var cssData = fs.readFileSync(sheetPath).toString();
    return cssData.indexOf(`@import '${themeBasePath}`) !== -1 ||
        cssData.indexOf(`@import "${themeBasePath}`) !== -1;
}

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
function checkIfTempInstall() {
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