import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe,UpperCasePipe,TitleCasePipe, DatePipe],
  templateUrl: './basic-page.html',

})
export default class BasicPage {


  LocaleService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal ('ivan');
  nameUpper = signal ('IVAN');
  fullName = signal ('iVAn RilO');

  customDate = signal (new Date());

  tickingDateEffect = effect((onCleanup)=>{
    const interval = setInterval(()=>{
      this.customDate.set(new Date())
    },1000);
    onCleanup(()=>{
      clearInterval(interval);
    })
  })

  changeLocale(locale: AvailableLocale){
    this.LocaleService.changeLocale(locale);
  }
}
