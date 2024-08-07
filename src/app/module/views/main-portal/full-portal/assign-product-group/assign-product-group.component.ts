import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product, UserRoles } from 'src/app/core/model/enums.model';
import { ProductResponse } from 'src/app/core/model/product.model';
import { FetchUsersSubResponse } from 'src/app/core/model/user.model';
import { EnumService } from 'src/app/core/service/enum.service';
import { ProductService } from 'src/app/core/service/product.service';
import { UserManageService } from 'src/app/core/service/user-manage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-product-group',
  templateUrl: './assign-product-group.component.html',
  styleUrls: ['./assign-product-group.component.scss'],
})
export class AssignProductGroupComponent {
  getAllUsersSubscription$!: Subscription;
  getProductsSubscription$!: Subscription;
  userProductGroupSubscription$!: Subscription;

  userList!: FetchUsersSubResponse[];
  productList: ProductResponse[] = [];

  userProductGroupControl = new FormControl('', Validators.required);

  pages: number[] = [];
  currentPage = 1;
  totalPages = 100;
  displayPages = 1;

  userProductGroupUpdateBtnIsDisable: boolean = false;

  userRoles: UserRoles[] = [];
  productGroups: Product[] = [];

  constructor(private _userManageService: UserManageService, private _enumService: EnumService, private _productService: ProductService) {
    this.updatePages();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getProductGroups();
    this.getAllProducts();
  }

  updateProductGroup(userId: number, currentProductGroups: string[], clickedProductGroup: string, isActivate: boolean) {
    console.log(userId, currentProductGroups, clickedProductGroup, isActivate);

    if (!isActivate) {
      if (!currentProductGroups.includes(clickedProductGroup)) {
        currentProductGroups.push(clickedProductGroup);
      }
    } else {
      const index = currentProductGroups.indexOf(clickedProductGroup);
      if (index > -1) {
        currentProductGroups.splice(index, 1);
      }
    }

    const updatedRoles = {
      productGroup: currentProductGroups,
    };

    this.userProductGroupSubscription$ = this._userManageService.updateUserProductGroup(userId, updatedRoles).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          Swal.fire({
            title: 'Success',
            text: 'User product group updated successfully!',
            icon: 'success',
            background: '#bcf1cd',
            showConfirmButton: true,
          });
          this.getAllUsers();
        } else {
          Swal.fire({
            title: 'Not updated',
            text: 'User product group could not be updated. ',
            icon: 'error',
            showConfirmButton: true,
            background: '#fbdde2',
          });
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          title: 'Not updated',
          text: 'User product group could not be updated. ',
          icon: 'error',
          showConfirmButton: true,
          background: '#fbdde2',
        });
      },
    });
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

  getAllUsers() {
    this.getAllUsersSubscription$ = this._userManageService.getAllUsers().subscribe({
      next: (response) => {
        this.userList = response.ourUsersList
          .filter((user) => user.email.endsWith('@kore.ai') === true)
          .map((user) => ({
            ...user,
            productGroup: user.productGroup == null ? [] : user.productGroup,
          }));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProductGroups() {
    this.productGroups = this._enumService.getProduct();
  }

  getProductDisplayName(enumName: any): string {
    const product = this._enumService.getProduct().find((type) => type.enumName === enumName);
    return product ? product.displayName : 'Unknown';
  }

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
    this.getAllUsersSubscription$?.unsubscribe();
    this.userProductGroupSubscription$?.unsubscribe();
    this.getProductsSubscription$!?.unsubscribe();
  }
}
