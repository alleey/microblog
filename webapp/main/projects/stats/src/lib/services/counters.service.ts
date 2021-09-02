import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CountersServiceConfig, CountersServiceConfigToken } from '../config/config';
import { CounterListResponseModel, CounterResponseModel } from '../models/counter';
import { CounterStatisticsModel } from '../models/counter-statistics';

export interface CounterRequest {
  counter: string;
  value: Number;
};
export interface BatchCounterRequest extends CounterRequest {
  operation: string;
};

@Injectable({
  providedIn: 'root'
})
export class CountersService {

  public onChange: Subject<any> = new Subject<any>();

  constructor(
    @Inject(CountersServiceConfigToken) 
    private config: CountersServiceConfig,
    private httpClient: HttpClient) 
  { }

	getCounterStatistics(endpoint: string, counter: string): Observable<CounterStatisticsModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .get<CounterStatisticsModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counter}/stats`);
  }

	getCounter(endpoint: string, counter: string): Observable<CounterResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .get<CounterResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counter}`);
  }

	batchUpdate(endpoint: string, counters: BatchCounterRequest[]): Observable<CounterListResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .post<CounterListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/batch`, counters)
            .pipe(
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

	setCounter(endpoint: string, counter: string, value: number): Observable<CounterResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .put<CounterResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counter}`, value)
            .pipe(
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

	unsetCounter(endpoint: string, counter: string): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counter}`)
            .pipe(
              catchError((error: any) => {
                return throwError(new Error(error.status));
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }
}