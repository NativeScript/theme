import { BaseModel } from "./base";
import { isAndroid } from "tns-core-modules/platform";

export class BasicsModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new BasicsModel(page);
}

export function onLoaded({ object: actionBar }) {
    // These two settings are needed to normalize the ActionBar padding and default button min-width.
    if (isAndroid) {
        actionBar.nativeViewProtected.setContentInsetsAbsolute(0, 0);

        actionBar.titleView.eachChildView((view) => {
            view.nativeViewProtected.setMinWidth(view.style.minWidth);
        });
    }
}
