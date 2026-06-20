import { Component, ElementRef, inject,  signal,  ViewChild, WritableSignal } from '@angular/core';
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { CartService } from '../services/cart.service';
import { ICartResponse} from '../../core/model/api.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerSuccessComponent } from "../spinner-success/spinner-success.component";
import { finalize } from 'rxjs';
import { AuthService } from '../../core/auth-service/auth.service';

@Component({
  selector: 'app-checkout-session',
  imports: [NavbarComponent, NewsletterComponent, FooterComponent, ReactiveFormsModule, SpinnerSuccessComponent, RouterLink],
  templateUrl: './checkout-session.component.html',
  styleUrl: './checkout-session.component.css',
})
export class CheckoutSessionComponent {
  @ViewChild('dom') domRef !: ElementRef;
  getCheck(btn1 : HTMLElement , div1 : HTMLElement , i1 : HTMLElement , btn2 : HTMLElement , 
   div2 : HTMLElement , i2 : HTMLElement){
    btn1.classList.add('border-red-500' , 'bg-linear-to-br' , 'from-red-50' , 'to-red-100' , 'shadow-lg'
      , 'shadow-red-600' , 'hover:from-red-100' , 'hover:to-red-200'
    );
    btn1.classList.remove('border-red-200' , 'bg-white' , 'hover:bg-red-200' , 'hover:shadow-lg' , 
    'hover:shadow-red-600');
    div1.classList.add('bg-red-500' , 'text-white');
    div1.classList.remove('border-2' , 'border-red-300');
    i1.classList.remove('opacity-0');
    btn2.classList.remove('border-red-500' , 'bg-linear-to-br' , 'from-red-50' , 'to-red-100' , 'shadow-lg'
      , 'shadow-red-600' , 'hover:from-red-100' , 'hover:to-red-200'
    );
    btn2.classList.add('border-red-200' , 'bg-white' , 'hover:bg-red-200' , 'hover:shadow-lg' , 
    'hover:shadow-red-600');
    div2.classList.remove('bg-red-500' , 'text-white');
    div2.classList.add('border-2' , 'border-red-300');
    i2.classList.add('opacity-0');
  }
  cartService = inject(CartService);
  authService = inject(AuthService);
  cartData : WritableSignal<ICartResponse | null> = signal(null);
  activatedRoute = inject(ActivatedRoute);
  routeService = inject(Router);
  cartId = signal('');
  isAnimation = signal(false);
  loading = signal(false);
  getUserCart(){
    this.isAnimation.set(true);
    this.cartService.getLoggedUserCart().pipe(
            finalize(() => {
              this.isAnimation.set(false);
            })
          ).subscribe({
      next : (r) => {
        console.log(r);
        this.cartData.set(r);
      } , error : (e) => {
          console.log(e);
      }
    })
  }
  ngOnInit(): void {
    this.getUserCart();
    this.cartId.set(this.activatedRoute.snapshot.params['cartId']);
  }
  fb = inject(FormBuilder);
  addressForm  : FormGroup = this.fb.group({
    details : ['' , Validators.required] , 
    phone  : ['' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]] ,
    city : ['' , Validators.required] ,
  });
  handlePayment(method : 'cash' | 'online'){
    if(!this.addressForm.valid) return;
    if(method == 'cash'){
      this.loading.set(true);
      this.cartService.cashOrder(this.cartId() , this.addressForm.value).subscribe({
        next : (r : any) => {
          console.log(r);
          if(r.status === 'success'){
            const userId = this.authService.userData()?.id;
            this.cartService.getUserOrders(userId).subscribe(() =>{
              this.loading.set(false);
              this.routeService.navigate(['/myorders'])
            })
          }
        } ,
      });
      return;
    }
    if(method == 'online'){
      this.loading.set(true);
      this.cartService.checkoutSession(this.cartId() , this.addressForm.value).subscribe({
        next : (r : any) => {
          this.loading.set(false);     
          console.log(r);
          if(r.status = 'success'){
            window.location.href = r.session.url
          }
        } ,
      });
    }
  }
}