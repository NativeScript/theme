import { EventData } from "data/observable";
import { Page } from "ui/page";
import { ListViewModel } from "./listview-vm";

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ListViewModel();
}