import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { IProduct } from '../../core/model/api.interface';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-shop',
  imports: [NavbarComponent, FooterComponent, NewsletterComponent, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  productService = inject(ProductService);
  products : WritableSignal<IProduct[]> = signal([]);
  isAnimation = false;
  subscriber = {
  next : (res : IProduct[]) => {
    this.isAnimation = false;
  } ,
  error : (e : any) => {
   this.isAnimation = false;
   }
  }
  getAllProducts(){
    this.isAnimation = true;
    this.productService.getAllProducts().subscribe({
      next: (r) => {
        this.products.set(r.data);
        this.isAnimation = false;
      },
    });
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
}