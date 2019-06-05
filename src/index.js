import { on, displayedEvent, orientationChangedEvent, getRootView } from "tns-core-modules/application";
import { device, isAndroid, screen } from "tns-core-modules/platform";

let started = false;

const display = screen.mainScreen;

class ClassList {
    constructor(className) {
        this.list = className.split(/\s+/);
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

function handleOrientation({ newValue: orientation }) {
    const root = getRootView();
    const classList = new ClassList(root.className);

    classList
        .remove("-portrait", "-landscape", "-unknown")
        .add(`-${orientation}`);

    root.className = classList.get();
    console.log(root.className);
}

on(displayedEvent, () => {
    const root = getRootView();
    const classList = new ClassList(root.className);

    classList.add("ns-theme", `-${isAndroid ? "android" : "ios"}`, `-${device.deviceType.toLowerCase()}`);

    root.className = classList.get();

    console.log(root.className);

    if (!started) {
        handleOrientation({ newValue: display.heightDIPs > display.widthDIPs ? "portrait" : "landscape" });
        on(orientationChangedEvent, handleOrientation);
        started = true;
    }
});
