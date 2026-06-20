import { IResponseSingleData } from './../../core/model/api.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IResponse } from '../../core/model/api.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  getAllProducts() : Observable<IResponse<IProduct>>{
    return this.http.get<IResponse<IProduct>>(environment.baseURL + '/api/v1/products');
  }
  searchProducts(keyword : string){
    return this.http.get<any>(`${environment.baseURL}/api/v1/products?keyword=${keyword}`);
  }
  getProductDetail(id : string) : Observable<IResponseSingleData<IProduct>>{
    return this.http.get<IResponseSingleData<IProduct>>(environment.baseURL + '/api/v1/products/' + id);
  }
  getProductsBySubcategory(subId : string) : Observable<IResponse<IProduct>>{
    return this.http.get<IResponse<IProduct>>
    (`${environment.baseURL}/api/v1/products?subcategory[in]=${subId}`);
  }
  getProductsByCategoryId(categoryId : string){
    return this.http.get<IResponse<IProduct>>
    (`${environment.baseURL}/api/v1/products?category[in]=${categoryId}`);
  }
  getProductsByWomensfashion(){
    return this.http.get<IResponse<IProduct>>
    (`${environment.baseURL}/api/v1/products?category[in]=6439d58a0049ad0b52b9003f`);
  }
  getProductsByMensfashion(){
    return this.http.get<IResponse<IProduct>>
    (`${environment.baseURL}/api/v1/products?category[in]=6439d5b90049ad0b52b90048`);
  }
  getProductsByElectronics(){
    return this.http.get<IResponse<IProduct>>
    (`${environment.baseURL}/api/v1/products?category[in]=6439d2d167d9aa4ca970649f`);
  }
  getProductsByBeautyhealth(){
    return this.http.get<IResponse<IProduct>>
    (`${environment.baseURL}/api/v1/products?category[in]=6439d30b67d9aa4ca97064b1`);
  }
  getProductsByBrandId(brandId : string){
    return this.http.get<IResponse<IProduct>>
    (`${environment.baseURL}/api/v1/products?brand[in]=${brandId}`);
  }
}