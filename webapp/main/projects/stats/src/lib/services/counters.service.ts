import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CountersServiceConfig, CountersServiceConfigToken } from '../config/config';
import { CounterListResponseModel } from '../models/counter';
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
            .get<CounterStatisticsModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${counter}`)
            .pipe(
              map(data => {
                return data as CounterStatisticsModel;
              })
            );
  }

	batchUpdate(endpoint: string, counters: BatchCounterRequest[]): Observable<CounterListResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .post<CounterListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/batch`, counters)
            .pipe(
              map(data => {
                return data as CounterListResponseModel;
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

	deleteCounter(endpoint: string, counter: string): Observable<void> {
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
