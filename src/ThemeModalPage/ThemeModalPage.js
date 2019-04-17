import { decorate } from "../utils/utils";
import { CSSType } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";

export class ThemeModalPage extends Page {}

decorate([
    CSSType("ThemeModalPage")
], ThemeModalPage);
