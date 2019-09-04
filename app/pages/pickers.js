import { BaseModel } from "./base";
import { TokenModel } from "nativescript-ui-autocomplete";
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class PickersModel extends BaseModel {
    constructor(page) {
        super(page);

        this.countries = ["Australia", "Albania", "Austria", "Argentina", "Maldives", "Bulgaria", "Belgium", "Cyprus", "Italy", "Japan",
                           "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland",
                           "Latvia", "Luxembourg", "Macedonia", "Moldova", "Monaco", "Netherlands", "Norway",
                           "Poland", "Romania", "Russia", "Sweden", "Slovenia", "Slovakia", "Turkey", "Ukraine",
                           "Vatican City", "Chad", "China", "Chile"];

        this.dataItems = new ObservableArray();

        for (let i = 0; i < this.countries.length; i++) {
            this.dataItems.push(new TokenModel(this.countries[i]));
        }
    }
}

export function navigatingTo({ object: page }) {
    page.bindingContext = new PickersModel(page);
}
