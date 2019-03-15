const whiteSpaceRegExp = /\s+/gm;

export function updateClasses(view, toAdd, toRemove) {
    let classList = [];

    if (view && view.className) {
        classList = view.className.split(whiteSpaceRegExp);
    }

    if (toRemove) {
        if (typeof toRemove === "string") {
            toRemove = toRemove.split(whiteSpaceRegExp);
        }

        classList = classList.filter((v) => {
            return toRemove.indexOf(v) < 0;
        });
    }

    if (toAdd) {
        if (typeof toAdd === "string") {
            toAdd = toAdd.split(whiteSpaceRegExp);
        }

        toAdd.forEach((v) => classList.indexOf(v) === -1 && classList.push(v));
    }

    view.className = classList.join(" ");
}
