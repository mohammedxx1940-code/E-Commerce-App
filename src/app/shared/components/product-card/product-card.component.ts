import { Component, inject, input, InputSignal, OnInit, signal } from '@angular/core';
import { IProduct } from '../../../core/model/api.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalSpinnerComponent } from '../../../core/layouts/components/global-spinner/global-spinner.component';
import { SpinnerService } from '../../../core/services/spinner.service';
import { WishlistService } from '../../../features/services/wishlist.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink,
    GlobalSpinnerComponent,
    DecimalPipe,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit{
  product: InputSignal<IProduct> = input.required();
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  toastr = inject(ToastrService);
  loading = signal(false);
  spinner = inject(SpinnerService);
  success = signal(false);
  isWishlist = signal(false);
  addProductToUserCart() {
    this.loading.set(true);
    this.spinner.show();
    this.cartService.addProductToCart(this.product()._id).subscribe({
      next: (r) => {
        this.loading.set(false);
        this.spinner.hide();
        console.log(r.message);
        this.success.set(true);
        setTimeout(() => {
          this.success.set(false);
        }, 1000);
      },
      error: (e) => {
        this.loading.set(false);
        this.spinner.hide();
        console.log(e);
      },
    });
  }
  toggleWishlist() {
    if (this.isWishlist()) {
      this.wishlistService.deleteProductToWishlist(this.product()._id).subscribe({
        next: (r) => {
          this.isWishlist.set(false);
          console.log('removed');
          this.wishlistService.totalWishlistItem.set(r.numOfCartItems);
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      this.wishlistService.addProductToWishlist(this.product()._id).subscribe({
        next: (r) => {
          this.isWishlist.set(true);
          console.log("ADD RESPONSE:", r);
          console.log('added');
          this.wishlistService.totalWishlistItem.set(r.numOfCartItems);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
  ngOnInit(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (r) => {
        const wishlistId = r.data.map((item: IProduct) => item._id);
        this.isWishlist.set(wishlistId.includes(this.product()._id));
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  rating: number = 0;
  getStarCalc(rating: any): number {
    return Math.round(rating * 2) / 2;
  }
}