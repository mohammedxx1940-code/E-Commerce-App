import { TestBed } from '@angular/core/testing';

import { BrowserSideService } from './browser-side.service';

describe('BrowserSideService', () => {
  let service: BrowserSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
