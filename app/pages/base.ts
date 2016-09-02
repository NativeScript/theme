import {Observable, EventData} from 'data/observable';
import {topmost} from 'ui/frame';
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';

export class BaseModel extends Observable {
    private _page: Page;

    constructor(page: Page) {
        super();
        // Initialize default values.
        this._page = page;
  }

  public goBack() {
    topmost().goBack();
  }
   public toggleSideDrawer(args: EventData) {
        let view = <View>args.object;
        let sideDrawer = <RadSideDrawer>this._page.getViewById('sideDrawer');
        sideDrawer.toggleDrawerState();

    }
}