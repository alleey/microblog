import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pageable } from 'utils';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { BookmarkResponseModel, BookmarksResponseModel } from '../models/bookmark';
import { BookmarksServiceConfig, BookmarksServiceConfigToken } from '../config/service-config';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  public onChange: Subject<any> = new Subject<any>();

  constructor(
    @Inject(BookmarksServiceConfigToken) 
    private config: BookmarksServiceConfig,
    private httpClient: HttpClient) { 
  }

  public all(endpoint: string, pageable?: Pageable): Observable<BookmarksResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<BookmarksResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption",
                "sort.dir": "asc"
              }
            })
            .pipe(
              map(data => {
                return data as BookmarksResponseModel;
              })
            );
  }

  public findMatchingCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<BookmarksResponseModel> {
    const query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%${caption}%` }
      ]
    };
    return this.search(endpoint, query, pageable);
  }

  public search(endpoint: string, query: any, pageable?: Pageable): Observable<BookmarksResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<BookmarksResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, 
            {
              "params": { 
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption",
                "sort.dir": "asc"
              }
            })
            .pipe(
              map(data => {
                return data as BookmarksResponseModel;
              })
            );
  }

  public findByUrl(endpoint: string, url: string): Observable<BookmarkResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const query = {
      "conditions": [
        { "attribute": "url", "operator": "eq", "value": url }
      ]
    };
    return this.httpClient
            .get<BookmarksResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, 
            {
              "params": { "q": JSON.stringify(query) }
            })
            .pipe(
              map(data => {
                return data._embedded.bookmarks[0] as BookmarkResponseModel;
              })
            );
  }

  public create(endpoint: string, caption: string, url: string): Observable<BookmarkResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const boomarkRepr = {
      "url": url, "caption": caption
    };
    return this.httpClient
            .post<BookmarkResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, boomarkRepr)
            .pipe(
              map(data => {
                return data as BookmarkResponseModel;
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public delete(endpoint: string, id: number): Observable<BookmarkResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .delete<any>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(
              map((res: Response) => {
                return {} as BookmarkResponseModel;
              }),
              catchError((error: any) => {
                return throwError(new Error(error.status));
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }
}
