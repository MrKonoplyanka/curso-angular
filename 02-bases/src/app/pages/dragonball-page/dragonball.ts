import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';


interface Character {
  id: number;
  name: string;
  power: number;
}
@Component({
  selector: 'app-dragonball',
  imports: [
    //NgClass
    ],
  templateUrl: './dragonball.html',

})
export class DragonballComponent {

  name = signal('Gohan');
  power = signal(100);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 8500 },
    { id: 3, name: 'Gohan', power: 7000 },
    { id: 4, name: 'Piccolo', power: 6000 },
    { id: 6, name: 'Cell', power: 500 },
    { id: 5, name: 'Frieza', power: 9500 },
  ]);

addCharacter() {
  let character: Character = {
    id: 7,
    name: this.name(),
    power: this.power(),
  }

  this.characters.update((current) => [...current, character]);
  this.resetFields();

}
powerClasses = computed(() => {
  return {
      'text-danger': true,
  };
});

resetFields(){
  this.name.set('');
  this.power.set(0);
}

}
