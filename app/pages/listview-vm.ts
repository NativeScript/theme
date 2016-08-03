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