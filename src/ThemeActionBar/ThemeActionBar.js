import { Property } from "tns-core-modules/ui/core/view";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { parse } from "tns-core-modules/ui/builder";
import template from "./ThemeActionBar.template.xml";
import { isAndroid } from "tns-core-modules/platform";

export const titleProperty = new Property({name: "title", defaultValue: undefined});

export class ThemeActionBar extends ActionBar {
    static get menuEvent() { return "menu" }
    static get backEvent() { return "back" }

    constructor() {
        super();

        let component = parse(template);
        component.bindingContext = this;

        this.className = "theme-action-bar";
        this.titleView = component;

        if (isAndroid) {
            this.once('loaded', ({ object }) => {
                object.nativeViewProtected.setContentInsetsAbsolute(0, 0);
            });
        }
    }

    _addChildFromBuilder() {
        //debugger;
    }

    onTap(event, args) {
        this.notify(Object.assign(args,{ eventName: event }));
    }

    onMenuTap(args) {
        this.onTap("menu", args);
    }

    onBackTap(args) {
        this.onTap("back", args);
    }
}

titleProperty.register(ThemeActionBar);
