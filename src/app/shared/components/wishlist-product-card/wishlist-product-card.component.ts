import { Component, inject, input, InputSignal, OnInit, output, signal } from '@angular/core';
import { IProduct } from '../../../core/model/api.interface';
import { CartService } from '../../../features/services/cart.service';
import { RouterLink } from "@angular/router";
import { WishlistService } from '../../../features/services/wishlist.service';

@Component({
  selector: 'app-wishlist-product-card',
  imports: [RouterLink],
  templateUrl: './wishlist-product-card.component.html',
  styleUrl: './wishlist-product-card.component.css',
})
export class WishlistProductCardComponent implements OnInit{
  product: InputSignal<IProduct> = input.required();
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  isCart = signal(false); 
  cartIds = signal<string[]>([]);
  deleteItem = output<string>();
  toggleCart(){
      if(this.isCart()) return;
      this.cartService.addProductToCart(this.product()._id).subscribe({
       next: (r) => {
        this.isCart.set(true);
        console.log(r.message);
        this.cartIds.update(ids => [...ids , this.product()._id]);
        this.wishlistService.totalWishlistItem.set(r.numOfCartItems);
       },
       error: (e) => {
        console.log(e);
       },
      });
  }
  deleteWishlist(){
    this.wishlistService.deleteProductToWishlist(this.product()._id).subscribe({
        next: (r) => {
          this.deleteItem.emit(this.product()._id);
          console.log('removed');
          this.wishlistService.totalWishlistItem.set(r.numOfCartItems);
        },
        error: (e) => {
          console.log(e);
        },
    });
  }
  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (r) => {
        const cartIds = r.data.products.map((item: any) => item.product._id);
        this.isCart.set(cartIds.includes(this.product()._id));
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}