import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { WishlistService } from '../services/wishlist.service';
import { IProduct } from '../../core/model/api.interface';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { RouterLink } from "@angular/router";
import { CartService } from '../services/cart.service';
import { WishlistProductCardComponent } from "../../shared/components/wishlist-product-card/wishlist-product-card.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [NavbarComponent, FooterComponent, NewsletterComponent, RouterLink, WishlistProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit{
  wishlistService = inject(WishlistService);
  wishlistData: WritableSignal<IProduct[] | null> = signal(null);
  cartService = inject(CartService);
  isAnimation = signal(false);
  getUserWishlist(){
    this.isAnimation.set(true);
    this.wishlistService.getLoggedUserWishlist().pipe(
                finalize(() => {
                  this.isAnimation.set(false);
                })
    ).subscribe({
      next : (r) => {
        console.log(r);
        this.wishlistData.set(r.data);
        this.wishlistService.totalWishlistItem.set(r.numOfCartItems);
      }
    })
  }
  removeItem(id : string){
    this.wishlistData.update(products => products ? products.filter(item => item._id !== id) : null);
  }
  ngOnInit(): void {
    this.getUserWishlist();
  }
}