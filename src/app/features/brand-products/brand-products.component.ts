import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IBrand, IProduct } from '../../core/model/api.interface';
import { ProductService } from '../services/product.service';
import { BrandsService } from '../services/brands.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-brand-products',
  imports: [NavbarComponent, NewsletterComponent, FooterComponent, ProductCardComponent , RouterLink],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css',
})
export class BrandProductsComponent {
  products = signal<IProduct[]>([]);
  brandDetail : WritableSignal<IBrand | null> = signal(null);
  productService = inject(ProductService);
  brandService = inject(BrandsService);
  activeRoute = inject(ActivatedRoute);
  isAnimation = false;
  subscriber = {
      next : (res : IProduct[]) => {
          this.isAnimation = false;
      } ,
      error : (e : any) => {
          this.isAnimation = false;
      }
  }
  getProducts(brandId:string){
    this.isAnimation = true;
    this.productService.getProductsByBrandId(brandId).subscribe({
      next : (r) => {
        this.isAnimation = false;
        this.products.set(r.data);
      }
    })
  }
  getBrandDetail(brandId: string){
    this.brandService.getBrandDetail(brandId).subscribe({
      next: (r) => {
        this.brandDetail.set(r.data);
      },
    });
  }
  ngOnInit(): void {
    const brandId = this.activeRoute.snapshot.params['brandId'];
    this.getBrandDetail(this.activeRoute.snapshot.params['brandId']);
    this.getProducts(brandId); 
  }
}