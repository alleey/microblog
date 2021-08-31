import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { OidcAuthConfigToken, OidcAuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RequireLoginDirective } from './directives/require-login.directive';
import { RequireOwnerDirective } from './directives/require-owner.directive';
import { RequireRoleDirective } from './directives/require-role.directive';
import { LoginRedirectComponent } from './components/login-redirect.component';
import { LoginCallbackComponent } from './components/login-callback.component';
import { LogoutRedirectComponent } from './components/logout-redirect.component';
import { LogoutCallbackComponent } from './components/logout-callback.component';
import * as i0 from "@angular/core";
export class OidcAuthModule {
    static forRoot(config) {
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
        };
    }
    static forChild() {
        return {
            ngModule: OidcAuthModule,
        };
    }
}
OidcAuthModule.ɵfac = function OidcAuthModule_Factory(t) { return new (t || OidcAuthModule)(); };
OidcAuthModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: OidcAuthModule });
OidcAuthModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            AuthRoutingModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OidcAuthModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(OidcAuthModule, { declarations: [LoginCallbackComponent,
        LoginRedirectComponent,
        LogoutCallbackComponent,
        LogoutRedirectComponent,
        RequireLoginDirective,
        RequireOwnerDirective,
        RequireRoleDirective], imports: [AuthRoutingModule], exports: [LoginCallbackComponent,
        LoginRedirectComponent,
        LogoutCallbackComponent,
        LogoutRedirectComponent,
        RequireLoginDirective,
        RequireOwnerDirective,
        RequireRoleDirective] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1vaWRjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgtb2lkYy9zcmMvbGliL2F1dGgtb2lkYy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFrQixlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBeUJqRixNQUFNLE9BQU8sY0FBYztJQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXNCO1FBQ25DLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZixTQUFTO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxtQkFBbUI7b0JBQzVCLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsZUFBZTtvQkFDekIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDYixPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7U0FDekIsQ0FBQztJQUNKLENBQUM7OzRFQXhCVSxjQUFjO2dFQUFkLGNBQWM7b0VBYmhCO1lBQ1AsaUJBQWlCO1NBQ2xCO3VGQVdVLGNBQWM7Y0F2QjFCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2QixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO2lCQUNyQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2QixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO2lCQUNyQjthQUNGOzt3RkFDWSxjQUFjLG1CQXJCdkIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsb0JBQW9CLGFBR3BCLGlCQUFpQixhQUdqQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IEF1dGhSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9hdXRoLXJvdXRpbmcubW9kdWxlJztcblxuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBPaWRjQXV0aENvbmZpZ1Rva2VuLCBPaWRjQXV0aENvbmZpZywgT2lkY0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnLi9pbnRlcmNlcHRvcnMvYXV0aC5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBSZXF1aXJlTG9naW5EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVxdWlyZS1sb2dpbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVxdWlyZU93bmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlcXVpcmUtb3duZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlcXVpcmVSb2xlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlcXVpcmUtcm9sZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTG9naW5SZWRpcmVjdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi1yZWRpcmVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9naW5DYWxsYmFja0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi1jYWxsYmFjay5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9nb3V0UmVkaXJlY3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9nb3V0LXJlZGlyZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dvdXRDYWxsYmFja0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dvdXQtY2FsbGJhY2suY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTG9naW5DYWxsYmFja0NvbXBvbmVudCxcbiAgICBMb2dpblJlZGlyZWN0Q29tcG9uZW50LFxuICAgIExvZ291dENhbGxiYWNrQ29tcG9uZW50LFxuICAgIExvZ291dFJlZGlyZWN0Q29tcG9uZW50LFxuICAgIFJlcXVpcmVMb2dpbkRpcmVjdGl2ZSxcbiAgICBSZXF1aXJlT3duZXJEaXJlY3RpdmUsXG4gICAgUmVxdWlyZVJvbGVEaXJlY3RpdmVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEF1dGhSb3V0aW5nTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBMb2dpbkNhbGxiYWNrQ29tcG9uZW50LFxuICAgIExvZ2luUmVkaXJlY3RDb21wb25lbnQsXG4gICAgTG9nb3V0Q2FsbGJhY2tDb21wb25lbnQsXG4gICAgTG9nb3V0UmVkaXJlY3RDb21wb25lbnQsXG4gICAgUmVxdWlyZUxvZ2luRGlyZWN0aXZlLFxuICAgIFJlcXVpcmVPd25lckRpcmVjdGl2ZSxcbiAgICBSZXF1aXJlUm9sZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE9pZGNBdXRoTW9kdWxlIHsgXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogT2lkY0F1dGhDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE9pZGNBdXRoTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBPaWRjQXV0aE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBPaWRjQXV0aFNlcnZpY2UsXG4gICAgICAgIEF1dGhHdWFyZCxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE9pZGNBdXRoQ29uZmlnVG9rZW4sXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICAgICAgdXNlQ2xhc3M6IEF1dGhJbnRlcmNlcHRvcixcbiAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8T2lkY0F1dGhNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE9pZGNBdXRoTW9kdWxlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==