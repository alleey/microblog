import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pageable } from 'utils';
import { Observable, Subject } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { BookmarkResponseModel, BookmarkListResponseModel } from '../models/bookmark';
import { BookmarksServiceConfig, BookmarksServiceConfigToken } from '../config/config';

export interface BookmarksServiceChangeNotification {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  public onChange: Subject<BookmarksServiceChangeNotification> = new Subject<BookmarksServiceChangeNotification>();

  constructor(
    @Inject(BookmarksServiceConfigToken) 
    private config: BookmarksServiceConfig,
    private httpClient: HttpClient) { 
  }

  public all(endpoint: string, pageable?: Pageable): Observable<BookmarkListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<BookmarkListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            });
  }

  public findMatchingCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<BookmarkListResponseModel> {
    const query = {
      "conditions": [
        { "attribute": "caption", "operator": "ilike", "value": `%${caption}%` }
      ]
    };
    return this.search(endpoint, query, pageable);
  }

  public search(endpoint: string, query: any, pageable?: Pageable): Observable<BookmarkListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<BookmarkListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, 
            {
              "params": { 
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            });
  }

  public findByUrl(endpoint: string, url: string): Observable<BookmarkResponseModel> {
    const query = {
      "conditions": [
        { "attribute": "url", "operator": "eq", "value": url }
      ]
    };
    return this.search(endpoint, query).pipe(
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
              tap({
                next: x => { this.onChange.next({ id: x.id }); }
              })
            );
  }

  public delete(endpoint: string, id: number): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(
              tap({
                next: x => { this.onChange.next({ id }); }
              })
            );
  }
}
