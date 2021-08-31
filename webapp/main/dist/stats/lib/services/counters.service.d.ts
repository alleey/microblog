import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CountersServiceConfig } from '../config/config';
import { CounterListResponseModel } from '../models/counter';
import { CounterStatisticsModel } from '../models/counter-statistics';
import * as i0 from "@angular/core";
export interface CounterRequest {
    counter: string;
    value: Number;
}
export interface BatchCounterRequest extends CounterRequest {
    operation: string;
}
export declare class CountersService {
    private config;
    private httpClient;
    onChange: Subject<any>;
    constructor(config: CountersServiceConfig, httpClient: HttpClient);
    getCounterStatistics(endpoint: string, counter: string): Observable<CounterStatisticsModel>;
    batchUpdate(endpoint: string, counters: BatchCounterRequest[]): Observable<CounterListResponseModel>;
    deleteCounter(endpoint: string, counter: string): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CountersService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CountersService>;
}
