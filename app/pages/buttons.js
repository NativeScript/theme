import { BaseModel } from "./base";

export class ButtonsModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new ButtonsModel(page);
}
