import { CategoryService } from './../services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct, ISubcategory } from './../../core/model/api.interface';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";

@Component({
  imports: [ProductCardComponent, NavbarComponent, NewsletterComponent, FooterComponent , RouterLink],
  templateUrl: './products-subcategory.component.html',
  styleUrl: './products-subcategory.component.css',
})
export class ProductsSubcategoryComponent {
  products = signal<IProduct[]>([]);
  subcategoryDetail : WritableSignal<ISubcategory | null> = signal(null);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
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
  getProducts(subId : string){

    this.productService.getProductsBySubcategory(subId).subscribe({
      next : (r) => {
        this.products.set(r.data);
      }
    })
  }
  getSubCategoryDetail(subId : string){
    this.isAnimation = true;
    this.categoryService.getSubCategories(subId).subscribe({
      next: (r) => {
        this.isAnimation = false;
        const sub = r.data.find(item => item._id === subId);
        this.subcategoryDetail.set(sub || null); 
      },
    });
  }
  ngOnInit(): void {
  const subId = this.activeRoute.snapshot.params['subId'];
  this.getProducts(subId);
  this.getSubCategoryDetail(this.activeRoute.snapshot.params['subId']);
  }
}