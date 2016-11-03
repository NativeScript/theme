#!/bin/bash

set -e
source ./scripts/travis/env.sh

assert() {
   if eval "$1" ; then
       echo "$2"
   else
       echo "$3"
   fi
}

pattern="@import [\"\']$THEME_BASE_NAME"
assert 'grep -q "$pattern" $SHEET_PATH' "Import statement exists." "Import statement does not exist."

assert "[ -d '$CSS_FOLDER' ]" "CSS folder exists." "CSS folder does not exist."

themeSheets="$THEME_PLUGIN_DIRECTORY/css/*.css"
for sheetPath in $themeSheets; do
    sheet="$CSS_FOLDER/${sheetPath##*/}"
    assert "[ -e '$sheet' ]" "$sheet exists." "$sheet does not exist."
done