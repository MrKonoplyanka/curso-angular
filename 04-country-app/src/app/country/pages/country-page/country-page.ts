import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { Loader } from '../../../shared/components/loader/loader.component';
import { CountryInformation } from "./country-information/country-information";


@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, Loader, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);


  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {

      return this.countryService.searchCountryByAlphaCode(request.code); // Placeholder
    }
  });


}
