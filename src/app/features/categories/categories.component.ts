import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { ICategory } from '../../core/model/api.interface';
import { CategoryService } from '../services/category.service';
import { AllCategoriesCardComponent } from "../../shared/components/all-categories-card/all-categories-card.component";
import { NewsletterComponent } from "../home/newsletter/newsletter.component";

@Component({
  selector: 'app-categories',
  imports: [NavbarComponent, FooterComponent, AllCategoriesCardComponent, NewsletterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryService = inject(CategoryService);
  categories : WritableSignal<ICategory[]> = signal([]);
  isAnimation = false;
  subscriber = {
    next : (res : ICategory[]) => {
      this.isAnimation = false;
    } ,
    error : (e : any) => {
      this.isAnimation = false;
    }
  }
  getAllCategories(){
    this.isAnimation = true;
    this.categoryService.getAllCategories().subscribe({
      next : (r) => { 
        this.categories.set(r.data);
        this.isAnimation = false;
      }
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
}