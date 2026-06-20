import { Component, inject } from '@angular/core';
import { LoaderComponent } from "../../../../features/loader/loader.component";
import { SpinnerSuccessComponent } from "../../../../features/spinner-success/spinner-success.component";
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-global-spinner',
  imports: [LoaderComponent, SpinnerSuccessComponent],
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.css',
})
export class GlobalSpinnerComponent {
  spinnerService = inject(SpinnerService);
}