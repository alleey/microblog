import { InjectionToken } from '@angular/core';
export interface BookmarksServiceConfig {
    serviceBaseUrl: string;
    defaultEndpoint: string;
    pageSize: number;
}
export declare const BookmarksServiceConfigToken: InjectionToken<BookmarksServiceConfig>;
export interface BookmarksModuleConfig {
    bookmarks: BookmarksServiceConfig;
}
export declare const BookmarksModuleConfigToken: InjectionToken<BookmarksModuleConfig>;
