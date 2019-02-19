import { Observable } from "data/observable";
import { topmost } from "ui/frame";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

export class BaseModel extends Observable {

  constructor(page) {
    super();
    // Initialize default values.
    this.page = page;
    this.topFrame = topmost();
    this.sideDrawer = app.getRootView();
  }

  goBack() {
    this.topFrame.goBack();
  }

  toggleSideDrawer() {
    this.sideDrawer.toggleDrawerState();
  }

  closeSideDrawer() {
    this.sideDrawer.closeModal();
  }

  openModal() {
    this.page.showModal("pages/modal", "Custom ActionBar", () => {

    });
  }
}
