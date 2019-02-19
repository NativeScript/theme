import {Observable} from "data/observable";

export function onLoaded(args) {
	let page = args.object;
  page.bindingContext = new ModalDemo();
}

export function onShownModally(args) {
  args.object.bindingContext.init({
    title: args.context,
    closeCallback: args.closeCallback
  });
}

class ModalDemo extends Observable {
  init(data) {
    this.set("title", data.title);
    this._closeCallback = data.closeCallback;
  }
  close() {
    this._closeCallback();
  }
}
