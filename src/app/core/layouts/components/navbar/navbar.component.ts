import { Component, computed, ElementRef, HostListener, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../../services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../auth-service/auth.service';
import { IProduct} from '../../../model/api.interface';
import { CartService } from '../../../../features/services/cart.service';
import { WishlistService } from '../../../../features/services/wishlist.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , ReactiveFormsModule] , 
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
  flowbiteService = inject(FlowbiteService);
  open = signal(false);
  openUserMenu = signal(false);
  authService = inject(AuthService); 
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  wishlistData: WritableSignal<IProduct[] | null> = signal(null); 
  getUserWishlist(){
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next : (r) => {
        this.wishlistData.set(r.data); 
        this.wishlistService.totalWishlistItem.set(r.numOfCartItems);
      }
    })
  }
  ngOnInit(): void { 
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.cartService.getLoggedUserCart().subscribe();
    this.getUserWishlist();
  }
  @ViewChild('dom') domRef !: ElementRef;
  toggleSideBar(){
    this.open.update((p=>!p));
  }
  closeSideBar(sd : HTMLElement){
    this.open.set(false);
    sd.classList.add('hidden');
  }
  toggleOpenUserMenu(){
    this.openUserMenu.update(p=>!p);
  }
  @HostListener('document : click' , ['$event']) sayHi(e : Event){
    if(!this.domRef?.nativeElement) return;
    if(this.domRef.nativeElement.contains(e.target)) return;
    this.openUserMenu.set(false);
  }
  bln : boolean = true;
  bln1 : boolean = false;
  bln2 : boolean = false;
  bln3 : boolean = false;
  bln4 : boolean = false; 
  router = inject(Router);
  searchInput = new FormControl('');
  searchProducts(){
    const keyword = this.searchInput.value?.trim();
    console.log(keyword);
    if(!keyword) return;
    this.router.navigate(['/search'] , {queryParams : {q : keyword}}); 
  }
  /*router = inject(Router);
  searchInput = new FormControl('');
  searchProducts(){
    const keyword = this.searchInput.value?.trim();
    console.log(keyword); 
    if (!keyword) return;
    this.router.navigate(
    ['/search'],
      {
       queryParams: {
        q: keyword
       }
      } 
    );
  } */ 
}