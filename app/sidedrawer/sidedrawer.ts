import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { NavigationViewModel } from '../navigation-vm';

export interface ISideDrawerState extends Page {
	activeComponent: string;
}


export function onLoad(args: EventData) {
	let page = <ISideDrawerState>args.object;
	page.bindingContext = new SideDrawerViewModel(page, page.activeComponent);
}

export class SideDrawerViewModel extends NavigationViewModel {
	private activeItem = 'sidedrawer-list-item active';
	private inactiveItem = 'sidedrawer-list-item';

	constructor(public page: Page, private activeComponent: string) {
		super(page);
	}
	public isHomeActive() {
		if (this.activeComponent == 'home') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}

	public isBasicsActive() {
		if (this.activeComponent == 'basics') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}

	public isButtonsActive() {
		if (this.activeComponent == 'buttons') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isButtonsActiveActive() {
		if (this.activeComponent == 'buttons-active') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isDialogsActive() {
		if (this.activeComponent == 'dialogs') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isFormsActive() {
		if (this.activeComponent == 'forms') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isListActive() {
		if (this.activeComponent == 'list') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isProgressActive() {
		if (this.activeComponent == 'progress') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isSegmentActive() {
		if (this.activeComponent == 'segmentbar') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isSearchActive() {
		if (this.activeComponent == 'search') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isSlidersActive() {
		if (this.activeComponent == 'sliders') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isSwitchesActive() {
		if (this.activeComponent == 'switches') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isTabsActive() {
		if (this.activeComponent == 'tabs') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
	public isThemesActive() {
		if (this.activeComponent == 'theme') {
			return this.activeItem;
		}
		return this.inactiveItem;
	}
}