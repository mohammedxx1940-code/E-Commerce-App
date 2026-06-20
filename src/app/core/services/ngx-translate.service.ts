import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export const Lang_Key = 'lang';
@Injectable({
  providedIn: 'root',
})
export class NgxTranslateService {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  currentLang = signal('en');
  constructor(){
    if(isPlatformBrowser(this.platformId)){
      this.currentLang.set(localStorage.getItem(Lang_Key) || 'en');
    }
  }
  initNgxTranslate(){
    this.translate.addLangs(['ar' , 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use(this.currentLang());
  }
}