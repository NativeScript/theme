#!/bin/bash

set -e
source ./scripts/travis/env.sh

echo "Installing nativescript $TNS_VER"
npm install -g "nativescript@$TNS_VER" --ignore-scripts
tns usage-reporting disable
tns error-reporting disable

echo no | npm install