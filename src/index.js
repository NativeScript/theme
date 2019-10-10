import * as app from "tns-core-modules/application";
import { device, isAndroid, screen } from "tns-core-modules/platform";
import * as viewCommon from "tns-core-modules/ui/core/view/view-common";
import * as frame from "tns-core-modules/ui/frame";

const display = screen.mainScreen;
const whiteSpaceRegExp = /\s+/;

let started = false;

export class ClassList {
    constructor(className) {
        this.list = new Set();

        (className || "").split(whiteSpaceRegExp).forEach((v) => v && this.list.add(v));
    }

    add(...classes) {
        classes.forEach((v) => this.list.add(v));

        return this;
    }

    remove(...classes) {
        classes.forEach((v) => this.list.delete(v));

        return this;
    }

    get() {
        return Array.from(this.list).join(" ");
    }
}

class Theme {
    static setMode(mode, root = app.getRootView()) {
        Theme.currentMode = mode;
        Theme.rootView = root;

        if (!root || !mode) {
            return;
        }

        const classList = new ClassList(Theme.rootView.className);

        classList
            .remove(Theme.Light, Theme.Dark)
            .add(Theme.currentMode);

        Theme.rootView.className = classList.get();
    }

    static toggleMode(isDark) {
        if (isDark === undefined) {
            Theme.setMode(Theme.getMode() === Theme.Light ? Theme.Dark : Theme.Light);

            return;
        }

        Theme.setMode(isDark ? Theme.Dark : Theme.Light);
    }

    static getMode() {
        const root = app.getRootView();

        return Theme.currentMode || ((root.className || "").indexOf(Theme.Dark) !== -1 ? Theme.Dark : Theme.Light);
    }
}

if (module) {
    const desc = Object.getOwnPropertyDescriptor(module, "exports");

    // Check if in a commonjs module
    if (desc.writable) {
        module.exports = Theme;
    }
}

Theme.Light = "ns-light";
Theme.Dark = "ns-dark";

export default Theme;

// Where the magic happens
const oldSetupAsRootView = viewCommon.ViewCommon.prototype._setupAsRootView;
viewCommon.ViewCommon.prototype._setupAsRootView = function() {
    oldSetupAsRootView.call(this, ...arguments);
    Theme.setMode(Theme.currentMode, this);
};


/* Deprecated root class setters, now available in core modules */
function updateRootClasses(orientation, root = app.getRootView(), classes = []) {
    const classList = new ClassList(root.className);

    classList
        .remove("ns-portrait", "ns-landscape", "ns-unknown", ...classes)
        .add(`ns-${orientation}`, ...classes);

    root.className = classList.get();
}

function handleOrientation({ newValue: orientation }) {
    updateRootClasses(orientation);

    if (viewCommon._rootModalViews.length) {
        const classList = new ClassList(app.getRootView().className);

        viewCommon._rootModalViews.forEach((view) => updateRootClasses(orientation, view, classList.add("ns-modal").list));
    }
}

function getOrientation() {
    return display.heightDIPs > display.widthDIPs ? "portrait" : "landscape";
}

const rootModalTrap = {
    defineProperty(target, key, desc) {
        if (desc && "value" in desc) {
            target[key] = desc.value;

            if (desc.value instanceof frame.Frame) {
                const classList = new ClassList(app.getRootView().className);

                updateRootClasses(getOrientation(), desc.value, classList.add("ns-modal").list);
            }
        }

        return target;
    }
};

app.on(app.displayedEvent, () => {
    const root = app.getRootView();

    // Bail out if no root view or root classes already set (pre 6.1).
    if (!root || root.cssClasses.has("ns-root")) {
        // Add ns-api classes
        if (root) {
            root.className = new ClassList(root.className)
                .add(`ns-api-${device.sdkVersion}`)
                .get();
        }

        return;
    }

    // Get notified when a modal is created.
    viewCommon._rootModalViews = new Proxy(viewCommon._rootModalViews, rootModalTrap);

    root.className = new ClassList(root.className)
        .add("ns-root", `ns-${isAndroid ? "android" : "ios"}`, `ns-${device.deviceType.toLowerCase()}`)
        .get();

    if (!started) {
        handleOrientation({ newValue: getOrientation() });
        app.on(app.orientationChangedEvent, handleOrientation);
        started = true;
    }
});
