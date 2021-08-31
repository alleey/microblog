import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginCallbackComponent } from './components/login-callback.component';
import { LoginRedirectComponent } from './components/login-redirect.component';
import { LogoutCallbackComponent } from './components/logout-callback.component';
import { LogoutRedirectComponent } from './components/logout-redirect.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: 'oidc-auth/login',
        component: LoginRedirectComponent
    },
    {
        path: 'oidc-auth/login-callback',
        component: LoginCallbackComponent
    },
    {
        path: 'oidc-auth/logout',
        component: LogoutRedirectComponent
    },
    {
        path: 'oidc-auth/logout-callback',
        component: LogoutCallbackComponent
    }
];
export class AuthRoutingModule {
}
AuthRoutingModule.ɵfac = function AuthRoutingModule_Factory(t) { return new (t || AuthRoutingModule)(); };
AuthRoutingModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AuthRoutingModule });
AuthRoutingModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[RouterModule.forChild(routes)], RouterModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AuthRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgtb2lkYy9zcmMvbGliL2F1dGgtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7OztBQUVqRixNQUFNLE1BQU0sR0FBVztJQUNyQjtRQUNFLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsU0FBUyxFQUFFLHNCQUFzQjtLQUNsQztJQUNEO1FBQ0UsSUFBSSxFQUFFLDBCQUEwQjtRQUNoQyxTQUFTLEVBQUUsc0JBQXNCO0tBQ2xDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFNBQVMsRUFBRSx1QkFBdUI7S0FDbkM7SUFDRDtRQUNFLElBQUksRUFBRSwyQkFBMkI7UUFDakMsU0FBUyxFQUFFLHVCQUF1QjtLQUNuQztDQUNGLENBQUM7QUFNRixNQUFNLE9BQU8saUJBQWlCOztrRkFBakIsaUJBQWlCO21FQUFqQixpQkFBaUI7dUVBSG5CLENBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUM5QixZQUFZO3VGQUVaLGlCQUFpQjtjQUo3QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsT0FBTyxFQUFFLENBQUUsWUFBWSxDQUFFO2FBQzFCOzt3RkFDWSxpQkFBaUIsMENBRmpCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBMb2dpbkNhbGxiYWNrQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvZ2luLWNhbGxiYWNrLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dpblJlZGlyZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvZ2luLXJlZGlyZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dvdXRDYWxsYmFja0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dvdXQtY2FsbGJhY2suY29tcG9uZW50JztcbmltcG9ydCB7IExvZ291dFJlZGlyZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvZ291dC1yZWRpcmVjdC5jb21wb25lbnQnO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICdvaWRjLWF1dGgvbG9naW4nLFxuICAgIGNvbXBvbmVudDogTG9naW5SZWRpcmVjdENvbXBvbmVudFxuICB9LFxuICB7XG4gICAgcGF0aDogJ29pZGMtYXV0aC9sb2dpbi1jYWxsYmFjaycsXG4gICAgY29tcG9uZW50OiBMb2dpbkNhbGxiYWNrQ29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnb2lkYy1hdXRoL2xvZ291dCcsXG4gICAgY29tcG9uZW50OiBMb2dvdXRSZWRpcmVjdENvbXBvbmVudFxuICB9LFxuICB7XG4gICAgcGF0aDogJ29pZGMtYXV0aC9sb2dvdXQtY2FsbGJhY2snLFxuICAgIGNvbXBvbmVudDogTG9nb3V0Q2FsbGJhY2tDb21wb25lbnRcbiAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gIGV4cG9ydHM6IFsgUm91dGVyTW9kdWxlIF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0aFJvdXRpbmdNb2R1bGUgeyB9XG4iXX0=