/*************************************************************************************
 * Licensed under the APACHE license
 *
 * Version 0.0.1                                      Nathan@master-technology.com
 ************************************************************************************/
"use strict";

// Simple require statements, built into node
var fs = require('fs');
var path = require('path');


// Do we have detect SCSS support
var hasSCSS = false;

// Get our Paths
var cwd = process.cwd() + '/';
var primaryDir = path.normalize(cwd+"../../");
var appDir = primaryDir + 'app/';

// Test for has SCSS support
try {
    var data = require(primaryDir + "package.json");

    if (data && data.devDependencies && data.devDependencies['nativescript-dev-sass']) {
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
    var cssData = fs.readFileSync(appDir + "app.css").toString();
    if (cssData.indexOf("@import '~/css/core.") === -1) {
        cssData = "@import '~/css/core.light.css'; \r\n\r\n" + cssData;
        fs.writeFileSync(appDir + "app.css", cssData);
    }
}

// ------------------------------------------------------
// Handle the FONTS files
// ------------------------------------------------------
copyFolder(cwd+"fonts", appDir+"fonts");

// ------------------------------------------------------
// Handle the SCSS files
// ------------------------------------------------------

if (hasSCSS) {
    copyFolder(cwd+"scss", appDir+"scss");
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
  try {
    var files = fs.readdirSync(src);
    files.forEach(function (file) {
      var curPath = src + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // check to see if we need to recurse
        copyFolder(curPath, dest + "/" + file);
      } else { // copy file
        copyFile(src, dest, file);
      }
    });
  } catch (err) {
    console.log('Skipping ' + src + ' copy.');
  }
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