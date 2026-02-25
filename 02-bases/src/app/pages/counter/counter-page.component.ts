import { ChangeDetectionStrategy, Component } from "@angular/core";
import { signal } from '@angular/core';

const counterSignal = signal(10);

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',

})

export class CounterPageComponent{
  counter = 10;
  counterSignal = signal(10);

  constructor(){
    setInterval(()=>{
      this.counter += 1;
      this.counterSignal.update((v)=> v+1);
      console.log('Tick');
    },2000);
  }
  increaseBy(value:number){
    this.counter += value;
    this.counterSignal.update((current) => current + value )
  }
  decreaseBy(value:number){
    this.counter -= value;
    this.counterSignal.update((current) => current - value )
  }
  reset(){
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
