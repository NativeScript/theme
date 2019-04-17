import { BaseModel } from "./base";
import * as dialogs from "tns-core-modules/ui/dialogs";
import "setimmediate";

export class DialogsModel extends BaseModel {
    showAlert() {
        dialogs.alert("Sample alert.");
    }
}

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new DialogsModel(page);
}
