import { InjectionToken } from '@angular/core';

export interface BookmarksServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
}

export const BookmarksServiceConfigToken = new InjectionToken<BookmarksServiceConfig>("BookmarksServiceConfig");

export interface BookmarksModuleConfig {
  bookmarks: BookmarksServiceConfig;
}
export const BookmarksModuleConfigToken = new InjectionToken<BookmarksModuleConfig>("BookmarksModuleConfig");
