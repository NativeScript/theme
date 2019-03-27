import { Observable, EventData } from 'tns-core-modules/data/observable';
import { topmost } from 'tns-core-modules/ui/frame';
import { View } from 'tns-core-modules/ui/core/view';
import { Page } from 'tns-core-modules/ui/page';
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
  
  public toggleSideDrawer(args: EventData) {
    let view = <View>args.object;
    let sideDrawer = <RadSideDrawer>this.page.getViewById('sideDrawer');
    sideDrawer.toggleDrawerState();
  }

  public openModal() {
    this.page.showModal('pages/modal', 'Custom ActionBar', () => {

    }, true);
  }
}