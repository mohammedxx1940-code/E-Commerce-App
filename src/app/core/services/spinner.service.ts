import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  showSpinner = signal(false);
  show(){
    this.showSpinner.set(true);
  }
  hide(){
    this.showSpinner.set(false);
  }
  toggle(){
    this.showSpinner.update((p) => !p);
  }
}