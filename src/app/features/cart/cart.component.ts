import { Component, ElementRef, inject, OnInit, QueryList, signal, ViewChildren, WritableSignal } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { CartService } from '../services/cart.service';
import { ICartResponse } from '../../core/model/api.interface';
import { LoaderService } from '../../core/services/loader.service';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { ClearServiceService } from './clear-service/clear-service.service';
import { ClearSpinnerComponent } from "./clear-spinner/clear-spinner.component";
import { RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth-service/auth.service';
import { AnimationComponent } from "../animation/animation.component";
import { NewsletterComponent } from "../home/newsletter/newsletter.component";

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent, FooterComponent, CartItemComponent, ClearSpinnerComponent, RouterLink, AnimationComponent, NewsletterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{
  cartService = inject(CartService);
  cartData : WritableSignal<ICartResponse | null> = signal(null);
  loader = inject(LoaderService);
  spinnerClear = inject(ClearServiceService);
  authService = inject(AuthService);
  isAnimation = false;
  subscriber = {
      next : (res : ICartResponse[]) => {
        this.isAnimation = false;
      } ,
      error : (e : any) => {
        this.isAnimation = false;
      }
  }
  getUserCart(){
    this.isAnimation = true
    this.cartService.getLoggedUserCart().subscribe({
      next : (r) => {
        console.log(r);
        this.cartData.set(r);
        this.isAnimation = false
      }
    })
  }
  ngOnInit(): void {
    this.getUserCart();
  }
  handleChange(r : any){
    this.cartData.set(r);
  }
  clearCart(){
    this.spinnerClear.show();
    this.cartService.clearUserCart().subscribe((r) => {
      console.log(r);
      this.spinnerClear.hide();
      this.cartData.set(null);
    });
  }
  @ViewChildren('clear') clear !: QueryList<ElementRef>;
  showClear(){
    this.clear.forEach((elx) => {
      elx.nativeElement.classList.remove('hidden');
    });
  }
  hideClear(){
    this.clear.forEach((elx) => {
      elx.nativeElement.classList.add('hidden');
    });
  }
}