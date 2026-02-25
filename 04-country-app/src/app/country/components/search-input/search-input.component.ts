import { Component, effect, inject, input, Input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  @Input() placeholder: string = 'Buscar';
  value = output<string>();
  debounceTime = input(300);

  initialValue = input<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup)=>{

    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    },this.debounceTime());

    onCleanup(()=>{
      clearTimeout(timeout);
    })
  })
}
