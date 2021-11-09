import { InjectionToken } from '@angular/core';

export interface UserProfileServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
  maxAboutLength: number,
}

export const UserProfileServiceConfigToken = new InjectionToken<UserProfileServiceConfig>("UserProfileServiceConfig");

export interface UserProfileModuleConfig {
  userProfiles: UserProfileServiceConfig;
}
export const UserProfileModuleConfigToken = new InjectionToken<UserProfileModuleConfig>("UserProfileModuleConfig");
