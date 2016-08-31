import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';

export class BaseModel extends Observable {

  constructor() {
    super();
  }

  public goBack() {
    topmost().goBack();
  }
}