import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pageable } from 'utils';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { CommentResponseModel, CommentsResponseModel } from '../models/comment';
import { CommentsServiceConfig, CommentsServiceConfigToken } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public onChange: Subject<any> = new Subject<any>();

  constructor(@Inject(CommentsServiceConfigToken) private config: CommentsServiceConfig, private httpClient: HttpClient) 
  { }

  public all(endpoint: string, postId: number, pageable?: Pageable): Observable<CommentsResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
              .get<CommentsResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments`, {
                params: {
                  "page": page.toString(),
                  "size": pageSize.toString(),
                  "sort": "createdOn,desc"
                }
              })
              .pipe(
                map(data => {
                  return data as CommentsResponseModel;
                })
              );
  }

  public one(endpoint: string, postId: number, id: number): Observable<CommentResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
              .get<CommentResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`)
              .pipe(
                map(data => {
                  return data as CommentResponseModel;
                })
              );
  }

  public create(endpoint: string, postId: number, text: string): Observable<CommentResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    let commentRepr = {
      "text": text
    };
    return this.httpClient
            .post<CommentResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments`, commentRepr)
            .pipe(
              map(data => {
                return data as CommentResponseModel;
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public update(endpoint: string, postId: number, id: number, text: string): Observable<CommentResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    let commentRepr = {
      "text": text
    };
    return this.httpClient
            .put<CommentResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`, commentRepr)
            .pipe(
              map(data => {
                return data as CommentResponseModel;
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public delete(endpoint: string, postId: number, id: number): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`)
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
