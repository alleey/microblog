import { InjectionToken } from '@angular/core';
export interface CountersServiceConfig {
    serviceBaseUrl: string;
    defaultEndpoint: string;
}
export declare const CountersServiceConfigToken: InjectionToken<CountersServiceConfig>;
export interface StatsModuleConfig {
    counters: CountersServiceConfig;
}
export declare const StatsModuleConfigToken: InjectionToken<StatsModuleConfig>;
