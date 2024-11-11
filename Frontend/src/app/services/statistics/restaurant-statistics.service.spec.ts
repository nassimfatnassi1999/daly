import { TestBed } from '@angular/core/testing';

import { RestaurantStatisticsService } from './restaurant-statistics.service';

describe('RestaurantStatisticsService', () => {
  let service: RestaurantStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
