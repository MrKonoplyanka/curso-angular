import { Component, inject } from '@angular/core';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { Card } from "@products/component/product-card/product-card";
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.services';


@Component({
  selector: 'app-gender-page',
  imports: [Card, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService)
  paginationService = inject(PaginationService);

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender)
    )
  )
productsResource = rxResource({
    params: () => ({gender:this.gender(),page: this.paginationService.currentPage() - 1}),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: params.page * 9

      });
    }
  })
}
