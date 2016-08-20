import { EventData } from "data/observable";
import { Page } from "ui/page";
import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';

export class ListViewModel extends Observable {
  public sampleItems: Array<any>;

  constructor() {
    super();
    this.set('sampleItems', [
      {
        label: 'TO DO :)'
      }
    ]);
  }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ListViewModel();
}