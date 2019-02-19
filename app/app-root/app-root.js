import { NavigationViewModel } from "~/navigation-vm";

// export function capitalize(value) {
//     const text = value.split(/[\b-=/\\\s]+/);
//
//     return text.map((v) => v[0].toUpperCase() + v.substr(1)).join(" ");
// }
//
// export function isActive(value) {
//     const activeItem = "sidedrawer-list-item active";
//     const inactiveItem = "sidedrawer-list-item";
//
//     if (value === NavigationViewModel.selectedPage) {
//         return activeItem;
//     }
//     return inactiveItem;
// }

export function onLoaded(args) {
    const drawerComponent = args.object;
    drawerComponent.bindingContext = new NavigationViewModel(drawerComponent);
}

