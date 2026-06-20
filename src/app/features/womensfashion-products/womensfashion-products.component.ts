import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ICategory, IProduct } from '../../core/model/api.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";

@Component({
  selector: 'app-womensfashion-products',
  imports: [NewsletterComponent, FooterComponent, ProductCardComponent, NavbarComponent],
  templateUrl: './womensfashion-products.component.html',
  styleUrl: './womensfashion-products.component.css',
})
export class WomensfashionProductsComponent {
  products = signal<IProduct[]>([]);
  categoryDetail : WritableSignal<ICategory | null> = signal(null);
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
  getProductsByWomensfashion(){
    this.isAnimation = true;
    this.productService.getProductsByWomensfashion().subscribe({
      next : (r) => {
        this.isAnimation = false;
        this.products.set(r.data);
      }
    })
  }
  getCategoryDetail(categoryId:string){
    categoryId = '6439d58a0049ad0b52b9003f';
    this.categoryService.getCategoryDetail(categoryId).subscribe({
      next: (r) => {
        this.categoryDetail.set(r.data);
      },
    });
  }
  ngOnInit(): void {
    this.getProductsByWomensfashion();
    this.getCategoryDetail(this.activeRoute.snapshot.params['categoryId']);
  }
}