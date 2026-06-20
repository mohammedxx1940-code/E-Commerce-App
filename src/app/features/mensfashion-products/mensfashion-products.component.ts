import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ICategory, IProduct } from '../../core/model/api.interface';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-mensfashion-products',
  imports: [NewsletterComponent, FooterComponent, NavbarComponent, ProductCardComponent],
  templateUrl: './mensfashion-products.component.html',
  styleUrl: './mensfashion-products.component.css',
})
export class MensfashionProductsComponent {
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
  getProductsByMensfashion(){
    this.isAnimation = true;
    this.productService.getProductsByMensfashion().subscribe({
      next : (r) => {
        this.isAnimation = false;
        this.products.set(r.data);
      }
    })
  }
  getCategoryDetail(categoryId:string){
    categoryId = '6439d5b90049ad0b52b90048';
    this.categoryService.getCategoryDetail(categoryId).subscribe({
      next: (r) => {
        this.categoryDetail.set(r.data);
      },
    });
  }
  ngOnInit(): void {
    this.getProductsByMensfashion();
    this.getCategoryDetail(this.activeRoute.snapshot.params['categoryId']);
  }
}