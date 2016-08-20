import { EventData } from "data/observable";
import { Page } from "ui/page";
import { FormsModel } from "./forms-vm";

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new FormsModel();
}