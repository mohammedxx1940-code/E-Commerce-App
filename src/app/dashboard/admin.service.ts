import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder, IOrdersResponse, IProduct, IResponse, IUser, IUsersResponse } from '../core/model/api.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = inject(HttpClient);
  getAllProducts(): Observable<IResponse<IProduct>> {
    return this.http.get<IResponse<IProduct>>(
      environment.baseURL + '/api/v1/products'
    );
  }
  getAllOrders() :  Observable<IOrder[]>{
    return this.http.get<IOrder[]>(
    `${environment.baseURL}/api/v1/orders`
    );
  }
  getAllUsers() : Observable<IUsersResponse>{
    return this.http.get<IUsersResponse>(
    `${environment.baseURL}/api/v1/users`
    );
  }
}