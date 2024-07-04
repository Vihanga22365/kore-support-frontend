import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/model/product.model';
import { ProductService } from 'src/app/core/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  createProductSubscription$!: Subscription;

  productControl = new FormControl('', Validators.required);

  productSubmitForm!: FormGroup;

  createProductSubmitBtnClicked: boolean = false;

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.productSubmitForm = new FormGroup({
      product: this.productControl,
    });
  }

  createProduct = () => {
    this.createProductSubmitBtnClicked = true;

    if (this.productSubmitForm.invalid) {
      Object.values(this.productSubmitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.createProductSubmitBtnClicked = false;
      return;
    }

    const productDetails: Product = {
      name: this.productControl.value!,
    };

    this.createProductSubscription$ = this._productService.createProduct(productDetails).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Product Created Successfully',
          icon: 'success',
          background: '#bcf1cd',
          showConfirmButton: true,
        });
        this.productSubmitForm.reset();
        this.createProductSubmitBtnClicked = false;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an error creating the product. Please try again.',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
        this.createProductSubmitBtnClicked = false;
      },
    });
  };

  ngOnDestroy(): void {
    this.createProductSubscription$?.unsubscribe();
  }
}
