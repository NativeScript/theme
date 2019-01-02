import { Observable } from 'tns-core-modules/data/observable';
import { topmost } from 'tns-core-modules/ui/frame';
import { Page } from "tns-core-modules/ui/page";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

export class BaseModel extends Observable {

  constructor(public page: Page) {
    super();
    // Initialize default values.
    this.page = page;
  }

  public goBack() {
    topmost().goBack();
  }

  public toggleSideDrawer() {
    let sideDrawer = <RadSideDrawer>app.getRootView();

    sideDrawer.toggleDrawerState();
  }

  public openModal() {
    this.page.showModal('pages/modal', 'Custom ActionBar', () => {

    }, true);
  }
}
