import {Observable} from 'data/observable';
import {topmost} from 'ui/frame';

export class ThemeDemo extends Observable {

  constructor() {
    super();
  }

  public viewBasics() {
    topmost().navigate('pages/basics');
  }

  public viewButtons() {
    topmost().navigate('pages/buttons');
  }

  public viewListView() {
    topmost().navigate('pages/listview');
  }

  public viewSideDrawer() {
    topmost().navigate('pages/sidedrawer');
  }

  public viewThemes() {
    topmost().navigate('pages/themes');
  }
}