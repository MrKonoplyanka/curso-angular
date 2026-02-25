
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Country } from '../../interfaces/country.interface';
import { RegionType } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { of, tap } from 'rxjs';
import { ActivatedRoute, Router, RouterLinkActive } from "@angular/router";
import { rxResource } from '@angular/core/rxjs-interop';


function validateQueryParam(queryParam:string): RegionType{
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string,RegionType> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})




export class ByRegionPageComponent {

  public regions: RegionType[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];


  activatedRoute = inject(ActivatedRoute);
  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region') ?? 'Americas') as RegionType;

  router = inject(Router);

  countryService = inject(CountryService);
  selectedRegion = linkedSignal<RegionType>(() => validateQueryParam(this.queryParam));

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      this.router.navigate(['/country/by-region'],{
        queryParams: {
          region: request.region,
        }
      })

      return this.countryService.searchByRegion(request.region);
    }
  })
 }

