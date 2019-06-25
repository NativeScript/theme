import { BaseModel } from "./base";

export class BasicsModel extends BaseModel {}

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new BasicsModel(page);
}
