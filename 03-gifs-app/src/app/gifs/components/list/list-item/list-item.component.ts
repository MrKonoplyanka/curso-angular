import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Gif } from 'src/app/gifs/interfaces/gif.interface';
import type { Image } from 'src/app/gifs/interfaces/img.interface';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './list-item.component.html',

})
export class ListItemComponent {

  url = input.required<string>();
  //src:string = "https://flowbite.s3.amazonaws.com/docs/gallery/square/";

}
