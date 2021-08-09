import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pageable } from 'utils';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { BlogPostResponseModel, BlogPostsResponseModel } from '../models/blog-post';
import { BlogServiceConfig, BlogServiceConfigToken } from '../config/service-config';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public onChange: Subject<any> = new Subject<any>();

  constructor(
    @Inject(BlogServiceConfigToken) 
    private config: BlogServiceConfig,
    private httpClient: HttpClient) { 
  }

  public all(endpoint: string, pageable?: Pageable): Observable<BlogPostsResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.posts.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.posts.defaultEndpoint;

    return this.httpClient
              .get<BlogPostsResponseModel>(`${this.config.posts.serviceBaseUrl}/${apiEndpoint}`, {
                params: {
                  "page": page.toString(),
                  "size": pageSize.toString(),
                  "sort": "createdOn",
                  "sort.dir": "desc"
                }
              })
              .pipe(
                map(data => {
                  return data as BlogPostsResponseModel;
                })
              );
  }

  public one(endpoint: string, id: number): Observable<BlogPostResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.posts.defaultEndpoint;
    return this.httpClient
              .get<BlogPostResponseModel>(`${this.config.posts.serviceBaseUrl}/${apiEndpoint}/${id}`)
              .pipe(
                map(data => {
                  return data as BlogPostResponseModel;
                })
              );
  }

  public findBySlug(endpoint: string, slug: string): Observable<BlogPostsResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.posts.defaultEndpoint;
    const query = {
      "conditions": [
        { "attribute": "slug", "operator": "eq", "value": slug }
      ]
    };
    return this.httpClient
            .get<BlogPostsResponseModel>(`${this.config.posts.serviceBaseUrl}/${apiEndpoint}/search`, 
            {
              "params": { "q": JSON.stringify(query) }
            })
            .pipe(
              map(data => {
                return data as BlogPostsResponseModel;
              })
            );
  }

  public create(endpoint: string, slug: string, title: string, text: string): Observable<BlogPostResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.posts.defaultEndpoint;
    let postRepr = {
      "slug": slug, "title": title, "text": text
    };
    return this.httpClient
            .post<BlogPostResponseModel>(`${this.config.posts.serviceBaseUrl}/${apiEndpoint}`, postRepr)
            .pipe(
              map(data => {
                return data as BlogPostResponseModel;
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public update(endpoint: string, id: number, slug: string, title: string, text: string): Observable<BlogPostResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.posts.defaultEndpoint;
    let postRepr = {
      "slug": slug, "title": title, "text": text
    };
    return this.httpClient
            .put<BlogPostResponseModel>(`${this.config.posts.serviceBaseUrl}/${apiEndpoint}/${id}`, postRepr)
            .pipe(
              map(data => {
                return data as BlogPostResponseModel;
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public delete(endpoint: string, id: number): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.posts.defaultEndpoint;
    return this.httpClient
            .delete<void>(`${this.config.posts.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(
              catchError((error: any) => {
                return throwError(new Error(error.status));
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }


  public assignTopics(endpoint: string, id: number, topicIds: number[]): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.posts.defaultEndpoint;
    return this.httpClient
            .put<void>(`${this.config.posts.serviceBaseUrl}/${apiEndpoint}/${id}/topics`, topicIds)
            .pipe(
              catchError((error: any) => {
                return throwError(new Error(error.status));
              })
            );
  }
}
