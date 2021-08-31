import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthGuard } from './guards/auth.guard';
import { OidcAuthConfigToken, OidcAuthConfig, OidcAuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RequireLoginDirective } from './directives/require-login.directive';
import { RequireOwnerDirective } from './directives/require-owner.directive';
import { RequireRoleDirective } from './directives/require-role.directive';
import { LoginRedirectComponent } from './components/login-redirect.component';
import { LoginCallbackComponent } from './components/login-callback.component';
import { LogoutRedirectComponent } from './components/logout-redirect.component';
import { LogoutCallbackComponent } from './components/logout-callback.component';

@NgModule({
  declarations: [
    LoginCallbackComponent,
    LoginRedirectComponent,
    LogoutCallbackComponent,
    LogoutRedirectComponent,
    RequireLoginDirective,
    RequireOwnerDirective,
    RequireRoleDirective
  ],
  imports: [
    AuthRoutingModule
  ],
  exports: [
    LoginCallbackComponent,
    LoginRedirectComponent,
    LogoutCallbackComponent,
    LogoutRedirectComponent,
    RequireLoginDirective,
    RequireOwnerDirective,
    RequireRoleDirective
  ]
})
export class OidcAuthModule { 
  static forRoot(config: OidcAuthConfig): ModuleWithProviders<OidcAuthModule> {
    return {
      ngModule: OidcAuthModule,
      providers: [
        OidcAuthService,
        AuthGuard,
        {
          provide: OidcAuthConfigToken,
          useValue: config
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    }
  }

  static forChild(): ModuleWithProviders<OidcAuthModule> {
    return {
      ngModule: OidcAuthModule,
    };
  }
}
