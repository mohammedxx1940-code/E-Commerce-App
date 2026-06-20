import { IOrder, IOrdersResponse } from './../../core/model/api.interface';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { CartService } from '../services/cart.service';
import { AuthService } from '../../core/auth-service/auth.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-orders',
  imports: [NavbarComponent, FooterComponent, NewsletterComponent , DecimalPipe , CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit{
  orderService = inject(CartService);
  //orderData: WritableSignal<IOrdersResponse | null> = signal(null);
  //orderData: WritableSignal<IOrder[]> = signal([]);
  orderData = this.orderService.orderData;
  cartService = inject(CartService);
  authService = inject(AuthService);
  isAnimation = signal(false);
  getUserOrder(){
      this.isAnimation.set(true);
      //const userId = this.authService.userData()?._id;
      //if(!userId) return;
      //const userId = this.authService.userData()?._id;
      //if (!userId) return;
      const userId = this.authService.userData()?.id;
      this.cartService.getUserOrders(userId).pipe(
        finalize(() => {
          this.isAnimation.set(false);
        })
      ).subscribe({
        error : (e) => {
          console.log(e);
          this.orderService.orderData.set([]);
        }
      })
  }
  ngOnInit(): void {
      this.getUserOrder();
  }
  getTotalItems(cartItems : any[]){
    return cartItems.reduce((total , item) => total + item.count , 0)
  }
  openOrders = signal(new Set<number>());
  toggleDetails(orderId : number){
    const current = new Set(this.openOrders());
    if(current.has(orderId)){
      current.delete(orderId);
    }else{
      current.add(orderId);
    }
    this.openOrders.set(current);
  }
  isOpen(orderId : number) : boolean{
    return this.openOrders().has(orderId);
  }
}