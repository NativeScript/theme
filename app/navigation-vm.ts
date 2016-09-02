import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';
import { BaseModel } from './pages/base';
import { Page } from "ui/page";

export class NavigationViewModel extends BaseModel {

	public viewHome() {
		let navigationEntry = {
			moduleName: 'main-page',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewBasics() {
		let navigationEntry = {
			moduleName: 'pages/basics',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewButtons() {
		let navigationEntry = {
			moduleName: 'pages/buttons',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewButtonsActive() {
		let navigationEntry = {
			moduleName: 'pages/buttons-active',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewForms() {
		let navigationEntry = {
			moduleName: 'pages/forms',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewLogin() {
		let navigationEntry = {
			moduleName: 'pages/login-landing',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}	

	public viewSliders() {
		let navigationEntry = {
			moduleName: 'pages/sliders',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewSwitches() {
		let navigationEntry = {
			moduleName: 'pages/switches',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewProgress() {
		let navigationEntry = {
			moduleName: 'pages/progress',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewSearch() {
		let navigationEntry = {
			moduleName: 'pages/search',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewTabs() {
		let navigationEntry = {
			moduleName: 'pages/tabs',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewSegmentBar() {
		let navigationEntry = {
			moduleName: 'pages/segmentbar',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewDialogs() {
		let navigationEntry = {
			moduleName: 'pages/dialogs',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewListView() {
		let navigationEntry = {
			moduleName: 'pages/listview',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}

	public viewThemes() {
		let navigationEntry = {
			moduleName: 'pages/themes',
			clearHistory: true
		};
		topmost().navigate(navigationEntry);
	}
}