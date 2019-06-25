import { BaseModel } from "./base";

export class BasicsModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new BasicsModel(page);
}
