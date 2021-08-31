import { HttpClient } from '@angular/common/http';
import { Pageable } from 'utils';
import { Observable, Subject } from 'rxjs';
import { CommentResponseModel, CommentListResponseModel } from '../models/comment';
import { CommentsServiceConfig } from '../config/config';
import * as i0 from "@angular/core";
export declare class CommentsService {
    private config;
    private httpClient;
    onChange: Subject<any>;
    constructor(config: CommentsServiceConfig, httpClient: HttpClient);
    all(endpoint: string, postId: number, pageable?: Pageable): Observable<CommentListResponseModel>;
    one(endpoint: string, postId: number, id: number): Observable<CommentResponseModel>;
    create(endpoint: string, postId: number, text: string): Observable<CommentResponseModel>;
    update(endpoint: string, postId: number, id: number, text: string): Observable<CommentResponseModel>;
    delete(endpoint: string, postId: number, id: number): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommentsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CommentsService>;
}
