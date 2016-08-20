import { EventData } from "data/observable";
import { Page } from "ui/page";
import { SlidersModel } from "./sliders-vm";

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new SlidersModel();
}