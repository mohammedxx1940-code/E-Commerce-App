import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  showAnimation = signal(false);
  show(){
    this.showAnimation.set(true);
  }
  hide(){
    this.showAnimation.set(false);
  }
  toggle(){
    this.showAnimation.update((p) => !p);
  }
}