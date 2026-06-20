import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { IBrand } from '../../core/model/api.interface';
import { BrandsService } from '../services/brands.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands',
  imports: [NavbarComponent, FooterComponent, NewsletterComponent, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit{
  //brands = signal<IBrand[]>([]);
  brands: WritableSignal<IBrand[]> = signal([]);
  brandService = inject(BrandsService);
  isAnimation = false;
  subscriber = {
      next : (res : IBrand[]) => {
          this.isAnimation = false;
      } ,
      error : (e : any) => {
          this.isAnimation = false;
      }
  }
  getBrands(){
    this.isAnimation = true;
    this.brandService.getAllBrands().subscribe({
      next : (r) => {
        this.isAnimation = false;
        this.brands.set(r.data);
      }
    })
  }
  ngOnInit(): void {
    this.getBrands();
  }
}