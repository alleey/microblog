import { InjectionToken } from '@angular/core';


export interface BlogServiceConfig {
  posts: {
    serviceBaseUrl: string,
    defaultEndpoint: string,
    pageSize: number,
  
  },
  comments: {
    serviceBaseUrl: string,
    defaultEndpoint: string,
    pageSize: number,
  
  },
  topics: {
    serviceBaseUrl: string,
    defaultEndpoint: string,
    pageSize: number,
  
  }
}

export const BlogServiceConfigToken = new InjectionToken<BlogServiceConfig>("BlogServiceConfig");
