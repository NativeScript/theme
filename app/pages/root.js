import { NavigationViewModel } from "~/navigation-vm";

export function onLoad(args) {
    const page = args.object;
    page.bindingContext = new RootViewModel(page);
}

export class RootViewModel extends NavigationViewModel {
}
