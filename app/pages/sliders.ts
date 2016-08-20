import { EventData } from "data/observable";
import { Page } from "ui/page";
import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';

export class SlidersModel extends Observable {

  constructor() {
    super();
  }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new SlidersModel();
}