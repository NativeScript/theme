import { BaseModel } from "./base";

export class SwitchesModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new SwitchesModel(page);
}
