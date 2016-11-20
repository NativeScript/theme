/*************************************************************************************
 * Licensed under the APACHE license
 *
 * Version 0.0.5                                      Nathan@master-technology.com
 ************************************************************************************/
"use strict";

var fs = require("fs");
var sass = require("node-sass");
var glob = require("glob");

// Kill The original folder, so that way it is a clean folder
if (fs.existsSync("nativescript-theme-core")) {
    deleteFolderRecursive("nativescript-theme-core");
}
fs.mkdirSync("nativescript-theme-core");
fs.mkdirSync("nativescript-theme-core/css");
fs.mkdirSync("nativescript-theme-core/scss");
fs.mkdirSync("nativescript-theme-core/fonts");

var version = getVersion();
var versionPlaceholder = "__VERSION__";
console.log("Building the Deployment files for v" + version + "...");

// Create CSS from SCSS
createCSSFromSCSS();

// Copy the SCSS file to the build folder
copySCSS();

// Copy any Fonts
copyFonts();

// Copy our Package
copyFile("./nativescript-theme-core.json", "./nativescript-theme-core/package.json");

// Copy our Readme
copyFile("./nativescript-theme-core.md", "./nativescript-theme-core/readme.md");

console.log("Change to the 'nativescript-theme-core' folder and you can now do your `npm publish`");
// TODO: We could Automatically run "npm publish"

/**
 * Copy any fonts files over
 */
function copyFonts() {
    var ttfFiles = glob.sync("./app/fonts/*.ttf");
    var otfFiles = glob.sync("./app/fonts/*.otf");
    var i, out;

    for (i = 0; i < ttfFiles.length; i++) {
        out = ttfFiles[i].replace("./app/", "./nativescript-theme-core/");
        // Skip font Awesome
        if (out.indexOf("fontawesome") !== -1) {
            continue;
        }
        fs.writeFileSync(out, fs.readFileSync(ttfFiles[i]));
    }

    for (i = 0; i < otfFiles.length; i++) {
        out = otfFiles[i].replace("./app/", "./nativescript-theme-core/");
        // Skip font Awesome
        if (out.indexOf("fontawesome") !== -1) {
            continue;
        }
        fs.writeFileSync(out, fs.readFileSync(otfFiles[i]));
    }

}



// ----------------------------------------------------------------------

/**
 * Copy our SCSS files over
 */
function copySCSS() {
    var sassFilesPath = "./app/scss/**/*.scss";
    var sassFiles = glob.sync(sassFilesPath).filter(function(filePath) {
        return filePath.indexOf("App_Resources") === -1;
    });

    for (var i = 0; i < sassFiles.length; i++) {
        var out = sassFiles[i].replace("./app/", "./nativescript-theme-core/");

        var paths = sassFiles[i].split("/");
        // eliminate the ["." and "app"]
        paths.shift();
        paths.shift();

        if (paths.length > 1) {
            var path = "./nativescript-theme-core";
            for (var j = 0; j < paths.length - 1; j++) {
                path += "/" + paths[j];
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }
            }
        }

        // if (sassFiles[i].indexOf("./app/core.") > -1) {
        //     // print correct version on main files
        //     var scss = fs.readFileSync(sassFiles[i], { encoding: "utf8" });
        //     scss = printVersion(scss);
        //     fs.writeFileSync(out, scss, "utf8");
        // } else {
        fs.writeFileSync(out, fs.readFileSync(sassFiles[i]));
        // }
    }
}

// ----------------------------------------------------------------------

/**
 * Create all the CSS from SCSS files
 */
function createCSSFromSCSS() {

    var sassFilesPath = "./app/**/*.scss";
    var sassImportPaths = [
        "./app/",
        "./node_modules/"
    ];

    var sassFiles = glob.sync(sassFilesPath).filter(function(filePath) {
        var path = filePath;
        var parts = path.split("/");
        var filename = parts[parts.length - 1];
        return path.indexOf("App_Resources") === -1 && filename.indexOf("_") !== 0 && filename.indexOf("app.") !== 0 && filename.indexOf("customized.") !== 0 && filename.indexOf("bootstrap") !== 0;
    });


    for (var i = 0; i < sassFiles.length; i++) {
        // We only process open /core. files
        // if (sassFiles[i].indexOf("/core.") === -1) {
        //     continue;
        // }
        parseSass(sassFiles[i], sassImportPaths);
    }
}

/**
 * Parses a sass file
 * @param sassFile - File to load
 * @param importPaths - Other import paths
 */
function parseSass(sassFile, importPaths) {
    var sassFileContent = fs.readFileSync(sassFile, { encoding: "utf8" });
    var outputFile = "nativescript-theme-core/css";
    var offset = sassFile.lastIndexOf("/");
    outputFile += sassFile.substring(offset);
    var cssFilePath = outputFile.replace(".scss", ".css");

    // var output = sass.renderSync({
    sass.render({
        data: sassFileContent,
        includePaths: importPaths,
        outFile: cssFilePath,
        outputStyle: "compressed"
    }, function(error, result) {
        if (error) {
            console.log(error.status);
            console.log(error.column);
            console.log(error.message);
            console.log(error.line);
        } else {
            var css = result.css.toString();
            // correct version tag
            css = printVersion(css);
            // uncomment to debug builds
            // console.log(css);
            fs.writeFileSync(cssFilePath, css, "utf8");

            // if build stats are ever desired
            // console.log(result.stats);
        }
    });
}

// ----------------------------------------------------------------------

/**
 * Deletes a folder and all content in the folders (including sub-content)
 * @param path
 */
function deleteFolderRecursive(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
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

/**
 * Print correct version
 */
function printVersion(css) {
    return css.replace(versionPlaceholder, "v" + version);
}

/**
 * Get version from package
 */
function getVersion() {
    var packageJSON = require("../package.json");
    return packageJSON ? packageJSON.version : null;
}