import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pageable } from 'utils';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { CommentResponseModel, CommentListResponseModel } from '../models/comment';
import { CommentsServiceConfig, CommentsServiceConfigToken } from '../config/config';

export interface CommentsServiceChangeNotification {
  postId: number;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public onChange: Subject<CommentsServiceChangeNotification> = new Subject<CommentsServiceChangeNotification>();

  constructor(@Inject(CommentsServiceConfigToken) private config: CommentsServiceConfig, private httpClient: HttpClient) 
  { }

  public all(endpoint: string, postId: number, pageable?: Pageable): Observable<CommentListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    return this.httpClient
              .get<CommentListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments`, {
                params: {
                  "page": page.toString(),
                  "size": pageSize.toString(),
                  "sort": "createdOn,desc"
                }
              });
  }

  public one(endpoint: string, postId: number, id: number): Observable<CommentResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
              .get<CommentResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`);
  }

  public create(endpoint: string, postId: number, text: string): Observable<CommentResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    let commentRepr = {
      "text": text
    };
    return this.httpClient
            .post<CommentResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments`, commentRepr)
            .pipe(
              tap({
                next: x => { this.onChange.next({ postId, id: x.id }); }
              })
            );
  }

  public update(endpoint: string, postId: number, id: number, text: string): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    let commentRepr = {
      "text": text
    };
    return this.httpClient
            .put<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`, commentRepr)
            .pipe(
              tap({
                next: x => { this.onChange.next({ postId, id }); }
              })
            );
  }

  public delete(endpoint: string, postId: number, id: number): Observable<void> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`)
            .pipe(
              tap({
                next: x => { this.onChange.next({ postId, id }); }
              })
            );
  }
}
