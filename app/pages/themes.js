import { BaseModel } from "./base";

const themes = require("nativescript-themes/themes");

export class ThemesModel extends BaseModel {
    constructor(page) {
        super(page);
        this._toggled = false;
        let active = themes.getAppliedTheme("app");
        this.label = this.getThemeName(active);
        this._applyThemeInternal(active);
    }

    set label(value) {
        this.set("labelText", value);
    }

    applyTheme(args) {
        let style = args.object.cssName;
        this.label = this.getThemeName(style);
        this._applyThemeInternal(style);
    }

    _applyThemeInternal(name) {
        if (name === "customized") {
            import(/* webpackMode: "eager", webpackChunkName: "themes" */ "../customized").then((styles) => {
                themes.applyThemeCss(styles.default.toString(), name);
            });
        }

        import(
            /* webpackMode: "eager",
               webpackChunkName: "themes",
               webpackExclude: /\/scss\//
               */
             `nativescript-theme-core/styles/${name}`).then((styles) => {
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
}

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new ThemesModel(page);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
