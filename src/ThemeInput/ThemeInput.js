import { Property } from "tns-core-modules/ui/core/view";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { parse } from "tns-core-modules/ui/builder";
import template from "./ThemeInput.template.xml";
import { updateClasses } from "../utils/utils";

export const labelProperty = new Property({ name: "label", defaultValue: undefined });
export const validProperty = new Property({ name: "valid", defaultValue: true });

export class ThemeInput extends GridLayout {
    static get changeEvent() { return "change" }

    constructor() {
        super();

        this.className = "nt-input";
        this.rows = "*, *";

        let component = parse(template);
        while (component.getChildrenCount() !== 0) {
            const child = component._subViews[component.getChildrenCount() - 1];

            component.removeChild(child);
            this.addChild(child);
        }

        this.once("loaded", ({ object }) => {
            object.bindingContext = object;
        });
    }

    showPopup(args) {
        args.object.showModal(parse(`<Page>
    <Label text="{{ text }}" />
</Page>`), {
            context: {
                text: "Remember, remember the fifth of November!"
            },
            ios: {
                presentationStyle: UIPresentationStyle.Popover
            }
        });

        // debugger;
        // if (this.className.indexOf("-validation-popup") > -1) {
        //     updateClasses(this, null, ["-validation-popup"]);
        // } else {
        //     updateClasses(this, ["-validation-popup"]);
        // }
    }
}

labelProperty.register(ThemeInput);
validProperty.register(ThemeInput);
