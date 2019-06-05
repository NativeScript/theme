import { BaseModel } from "./base";
import themes from "nativescript-themes/themes";
import { on } from "tns-core-modules/application";

let currentTheme = {
    theme: "core.light",
    skin: "blue",
    css: ""
};

export class ThemesModel extends BaseModel {
    constructor() {
        super();

        this.themeName = "";
        this.skinName = "";

        on("livesync", this._applyThemeInternal.bind(this));

        this._applyThemeInternal();
    }

    applyTheme(args) {
        let style = args.object.cssName;
        this._applyThemeInternal(style);
    }

    _applyThemeInternal(name) {
        if (typeof name === "string" && name.startsWith("core.")) {
            currentTheme.theme = name;
        } else {
            currentTheme.skin = typeof name === "string" ? name : currentTheme.skin;
        }

        this.set("themeName", this.getThemeName(currentTheme.theme));
        this.set("skinName", this.getThemeName(currentTheme.skin));

        import(/* webpackMode: "lazy", webpackExclude: /\/scss\// */ `nativescript-theme-core/styles/${currentTheme.theme}`)
            .then((core_styles) => {
                if (currentTheme.skin === "customized") {
                    return import(/* webpackMode: "lazy" */ "../customized")
                        .then((skin_styles) => this._applyStyles(core_styles, skin_styles, `${currentTheme.theme}.${currentTheme.skin}`));
                }

                import(/* webpackMode: "lazy", webpackExclude: /\/scss\// */ `nativescript-theme-core/styles/${currentTheme.skin}`)
                    .then((skin_styles) => this._applyStyles(core_styles, skin_styles, `${currentTheme.theme}.${currentTheme.skin}`));
            });
    }

    _applyStyles(core_styles, skin_styles, name) {
        currentTheme.css = core_styles.default.toString() + skin_styles.default.toString();

        themes.applyThemeCss(currentTheme.css, name);
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
