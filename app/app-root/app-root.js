import { NavigationViewModel } from "~/navigation-vm";
import * as app from "tns-core-modules/application";
import * as platform from "tns-core-modules/platform";

export function onLoaded({ object: drawer }) {
    drawer.bindingContext = new NavigationViewModel(drawer);

    if (app.android && platform.device.sdkVersion >= "21") {
        const window = app.android.startActivity.getWindow();

        window.setStatusBarColor(0x000000);

        const decorView = window.getDecorView();
        const View = global.android.view.View;
        decorView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }
}
