import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { BaseModel } from './base';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export class DialogsModel extends BaseModel {

  public showAlert() {
    dialogs.alert('Sample alert.');
  }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new DialogsModel(page);
}