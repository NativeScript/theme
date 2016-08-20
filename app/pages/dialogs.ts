import { EventData } from "data/observable";
import { Page } from "ui/page";
import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';
import * as dialogs from 'ui/dialogs';

class DialogsModel extends Observable {

  constructor() {
    super();
  }

  public showAlert() {
    dialogs.alert('Alert message.');
  }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new DialogsModel();
}