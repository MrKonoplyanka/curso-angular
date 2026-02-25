import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@products/component/product-table/product-table";
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.services';
import { Pagination } from "@shared/components/pagination/pagination";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {
  productsService = inject(ProductsService);
  products = signal<Product[]>([]);
  paginationService = inject(PaginationService);

  pageSize = signal<number>(10);

  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.pageSize()
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9,
        limit: params.limit
      });
    }
  })


 }
