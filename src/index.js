import { on, displayedEvent, orientationChangedEvent, getRootView } from "tns-core-modules/application";
import { device, isAndroid, screen } from "tns-core-modules/platform";
import * as viewCommon from "tns-core-modules/ui/core/view/view-common";
import { Frame } from "tns-core-modules/ui/frame";

let started = false;

const display = screen.mainScreen;

export class ClassList {
    constructor(className) {
        this.list = (className || "").split(/\s+/);
    }

    add(...classes) {
        classes.forEach((value) => {
            if (this.list.indexOf(value) === -1) {
                this.list.push(value);
            }
        });

        return this;
    }

    remove(...classes) {
        classes.forEach((value) => {
            const index = this.list.indexOf(value);

            if (index !== -1) {
                delete this.list[index];
            }
        });

        return this;
    }

    get() {
        return this.list.join(" ");
    }
}

function updateRootClasses(orientation, root = getRootView(), classes = []) {
    const classList = new ClassList(root.className);

    classList
        .remove("ns-portrait", "ns-landscape", "ns-unknown", ...classes)
        .add(`ns-${orientation}`, ...classes);

    root.className = classList.get();
}

function handleOrientation({ newValue: orientation }) {
    updateRootClasses(orientation);

    if (viewCommon._rootModalViews.length) {
        const classList = new ClassList(getRootView().className);

        viewCommon._rootModalViews.forEach((view) => updateRootClasses(orientation, view, classList.list.concat("ns-modal")));
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
                const classList = new ClassList(getRootView().className);

                updateRootClasses(getOrientation(), desc.value, classList.list.concat("ns-modal"));
            }
        }

        return target;
    }
};

// Get notified when a modal is created.
viewCommon._rootModalViews = new Proxy(viewCommon._rootModalViews, rootModalTrap);

on(displayedEvent, () => {
    const root = getRootView();
    const classList = new ClassList(root.className);

    classList.add("ns-root", `ns-${isAndroid ? "android" : "ios"}`, `ns-${device.deviceType.toLowerCase()}`);

    root.className = classList.get();

    if (!started) {
        handleOrientation({ newValue: getOrientation() });
        on(orientationChangedEvent, handleOrientation);
        started = true;
    }
});
