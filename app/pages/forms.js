import { EventData } from "data/observable";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { isIOS } from "platform";
import { BaseModel } from "./base";

export class FormsModel extends BaseModel {
  constructor(page, textField) {
    super(page);
    this._textField = textField;
    console.log(this._textField);
  }

  keyType(e) {
    console.log(e);

    let hr = this.page.getElementsByClassName("hr-light")[0];
    hr.classList.add("active");
  }

  returnPress(e) {
    console.log(e);
    let hr = this.page.getElementsByClassName("hr-light")[0];
    hr.classList.remove("active");
  }
}

export function navigatingTo(args) {
  let page = args.object;
  let textField = page.getViewById("textField");
  page.bindingContext = new FormsModel(page, textField);
}
