import { Observable } from "tns-core-modules/data/observable";

export function onLoaded({ object: page }) {
    page.bindingContext = new ModalDemo();
}

export function onShownModally({ object, context, closeCallback }) {
    object.bindingContext.init({
        title: context,
        closeCallback: closeCallback
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
