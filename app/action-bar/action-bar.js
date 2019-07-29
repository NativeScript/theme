import { BaseModel } from "../pages/base";
import { isAndroid } from "tns-core-modules/platform";
import * as application from "tns-core-modules/application";
import { setTimeout } from "tns-core-modules/timer";

export class ActionBarViewModel extends BaseModel {
    constructor(page) {
        super(page);

        this.actionBar = page;
        this.actionBar.page.actionBarHidden = page && page.hidden;
        this.backButton = this.topFrame.canGoBack();

        if (isAndroid) {
            const rootView = application.getRootView();

            const oldCssStateChange = rootView._onCssStateChange;

            rootView._onCssStateChange = () => {
                oldCssStateChange.call(rootView);

                this.onCssChanged();
            };

            setTimeout(() => this.onCssChanged());
        }
    }

    onCssChanged() {
        if (!this.actionBar.nativeView) {
            return;
        }

        const color = this.actionBar.style.color;
        const navigationIcon = this.actionBar.nativeView.getNavigationIcon();

        if (color && navigationIcon) {
            navigationIcon.setColorFilter(null);
            navigationIcon.setColorFilter(global.android.graphics.Color.parseColor(color && color.hex),
                global.android.graphics.PorterDuff.Mode.SRC_ATOP);
        }
    }
}

export function onLoad({ object: page }) {
    page.bindingContext = new ActionBarViewModel(page);
}
