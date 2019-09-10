import { topmost } from "tns-core-modules/ui/frame";
import { BaseModel } from "./pages/base";
import * as application from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array";

export class NavigationViewModel extends BaseModel {
    constructor(page) {
        super(page);

        this.selectedPage = "";
        this.pages = new ObservableArray({
            text: "Home",
            value: "root",
            icon: "home"
        }, {
            value: "Basics",
            icon: "font"
        }, {
            value: "Buttons",
            icon: "square"
        }, {
            text: "Active Buttons",
            value: "buttons-active",
            icon: "square-o"
        }, {
            value: "Colors",
            icon: "eyedropper"
        }, {
            value: "Dialogs",
            icon: "newspaper-o"
        }, {
            value: "Forms",
            icon: "i-cursor"
        }, {
            value: "Pickers",
            icon: "list-alt"
        }, {
            text: "DataForm",
            value: "dataform",
            icon: "database"
        }, {
            text: "ListView",
            value: "listview",
            icon: "list"
        }, {
            text: "RadListView",
            value: "radlistview",
            icon: "th-list"
        }, {
            text: "Login",
            value: "login-landing",
            icon: "user"
        }, {
            value: "Modal",
            icon: "window-maximize"
        }, {
            value: "Progress",
            icon: "spinner"
        }, {
            value: "Search",
            icon: "search"
        }, {
            text: "SegmentedBar",
            value: "segmentedbar",
            icon: "columns"
        }, {
            value: "Sliders",
            icon: "sliders"
        }, {
            value: "Switches",
            icon: "toggle-on"
        }, {
            text: "TabView",
            value: "tabview",
            icon: "road"
        }, {
            text: "Tabs",
            value: "tabs",
            icon: "ellipsis-h"
        }, {
            text: "BottomNavigation",
            value: "bottomnav",
            icon: "ellipsis-v"
        }, {
            text: "Custom ActionBar",
            value: "custom-actionbar",
            icon: "minus"
        });
    }

    onNavigationItemTap({ object: list, index }) {
        const page = (list.items[index] || list.items.getItem(index)).value;

        if (page === "Modal") {
            return this.openModal();
        }

        topmost().navigate({
            moduleName: `pages/${page.toLowerCase()}`,
            transition: {
                name: "slide"
            }
        });

        this.selectedPage = page;

        application.getRootView().closeDrawer();
    }

    viewPage(args) {
        const button = args.object;
        const pageName = button.value;

        const navigationEntry = {
            moduleName: `pages/${pageName}`,
            clearHistory: true
        };
        topmost().navigate(navigationEntry);

        this.bindingContext.selectedPage = pageName;
    }
}
