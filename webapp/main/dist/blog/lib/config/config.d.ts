import { InjectionToken } from '@angular/core';
export interface PostsServiceConfig {
    serviceBaseUrl: string;
    defaultEndpoint: string;
    pageSize: number;
    maxTitleLength: number;
    maxContentLength: number;
}
export declare const PostsServiceConfigToken: InjectionToken<PostsServiceConfig>;
export interface CommentsServiceConfig {
    serviceBaseUrl: string;
    defaultEndpoint: string;
    pageSize: number;
    maxContentLength: number;
}
export declare const CommentsServiceConfigToken: InjectionToken<CommentsServiceConfig>;
export interface TopicsServiceConfig {
    serviceBaseUrl: string;
    defaultEndpoint: string;
    pageSize: number;
}
export declare const TopicsServiceConfigToken: InjectionToken<TopicsServiceConfig>;
export interface BlogModuleConfig {
    posts: PostsServiceConfig;
    comments: CommentsServiceConfig;
    topics: TopicsServiceConfig;
}
export declare const BlogModuleConfigToken: InjectionToken<BlogModuleConfig>;
