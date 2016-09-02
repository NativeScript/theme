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

  public viewButtonsActive() {
    topmost().navigate('pages/buttons-active');
  }

  public viewForms() {
    topmost().navigate('pages/forms');
  }

  public viewSliders() {
    topmost().navigate('pages/sliders');
  }

  public viewSwitches() {
    topmost().navigate('pages/switches');
  }

  public viewProgress() {
    topmost().navigate('pages/progress');
  }

  public viewSearch() {
    topmost().navigate('pages/search');
  }

  public viewTabs() {
    topmost().navigate('pages/tabs');
  }

  public viewSegmentBar() {
    topmost().navigate('pages/segmentbar');
  }

  public viewDialogs() {
    topmost().navigate('pages/dialogs');
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