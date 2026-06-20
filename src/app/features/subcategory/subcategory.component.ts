import { Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ICategory, ISubcategory } from '../../core/model/api.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";

@Component({
  selector: 'app-subcategory',
  imports: [RouterLink, NavbarComponent, NewsletterComponent, FooterComponent],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css',
})
export class SubcategoryComponent implements OnInit{
  subCategories = signal<ISubcategory[]>([]);
  categoryDetail : WritableSignal<ICategory | null> = signal(null);
  categoryService = inject(CategoryService);
  activeRoute = inject(ActivatedRoute);
  isAnimation = false;
  subscriber = {
    next : (res : ISubcategory[]) => {
        this.isAnimation = false;
    } ,
    error : (e : any) => {
        this.isAnimation = false;
    }
  }
  getSubCategories(categoryId : string){
    this.isAnimation = true
    this.categoryService.getSubCategories(categoryId).subscribe({
      next: (r) => {
        this.subCategories.set(r.data);
        this.isAnimation = false
      },
    });
  }
  getCategoryDetail(id : string){
    this.categoryService.getCategoryDetail(id).subscribe({
      next: (r) => {
        this.categoryDetail.set(r.data);
      },
    });
  }
  ngOnInit(): void {
  const categoryId = this.activeRoute.snapshot.params['categoryId'];
  this.getCategoryDetail(this.activeRoute.snapshot.params['categoryId']);
  this.getSubCategories(categoryId);
  }
}