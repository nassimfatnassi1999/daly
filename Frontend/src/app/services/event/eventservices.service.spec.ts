import { TestBed } from '@angular/core/testing';

import { EventservicesService } from './eventservices.service';

describe('EventservicesService', () => {
  let service: EventservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
