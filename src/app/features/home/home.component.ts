import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CategoryService } from '../services/category.service';
import { ICategory, IProduct } from '../../core/model/api.interface';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { RouterLink } from "@angular/router";
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { AnimationComponent } from "../animation/animation.component";
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { AnimationService } from '../../core/services/animation.service';
@Component({
  selector: 'app-home', 
  imports: [CategoryCardComponent, RouterLink, ProductCardComponent, NavbarComponent, FooterComponent, 
    AnimationComponent , NewsletterComponent , ReactiveFormsModule] , 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit{
  categoryService = inject(CategoryService);
  categories : WritableSignal<ICategory[]> = signal([]);
  productService = inject(ProductService);
  products : WritableSignal<IProduct[]> = signal([]);
  isAnimation = inject(AnimationService);
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe({
      next : (r) => {
        this.categories.set(r.data);
      }
    });
  }
  getAllProducts(){
    this.isAnimation.show();
    this.productService.getAllProducts().pipe(
                finalize(() => {
                  this.isAnimation.hide();
                })
              ).subscribe({
      next: (r) => {
        this.products.set(r.data);
      },
    });
  }
  searchInput = new FormControl('');
  allProducts = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);
  ngOnInit(): void {
    register();
    this.getAllCategories();
    this.getAllProducts();
    this.productService.getAllProducts().subscribe({
      next: (r) => {
        this.allProducts.set(r.data);
      },
    });
    this.searchInput.valueChanges.pipe(debounceTime(300) , distinctUntilChanged()).subscribe(value => {
    const keyword = value?.toLowerCase().trim() || '';
    if(!keyword){
      this.filteredProducts.set([]);
      return;
    }
    const result = this.allProducts().filter(product => 
      product.title.toLowerCase().includes(keyword)
    );
    this.filteredProducts.set(result);
   });
  }
}