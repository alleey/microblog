import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CountersServiceConfig, CountersServiceConfigToken } from '../config/config';
import { CounterResponseModel } from '../models/counter';
import { CounterStatisticsModel, CounterStatisticsResponseModel } from '../models/counter-statistics';

export interface CounterRequest {
  counter: string;
  value: Number;
};

export interface BatchCounterRequest extends CounterRequest {
  operation: string;
};

export interface CountersServiceChangeNotification {
  counter: string; 
}

@Injectable({
  providedIn: 'root'
})
export class CountersService {

  public onChange = new Subject<CountersServiceChangeNotification>();

  constructor(
    @Inject(CountersServiceConfigToken) 
    private config: CountersServiceConfig,
    private httpClient: HttpClient) 
  { }

	getCounterStatistics(endpoint: string, counter: string): Observable<CounterStatisticsResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const counterId = encodeURIComponent(counter);
    return this.httpClient
            .get<CounterStatisticsModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counterId}/stats`);
  }

	getCounter(endpoint: string, counter: string): Observable<CounterResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const counterId = encodeURIComponent(counter);
    return this.httpClient
            .get<CounterResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counterId}`);
  }

	// batchUpdate(endpoint: string, counters: BatchCounterRequest[]): Observable<CounterListResponseModel> {
  //   const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
  //   return this.httpClient
  //           .post<CounterListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/batch`, counters)
  //           .pipe(
  //             tap({
  //               next: x => { this.onChange.next(x); }
  //             })
  //           );
  // }

	increment(endpoint: string, counter: string, value: number): Observable<CounterResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const counterId = encodeURIComponent(counter);
    return this.httpClient
            .post<CounterResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counterId}/increment`, value)
            .pipe(
              tap({
                next: x => { this.onChange.next({ counter }); }
              })
            );
  }

	setCounter(endpoint: string, counter: string, value: number): Observable<CounterResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const counterId = encodeURIComponent(counter);
    return this.httpClient
            .post<CounterResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counterId}`, value)
            .pipe(
              tap({
                next: x => { this.onChange.next({ counter }); }
              })
            );
  }

	unsetCounter(endpoint: string, counter: string): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const counterId = encodeURIComponent(counter);
    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counterId}`)
            .pipe(
              tap({
                next: x => { this.onChange.next({ counter }); }
              })
            );
  }
}
