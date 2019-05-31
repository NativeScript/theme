import { BaseModel } from "../pages/base";

export function onLoad(args) {
  const page = args.object;
  const model = new BaseModel(page);

  model.setActionBarTitle(args.object.ActionBarTitle);

  page.bindingContext = model;
}
