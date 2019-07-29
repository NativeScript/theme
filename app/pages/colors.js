import { BaseModel } from "./base";

export class ColorsModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new ColorsModel(page);
}
