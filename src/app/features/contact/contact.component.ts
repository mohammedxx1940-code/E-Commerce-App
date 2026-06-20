import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../../core/layouts/components/footer/footer.component';
import { NewsletterComponent } from "../home/newsletter/newsletter.component";

@Component({
  selector: 'app-contact',
  imports: [NavbarComponent, FooterComponent, NewsletterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent{
  subjects = ['General Inquiry' , 'Order Support' , 'Shipping Question' , 'Returns & Refunds' ,
    'Product Information' , 'Feedback & Suggestions' , 'Other'
  ]
}