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
  selector: 'by-country',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  CountryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  router = inject(Router);
  query = linkedSignal<string>(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
        }
      })
      return this.CountryService.searchByCountry(request.query);
    }
  })
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.CountryService.searchByCountry(request.query));
  //   }
  // })

}
