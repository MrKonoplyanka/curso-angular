import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { RegionType } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<RegionType, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)?? []);
    }



    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheCapital.set(query,countries) ),
        catchError(err => {
          console.log('Error fetching', err);

          return throwError(() => new Error('Error searching country by capital'));
        })
      )

  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query)?? []);
    }



    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries)=> this.queryCacheCountry.set(query,countries)),
        delay(1000),
        catchError(err => {
          console.log('Error fetching', err);

          return throwError(() => new Error(`Error searching country by name: ${query}`));
        })
      )

  }
  searchCountryByAlphaCode(code: string) {



    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        map(countries => countries.at(0)),
        delay(1000),
        catchError(err => {
          console.log('Error fetching alpha', err);
          return throwError(() => new Error(`Error loading details of country by cca2: ${code}`));
        })
      );

  }

  searchByRegion(region:RegionType){


    if(this.queryCacheRegion.has(region)){
      return of(this.queryCacheRegion.get(region)?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(
          restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheRegion.set(region,countries) ),

        catchError(err => {
          console.log('Error fetching', err);

          return throwError(() => new Error(`Error searching country by region: ${region}`));
        })
      )
  }
}
