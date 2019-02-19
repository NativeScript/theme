import { Property } from "tns-core-modules/ui/core/view";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { parse } from "tns-core-modules/ui/builder";
import template from "./ThemeMenu.template.xml";

export const itemsProperty = new Property({name: "items", defaultValue: undefined});
export const selectedProperty = new Property({name: "selected", defaultValue: undefined});
export const textFieldProperty = new Property({name: "textField", defaultValue: "text"});
export const iconFieldProperty = new Property({name: "iconField", defaultValue: "icon"});
export const valueFieldProperty = new Property({name: "valueField", defaultValue: "value"});
export const itemSelectedProperty = new Property({name: "itemSelected", defaultValue: undefined});

export class ThemeMenu extends StackLayout {
    constructor() {
        super();

        let component = parse(template);
        component.bindingContext = this;

        this.className = "theme-menu";

        this.addChild(component);
    }

    onTap() {

    }
}

itemsProperty.register(ThemeMenu);
selectedProperty.register(ThemeMenu);
textFieldProperty.register(ThemeMenu);
iconFieldProperty.register(ThemeMenu);
valueFieldProperty.register(ThemeMenu);
itemSelectedProperty.register(ThemeMenu);
