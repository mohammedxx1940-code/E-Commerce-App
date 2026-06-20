import { Component, input, InputSignal } from '@angular/core';
import { ICategory } from '../../../core/model/api.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  category : InputSignal<ICategory> = input.required();
}