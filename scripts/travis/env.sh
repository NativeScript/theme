#!/bin/sh

export TNS_VER="2.3.0"

export THEME_PLUGIN_DIRECTORY="nativescript-theme-core"
export THEME_BASE_NAME="~/css/core"
export BUILD_DIRECTORY="build"

export TEMPLATE_URL="https://github.com/NativeScript/template-hello-world.git"
export TEMPLATE_DIRECTORY="$BUILD_DIRECTORY/template"

export APP_NAME="testApp"
export APP_DIRECTORY="$BUILD_DIRECTORY/$APP_NAME"
export CSS_FOLDER="$APP_DIRECTORY/app/css"
export SHEET_PATH="$APP_DIRECTORY/app/app.css"