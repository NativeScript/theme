import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Label } from 'ui/label';
import { NavigationViewModel } from '../navigation-vm';

interface ICustomActionBar extends Page{
	ActionBarTitle: string;
}

export function onLoad(args: EventData) {
	let page = <ICustomActionBar>args.object;
  let actionBarTitle = <Label>page.getViewById("actionBarTitle");
  actionBarTitle.text = page.ActionBarTitle;
}