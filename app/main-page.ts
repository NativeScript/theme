
import { EventData } from "tns-core-modules/data/observable";
import { Page } from 'tns-core-modules/ui/page';
import * as app from 'tns-core-modules/application';
import { isIOS, isAndroid, device } from 'tns-core-modules/platform';
import { topmost } from 'tns-core-modules/ui/frame';
import { Color } from 'tns-core-modules/color';
import { NavigationViewModel } from './navigation-vm';

export function navigatingTo(args: EventData) {
  var page = <Page>args.object;
  page.bindingContext = new NavigationViewModel(page);

  if (isIOS) {
    let controller = topmost().ios.controller;
    let navigationBar = controller.navigationBar;
    navigationBar.barStyle = 0;
  }
}