import { BaseModel } from "./base";
import themes from "nativescript-themes/themes";
import { on } from "tns-core-modules/application";

let currentTheme = {
    theme: "core.light",
    skin: "blue",
    css: ""
};

export class ThemesModel extends BaseModel {
    constructor(page) {
        super(page);

        on("livesync", this._applyThemeInternal.bind(this));

        this._applyThemeInternal(currentTheme.theme);
        this._applyThemeInternal(currentTheme.skin);
    }

    set theme(value) {
        this.set("themeName", value);
    }

    set skin(value) {
        this.set("skinName", value);
    }

    applyTheme(args) {
        let style = args.object.cssName;
        this._applyThemeInternal(style);
    }

    _applyThemeInternal(name) {
        let oldName = currentTheme.theme;

        if (typeof name === "string" && name.startsWith("core.")) {
            currentTheme.theme = name;
            this.theme = this.getThemeName(name);
        } else {
            oldName = currentTheme.skin;
            name = currentTheme.skin = typeof name === "string" ? name : currentTheme.skin;
            this.skin = this.getThemeName(name);
        }

        if (name === "customized") {
            return import(/* webpackMode: "lazy" */ "../customized")
                .then((styles) => this._applyStyles(styles, name, oldName));
        }

        import(/* webpackMode: "lazy", webpackExclude: /\/scss\// */ `nativescript-theme-core/styles/${name}`)
            .then((styles) => this._applyStyles(styles, name, oldName));
    }

    _applyStyles(styles, name, oldName) {
        currentTheme.css = styles.default.toString();

        themes.applyThemeCss(currentTheme.css, name, oldName);
    };

    getThemeName(cssPath) {
        if (cssPath.indexOf("core.light") > -1) {
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
