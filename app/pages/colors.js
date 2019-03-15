import { BaseModel } from "./base";

export class ColorsModel extends BaseModel {

}

export function navigatingTo(args) {
  var page = args.object;
  page.bindingContext = new ColorsModel(page);
}
