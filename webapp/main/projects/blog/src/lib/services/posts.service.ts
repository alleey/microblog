import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from "rxjs/operators";
import { Pageable } from 'utils';
import { PostsServiceConfig, PostsServiceConfigToken } from '../config/config';
import { BlogPostListResponseModel, BlogPostResponseModel } from '../models/blog-post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public onChange: Subject<any> = new Subject<any>();

  constructor(@Inject(PostsServiceConfigToken) private config: PostsServiceConfig, private httpClient: HttpClient) 
  { }

  public all(endpoint: string, pageable?: Pageable): Observable<BlogPostListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
              .get<BlogPostListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, {
                params: {
                  "page": page.toString(),
                  "size": pageSize.toString(),
                  "sort": "createdOn,desc"
                }
              });
  }

  public one(endpoint: string, id: number): Observable<BlogPostResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
              .get<BlogPostResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`);
  }

  public search(endpoint: string, query: any, pageable?: Pageable): Observable<BlogPostListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
            .get<BlogPostListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, 
            {
              "params": { 
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "createdOn,desc"
              }
            });
  }

  public findBySlug(endpoint: string, slug: string, pageable?: Pageable): Observable<BlogPostListResponseModel> {
    const query = {
      "conditions": [
        { "attribute": "slug", "operator": "eq", "value": slug }
      ]
    };
    return this.search(endpoint, query, pageable);
  }

  public create(endpoint: string, slug: string, title: string, text: string): Observable<BlogPostResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    let postRepr = {
      "slug": slug, "title": title, "text": text
    };
    return this.httpClient
            .post<BlogPostResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}`, postRepr)
            .pipe(
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public update(endpoint: string, id: number, slug: string, title: string, text: string): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    let postRepr = {
      "slug": slug, "title": title, "text": text
    };
    return this.httpClient
            .put<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`, postRepr)
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


  public assignTopics(endpoint: string, id: number, topicIds: number[]): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .put<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}/topics`, topicIds);
  }
}
