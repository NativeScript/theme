import { BaseModel } from "./base";
import { Color } from "tns-core-modules/color";
import { topmost } from "tns-core-modules/ui/frame";

export class ProgressModel extends BaseModel {

}

export function navigatingTo(args) {
    const page = args.object;
    page.bindingContext = new ProgressModel(page);
}

export function loaded(args) {
  const page = args.object;

    if (page.ios) {
        const navigationBar = topmost().ios.controller.navigationBar;
        navigationBar.translucent = true;
        navigationBar.barStyle = 1;
        page.backgroundSpanUnderStatusBar = true;
        page.actionBarHidden = true;
        const grey = new Color("#4A90E2");
        navigationBar.tintColor = grey.ios;
        // navigationBar.shadowImage = new UIImage();
        // navigationBar.setBackgroundImageForBarMetrics(new UIImage(), UIBarMetrics.UIBarMetricsDefault)
    }
}

export function goBack() {
    topmost().navigate({
        moduleName: "pages/login-landing",
        clearHistory: true,
        animated: false
    });
}
