import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  showLoader = signal(false);
  show(){
    this.showLoader.set(true);
  }
  hide(){
    this.showLoader.set(false);
  }
  toggle(){
    this.showLoader.update((p) => !p);
  }
}