import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { NavigationViewModel } from "~/navigation-vm";

export function onLoad(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new RootViewModel(page);
}

export class RootViewModel extends NavigationViewModel {
}
