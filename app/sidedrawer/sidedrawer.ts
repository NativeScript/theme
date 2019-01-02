import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { NavigationViewModel } from '../navigation-vm';

export interface ISideDrawerState extends Page {
	activeComponent: string;
}

export function isActive(value: string): string {
  let activeItem = 'sidedrawer-list-item active';
	let inactiveItem = 'sidedrawer-list-item';
  if (value === SideDrawerViewModel.activeComponent) {
    return activeItem;
  }
  return inactiveItem;
}


export function onLoad(args: EventData) {
	let page = <ISideDrawerState>args.object;
	page.bindingContext = new SideDrawerViewModel(page, page.activeComponent);
}

export class SideDrawerViewModel extends NavigationViewModel {
  public static activeComponent: string;

	constructor(public page: Page, private activeComponent: string) {
    super(page);
    SideDrawerViewModel.activeComponent = activeComponent;
	}
}
