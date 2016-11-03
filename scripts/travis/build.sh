#!/bin/bash

set -e
source ./scripts/travis/env.sh

npm run builder

rm -rf "$BUILD_DIRECTORY"

git clone "$TEMPLATE_URL" "$TEMPLATE_DIRECTORY"
(cd "$TEMPLATE_DIRECTORY" && \
    npm install "../../$THEME_PLUGIN_DIRECTORY" --save)

tns create "$APP_NAME" --path "$BUILD_DIRECTORY" --template "$TEMPLATE_DIRECTORY"