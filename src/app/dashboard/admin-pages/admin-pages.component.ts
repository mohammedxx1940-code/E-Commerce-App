import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-pages',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-pages.component.html',
  styleUrl: './admin-pages.component.css',
})
export class AdminPagesComponent {
  router = inject(Router);
  logout(){
    localStorage.removeItem('Mohammed 1940');
    this.router.navigate(['/login-admin']);
  }
}