import { BaseModel } from "./base";

export class ButtonsModel extends BaseModel {

}

export function navigatingTo(args) {
    const page = args.object;
    page.bindingContext = new ButtonsModel(page);
}
