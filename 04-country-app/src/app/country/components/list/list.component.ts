import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Loader } from '../../../shared/components/loader/loader.component';


@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink, Loader],
  templateUrl: './list.component.html',
})
export class ListComponent {

  countries = input.required<Country[]>();

  errorMessage = input<string|unknown|null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
