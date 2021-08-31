import { ModuleWithProviders } from '@angular/core';
import { StatsModuleConfig } from './config/config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "auth-oidc";
import * as i3 from "utils";
export declare class StatsModule {
    static forRoot(config: StatsModuleConfig): ModuleWithProviders<StatsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StatsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StatsModule, never, [typeof i1.CommonModule, typeof i2.OidcAuthModule, typeof i3.UtilsModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StatsModule>;
}
