import { CSSType, Property } from "tns-core-modules/ui/core/view";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { parse } from "tns-core-modules/ui/builder";
import template from "./ThemeCustomActionBar.template.xml";
import { isAndroid } from "tns-core-modules/platform";
import { decorate } from "../utils/utils";

export const titleProperty = new Property({name: "title", defaultValue: undefined});

export class ThemeCustomActionBar extends ActionBar {
    static get menuEvent() { return "menu" }
    static get backEvent() { return "back" }

    constructor() {
        super();

        this.titleView = parse(template);

        if (isAndroid) {
            this.once('loaded', ({ object }) => {
                object.bindingContext = object;
                object.nativeViewProtected.setContentInsetsAbsolute(0, 0);
            });
        }
    }

    // _addChildFromBuilder(name, value) {
    //     const layout = this.getViewById("NTCustomActionBarStackLayout");
    //
    //     layout.addChild(value);
    // }

    onTap(args) {
        this.notify(Object.assign(args,{ eventName: this.back ? 'back' : this.menu ? 'menu' : 'custom' }));
    }
}

titleProperty.register(ThemeCustomActionBar);

decorate([
    CSSType("ThemeCustomActionBar")
], ThemeCustomActionBar);
