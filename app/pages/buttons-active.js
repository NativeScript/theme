import { BaseModel } from "./base";

export class ButtonsModel extends BaseModel {

}

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new ButtonsModel(page);
}
