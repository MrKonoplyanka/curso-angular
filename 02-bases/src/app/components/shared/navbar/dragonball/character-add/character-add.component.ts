import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import type { Character } from '../../../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {

  newCharacter = output<Character>();


  name = signal('');
  power = signal(0);

  addCharacter() {
    let character: Character = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    }

    //this.characters.update((current) => [...current, character]);
    this.newCharacter.emit(character);
    this.resetFields();

  }
  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true,
  //   };
  // });

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

}
