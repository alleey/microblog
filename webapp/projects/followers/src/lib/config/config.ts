import { InjectionToken } from '@angular/core';

export interface FollowersServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
}
export const FollowersServiceConfigToken = new InjectionToken<FollowersServiceConfig>("FollowersServiceConfig");

export interface FollowersModuleConfig {
  followers: FollowersServiceConfig;
}
export const FollowersModuleConfigToken = new InjectionToken<FollowersModuleConfig>("FollowersModuleConfig");
