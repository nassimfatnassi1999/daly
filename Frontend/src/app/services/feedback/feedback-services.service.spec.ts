import { TestBed } from '@angular/core/testing';

import { FeedbackServicesService } from './feedback-services.service';

describe('FeedbackServicesService', () => {
  let service: FeedbackServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
