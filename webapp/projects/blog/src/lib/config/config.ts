import { InjectionToken } from '@angular/core';

export interface PostsServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
  maxTitleLength: number,
  maxContentLength: number,
}
export const PostsServiceConfigToken = new InjectionToken<PostsServiceConfig>("PostsServiceConfig");

export interface CommentsServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
  maxContentLength: number,
};
export const CommentsServiceConfigToken = new InjectionToken<CommentsServiceConfig>("CommentsServiceConfig");

export interface TopicsServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
};
export const TopicsServiceConfigToken = new InjectionToken<TopicsServiceConfig>("TopicsServiceConfig");

export interface BlogModuleConfig {
  posts: PostsServiceConfig;
  comments: CommentsServiceConfig;
  topics: TopicsServiceConfig;
}
export const BlogModuleConfigToken = new InjectionToken<BlogModuleConfig>("BlogModuleConfig");
