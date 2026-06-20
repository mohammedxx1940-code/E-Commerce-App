import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { IProduct } from '../../core/model/api.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NavbarComponent } from "../../core/layouts/components/navbar/navbar.component";
import { FooterComponent } from "../../core/layouts/components/footer/footer.component";
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from "../loader/loader.component";
import { SpinnerSuccessComponent } from "../spinner-success/spinner-success.component";

@Component({
  selector: 'app-product-detail',
  imports: [ProductCardComponent, NavbarComponent, FooterComponent, LoaderComponent, SpinnerSuccessComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  productDetail : WritableSignal<IProduct | null> = signal(null);
  activeRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  products : WritableSignal<IProduct[]> = signal([]);
  selectedImage = signal('');
  selectedImage1 = signal<string | null>(null);
  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (r) => {
        this.products.set(r.data);
      },
    });
  }
  getProductDetail(id : string){
    this.productService.getProductDetail(id).subscribe({
      next: (r) => {
        this.productDetail.set(r.data);
        this.selectedImage.set(r.data.imageCover);
        //this.selectedImage1.set(r.data.imageCover);
      },
    });
  }
  changeImage(img : string){
    this.selectedImage.set(img);
  }
  changeImage1(img : string){
    this.selectedImage1.set(img);
  }
  claerImage(){
    this.selectedImage1.set(null);
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next : (r) => {
        const id = r['productId'];
        this.getProductDetail(id);
        window.scrollTo({
          top : 0 ,
          behavior : "smooth"
        })
      }
    });
    this.getProductDetail(this.activeRoute.snapshot.params['productId']);
    this.getAllProducts();
  }
   cartService = inject(CartService);
    toastr = inject(ToastrService);
    loading = signal(false);
    success = signal(false);
    addProductToUserCart(){
      this.loading.set(true);
      this.cartService.addProductToCart(this.productDetail()!._id).subscribe({
        next : (r) => {
          this.loading.set(false);
          console.log(r.message);
          this.toastr.success(r.message , 'Success');
          this.success.set(true);
          setTimeout(() => {
            this.success.set(false);
          } , 1000)
        } , 
        error : (e) => {
          this.loading.set(false);
          console.log(e);
          this.toastr.error(e.message , 'Error');
        }
      })
  }
}