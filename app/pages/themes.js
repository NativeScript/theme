import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from "./base";
import { knownFolders } from "file-system";
import { isIOS, isAndroid } from "platform";

const themes = require("../temp/themes");

export class ThemesModel extends BaseModel {
    constructor(page) {
        super(page);
        this._toggled = false;
        let active = themes.getAppliedTheme(this.getPath("app.css"));
        this.label = this.getThemeName(active);
        themes.applyTheme(active);
    }

    set label(value) {
        this.set("labelText", value);
    }

    applyTheme(args) {
        let style = args.object.cssName;
        this.label = this.getThemeName(style);
        themes.applyTheme(this.getPath(style));
    }

    getThemeName(cssPath) {
        if (!cssPath || cssPath.indexOf("app.css") > -1) {
            return "Default";
        } else if (cssPath.indexOf("core.light.css") > -1) {
            return "Light";
        } else if (cssPath.indexOf("core.dark.css") > -1) {
            return "Dark";
        } else if (cssPath.indexOf("customized.css") > -1) {
            return "Custom";
        } else if (cssPath.indexOf("bootstrap-based.css") > -1) {
            return "Bootstrap";
        } else {
            let filename = cssPath.split("/").splice(-1)[0].split(".")[0];
            return capitalizeFirstLetter(filename);
        }
    }

    getPath(name) {
        let appPath = knownFolders.currentApp().path + "/";
        let platform = "";
        return `${appPath}/${name}${platform}`;
    }
}

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new ThemesModel(page);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
