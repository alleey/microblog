import { HttpClient } from '@angular/common/http';
import { Pageable } from 'utils';
import { Observable, Subject } from 'rxjs';
import { BlogPostResponseModel, BlogPostListResponseModel } from '../models/blog-post';
import { PostsServiceConfig } from '../config/config';
import * as i0 from "@angular/core";
export declare class PostsService {
    private config;
    private httpClient;
    onChange: Subject<any>;
    constructor(config: PostsServiceConfig, httpClient: HttpClient);
    all(endpoint: string, pageable?: Pageable): Observable<BlogPostListResponseModel>;
    one(endpoint: string, id: number): Observable<BlogPostResponseModel>;
    findBySlug(endpoint: string, slug: string): Observable<BlogPostListResponseModel>;
    create(endpoint: string, slug: string, title: string, text: string): Observable<BlogPostResponseModel>;
    update(endpoint: string, id: number, slug: string, title: string, text: string): Observable<BlogPostResponseModel>;
    delete(endpoint: string, id: number): Observable<void>;
    assignTopics(endpoint: string, id: number, topicIds: number[]): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PostsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PostsService>;
}
