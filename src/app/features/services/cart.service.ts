import { AuthService } from './../../core/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICartResponse, IOrder, IOrdersResponse, IProduct, IProductCart } from '../../core/model/api.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  endPoint = '/api/v1/cart';
  cartData : WritableSignal<IProductCart[]> = signal([]);
  orderData : WritableSignal<IOrder[]> = signal([]);  
  getLoggedUserCart() : Observable<ICartResponse>{
    return this.http.get<ICartResponse>(environment.baseURL + this.endPoint).pipe(
          tap(r => {
            this.cartData.set(r.data.products);
          })
        );
  }
  clearUserCart() : Observable<any>{
    return this.http.delete<any>(environment.baseURL + this.endPoint).pipe(
      tap(r => {
            this.cartData.set([]);
      })
    );
  }
  addProductToCart(pId : string) : Observable<any>{
    return this.http.post<any>(environment.baseURL + this.endPoint , {productId : pId}).pipe(
      tap(r => {
            this.cartData.set(r.data.products);
      })
    );
  }
  updateCartProductQuantity(pId : string , count : string | number) : Observable<any>{
    return this.http.put<any>(environment.baseURL + this.endPoint + `/${pId}` , 
      {count : count}).pipe(
      tap(r => {
            this.cartData.set(r.data.products);
      })
    );
  }
  removeSpecificCartItem(pId : string) : Observable<any>{
    return this.http.delete<any>(environment.baseURL + this.endPoint + `/${pId}`).pipe(
      tap(r => {
            this.cartData.set(r.data.products);
      })
    );
  }
  checkoutSession(cartId : string , addressForm : {
    details : string , phone : string , city : string
  } , baseUrl = 'http://localhost:4200'){
    return this.http.post<any>(environment.baseURL +
       `/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}` , { 
        "shippingAddress":{
        "details": addressForm.details,
        "phone": addressForm.phone,
        "city": addressForm.city
        }
    });
  }
  cashOrder(cartId : string , addressForm : {
    details : string , phone : string , city : string
  }){
    return this.http.post<any>(environment.baseURL +
       `/api/v1/orders/${cartId}` , { 
        "shippingAddress":{
        "details": addressForm.details,
        "phone": addressForm.phone,
        "city": addressForm.city
        }
    });
  }
  getUserOrders(userId: string): Observable<IOrder[]> {
   return this.http.get<IOrder[]>(
    `${environment.baseURL}/api/v1/orders/user/${userId}`
   ).pipe(tap((orders) => {
    this.orderData.set([...orders]/*.reverse()*/)
   }))
   ;
  }
  
}