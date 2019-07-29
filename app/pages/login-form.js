import { BaseModel } from "./base";
import { topmost } from "tns-core-modules/ui/frame";

export class LoginModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new LoginModel(page);
}

export function goBack() {
    topmost().navigate({
        moduleName: "pages/login-landing",
        clearHistory: true,
        transition: {
            name: "slide"
        }
    });
}
