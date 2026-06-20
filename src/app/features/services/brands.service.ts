import { IResponse, IResponseSingleData } from './../../core/model/api.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../../core/model/api.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  http = inject(HttpClient);
  getAllBrands() : Observable<IResponse<IBrand>>{
    return this.http.get<IResponse<IBrand>>(environment.baseURL + '/api/v1/brands');
  }
  getBrandDetail(brandID :string) : Observable<IResponseSingleData<IBrand>>{
    return this.http.get<IResponseSingleData<IBrand>>(environment.baseURL + '/api/v1/brands/' + brandID);
  }
}