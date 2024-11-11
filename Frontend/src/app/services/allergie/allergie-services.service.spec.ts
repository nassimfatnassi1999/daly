import { TestBed } from '@angular/core/testing';

import { AllergieServicesService } from './allergie-services.service';

describe('AllergieServicesService', () => {
  let service: AllergieServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergieServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
