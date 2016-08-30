import { EventData } from "data/observable";
import { Page } from "ui/page";
import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';

export class ListViewModel extends Observable {
  public sampleItems: Array<any>;
  public sampleItemsMulti: Array<any>;
  constructor() {
    super();
    this.set('sampleItems', [
      {
        title: 'Single-line item'
      },
      {
        title: 'Single-line item 2'
      }
    ]);
    this.set('sampleItemsMulti', [
      {
        title: 'Multi-line item',
        body:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
      footnote:'the readable content of a page when looking at its layout'
    },
      {
        title: 'Multi-line item 2',
        body:'It is a long established fact that a reader will be distracted by',
        footnote:'the readable content of a page when looking at its layout'
      }
    ]);
  }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ListViewModel();
}