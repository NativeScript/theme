import { BaseModel } from "./base";

export class PickersModel extends BaseModel {
    constructor(page) {
        super(page);

        this.items =  ['Item 1', 'Item 2', 'Item 3'];
    }
}

export function navigatingTo({ object: page }) {
    page.bindingContext = new PickersModel(page);
}
