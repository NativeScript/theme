import { BaseModel } from "./base";
import { Frame } from "tns-core-modules/ui/frame";

export class LandingModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new LandingModel(page);
}

export function signIn() {
    Frame.topmost().navigate({
        moduleName: "pages/login-form",
        transition: {
            name: "slide"
        }
    });
}

export function goBack() {
    Frame.topmost().navigate({
        moduleName: "pages/root",
        clearHistory: true,
        transition: {
            name: "slide"
        }
    });
}
