import { CSSType, Property } from "tns-core-modules/ui/core/view";
import { Label } from "tns-core-modules/ui/label";
import { decorate, updateClasses } from "../utils/utils";

const updateIcon = (target) => target.updateIcon();

let lastIcon = {
    className: "",
    variant: ""
};

export const nameProperty = new Property({
    name: "name",
    defaultValue: undefined,
    valueChanged: updateIcon
});

export const nsProperty = new Property({
    name: "ns",
    defaultValue: "fa",
    valueChanged: (target, oldValue, newValue) => {
        updateClasses(target, newValue, oldValue);
    }
});

export const variantProperty = new Property({
    name: "variant",
    defaultValue: "fa",
    valueChanged: updateIcon
});

export class ThemeIcon extends Label {
    updateIcon() {
        if (!this._styleScope) {
            return;
        }

        const newIcon = {
            className: `${this.ns}-${this.name}`,
            variant: this.variant
        };
        const icon = this._styleScope._selectors.class[newIcon.className];

        icon && icon
            .flatMap((value) => value.sel.ruleset.declarations)
            .reverse()
            .some((dec) => {
                if (dec.property === "content") {
                    this.text = String.fromCharCode(`0x${(dec.value.match(/[a-f\d]{2,4}/i) || [])[0]}`);

                    updateClasses(this, ["theme__icon", newIcon.variant, newIcon.className],
                                     [lastIcon.variant, lastIcon.className]);

                    lastIcon = newIcon;

                    return true;
                }
            });
    }

    onLoaded() {
        super.onLoaded();

        this.updateIcon();
    }
}

nsProperty.register(ThemeIcon);
nameProperty.register(ThemeIcon);
variantProperty.register(ThemeIcon);

decorate([
    CSSType("ThemeIcon")
], ThemeIcon);
