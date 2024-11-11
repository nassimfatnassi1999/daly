import { TestBed } from '@angular/core/testing';

import { ForumServicesService } from './forum-services.service';

describe('ForumServicesService', () => {
  let service: ForumServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
