import { afterEveryRender, afterNextRender, Component, effect, signal } from '@angular/core';
import { Title } from '../../components/navbar/title/title';

const log = (...messages: string[]) => {
  console.log(`${messages[0]} %c ${messages.slice(1).join(', ')}`, 'color: #bada55')
}
@Component({
  selector: 'app-home-page',
  imports: [Title],
  templateUrl: './home-page.html',

})
export class HomePage {

  traditionalProperty = 'Iván';
  signalProperty = signal('Iván');

  constructor() {
    log('Constructor llamado');
  }

  changeTraditional(){
    this.traditionalProperty = 'Iván Rilo'
  }

  changeSignal(){
    this.signalProperty.set('Iván Rilo');
  }

  basicEffect = effect((onCleanup)=>{
    log('Effect','Disparar efectos secundarios');
    onCleanup(()=>{
      log('onCleanUp', 'Se ejecuta cuando el efecto se va a destruir');
    })
  })
  ngOnInit() {
    log("ngOnInit", 'Runs once after Angular has initialized all the components inputs.')
  }
  ngOnChanges() {
    log("ngOnChanges", 'Runs every time the components inputs have changed.')
  }
  ngDoCheck() {
    log("ngDoCheck", 'Runs every time this component is checked for changes.')
  }
  ngAfterContentInit() {
    log("ngAfterContentInit", 'Runs once after the components content has been initialized.')
  }
  ngAfterContentChecked() {
    log("ngAfterContentChecked", 'Runs every time this component content has been checked for changes.')
  }
  ngAfterViewInit() {
    log("ngAfterViewInit", 'Runs once after the components view has been initialized.')
  }
  ngAfterViewChecked() {
    log("ngAfterViewChecked", 'Runs every time the components view has been checked for changes.')
  }
  ngOnDestroy() {
    log("ngOnDestroy", "Runs once before the component is destroyed")
  }
  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRender',
      'Runs once the next time that all components have been rendered to the DOM.'
    )
  })

  afterEveryRender = afterEveryRender(() => {
    log(
      'afterEveryRender',
      'Runs every time all components have been rendered to the DOM.'
    )
  })
}


