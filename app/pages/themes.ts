import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from './base';
import { knownFolders } from 'file-system';
import { isIOS, isAndroid } from 'platform';
var themes = require('nativescript-themes');

const stylesFolder = "demo-styles/";

export class ThemesModel extends BaseModel {
  public labelText: string;
  private _toggled: boolean = false;

  constructor(page: Page) {
    super(page);
    this.set('labelText', 'Default');
  }

  public applyDefault() {
    this.set('labelText', 'Default');
    themes.applyTheme(this.getPath('app'));
  }

  public applyLight() {
    this.set('labelText', 'Light');
    themes.applyTheme(this.getPath('core.light'));
  }

  public applyDark() {
    this.set('labelText', 'Dark');
    themes.applyTheme(this.getPath('core.dark'));
  }

  public applyCustom() {
    this.set('labelText', 'Custom');
    themes.applyTheme(this.getPath('customized'));
  }

  public applyBootstrap() {
    this.set('labelText', 'Bootstrap');
    themes.applyTheme(this.getPath('bootstrap-based'));
  }

  private getPath(name: string) {
    let appPath = knownFolders.currentApp().path + '/';
    let platform = '';
    return `${appPath}${stylesFolder}${name}${platform}.css`;
  }
}

export function navigatingTo(args: EventData) {
  var page = <Page>args.object;
  page.bindingContext = new ThemesModel(page);
}