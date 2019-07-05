/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import * as app from "tns-core-modules/application";
import "nativescript-theme-core";

export function fonticon(value) {
    if (value) {
        const scope = app.getRootView()._styleScope;

        if (!scope) {
            return;
        }

        const icon = scope._selectors.class[value];

        // eslint-disable-next-line no-unused-expressions
        icon && icon
            .flatMap((value) => value.sel.ruleset.declarations)
            .reverse()
            .some((dec) => {
                if (dec.property === "content") {
                    const char = dec.value.replace(/^"|"$/g, "");

                    value = char.startsWith("\\") ?
                        String.fromCharCode(`0x${(char.match(/[a-f\d]{2,4}/i) || [])[0]}`) :
                        char;

                    return true;
                }
            });
    }

    return value;
}

app.setResources({ fonticon });
app.run({ moduleName: "app-root/app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
