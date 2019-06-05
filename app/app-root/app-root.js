import { NavigationViewModel } from "~/navigation-vm";
import { ThemesModel } from "../pages/themes";
import * as app from "tns-core-modules/application";
import * as platform from "tns-core-modules/platform";

// export function capitalize(value) {
//     const text = value.split(/[\b-=/\\\s]+/);
//
//     return text.map((v) => v[0].toUpperCase() + v.substr(1)).join(" ");
// }
//
// export function isActive(value) {
//     const activeItem = "sidedrawer-list-item active";
//     const inactiveItem = "sidedrawer-list-item";
//
//     if (value === NavigationViewModel.selectedPage) {
//         return activeItem;
//     }
//     return inactiveItem;
// }

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

export function onRightLoaded({ object: drawer }) {
    drawer.bindingContext = new ThemesModel();
}
