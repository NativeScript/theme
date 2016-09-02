import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from './base';

export class SlidersModel extends BaseModel {

}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new SlidersModel(page);
}