import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductResponse } from 'src/app/core/model/product.model';
import { ProductService } from 'src/app/core/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent {
  productList: ProductResponse[] = [];

  getProductsSubscription$!: Subscription;

  pages: number[] = [];
  currentPage = 1;
  totalPages = 100;
  displayPages = 1;

  constructor(private _productService: ProductService) {
    this.updatePages();
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts = () => {
    this.getProductsSubscription$ = this._productService.getAllProducts().subscribe({
      next: (response) => {
        this.productList = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  deleteProduct = (productId: number) => {
    this._productService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.getAllProducts();
        Swal.fire({
          title: 'Success',
          text: 'Product deleted successfully!',
          icon: 'success',
          background: '#bcf1cd',
          showConfirmButton: true,
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error deleting the product. Please try again later.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
      },
    });
  };

  setPage(page: number) {
    this.currentPage = page;
    this.updatePages();
  }

  updatePages() {
    let startPage = Math.max(this.currentPage - this.displayPages, 1);
    let endPage = Math.min(this.currentPage + this.displayPages, this.totalPages);

    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  ngOnDestroy(): void {
    this.getProductsSubscription$?.unsubscribe();
  }
}
