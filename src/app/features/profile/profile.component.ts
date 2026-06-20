import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, FooterComponent, NewsletterComponent, RouterOutlet , RouterLink , RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}