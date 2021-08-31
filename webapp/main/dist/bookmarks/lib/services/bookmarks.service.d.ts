import { HttpClient } from '@angular/common/http';
import { Pageable } from 'utils';
import { Observable, Subject } from 'rxjs';
import { BookmarkResponseModel, BookmarkListResponseModel } from '../models/bookmark';
import { BookmarksServiceConfig } from '../config/config';
import * as i0 from "@angular/core";
export declare class BookmarksService {
    private config;
    private httpClient;
    onChange: Subject<any>;
    constructor(config: BookmarksServiceConfig, httpClient: HttpClient);
    all(endpoint: string, pageable?: Pageable): Observable<BookmarkListResponseModel>;
    findMatchingCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<BookmarkListResponseModel>;
    search(endpoint: string, query: any, pageable?: Pageable): Observable<BookmarkListResponseModel>;
    findByUrl(endpoint: string, url: string): Observable<BookmarkResponseModel>;
    create(endpoint: string, caption: string, url: string): Observable<BookmarkResponseModel>;
    delete(endpoint: string, id: number): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BookmarksService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BookmarksService>;
}
