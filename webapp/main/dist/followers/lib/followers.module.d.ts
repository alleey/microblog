import { ModuleWithProviders } from '@angular/core';
import { FollowersModuleConfig } from './config/config';
import * as i0 from "@angular/core";
import * as i1 from "./components/followed-by-list-view/followed-by-list-view.component";
import * as i2 from "./components/followed-by-list/followed-by-list.component";
import * as i3 from "./components/following-list-view/following-list-view.component";
import * as i4 from "./components/following-list/following-list.component";
import * as i5 from "./components/followed-by-badge/followed-by-badge.component";
import * as i6 from "./components/following-badge/following-badge.component";
import * as i7 from "@angular/common";
import * as i8 from "auth-oidc";
import * as i9 from "utils";
export declare class FollowersModule {
    static forRoot(config: FollowersModuleConfig): ModuleWithProviders<FollowersModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FollowersModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FollowersModule, [typeof i1.FollowersListViewComponent, typeof i2.FollowersListComponent, typeof i3.FollowingListViewComponent, typeof i4.FollowingListComponent, typeof i5.FollowedByBadgeComponent, typeof i6.FollowingBadgeComponent], [typeof i7.CommonModule, typeof i8.OidcAuthModule, typeof i9.UtilsModule], [typeof i1.FollowersListViewComponent, typeof i2.FollowersListComponent, typeof i3.FollowingListViewComponent, typeof i4.FollowingListComponent, typeof i5.FollowedByBadgeComponent, typeof i6.FollowingBadgeComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FollowersModule>;
}
