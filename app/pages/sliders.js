import { BaseModel } from "./base";

export class SlidersModel extends BaseModel {

}

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new SlidersModel(page);
}
