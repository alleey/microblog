import { InjectionToken } from '@angular/core';


export interface UserProfileServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
}

export const UserProfileServiceConfigToken = new InjectionToken<UserProfileServiceConfig>("UserProfileServiceConfig");
