import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Progress } from "ui/progress";
import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';

var interval;

export class ProgressModel extends Observable {
  constructor() {
    super();
  }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ProgressModel();

    var progress = <Progress>page.getViewById("progress");

    interval = setInterval(function(){
      progress.value = (progress.value >= 100) ? 0 : progress.value += 1
    }, 50);
}

export function navigatingFrom(args: EventData){
  clearInterval(interval);
}