import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { BaseModel } from './base';
import { knownFolders } from 'tns-core-modules/file-system';
var themes = require('../temp/themes');

export class ThemesModel extends BaseModel {
    public labelText: string;

    constructor(page: Page) {
        super(page);
        let active = themes.getAppliedTheme(this.getPath('app.css'));
        this.label = this.getThemeName(active);
        themes.applyTheme(active);
    }

    public set label(value: string) {
        this.set('labelText', value);
    }

    public applyTheme(args) {
        let style = args.object.cssName;
        this.label = this.getThemeName(style);
        themes.applyTheme(this.getPath(style));
    }

    private getThemeName(cssPath: string): string {
        if (!cssPath || cssPath.indexOf('app.css') > -1) {
            return 'Default';
        } else if (cssPath.indexOf('core.light.css') > -1) {
            return 'Light';
        } else if (cssPath.indexOf('core.dark.css') > -1) {
            return 'Dark';
        } else if (cssPath.indexOf('customized.css') > -1) {
            return 'Custom';
        } else if (cssPath.indexOf('bootstrap-based.css') > -1) {
            return 'Bootstrap';
        } else {
            let filename = cssPath.split('/').splice(-1)[0].split('.')[0];
            return capitalizeFirstLetter(filename);
        }
    }

    private getPath(name: string) {
        let appPath = knownFolders.currentApp().path + '/';
        let platform = '';
        return `${appPath}/${name}${platform}`;
    }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ThemesModel(page);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
