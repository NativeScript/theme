import { BaseModel } from "./base";

export class CalendarModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new CalendarModel(page);
}
