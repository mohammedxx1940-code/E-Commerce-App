import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";

@Component({
  selector: 'app-notfound',
  imports: [NavbarComponent, FooterComponent, NewsletterComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
})
export class NotfoundComponent {}
