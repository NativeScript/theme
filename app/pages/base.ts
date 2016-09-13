import { Observable, EventData } from 'data/observable';
import { topmost } from 'ui/frame';
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';

export class BaseModel extends Observable {

  constructor(public page: Page) {
    super();
    // Initialize default values.
    this.page = page;
  }

  public goBack() {
    topmost().goBack();
  }
  
  public toggleSideDrawer(args: EventData) {
    let view = <View>args.object;
    let sideDrawer = <RadSideDrawer>this.page.getViewById('sideDrawer');
    sideDrawer.toggleDrawerState();
  }

  public openModal() {
    this.page.showModal('pages/modal', 'Custom ActionBar', () => {

    });
  }
}