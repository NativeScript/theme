import { BaseModel } from "./base";
import themes from "nativescript-themes";
import * as application from "tns-core-modules/application";
import { ClassList } from "nativescript-theme-core";

const currentTheme = {
    theme: "core.light",
    skin: "blue",
    css: ""
};

export class ThemesModel extends BaseModel {
    constructor() {
        super();

        this.theme = "";

        const applyThemeProxy = this._applyThemeInternal.bind(this);

        application.on("livesync", applyThemeProxy);

        // Handle HMR
        if (module.hot) {
            module.hot.dispose(() => {
                application.off("livesync", applyThemeProxy);
            });
        }

        this._applyThemeInternal();
    }

    applyTheme(args) {
        const style = args.object.cssName;
        this._applyThemeInternal(style);
    }

    _applyThemeInternal(name) {
        const themeChange = typeof name === "string" && name.startsWith("core.");

        if (themeChange) {
            currentTheme.theme = name;
        } else {
            currentTheme.skin = typeof name === "string" ? name : currentTheme.skin;
        }

        const themeName = this.getThemeName(currentTheme.theme);

        const rootView = application.getRootView();
        const classList = new ClassList(rootView.className);

        classList
            .remove("ns-light", "ns-dark")
            .add(`ns-${themeName.toLowerCase()}`);

        rootView.className = classList.get();

        this.set("theme", `${themeName} ${this.getThemeName(currentTheme.skin)}`);

        if (themeChange) {
            return;
        }

        if (currentTheme.skin === "customized" || currentTheme.skin.startsWith("kendo-")) {
            return import(
                /*  webpackMode: "lazy",
                    webpackInclude: /\.s?css$/,
                    webpackExclude: /_app-styles\.scss/ */
                `../${currentTheme.skin}`)
                .then((skinStyles) => this._applyStyles(skinStyles, `${currentTheme.skin}`));
        }

        import(
            /*  webpackMode: "lazy",
                webpackExclude: /\/scss\// */
            `nativescript-theme-core/${currentTheme.skin}`)
            .then((skinStyles) => this._applyStyles(skinStyles, `${currentTheme.skin}`));
    }

    _applyStyles(skinStyles, name) {
        currentTheme.css = skinStyles.default.toString();

        themes.applyThemeCss(currentTheme.css, name);
    }

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
            const filename = cssPath.split("/").splice(-1)[0].split(".")[0];
            return capitalizeFirstLetter(filename);
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function onLoaded({ object: page }) {
    page.bindingContext = new ThemesModel();
}
