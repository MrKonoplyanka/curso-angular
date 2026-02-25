
import { Component, inject, signal } from '@angular/core';
import { Card } from '@products/component/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Product } from '@products/interfaces/product.interface';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.services';





@Component({
  selector: 'app-home-page',
  imports: [Card, Pagination],
  templateUrl: './home-page.html',

})
export class HomePage {
  productsService = inject(ProductsService);
  products = signal<Product[]>([]);
  paginationService = inject(PaginationService);



  productsResource = rxResource({
    params: () => ({page: this.paginationService.currentPage() - 1}),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9
      });
    }
  })

}
