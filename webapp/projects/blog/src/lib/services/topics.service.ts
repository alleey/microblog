import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pageable } from 'utils';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TopicsServiceConfig, TopicsServiceConfigToken } from '../config/config';
import { TopicResponseModel, TopicsResponseModel } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  public onChange: Subject<any> = new Subject<any>();

  constructor(@Inject(TopicsServiceConfigToken) private config: TopicsServiceConfig, private httpClient: HttpClient) 
  { }

  public all(endpoint: string, pageable?: Pageable): Observable<TopicsResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<TopicsResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            })
            .pipe(
              map(data => {
                return data as TopicsResponseModel;
              })
            );
  }

  public one(endpoint: string, id: number): Observable<TopicResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
              .get<TopicResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
              .pipe(
                map(data => {
                  return data as TopicResponseModel;
                })
              );
  }

  public findByCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<TopicsResponseModel> {
    const query = {
      "conditions": [
        { "attribute": "caption", "operator": "eq", "value": `%${caption}%` }
      ]
    };
    return this.search(endpoint, query, pageable);
  }

  public findMatchingCaption(endpoint: string, caption: string, pageable?: Pageable): Observable<TopicsResponseModel> {
    const query = {
      "conditions": [
        { "attribute": "caption", "operator": "like", "value": `%${caption}%` }
      ]
    };
    return this.search(endpoint, query, pageable);
  }

  public search(endpoint: string, query: any, pageable?: Pageable): Observable<TopicsResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<TopicsResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, 
            {
              "params": { 
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            })
            .pipe(
              map(data => {
                return data as TopicsResponseModel;
              })
            );
  }

  public create(endpoint: string, caption: string): Observable<TopicResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const topicRepr = {
      "caption": caption
    };
    return this.httpClient
            .post<TopicResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, topicRepr)
            .pipe(
              map(data => {
                return data as TopicResponseModel;
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public update(endpoint: string, id: number, caption: string): Observable<TopicResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const topicRepr = {
      "caption": caption
    };
    return this.httpClient
            .put<TopicResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`, topicRepr)
            .pipe(
              map(data => {
                return data as TopicResponseModel;
              }),
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
              catchError((error: any) => {
                return throwError(new Error(error.status));
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }
}
