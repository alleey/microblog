import { ModuleWithProviders } from '@angular/core';
import { OidcAuthConfig } from './services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "./components/login-callback.component";
import * as i2 from "./components/login-redirect.component";
import * as i3 from "./components/logout-callback.component";
import * as i4 from "./components/logout-redirect.component";
import * as i5 from "./directives/require-login.directive";
import * as i6 from "./directives/require-owner.directive";
import * as i7 from "./directives/require-role.directive";
import * as i8 from "./auth-routing.module";
export declare class OidcAuthModule {
    static forRoot(config: OidcAuthConfig): ModuleWithProviders<OidcAuthModule>;
    static forChild(): ModuleWithProviders<OidcAuthModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OidcAuthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OidcAuthModule, [typeof i1.LoginCallbackComponent, typeof i2.LoginRedirectComponent, typeof i3.LogoutCallbackComponent, typeof i4.LogoutRedirectComponent, typeof i5.RequireLoginDirective, typeof i6.RequireOwnerDirective, typeof i7.RequireRoleDirective], [typeof i8.AuthRoutingModule], [typeof i1.LoginCallbackComponent, typeof i2.LoginRedirectComponent, typeof i3.LogoutCallbackComponent, typeof i4.LogoutRedirectComponent, typeof i5.RequireLoginDirective, typeof i6.RequireOwnerDirective, typeof i7.RequireRoleDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OidcAuthModule>;
}
//# sourceMappingURL=auth-oidc.module.d.ts.map