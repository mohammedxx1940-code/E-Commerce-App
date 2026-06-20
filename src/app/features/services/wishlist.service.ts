import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { IProduct } from '../../core/model/api.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  http = inject(HttpClient);
  endPoint = '/api/v1/wishlist';
  wishlistSignal: WritableSignal<IProduct[]> = signal([]);
  totalWishlistItem = signal(0);
  getLoggedUserWishlist(){
    return this.http.get<any>(
      `${environment.baseURL + this.endPoint}`
    )
    .pipe(
      tap(r => {
        this.wishlistSignal.set(r.data);
      })
    );
  }
  addProductToWishlist(wId: string){
    return this.http.post<any>(
      environment.baseURL + this.endPoint,
      {
        productId: wId
      }
    ).pipe(
      tap(r => {
        this.wishlistSignal.set(r.data);
      })
    );
  }
  deleteProductToWishlist(wId: string){
    return this.http.delete<any>(
      `${environment.baseURL + this.endPoint}/${wId}`
    ).pipe(
      tap(r => {
        this.wishlistSignal.set(r.data);
      })
    );
  }
}