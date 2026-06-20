import { TestBed } from '@angular/core/testing';

import { ClearServiceService } from './clear-service.service';

describe('ClearServiceService', () => {
  let service: ClearServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
