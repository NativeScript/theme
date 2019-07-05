import { BaseModel } from "./base";

export class FormsModel extends BaseModel {
    constructor(page, textField) {
        super(page);
        this._textField = textField;
        console.log(this._textField);
    }

    keyType(e) {
        console.log(e);

        const hr = this.page.getElementsByClassName("hr-light")[0];
        hr.classList.add("active");
    }

    returnPress(e) {
        console.log(e);
        const hr = this.page.getElementsByClassName("hr-light")[0];
        hr.classList.remove("active");
    }
}

export function navigatingTo(args) {
    const page = args.object;
    const textField = page.getViewById("textField");
    page.bindingContext = new FormsModel(page, textField);
}
