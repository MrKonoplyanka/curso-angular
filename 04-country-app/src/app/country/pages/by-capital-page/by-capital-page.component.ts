import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  CountryService  = inject(CountryService);


  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  router = inject(Router);

  query = linkedSignal<string>(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({query:this.query()}),
    loader: ({request}) =>{
      if(!request.query ) return of([]);

      this.router.navigate(['/country/by-capital'],{
        queryParams: {
          query: request.query,
        }
      })
        return this.CountryService.searchByCapital(request.query);
    }
  })
  // countryResource = resource({
  //   request: () => ({query:this.query()}),
  //   loader: async({request}) =>{
  //     if(!request.query ) return [];

  //     return await firstValueFrom(
  //       this.CountryService.searchByCapital(request.query));
  //   }
  // })
  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query:string){
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.CountryService.searchByCapital(query).subscribe({
  //     next: (countries) =>{
  //       this.countries.set(countries);
  //       this.isLoading.set(false);
  //     },
  //     error: (err) =>{
  //       this.isError.set(err);
  //       this.countries.set([]);
  //       this.isLoading.set(false);
  //     }
  //   } )


  // }


 }
