import { EventData } from "data/observable";
import { Page } from "ui/page";
import { SwitchesModel } from "./switches-vm";

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new SwitchesModel();
}