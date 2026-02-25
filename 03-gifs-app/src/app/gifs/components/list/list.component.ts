import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";
import { Image } from '../../interfaces/img.interface';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',

})
export class ListComponent {

  gifs = input.required<Gif[]> ( )



}
