import { BaseModel } from "./base";

export class SegmentModel extends BaseModel {}

export function navigatingTo({ object: page }) {
    page.bindingContext = new SegmentModel(page);
}
