import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ICategory, IProduct } from '../../core/model/api.interface';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";

@Component({
  selector: 'app-beautyhealth-products',
  imports: [NewsletterComponent, FooterComponent, ProductCardComponent, NavbarComponent],
  templateUrl: './beautyhealth-products.component.html',
  styleUrl: './beautyhealth-products.component.css',
})
export class BeautyhealthProductsComponent {
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
  getProductsByBeautyhealth(){
    this.isAnimation = true;
    this.productService.getProductsByBeautyhealth().subscribe({
      next : (r) => {
        this.isAnimation = false;
        this.products.set(r.data);
      }
    })
  }
  getCategoryDetail(categoryId:string){
    categoryId = '6439d30b67d9aa4ca97064b1';
    this.categoryService.getCategoryDetail(categoryId).subscribe({
      next: (r) => {
        this.categoryDetail.set(r.data);
      },
    });
  }
  ngOnInit(): void {
    this.getProductsByBeautyhealth();
    this.getCategoryDetail(this.activeRoute.snapshot.params['categoryId']);
  }
}