import { Property } from "tns-core-modules/ui/core/view";
import { Label } from "tns-core-modules/ui/label";

export const nameProperty = new Property({
    name: "name",
    defaultValue: undefined,
    valueChanged: (target, oldValue, newValue) => {
        target.text = newValue;
    }
});

export class ThemeIcon extends Label {
    constructor() {
        super();

        this.className = "theme-menu__icon fa";
    }
}

nameProperty.register(ThemeIcon);
