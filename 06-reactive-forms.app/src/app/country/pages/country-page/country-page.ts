import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../services/interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './country-page.html',
})
export class CountryPage {
  fb = inject(FormBuilder);
  countryService = inject(CountryService)

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],

  })
  onRegionChanged(){
    return this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('') ),
      tap(() => this.myForm.get('border')!.setValue('') ),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap(region => this.countryService.getCountriesByRegion(region ?? ''))
    )
    .subscribe(countries => {
      this.countriesByRegion.set(countries);
    })
  }

  onFormChanged = effect((onCleanUp)=>{
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanUp(()=>{
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    })
  })

  onCountryChanged(){
    return this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('border')!.setValue('') ),
      filter(value => value!.length>0),
      switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
      switchMap(country => this.countryService.getCountryNamesByCodeArray(country.borders))

    )
    .subscribe((borders)=>{
      this.borders.set(borders);
    });
  }


}
