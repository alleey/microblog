import { ModuleWithProviders } from '@angular/core';
import { UserProfileModuleConfig } from './config/config';
import * as i0 from "@angular/core";
import * as i1 from "./components/user-profile-badge-view/user-profile-badge-view.component";
import * as i2 from "./components/user-profile-badge/user-profile-badge.component";
import * as i3 from "@angular/common";
import * as i4 from "utils";
export declare class UserProfileModule {
    static forRoot(config: UserProfileModuleConfig): ModuleWithProviders<UserProfileModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<UserProfileModule, [typeof i1.UserProfileBadgeViewComponent, typeof i2.UserProfileBadgeComponent], [typeof i3.CommonModule, typeof i4.UtilsModule], [typeof i1.UserProfileBadgeViewComponent, typeof i2.UserProfileBadgeComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<UserProfileModule>;
}
