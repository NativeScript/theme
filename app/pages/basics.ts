import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BasicsModel } from "./basics-vm";

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new BasicsModel();
}