import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ICategory, IProduct } from '../../core/model/api.interface';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-electronics-products',
  imports: [NewsletterComponent, FooterComponent, NavbarComponent, ProductCardComponent],
  templateUrl: './electronics-products.component.html',
  styleUrl: './electronics-products.component.css',
})
export class ElectronicsProductsComponent {
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
  getProductsByElectronics(){
    this.isAnimation = true;
    this.productService.getProductsByElectronics().subscribe({
      next : (r) => {
        this.isAnimation = false;
        this.products.set(r.data);
      }
    })
  }
  getCategoryDetail(categoryId:string){
    categoryId = '6439d2d167d9aa4ca970649f';
    this.categoryService.getCategoryDetail(categoryId).subscribe({
      next: (r) => {
        this.categoryDetail.set(r.data);
      },
    });
  }
  ngOnInit(): void {
    this.getProductsByElectronics();
    this.getCategoryDetail(this.activeRoute.snapshot.params['categoryId']);
  }
}