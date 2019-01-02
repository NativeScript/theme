import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { Label } from 'tns-core-modules/ui/label';
import { BaseModel } from '../pages/base';

interface ICustomActionBar extends Page {
  ActionBarTitle: string;
}

export function onLoad(args: EventData) {
  let page = <ICustomActionBar>args.object;
  let actionBarTitle = <Label>page.getViewById("actionBarTitle");
  actionBarTitle.text = page.ActionBarTitle;
  page.bindingContext = new BaseModel(page);
}
