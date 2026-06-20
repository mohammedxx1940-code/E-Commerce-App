import { Component, inject } from '@angular/core';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  animationService = inject(AnimationService);
}