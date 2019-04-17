import { Observable } from "tns-core-modules/data/observable";

export function onShowingModal(args) {
    let page = args.object;
    page.bindingContext = new ModalDemo(args);
}

class ModalDemo extends Observable {
    constructor(data) {
        super();

        this.set("title", data.context.title);
        this._closeCallback = data.closeCallback;
    }

    close() {
        this._closeCallback();
    }
}
