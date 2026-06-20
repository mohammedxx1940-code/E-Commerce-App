import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../features/services/cart.service';
import { AdminService } from '../../admin.service';
import { IOrder } from '../../../core/model/api.interface';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { AuthService } from '../../../core/auth-service/auth.service';

@Component({
  selector: 'app-orders-admin',
  imports: [DecimalPipe , CurrencyPipe],
  templateUrl: './orders-admin.component.html',
  styleUrl: './orders-admin.component.css',
})
export class OrdersAdminComponent implements OnInit{
    adminService = inject(AdminService);
    orders = signal<IOrder[]>([]);
    authService = inject(AuthService);
    getAllOrders(){
        this.adminService.getAllOrders().subscribe({
          next : (r:any) => {
            this.orders.set(r.data);
            this.getAllOrders();
          } , 
          error : (e) => {
            console.log(e);
          }
        })
    }
    ngOnInit(): void {
        this.getAllOrders();
    }
    getTotalItems(cartItems : any[]){
      return cartItems.reduce((total , item) => total + item.count , 0)
    }
    isOpen = signal<number | null>(null);
    toggleDetails(orderId : number){
      if(this.isOpen() == orderId){
        this.isOpen.set(null);
      }else{
        this.isOpen.set(orderId);
      }
    }
}