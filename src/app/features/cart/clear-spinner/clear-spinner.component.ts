import { Component, inject } from '@angular/core';
import { ClearServiceService } from '../clear-service/clear-service.service';

@Component({
  selector: 'app-clear-spinner',
  imports: [],
  templateUrl: './clear-spinner.component.html',
  styleUrl: './clear-spinner.component.css',
})
export class ClearSpinnerComponent {
  clearService = inject(ClearServiceService);
}