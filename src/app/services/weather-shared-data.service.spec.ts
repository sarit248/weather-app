import { TestBed } from '@angular/core/testing';

import { WeatherSharedDataService } from './weather-shared-data.service';

describe('WeatherSharedDataService', () => {
  let service: WeatherSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
