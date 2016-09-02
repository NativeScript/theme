import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from './base';

export class TabsModel extends BaseModel {
    public tab1: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget libero sed diam congue tristique. Nullam convallis dapibus nunc, et maximus lectus scelerisque quis. Ut ut urna tellus. Vivamus pharetra venenatis urna, vel interdum turpis vestibulum quis. Duis varius feugiat elit, vel ultricies quam ullamcorper non. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris id risus tellus.Vestibulum consectetur leo nec sapien gravida, ut tincidunt turpis laoreet. Nulla quis nisi nec lectus mattis luctus a sit amet elit. Aliquam nec ipsum vitae ex luctus elementum ut ut nisi. Integer vehicula dignissim scelerisque. Nullam ut felis et orci semper tincidunt efficitur in ante. Praesent rutrum bibendum arcu, id porttitor odio ultrices nec. Pellentesque nulla nibh, mattis sit amet magna sit amet, ultrices vestibulum velit. Sed at ante ipsum. Nullam justo nisl, volutpat in lobortis id, eleifend eu justo. Nunc dui metus, faucibus gravida viverra et, varius in nisi. Mauris vitae accumsan odio.";


    public tab2: string = "Vestibulum consectetur leo nec sapien gravida, ut tincidunt turpis laoreet. Nulla quis nisi nec lectus mattis luctus a sit amet elit. Aliquam nec ipsum vitae ex luctus elementum ut ut nisi. Integer vehicula dignissim scelerisque. Nullam ut felis et orci semper tincidunt efficitur in ante. Praesent rutrum bibendum arcu, id porttitor odio ultrices nec. Pellentesque nulla nibh, mattis sit amet magna sit amet, ultrices vestibulum velit. Sed at ante ipsum. Nullam justo nisl, volutpat in lobortis id, eleifend eu justo. Nunc dui metus, faucibus gravida viverra et, varius in nisi. Mauris vitae accumsan odio.Nulla facilisi. Morbi sed mauris at nisl sagittis gravida. Aliquam tincidunt magna arcu, et posuere nibh porttitor molestie. Nam laoreet semper purus sed ornare. Aliquam erat volutpat. Vestibulum vulputate rhoncus sem ut euismod. Pellentesque condimentum dignissim ligula, eget viverra nulla luctus non. Praesent orci dui, malesuada non sollicitudin molestie, varius eget sem. Sed aliquet malesuada nunc sed suscipit. Phasellus egestas lectus sed enim pellentesque, vitae interdum est eleifend. Nulla commodo ligula eget libero suscipit imperdiet. Suspendisse ornare erat sit amet fermentum volutpat. Cras sollicitudin eget libero et bibendum. Mauris mattis feugiat ante, sit amet pharetra ante ullamcorper id.";

    public tab3: string = "Phasellus at nunc consectetur, maximus diam nec, tristique neque. Ut volutpat facilisis ex, vel mollis tortor rutrum nec. Aenean tempus risus eu velit tincidunt, at viverra magna finibus. Mauris in eleifend ante. Donec varius vestibulum urna nec aliquam. In id erat lacus. Vestibulum viverra odio orci. Cras tortor elit, sagittis ac facilisis id, ultricies id ex. Donec malesuada metus vel dolor pharetra imperdiet. Integer quis orci laoreet eros elementum pellentesque. Mauris ornare dignissim mauris in vehicula. Fusce in malesuada dui. Sed tristique sollicitudin fringilla.";

    public image1: string = "http://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/dogepaints.jpg";
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new TabsModel(page);
}