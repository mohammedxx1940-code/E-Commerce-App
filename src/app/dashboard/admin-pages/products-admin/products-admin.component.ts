import { Component, inject , signal } from '@angular/core';
import { AdminService } from '../../admin.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../core/model/api.interface';
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-products-admin',
  imports: [ProductCardComponent  , ReactiveFormsModule], 
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.css',
})
export class ProductsAdminComponent {
  adminService = inject(AdminService);
  searchInput = new FormControl('');
  allProducts = signal<IProduct[]>([]);
  searchResults = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);
  ngOnInit(): void {
    this.adminService.getAllProducts().subscribe({
      next : (r) => {
        this.allProducts.set(r.data);
        this.filteredProducts.set(r.data);
      }
    });
    this.searchInput.valueChanges.subscribe(() => {
      this.searchProducts();
    });
  }
  searchProducts(){
    const keyword = this.searchInput.value?.toLowerCase().trim();
    if(!keyword){
      this.filteredProducts.set(this.allProducts());
      return;
    }
    const result = this.allProducts().filter(product => {
      const titleMatch = product.title.toLowerCase().includes(keyword);
      const categoryMatch = product.category.name.toLowerCase().includes(keyword);
      return titleMatch || categoryMatch;
    });
    this.filteredProducts.set(result);
  }
}