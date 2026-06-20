import { Component, input, InputSignal } from '@angular/core';
import { ICategory } from '../../../core/model/api.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-all-categories-card',
  imports: [RouterLink],
  templateUrl: './all-categories-card.component.html',
  styleUrl: './all-categories-card.component.css',
})
export class AllCategoriesCardComponent {
  category : InputSignal<ICategory> = input.required();
}