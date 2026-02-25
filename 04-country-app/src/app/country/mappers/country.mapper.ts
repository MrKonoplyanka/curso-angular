import { count } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { RESTCountry, Translation } from '../interfaces/rest-countries.interfaces';
export class CountryMapper {
  //static RestCountry => Country

  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital ? restCountry.capital.join(','): 'No tiene capital',
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      commonName: restCountry.translations['spa'].common ??  'No Spanish name',
      officialName: restCountry.translations['spa'].official ?? 'No official name',
      population: restCountry.population

    }
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    console.log(restCountries);
    return restCountries.map(restCountry => this.mapRestCountryToCountry(restCountry));


  }

}
