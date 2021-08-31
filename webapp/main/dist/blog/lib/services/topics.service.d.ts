import { HttpClient } from '@angular/common/http';
import { Pageable } from 'utils';
import { Observable, Subject } from 'rxjs';
import { TopicsServiceConfig } from '../config/config';
import { TopicResponseModel, TopicListResponseModel } from '../models/topic';
import * as i0 from "@angular/core";
export declare class TopicsService {
    private config;
    private httpClient;
    onChange: Subject<any>;
    constructor(config: TopicsServiceConfig, httpClient: HttpClient);
    all(endpoint: string, pageable?: Pageable): Observable<TopicListResponseModel>;
    one(endpoint: string, id: number): Observable<TopicResponseModel>;
    findByCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<TopicListResponseModel>;
    findMatchingCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<TopicListResponseModel>;
    search(endpoint: string, query: any, pageable?: Pageable): Observable<TopicListResponseModel>;
    create(endpoint: string, caption: string): Observable<TopicResponseModel>;
    update(endpoint: string, id: number, caption: string): Observable<TopicResponseModel>;
    delete(endpoint: string, id: number): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopicsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TopicsService>;
}
