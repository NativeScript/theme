import { EventData } from "data/observable";
import { Page } from "ui/page";
import { TextField } from 'ui/text-field';
import { isIOS } from 'platform';
import { BaseModel } from './base';

export class FormsModel extends BaseModel {
  private _textField: any;

  constructor(page, textField) {
    super(page);
    this._textField = textField;
    console.log(this._textField);
  } 

  public keyType(e:any) {
    console.log(e);

    let hr = (<any>this.page).getElementsByClassName('hr-light')[0];
    hr.classList.add('active');
  }

  public returnPress(e:any) {
    console.log(e);
    let hr = (<any>this.page).getElementsByClassName('hr-light')[0];
    hr.classList.remove('active');
  }
}

export function navigatingTo(args: EventData) {
  let page = <Page>args.object;
  let textField = <TextField>page.getViewById("textField");
  page.bindingContext = new FormsModel(page, textField);
}