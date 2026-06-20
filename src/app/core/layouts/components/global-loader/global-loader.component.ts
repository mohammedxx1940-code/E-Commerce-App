import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-global-loader',
  imports: [],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.css',
})
export class GlobalLoaderComponent {
  loaderService = inject(LoaderService);
}