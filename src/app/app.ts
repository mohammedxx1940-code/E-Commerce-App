import { NgxTranslateService } from './core/services/ngx-translate.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/layouts/components/navbar/navbar.component";
import { FooterComponent } from "./core/layouts/components/footer/footer.component";
import { AuthService } from './core/auth-service/auth.service';
import { GlobalLoaderComponent } from "./core/layouts/components/global-loader/global-loader.component";
import { GlobalSpinnerComponent } from "./core/layouts/components/global-spinner/global-spinner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, GlobalLoaderComponent, GlobalSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('shopping-app');
  ngxTranslateService = inject(NgxTranslateService);
  authService = inject(AuthService)
  constructor(){
    this.ngxTranslateService.initNgxTranslate();
  }
 ngOnInit(): void {
   this.authService.saveUserData();
 }
}