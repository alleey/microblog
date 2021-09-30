import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pageable } from 'utils';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TopicsServiceConfig, TopicsServiceConfigToken } from '../config/config';
import { TopicResponseModel, TopicListResponseModel } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  public onChange: Subject<any> = new Subject<any>();

  constructor(@Inject(TopicsServiceConfigToken) private config: TopicsServiceConfig, private httpClient: HttpClient) 
  { }

  public all(endpoint: string, pageable?: Pageable): Observable<TopicListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<TopicListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            });
  }

  public one(endpoint: string, id: number): Observable<TopicResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
              .get<TopicResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`);
  }

  public findByCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<TopicListResponseModel> {
    const query = {
      "conditions": [
        { "attribute": "caption", "operator": "eq", "value": `${caption}` }
      ]
    };
    return this.search(endpoint, query, pageable);
  }

  public findMatchingCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<TopicListResponseModel> {
    const query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%${caption}%` }
      ]
    };
    return this.search(endpoint, query, pageable);
  }

  public search(endpoint: string, query: any, pageable?: Pageable): Observable<TopicListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<TopicListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, 
            {
              "params": { 
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            });
  }

  public create(endpoint: string, caption: string): Observable<TopicResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const topicRepr = {
      "caption": caption
    };
    return this.httpClient
            .post<TopicResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, topicRepr)
            .pipe(
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public update(endpoint: string, id: number, caption: string): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const topicRepr = {
      "caption": caption
    };
    return this.httpClient
            .put<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`, topicRepr)
            .pipe(
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public delete(endpoint: string, id: number): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }
}
