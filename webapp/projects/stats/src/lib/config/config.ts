import { InjectionToken } from '@angular/core';

export interface CountersServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
}
export const CountersServiceConfigToken = new InjectionToken<CountersServiceConfig>("CountersServiceConfig");

export interface StatsModuleConfig {
  counters: CountersServiceConfig
}
export const StatsModuleConfigToken = new InjectionToken<StatsModuleConfig>("StatsModuleConfig");
