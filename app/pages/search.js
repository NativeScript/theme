import { BaseModel } from "./base";

export class SearchModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new SearchModel(page);
}
