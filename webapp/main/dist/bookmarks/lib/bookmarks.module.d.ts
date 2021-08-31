import { ModuleWithProviders } from '@angular/core';
import { BookmarksModuleConfig } from './config/config';
import * as i0 from "@angular/core";
import * as i1 from "./components/bookmark-list-view/bookmark-list-view.component";
import * as i2 from "./components/bookmark-list/bookmark-list.component";
import * as i3 from "./components/bookmark-badge/bookmark-badge.component";
import * as i4 from "@angular/common";
import * as i5 from "auth-oidc";
import * as i6 from "utils";
export declare class BookmarksModule {
    static forRoot(config: BookmarksModuleConfig): ModuleWithProviders<BookmarksModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BookmarksModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BookmarksModule, [typeof i1.BookmarkListViewComponent, typeof i2.BookmarkListComponent, typeof i3.BookmarkBadgeComponent], [typeof i4.CommonModule, typeof i5.OidcAuthModule, typeof i6.UtilsModule], [typeof i1.BookmarkListViewComponent, typeof i2.BookmarkListComponent, typeof i3.BookmarkBadgeComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BookmarksModule>;
}
