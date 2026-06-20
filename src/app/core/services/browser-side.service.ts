import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserSideService {
  platformId = inject(PLATFORM_ID);
  isBrowserSide(){
    return isPlatformBrowser(this.platformId);
  }
}