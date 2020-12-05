// This is kinda Hacky, but to retain NS 6 & NS 7 Compatibility we have to use different locations
// For some of the items.
const Core = require("@nativescript/core");

const isNS6 = Core.CSSUtils == null;
const Platform = require("@nativescript/core/platform");

// We have to pull these directly to be compatible with NS 6 & NS 7
const Application = isNS6 ? require("@nativescript/core/application") : Core.Application;
const removeClass = isNS6 ? require("@nativescript/core/css/system-classes").removeFromRootViewCssClasses : Core.CSSUtils.removeFromRootViewCssClasses;
const View = isNS6 ?  require("@nativescript/core/ui/core/view").View : Core.View;
const Frame = isNS6 ? require("@nativescript/core/ui/frame").Frame :  Core.Frame;

const display = Platform.Screen ? Platform.Screen.mainScreen : Platform.screen.mainScreen;
const Device = Platform.Device ? Platform.Device : Platform.device;
const whiteSpaceRegExp = /\s+/;
const platformClass = `ns-${Platform.isAndroid ? "android" : "ios"}`;
const sdkVersionClass = Device.sdkVersion.replace(".", "-");

let started = false;

if (Platform.isAndroid) {
    // Force disabling the system Overriding Theme if on Android
    // this will then allow our Theme.Dark, Theme.Auto, and Theme.Light to work correctly...
    Application.on("launch", () => {
        androidx.appcompat.app.AppCompatDelegate.setDefaultNightMode(androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_NO);
    });
}

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

export class Theme {
    static setMode(mode, root = null) {

        if (mode !== Theme.Auto && mode !== Theme.Light && mode !== Theme.Dark) {
            console.error("Invalid Theme in setMode", mode);
            return;
        }

        // Set the current Mode
        Theme.currentMode = mode;

        // If we come into setMode to change, while something else is waiting to change, ignore the prior change...
        if (Theme._timer != null) {
            clearTimeout(Theme._timer);
            Theme._timer = null;
        }

        // If we have no root view, then we need to get it -- however there is the possibility the root view
        // Won't be ready, so we need to throw this off until it is...
        if (root == null) {
            root = Application.getRootView();
            if (root == null) {
                Theme._timer = setTimeout( () => { Theme.setMode(mode); Theme._timer = null; });
                return;
            }
        }

        Theme.rootView = root;

        const classList = new ClassList(Theme.rootView.className);

        classList.remove(Theme.Light, Theme.Dark);

        if (Theme.currentMode !== Theme.Auto) {
            removeClass(Theme.Light);
            removeClass(Theme.Dark);
            classList.add(Theme.currentMode);
        } else {
            // Reset to Auto system theme
            setTimeout(  Application.systemAppearanceChanged.bind(this, Theme.rootView, Application.systemAppearance()));
        }

        Theme.rootView.className = classList.get();
    }

    static toggleMode(isDark) {
        if (isDark === undefined) {
            const mode = Theme.currentMode === Theme.Auto && Application.systemAppearance ? `ns-${Application.systemAppearance()}` : Theme.getMode();

            Theme.setMode(mode === Theme.Light ? Theme.Dark : Theme.Light);

            return;
        }

        Theme.setMode(isDark ? Theme.Dark : Theme.Light);
    }

    static getMode() {
        const root = Application.getRootView();

        return Theme.currentMode || (((root && root.className) || "").indexOf(Theme.Dark) !== -1 ? Theme.Dark : Theme.Light);
    }
}

Theme.Light = "ns-light";
Theme.Dark = "ns-dark";
Theme.Auto = "auto";
Theme.currentMode = Theme.Auto;

export default Theme;

// Where the magic happens
const oldSetupAsRootView = View._setupAsRootView;
View._setupAsRootView = function() {
    oldSetupAsRootView.call(this, ...arguments);
    Theme.setMode(Theme.currentMode, this);
};

// Disable SystemAppearance changes if Theme.currentMode is not auto
const oldSystemAppearanceChanged = Application.systemAppearanceChanged;

if (oldSystemAppearanceChanged) {
    Application.systemAppearanceChanged = function () {
        if (Theme.currentMode === Theme.Auto) {
            oldSystemAppearanceChanged.call(this, ...arguments);
        }
    };
}

// Make sure to substitute systemAppearance method too, as some plugins call it directly
const oldSystemAppearance = Application.systemAppearance;

if (oldSystemAppearance) {
    Application.systemAppearance = function () {
        if (Theme.currentMode === Theme.Auto) {
            return oldSystemAppearance.call(this, ...arguments);
        }

        return Theme.currentMode.substr(3);
    };
}

/* Deprecated root class setters, now available in core modules */
function updateRootClasses(orientation, root = Application.getRootView(), classes = []) {
    const classList = new ClassList(root.className);

    classList
        .remove("ns-portrait", "ns-landscape", "ns-unknown", ...classes)
        .add(`ns-${orientation}`, ...classes);

    root.className = classList.get();
}

function handleOrientation({ newValue: orientation }) {
    updateRootClasses(orientation);

    let modalViews = View._getRootModalViews();
    if (modalViews && modalViews.length) {
        const classList = new ClassList(Application.getRootView().className);

        modalViews.forEach((view) => updateRootClasses(orientation, view, classList.add("ns-modal").list));
    }
}

function getOrientation() {
    return display.heightDIPs > display.widthDIPs ? "portrait" : "landscape";
}

const rootModalTrap = {
    defineProperty(target, key, desc) {
        if (desc && "value" in desc) {
            target[key] = desc.value;

            if (desc.value instanceof Frame) {
                const classList = new ClassList(Application.getRootView().className);

                updateRootClasses(getOrientation(), desc.value, classList.add("ns-modal").list);
            }
        }

        return target;
    }
};

Application.on(Application.displayedEvent, () => {
    const root = Application.getRootView();

    // Bail out if no root view or root classes already set (pre 6.1).
    if (!root || root.cssClasses.has("ns-root")) {
        // Add ns-{platform}-{sdkVersion} classes
        if (root) {
            root.className = new ClassList(root.className)
                .add(`${platformClass}__${sdkVersionClass}`)
                .get();
        }

        return;
    }

    // Get notified when a modal is created.
    View._rootModalViews = new Proxy(View._rootModalViews, rootModalTrap);

    root.className = new ClassList(root.className)
        .add("ns-root", platformClass, `ns-${Device.deviceType.toLowerCase()}`)
        .get();

    if (!started) {
        handleOrientation({ newValue: getOrientation() });
        Application.on(Application.orientationChangedEvent, handleOrientation);
        started = true;
    }
});
