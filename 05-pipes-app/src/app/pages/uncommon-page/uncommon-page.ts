import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, tap } from 'rxjs';


const client1 = {
  name: 'Fernando',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canada'
}

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canada'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [Card, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.html',
})
export default class UncommonPage {


  //i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  //i18n plural


  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'un cliente esperando',
    '=2': 'dos clientes esperando',
    other: '# clientes esperando',
  })
  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Andrea',
    'Juan',
    'Carlos',

  ]);

  deleteClient() {
    this.clients.update(prev => prev.slice(1));
  }

  //KeyValue Pipe

  profile = {
    name: 'Fernando',
    age: 36,
    address: 'Ottawa, Canada',
  }

  //Async Pipe

  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa')
      console.log('Promesa finalizada');
    }, 3500);
  });

  myObservableTimer = interval (2000).pipe(
    tap((value)=> console.log('tap:', value))
  );
}
