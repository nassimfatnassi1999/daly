import { TestBed } from '@angular/core/testing';

import { NewServicesService } from './new-services.service';

describe('NewServicesService', () => {
  let service: NewServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
