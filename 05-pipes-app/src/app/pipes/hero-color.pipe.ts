import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColor'
})

export class HeroColorPipe implements PipeTransform {
  transform(value: Color): string {

    console.log(value);
    const color = Color[value];
    return color;
  }
}
