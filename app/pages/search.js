import { BaseModel } from "./base";

export class SearchModel extends BaseModel {

}

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new SearchModel(page);
}
