import { EventData } from "data/observable";
import { Page } from "ui/page";
import { SideDrawerModel } from "./sidedrawer-vm";

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new SideDrawerModel();
}