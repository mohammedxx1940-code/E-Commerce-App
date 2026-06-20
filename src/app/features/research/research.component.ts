import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { ProductService } from '../services/product.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../core/model/api.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-research',
  imports: [NavbarComponent, NewsletterComponent, FooterComponent, ReactiveFormsModule,
     ProductCardComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css',
})
export class ResearchComponent implements OnInit{
  productService = inject(ProductService);
  searchInput = new FormControl('');
  allProducts = signal<IProduct[]>([]);
  searchResults = signal<IProduct[]>([]);
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next : (r) => {
        this.allProducts.set(r.data);
      }
    })
  }
  searchProducts(){
    const keyword = this.searchInput.value?.toLowerCase().trim();
    if(!keyword){
      this.searchResults.set([]);
      return;
    }
    const result = this.allProducts().filter(product => {
      const titleMatch = product.title.toLowerCase().includes(keyword);
      const categoryMatch = product.category.name.toLowerCase().includes(keyword);
      return titleMatch || categoryMatch;
    });
    this.searchResults.set(result);
  }
}