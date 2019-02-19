import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Label } from "ui/label";
import { BaseModel } from "../pages/base";

export function onLoad(args) {
  let page = args.object;
  let actionBarTitle = page.getViewById("actionBarTitle");
  actionBarTitle.text = page.ActionBarTitle;
  page.bindingContext = new BaseModel(page);
}
