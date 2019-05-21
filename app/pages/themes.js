import { BaseModel } from "./base";
import themes from "nativescript-themes/themes";
import { on } from "tns-core-modules/application";

let currentTheme = {
    name: "app",
    css: ""
};

export class ThemesModel extends BaseModel {
    constructor(page) {
        super(page);
        this._toggled = false;
        let active = themes.getAppliedTheme(currentTheme.name);
        this.label = this.getThemeName(active);
        ThemesModel._applyThemeInternal(active);
    }

    set label(value) {
        this.set("labelText", value);
    }

    applyTheme(args) {
        let style = args.object.cssName;
        this.label = this.getThemeName(style);
        ThemesModel._applyThemeInternal(style);
    }

    static _applyThemeInternal(name) {
        currentTheme.name = typeof name === "string" ? name : currentTheme.name;

        if (currentTheme.name === "customized") {
            return import(/* webpackMode: "lazy" */ "../customized")
                .then(ThemesModel._applyStyles);
        }

        import(/* webpackMode: "lazy", webpackExclude: /\/scss\// */ `nativescript-theme-core/styles/${currentTheme.name}`)
            .then(ThemesModel._applyStyles);
    }

    static _applyStyles(styles) {
        currentTheme.css = styles.default.toString();

        themes.applyThemeCss(currentTheme.css, currentTheme.name);
    };

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

on("livesync", ThemesModel._applyThemeInternal);

export function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new ThemesModel(page);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
