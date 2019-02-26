import { Property } from "tns-core-modules/ui/core/view";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { parse } from "tns-core-modules/ui/builder";
import template from "./ThemeActionBar.template.xml";
import { isAndroid } from "tns-core-modules/platform";

export const titleProperty = new Property({name: "title", defaultValue: undefined});
export const menuProperty = new Property({name: "menu", defaultValue: false});
export const backButtonProperty = new Property({name: "backButton", defaultValue: false});

export class ThemeActionBar extends ActionBar {
    constructor() {
        super();

        let component = parse(template);
        component.bindingContext = this;

        this.eachChild(() => {
            debugger;
        });

        this.className = "theme-action-bar";
        this.titleView = component;

        if (isAndroid) {
            this.once('loaded', ({object}) => {
                object.nativeViewProtected.setContentInsetsAbsolute(0, 0);

                this.eachChild(() => {
                    debugger;
                });
            });
        }
    }

    onTap(args) {
        this.itemSelected(this.items.getItem(args.index), args);
    }
}

titleProperty.register(ThemeActionBar);
menuProperty.register(ThemeActionBar);
backButtonProperty.register(ThemeActionBar);
