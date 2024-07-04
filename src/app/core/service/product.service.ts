import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductResponse } from '../model/product.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}

  createProduct = (productDetails: Product) => {
    return this._httpClient.post<ProductResponse>(`${environment.AUTH_ADMIN_URL}/api/products`, productDetails);
  };

  getAllProducts = () => {
    return this._httpClient.get<ProductResponse[]>(`${environment.AUTH_ADMIN_URL}/api/products`);
  };

  deleteProduct = (productId: number) => {
    return this._httpClient.delete(`${environment.AUTH_ADMIN_URL}/api/products/${productId}`);
  };
}
