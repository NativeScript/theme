import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { NavigationViewModel } from '../navigation-vm';

export function onLoad(args: EventData) {
	let page = <Page>args.object;
	page.bindingContext = new NavigationViewModel(page);
}