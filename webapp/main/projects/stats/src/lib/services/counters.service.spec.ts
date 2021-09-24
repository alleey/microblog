import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CountersService } from './counters.service';
import { CountersServiceConfigToken } from '../config/config';
import { CounterStatisticsResponseModel } from '../models/counter-statistics';
import { UtilsModule } from 'utils';
import { CounterResponseModel } from '../models/counter';
import { HttpErrorResponse } from '@angular/common/http';

describe('CountersService', () => {
  let controller: HttpTestingController;
  let service: CountersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountersService, 
        {
          provide: CountersServiceConfigToken,
          useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "stats" }
        }]
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CountersService);
  });

  it('returns counter statistics', () => {

    const counterId = "testCounter";
    const counterStats: CounterStatisticsResponseModel = {
      counter: counterId,
      statistics: { count: 1, min: 1, max: 1, sum: 1, avg: 1 }
    };

    let apiResponse: CounterStatisticsResponseModel|undefined;
    service.getCounterStatistics("", counterId).subscribe({
      next: (res: CounterStatisticsResponseModel) => {
        apiResponse = res;
      }
    });

    const request = controller.expectOne(`http://localhost/stats/${counterId}/stats`).flush(counterStats);
    controller.verify();

    expect(apiResponse).toEqual(counterStats);
  });

  it('throws error counter statistics', () => {

    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API error');
  
    const counterId = "testCounter";
    let apiError: HttpErrorResponse|undefined;

    service.getCounterStatistics("", counterId).subscribe({
      next: (res: CounterStatisticsResponseModel) => { fail('next handler must not be called'); },
      complete: () => { fail('complete handler must not be called'); },
      error: (err) => {
        apiError = err;
      }
    });

    controller.expectOne(`http://localhost/stats/${counterId}/stats`).error(errorEvent, { status, statusText });
    controller.verify();

    expect(apiError!.error).toBe(errorEvent);
    expect(apiError!.status).toBe(status);
    expect(apiError!.statusText).toBe(statusText);  
  });

  it('returns counter value', () => {

    const counterId = "testCounter";
    const counterValue = {
      counter: counterId, owner: "test", value: 1
    };

    let apiResponse: CounterResponseModel|undefined;
    service.getCounter("", counterId).subscribe({
      next: (res: CounterResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/stats/${counterId}`).flush(counterValue);
    controller.verify();

    expect(apiResponse).toEqual(counterValue);
  });

  it('batch updates counter values', () => {
    expect(service).toBeTruthy();
  });

  it('increments a counter', () => {

    const counterId = "testCounter";
    const counterValue = {
      counter: counterId, owner: "test", value: 1
    };

    let apiResponse: CounterResponseModel|undefined;
    service.increment("", counterId, counterValue.value).subscribe({
      next: (res: CounterResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne({ method: 'POST', url: `http://localhost/stats/${counterId}/increment`})
      .flush(counterValue);
    controller.verify();

    expect(apiResponse).toEqual(counterValue);
  });

  it('sets a counter', () => {

    const counterId = "testCounter";
    const counterValue = {
      counter: counterId, owner: "test", value: 1
    };

    let apiResponse: CounterResponseModel|undefined;
    service.setCounter("", counterId, counterValue.value).subscribe({
      next: (res: CounterResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne({ method: 'POST', url: `http://localhost/stats/${counterId}`})
      .flush(counterValue);
    controller.verify();

    expect(apiResponse).toEqual(counterValue);
  });

  it('deletes a counter', () => {

    const counterId = "testCounter";
    const counterValue = {
      counter: counterId, owner: "test", value: 1
    };

    let apiResponse = false;
    service.unsetCounter("", counterId).subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller.expectOne({ method: 'DELETE', url: `http://localhost/stats/${counterId}`})
      .flush(counterValue);
    controller.verify();

    expect(apiResponse).toBeTrue();
  });
});
