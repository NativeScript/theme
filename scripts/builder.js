/*************************************************************************************
 * Licensed under the APACHE license
 *
 * Version 0.0.5                                      Nathan@master-technology.com
 ************************************************************************************/
"use strict";

var fs = require('fs');
var path = require('path');
var sass = require('node-sass');
var glob = require('glob');

// Kill The original folder, so that way it is a clean folder
if (fs.existsSync('nativescript-theme-core')) {
    deleteFolderRecursive('nativescript-theme-core');
}
fs.mkdirSync("nativescript-theme-core");
fs.mkdirSync("nativescript-theme-core/css");
fs.mkdirSync("nativescript-theme-core/theme-core-scss");
fs.mkdirSync("nativescript-theme-core/fonts");
fs.mkdirSync("nativescript-theme-core/scripts");


console.log("Building the Deployment files...");

// Create CSS from SCSS
createCSSFromSCSS();

// Copy the SCSS file to the build folder
copySCSS();

// Copy any Fonts
copyFonts();

// Copy our Package
copyFile("./nativescript-theme-core.json", "./nativescript-theme-core/package.json");

// Copy our Post Install Script
copyFile("./scripts/postinstall.js", "./nativescript-theme-core/scripts/postinstall.js");

// Copy our Un-install 
copyFile("./scripts/uninstall.js", "./nativescript-theme-core/scripts/uninstall.js");

// Copy our Readme
copyFile("./nativescript-theme-core.md", "./nativescript-theme-core/readme.md");



console.log("Change to the 'nativescript-theme-core' folder and you can now do your `npm publish`");
// TODO: We could Automatically run "npm publish"

/**
 * Copy any fonts files over
 */
function copyFonts() {
    var ttfFiles = glob.sync('./app/fonts/*.ttf');
    var otfFiles = glob.sync('./app/fonts/*.otf');
    var i, out;

    for (i=0;i<ttfFiles.length;i++) {
        out = ttfFiles[i].replace('./app/', './nativescript-theme-core/');
        // Skip font Awesome
        if (out.indexOf('fontawesome') !== -1) { continue; }
        fs.writeFileSync(out, fs.readFileSync(ttfFiles[i]));
    }

    for (i=0;i<otfFiles.length;i++) {
        out = otfFiles[i].replace('./app/', './nativescript-theme-core/');
        // Skip font Awesome
        if (out.indexOf('fontawesome') !== -1) { continue; }
        fs.writeFileSync(out, fs.readFileSync(otfFiles[i]));
    }

}



// ----------------------------------------------------------------------

/**
 * Copy our SCSS files over
 */
function copySCSS() {
    var sassFilesPath =  './app/**/*.scss';
    var sassFiles = glob.sync(sassFilesPath).filter(function (filePath) {
        return filePath.indexOf("App_Resources") === -1 && filePath.indexOf('demo-styles') === -1;
    });

    for (var i=0;i<sassFiles.length;i++) {
        var out = sassFiles[i].replace('./app/', './nativescript-theme-core/');

        var paths = sassFiles[i].split('/');
        // eliminate the ['.' and 'app']
        paths.shift();
        paths.shift();

        if (paths.length > 1) {
            var path = './nativescript-theme-core';
            for (var j=0;j<paths.length-1;j++) {
                path +=  '/' + paths[j];
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }
            }
        }

        fs.writeFileSync(out, fs.readFileSync(sassFiles[i]));
    }
}

// ----------------------------------------------------------------------

/**
 * Create all the CSS from SCSS files
 */
function createCSSFromSCSS() {

    var sassFilesPath = './app/**/*.scss';
    var sassImportPaths = [
        './app/',
        './node_modules/'
    ];

    var sassFiles = glob.sync(sassFilesPath).filter(function (filePath) {
        var path = filePath;
        var parts = path.split('/');
        var filename = parts[parts.length - 1];
        return path.indexOf("App_Resources") === -1 && path.indexOf('demo-styles') === -1 && filename.indexOf("_") !== 0 && filename.indexOf('app.') !== 0;
    });


    for (var i = 0; i < sassFiles.length; i++) {
        // We only process open /core. files
        if (sassFiles[i].indexOf('/core.') === -1) {
            continue;
        }
        parseSass(sassFiles[i], sassImportPaths);
    }
}

/**
 * Parses a sass file
 * @param sassFile - File to load
 * @param importPaths - Other import paths
 */
function parseSass(sassFile, importPaths) {
    var sassFileContent = fs.readFileSync(sassFile, { encoding: 'utf8'});
    var outputFile = 'nativescript-theme-core/css';
    var offset = sassFile.lastIndexOf('/');
    outputFile += sassFile.substring(offset);
    var cssFilePath = outputFile.replace('.scss', '.css');

    var output = sass.renderSync({
        data: sassFileContent,
        includePaths: importPaths,
        outFile: cssFilePath,
        outputStyle: 'compressed'
    });
    fs.writeFileSync(cssFilePath, output.css, 'utf8');
}

// ----------------------------------------------------------------------

/**
 * Deletes a folder and all content in the folders (including sub-content)
 * @param path
 */
function deleteFolderRecursive(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

/**
 * Simple stupid file copy routine
 * @param src (string) - source file
 * @param dest (string) - destination file
 */
function copyFile(src, dest) {
    fs.writeFileSync(dest, fs.readFileSync(src));
}