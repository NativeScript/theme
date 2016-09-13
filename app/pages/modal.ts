import {Observable} from 'data/observable';

export function onLoaded(args: any) {
	let page = args.object;
  page.bindingContext = new ModalDemo();
}

export function onShownModally(args: any) {
  args.object.bindingContext.init({
    title: args.context,
    closeCallback: args.closeCallback
  });
}

class ModalDemo extends Observable {
  private _closeCallback: Function;

  public init(data) {
    this.set('title', data.title);
    this._closeCallback = data.closeCallback;
  }  
  public close() {
    this._closeCallback();
  }
}