import {TestBed} from '@angular/core/testing';

import {FetchWeatherService} from './fetch-weather.service';

describe('FetchWeatherService', () => {
  let service: FetchWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
