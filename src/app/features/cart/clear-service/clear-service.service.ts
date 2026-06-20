import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClearServiceService {
  showClear = signal(false);
  show(){
    this.showClear.set(true);
  }
  hide(){
    this.showClear.set(false);
  }
  toggle(){
    this.showClear.update((p) => !p);
  }
}