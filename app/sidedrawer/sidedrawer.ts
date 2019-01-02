import { EventData } from "data/observable";
import { Page } from "ui/page";
import { NavigationViewModel } from '~/navigation-vm';

export function isActive(value: string): string {
  let activeItem = 'sidedrawer-list-item active';
  let inactiveItem = 'sidedrawer-list-item';

  debugger;
  if (value === SideDrawerViewModel.activeComponent) {
    return activeItem;
  }
  return inactiveItem;
}

export function onLoad(args: EventData) {
	let page = <Page>args.object;
	page.bindingContext = new SideDrawerViewModel(page);
}

export class SideDrawerViewModel extends NavigationViewModel {
  constructor(public page: Page) {
    super(page);
    SideDrawerViewModel.activeComponent = (<any>page).pageName;
  }
}
