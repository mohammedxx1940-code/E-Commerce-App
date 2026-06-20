import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { ProductService } from '../services/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../core/model/api.interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-search',
  imports: [NavbarComponent, NewsletterComponent, FooterComponent, RouterLink, ReactiveFormsModule, ProductCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
 route = inject(ActivatedRoute);
 productService = inject(ProductService);
 allProducts = signal<IProduct[]>([]);
 filteredProducts = signal<IProduct[]>([]);
 ngOnInit(): void {
   this.productService.getAllProducts().subscribe({
    next : (res) => {
      this.allProducts.set(res.data);
      this.route.queryParams.subscribe(params => {
        const searchValue = params['q']?.toLowerCase() || '';
        const result = this.allProducts().filter(product => 
          product.title.toLowerCase().includes(searchValue) ||
          product.category.name.toLowerCase().includes(searchValue)
        );
        this.filteredProducts.set(result);
        console.log(result);
      })
    }
    });
 }
}