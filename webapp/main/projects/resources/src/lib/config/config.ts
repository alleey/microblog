import { InjectionToken } from '@angular/core';

export interface ResourcesServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
}
export const ResourcesServiceConfigToken = new InjectionToken<ResourcesServiceConfig>("ResourcesServiceConfig");

export interface ResourcesModuleConfig {
  resources: ResourcesServiceConfig
}
export const ResourcesModuleConfigToken = new InjectionToken<ResourcesModuleConfig>("ResourcesModuleConfig");
