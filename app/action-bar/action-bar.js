import { BaseModel } from "../pages/base";

export function onLoad(args) {
  const page = args.object;
  page.bindingContext = new BaseModel(page);
}
