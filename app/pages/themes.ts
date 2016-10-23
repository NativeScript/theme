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
    let active = themes.getAppliedTheme(this.getPath('app.css'));
    this.label = this.getThemeName(active);
    themes.applyTheme(active);
  }

  public set label(value: string) {
    this.set('labelText', value);
  }

  public applyDefault() {
    let style = 'app.css';
    this.label = this.getThemeName(style);
    themes.applyTheme(this.getPath(style));
  }

  public applyLight() {
    let style = 'core.light.css';
    this.label = this.getThemeName(style);
    themes.applyTheme(this.getPath(style));
  }

  public applyDark() {
    let style = 'core.dark.css';
    this.label = this.getThemeName(style);
    themes.applyTheme(this.getPath(style));
  }

  public applyCustom() {
    let style = 'customized.css';
    this.label = this.getThemeName(style);
    themes.applyTheme(this.getPath(style));
  }

  public applyBootstrap() {
    let style = 'bootstrap-based.css';
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
    }
  }

  private getPath(name: string) {
    let appPath = knownFolders.currentApp().path + '/';
    let platform = '';
    return `${appPath}${stylesFolder}${name}${platform}`;
  }
}

export function navigatingTo(args: EventData) {
  var page = <Page>args.object;
  page.bindingContext = new ThemesModel(page);
}