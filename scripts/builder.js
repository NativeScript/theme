/*************************************************************************************
 * Licensed under the APACHE license
 *
 * Version 0.0.5                                      Nathan@master-technology.com
 ************************************************************************************/


const fs = require("fs");
const sass = require("sass");
const glob = require("glob");
const pjs = require("../package.json");

// Kill The original folder, so that way it is a clean folder
if (fs.existsSync("nativescript-theme-core")) {
    deleteFolderRecursive("nativescript-theme-core");
}
fs.mkdirSync("nativescript-theme-core");
fs.mkdirSync("nativescript-theme-core/css");
fs.mkdirSync("nativescript-theme-core/scss");

const version = getVersion();
const versionPlaceholder = "__VERSION__";
console.log(`Building the Deployment files for v${version}...`);

// Create CSS from SCSS
createCSSFromSCSS();

// Copy the SCSS file to the build folder
copySCSS();

// Copy any Fonts
//copyFonts();

createPackageJson();

// Copy the temporary class helper and SCSS
copyFile("./src/index.js", "./nativescript-theme-core/index.js");

// Copy our Readme
copyFile("./nativescript-theme-core.md", "./nativescript-theme-core/readme.md");

console.log("Change to the 'nativescript-theme-core' folder and you can now do your `npm publish`");
// TODO: We could Automatically run "npm publish"

/**
 * Create package.json from the original one
 */
function createPackageJson() {
    const outputPackageJson = (({ name, version, description, author, homepage, license, repository }) =>
                               ({ name,
version,
description,
author,
homepage,
license,
repository }))(pjs);

    outputPackageJson.nativescript = {
        platforms: {
            android: pjs.nativescript["tns-android"].version,
            ios: pjs.nativescript["tns-ios"].version
        }
    };

    fs.writeFileSync("./nativescript-theme-core/package.json", JSON.stringify(outputPackageJson, null, 2));
}

/**
 * Copy any fonts files over
 */
function copyFonts() {
    const ttfFiles = glob.sync("./app/fonts/*.ttf");
    const otfFiles = glob.sync("./app/fonts/*.otf");
    let i;
    let out;

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
    const sassFilesPath = "./src/**/*.scss";
    const sassFiles = glob.sync(sassFilesPath);

    for (let i = 0; i < sassFiles.length; i++) {
        const out = sassFiles[i].replace("./src/", "./nativescript-theme-core/");

        const paths = sassFiles[i].split("/");
        // eliminate the ["." and "app"]
        paths.shift();
        paths.shift();

        if (paths.length > 1) {
            let path = "./nativescript-theme-core";
            for (let j = 0; j < paths.length - 1; j++) {
                path += `/${paths[j]}`;
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }
            }
        }

        // if (sassFiles[i].indexOf("./app/core.") > -1) {
        //     // print correct version on main files
        //     let scss = fs.readFileSync(sassFiles[i], { encoding: "utf8" });
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

    const sassFilesPath = "./src/**/*.scss";
    const sassImportPaths = [
        "./src/",
        "./node_modules/"
    ];

    const sassFiles = glob.sync(sassFilesPath).filter((filePath) => {
        const parts = filePath.split("/");
        const filename = parts[parts.length - 1];
        return filename.indexOf("_") !== 0 && filename.indexOf("app.") !== 0 && filename.indexOf("customized.") !== 0 && filename.indexOf("bootstrap") !== 0 && filename.indexOf("kendo") !== 0;
    });


    for (let i = 0; i < sassFiles.length; i++) {
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
    const sassFileContent = fs.readFileSync(sassFile, { encoding: "utf8" });
    const offset = sassFile.lastIndexOf("/");
    const outputFile = `nativescript-theme-core/css${sassFile.substring(offset)}`;
    const cssFilePath = outputFile.replace(".scss", ".css");

    // const output = sass.renderSync({
    sass.render({
        data: sassFileContent,
        includePaths: importPaths,
        outFile: cssFilePath,
        outputStyle: "compressed"
    }, (error, result) => {
        if (error) {
            console.log(error.status);
            console.log(error.column);
            console.log(error.message);
            console.log(error.line);
        } else {
            let css = result.css.toString();
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
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file) => {
            const curPath = `${path}/${file}`;
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
    return css.replace(versionPlaceholder, `v${version}`);
}

/**
 * Get version from package
 */
function getVersion() {
    const packageJSON = require("../package.json");
    return packageJSON ? packageJSON.version : null;
}
