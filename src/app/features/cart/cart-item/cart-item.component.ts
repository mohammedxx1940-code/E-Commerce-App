import { Component, inject, input, InputSignal, output, OutputEmitterRef, signal } from '@angular/core';
import { IProductCart } from '../../../core/model/api.interface';
import { CartService } from '../../services/cart.service';
import { GlobalLoaderComponent } from "../../../core/layouts/components/global-loader/global-loader.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart-item',
  imports: [GlobalLoaderComponent, RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  cartProduct : InputSignal<IProductCart> = input.required();
  cartService = inject(CartService);
  onDelete : OutputEmitterRef<any> = output();
  onUpdate : OutputEmitterRef<any> = output();
  loading = signal(false);
  deleteItem(pId : string){
    this.loading.set(true);
    this.cartService.removeSpecificCartItem(pId).subscribe((r) => {
      this.loading.set(false);
      console.log(r);
      this.onDelete.emit(r);
    })
  }
  updateItem(pId : string | undefined , count : string | number){
    if(!pId) return;
    this.loading.set(true);
    this.cartService.updateCartProductQuantity(pId , count).subscribe((r) => {
      this.loading.set(false);
      console.log(r);
      this.onDelete.emit(r);
    })
  }
}