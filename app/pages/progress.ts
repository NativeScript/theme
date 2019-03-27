import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { Progress } from 'tns-core-modules/ui/progress';
import {Observable} from 'tns-core-modules/data/observable';
import {topmost} from 'tns-core-modules/ui/frame';
import { BaseModel } from './base';

var interval;

export class ProgressModel extends BaseModel {

}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ProgressModel(page);

    var progress = <Progress>page.getViewById("progress");

    interval = setInterval(function(){
      progress.value = (progress.value >= 100) ? 0 : progress.value += 1
    }, 50);
}

export function navigatingFrom(args: EventData){
  clearInterval(interval);
}