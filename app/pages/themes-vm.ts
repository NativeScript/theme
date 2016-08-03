import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';
var themes = require('nativescript-themes');

export class ThemesModel extends Observable {
  public btnText: string;
  private _toggled: boolean = false;

  constructor() {
    super();
    this.set('btnText', 'Default');
  }

  public switchTheme() {
    this._toggled = !this._toggled;

    if (this._toggled) {
      this.set('btnText', 'Nina');
      themes.applyTheme('app.css');
    } else {
      this.set('btnText', 'Default');
      themes.applyTheme('nina-theme.css');
    }

  }
}