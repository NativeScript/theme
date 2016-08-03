import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';

export class ListViewModel extends Observable {
  public items: Array<any>;

  constructor() {
    super();
    this.set('items', [
      {
        label: 'TO DO :)'
      }
    ]);
  }
}