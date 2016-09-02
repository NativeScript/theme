import { EventData } from "data/observable";
import { Page } from "ui/page";
import * as app from 'application';
import { isIOS, isAndroid, device } from 'platform';
import { topmost } from 'ui/frame';
import { Color } from 'color';
import { ThemeDemo } from "./main-view-model";

export function navigatingTo(args: EventData) {
  var page = <Page>args.object;
  page.bindingContext = new ThemeDemo(page);

  if (isIOS) {
    let controller = topmost().ios.controller;
    let navigationBar = controller.navigationBar;
    navigationBar.barStyle = 0;
  }

  if (isAndroid && device.sdkVersion >= "21") {
    let window = app.android.startActivity.getWindow();
    window.setStatusBarColor(new Color("#fff").android);
  }
}