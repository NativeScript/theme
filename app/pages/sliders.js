import { BaseModel } from "./base";

export class SlidersModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new SlidersModel(page);
}
