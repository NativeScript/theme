import { BaseModel } from "./base";

const themes = require("nativescript-themes/themes");

export class ThemesModel extends BaseModel {
    constructor(page) {
        super(page);
        this._toggled = false;
        let active = themes.getAppliedTheme(this.getPath("app"));
        this.label = this.getThemeName(active);
        this._applyThemeInternal(active, "app");
    }

    set label(value) {
        this.set("labelText", value);
    }

    applyTheme(args) {
        let style = args.object.cssName;
        this.label = this.getThemeName(style);
        this._applyThemeInternal(this.getPath(style), style);
    }

    _applyThemeInternal(path, name) {
        import(
            /* webpackMode: "eager",
               webpackExclude: /\/scss\//
               */
            `nativescript-theme-core/styles/${path}`).then((styles) => {
            themes.applyThemeCss(styles.default.toString(), name);
        });
    }

    getThemeName(cssPath) {
        if (!cssPath || cssPath.indexOf("app") > -1) {
            return "Default";
        } else if (cssPath.indexOf("core.light") > -1) {
            return "Light";
        } else if (cssPath.indexOf("core.dark") > -1) {
            return "Dark";
        } else if (cssPath.indexOf("customized") > -1) {
            return "Custom";
        } else if (cssPath.indexOf("bootstrap-based") > -1) {
            return "Bootstrap";
        } else {
            let filename = cssPath.split("/").splice(-1)[0].split(".")[0];
            return capitalizeFirstLetter(filename);
        }
    }

    getPath(name) {
        let platform = "";
        return `${name}${platform}`;
    }
}

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new ThemesModel(page);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
