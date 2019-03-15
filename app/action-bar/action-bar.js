import { BaseModel } from "../pages/base";

export function onLoad(args) {
  let page = args.object;
  let actionBarTitle = page.getViewById("actionBarTitle");
  actionBarTitle.text = page.ActionBarTitle;
  page.bindingContext = new BaseModel(page);
}
