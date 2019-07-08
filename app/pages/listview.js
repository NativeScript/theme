import { BaseModel } from "./base";

class DemoItem {
    constructor(title) {
        this.title = title;
        this.content = "Secondary line text lorem ipsum dapibus, neque id cursus faucibus";
        this.image = "~/assets/images/Thumb1.jpg";
        this.imagealt = "~/assets/images/Thumb3.jpg";
    }
}

//Alt images
//http://vignette3.wikia.nocookie.net/dragonball/images/c/cb/CDGDZZfVAAI6_K4.jpg
//http://vignette3.wikia.nocookie.net/dragonball/images/c/cb/CDGDZZfVAAI6_K4.jpg

export class ListViewModel extends BaseModel {
    constructor(page) {
        super(page);

        const items = [];
        for (let i = 0; i < 50; i++) {
            items.push(new DemoItem(`Content Item ${i}`));
        }

        this.set("sampleItems", items);
    }
}

export function navigatingTo(args) {
    const page = args.object;
    page.bindingContext = new ListViewModel(page);
}
