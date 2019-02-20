import { Property } from "tns-core-modules/ui/core/view";
import { Label } from "tns-core-modules/ui/label";

const updateIcon = (target) => target.updateIcon();

export const nameProperty = new Property({
    name: "name",
    defaultValue: undefined,
    valueChanged: updateIcon
});

export const nsProperty = new Property({
    name: "ns",
    defaultValue: "fa",
    valueChanged: (target, oldValue, newValue) => {
        target.classList.remove(oldValue);
        target.classList.add(newValue);
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

        this._styleScope._selectors.class[`${this.variant}-${this.name}`]
            .flatMap((value) => value.sel.ruleset.declarations)
            .reverse()
            .some((dec) => {
                if (dec.property === "content") {
                    this.text = String.fromCharCode(`0x${(dec.value.match(/[a-f\d]{2,4}/i) || [])[0]}`);

                    this.classList.add("theme-menu__icon", this.ns);

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
