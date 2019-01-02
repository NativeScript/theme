import { Page, topmost } from 'tns-core-modules/ui/frame';
import { BaseModel } from './pages/base';

export interface INavigationState extends Page {
	activeComponent: string;
	pageName: string;
}

export class NavigationViewModel extends BaseModel {
	public static activeComponent: string;

	public viewPage(args) {
		const page = <INavigationState>args.object;
		const pageName = page.pageName;

		let navigationEntry = {
			moduleName: `pages/${pageName}`,
			clearHistory: true
		};
		topmost().navigate(navigationEntry);

		NavigationViewModel.activeComponent = page.pageName;
	}
}
