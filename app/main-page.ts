
import { EventData } from "data/observable";
import { Page } from "ui/page";
import * as app from 'application';
import { isIOS, isAndroid, device } from 'platform';
import { topmost } from 'ui/frame';
import { Color } from 'color';
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