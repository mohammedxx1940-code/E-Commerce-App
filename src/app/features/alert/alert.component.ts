import { Component, ElementRef, ViewChild} from '@angular/core';
@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent{
  @ViewChild('hhh') r !: ElementRef;
  getHide(hd : HTMLElement){
    hd.classList.add('hidden');
  }
}
