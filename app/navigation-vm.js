import { topmost } from 'tns-core-modules/ui/frame';
import { BaseModel } from './pages/base';
import * as application from 'tns-core-modules/application';
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class NavigationViewModel extends BaseModel {
	constructor(page) {
		super(page);

		this.selectedPage = "";
		this.pages = new ObservableArray({
			text: "home",
			value: "root",
			icon: "home"
		}, {
			value: "basics",
			icon: "font"
		}, {
			value: "buttons",
			icon: "square"
		}, {
			text: "active buttons",
			value: "buttons-active",
			icon: "square-o"
		}, {
			value: "colors",
			icon: "eyedropper"
		}, {
			value: "dialogs",
			icon: "newspaper-o"
		}, {
			value: "forms",
			icon: "i-cursor"
		}, {
			text: "ListView",
			value: "listview",
			icon: "list"
		}, {
			text: "login",
			value: "login-landing",
			icon: "user"
		}, {
			value: "modal",
			icon: "window-maximize"
		}, {
			value: "progress",
			icon: "spinner"
		}, {
			value: "search",
			icon: "search"
		}, {
			value: "segmentbar",
			icon: "columns"
		}, {
			value: "sliders",
			icon: "sliders"
		}, {
			value: "switches",
			icon: "toggle-on"
		}, {
			value: "tabs",
			icon: "road"
		}, {
			text: "theme",
			value: "themes",
			icon: "paint-brush"
		});
	}

	onNavigationItemTap(item) {
		const page = item.value;

		topmost().navigate({
			moduleName: `pages/${page}`,
			transition: {
				name: "slide"
			}
		});

		NavigationViewModel.selectedPage = page;

		application.getRootView().closeDrawer();
	}

	viewPage(args) {
		const button = args.object;
		const pageName = button.value;

		let navigationEntry = {
			moduleName: `pages/${pageName}`,
			clearHistory: true
		};
		topmost().navigate(navigationEntry);

		NavigationViewModel.selectedPage = pageName;
	}
}
