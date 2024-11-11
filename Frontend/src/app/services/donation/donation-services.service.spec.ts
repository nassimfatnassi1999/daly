import { TestBed } from '@angular/core/testing';

import { DonationServicesService } from './donation-services.service';

describe('DonationServicesService', () => {
  let service: DonationServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
