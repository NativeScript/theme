import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from './base';

class DemoItem {
  constructor(title: string){
    this.title = title;
  }

  public title: string;
  public content: string = 'Secondary line text lorem ipsum dapibus, neque id cursus faucibus';
  public image: string = "~/images/Thumb1.jpg";
  public imagealt: string = "~/images/Thumb3.jpg";
}

//Alt images
//http://vignette3.wikia.nocookie.net/dragonball/images/c/cb/CDGDZZfVAAI6_K4.jpg
//http://vignette3.wikia.nocookie.net/dragonball/images/c/cb/CDGDZZfVAAI6_K4.jpg

export class ListViewModel extends BaseModel {
  public sampleItems: Array<DemoItem>;
  public sampleItemsMulti: Array<any>;
  constructor(page:Page) {
    super(page);

    var items = new Array<DemoItem>();
    for(let i=0; i < 50; i++){
      items.push(new DemoItem("Content Item " + i));
    }

    this.set("sampleItems", items);
  }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new ListViewModel(page);
}