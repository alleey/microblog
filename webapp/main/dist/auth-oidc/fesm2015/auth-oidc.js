import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Component, Directive, Input, NgModule } from '@angular/core';
import { UserManager } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const OidcAuthConfigToken = new InjectionToken("AuthServiceConfig");
class OidcAuthService {
    constructor(config, router) {
        this.config = config;
        this.router = router;
        this.user = null;
        this.userSubject = new BehaviorSubject(undefined);
        const oidcConfig = {
            authority: this.config.issuer,
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            post_logout_redirect_uri: this.config.postLogoutRedirectUri,
            response_type: this.config.responseType,
            scope: this.config.scope,
            filterProtocolClaims: this.config.filterProtocolClaims,
            loadUserInfo: this.config.loadUserInfo
        };
        this.userManager = new UserManager(oidcConfig);
        if (config.mock)
            this.userSubject.next(config.mock);
        else
            this.userManager.getUser().then(user => {
                if (user === null || user === void 0 ? void 0 : user.expired) {
                    user = null;
                }
                this.user = user;
                this.userSubject.next(user === null || user === void 0 ? void 0 : user.profile);
                //console.log(user);
            });
    }
    get isLoggedIn() {
        if (this.config.mock)
            return true;
        //console.log(this.user);
        return this.user != null && !this.user.expired;
    }
    get claims() {
        return this.userSubject.getValue();
    }
    get authorizationHeader() {
        const user = this.user;
        if (!user) {
            return '';
        }
        return `${user.token_type} ${user.access_token}`;
    }
    startSignin() {
        const snapshot = this.router.routerState.snapshot;
        this.redirectUrl = snapshot.url;
        return this.userManager.signinRedirect();
    }
    completeSignin() {
        return this.userManager.signinRedirectCallback().then(user => {
            this.user = user;
            this.userSubject.next(user === null || user === void 0 ? void 0 : user.profile);
            //console.log("Login ok: " + user + " redirecting to " + this.redirectUrl);
            this.router.navigateByUrl(this.redirectUrl);
        });
    }
    startSignout() {
        return this.userManager.signoutRedirect();
    }
    completeSignout() {
        return this.userManager.signoutRedirectCallback().then(user => {
            this.user = null;
            this.userSubject.next(undefined);
            //console.log("Logout ok redirecting to " + this.redirectUrl);
            this.router.navigateByUrl("/");
        });
    }
}
OidcAuthService.ɵfac = function OidcAuthService_Factory(t) { return new (t || OidcAuthService)(i0.ɵɵinject(OidcAuthConfigToken), i0.ɵɵinject(i1.Router)); };
OidcAuthService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OidcAuthService, factory: OidcAuthService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OidcAuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [OidcAuthConfigToken]
            }] }, { type: i1.Router }]; }, null); })();

class LoginCallbackComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.completeSignin();
    }
}
LoginCallbackComponent.ɵfac = function LoginCallbackComponent_Factory(t) { return new (t || LoginCallbackComponent)(i0.ɵɵdirectiveInject(OidcAuthService)); };
LoginCallbackComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginCallbackComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LoginCallbackComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginCallbackComponent, [{
        type: Component,
        args: [{
                template: ``
            }]
    }], function () { return [{ type: OidcAuthService }]; }, null); })();

class LoginRedirectComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.startSignin();
    }
}
LoginRedirectComponent.ɵfac = function LoginRedirectComponent_Factory(t) { return new (t || LoginRedirectComponent)(i0.ɵɵdirectiveInject(OidcAuthService)); };
LoginRedirectComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginRedirectComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LoginRedirectComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginRedirectComponent, [{
        type: Component,
        args: [{
                template: ``
            }]
    }], function () { return [{ type: OidcAuthService }]; }, null); })();

class LogoutCallbackComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.completeSignout();
    }
}
LogoutCallbackComponent.ɵfac = function LogoutCallbackComponent_Factory(t) { return new (t || LogoutCallbackComponent)(i0.ɵɵdirectiveInject(OidcAuthService)); };
LogoutCallbackComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LogoutCallbackComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LogoutCallbackComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogoutCallbackComponent, [{
        type: Component,
        args: [{
                template: ``
            }]
    }], function () { return [{ type: OidcAuthService }]; }, null); })();

class LogoutRedirectComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.startSignout();
    }
}
LogoutRedirectComponent.ɵfac = function LogoutRedirectComponent_Factory(t) { return new (t || LogoutRedirectComponent)(i0.ɵɵdirectiveInject(OidcAuthService)); };
LogoutRedirectComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LogoutRedirectComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LogoutRedirectComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogoutRedirectComponent, [{
        type: Component,
        args: [{
                template: ``
            }]
    }], function () { return [{ type: OidcAuthService }]; }, null); })();

/*
 * Public API Surface of utils
 */

class RequireLoginDirective {
    constructor(authService, templateRef, viewContainer) {
        this.authService = authService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.profile = undefined;
        this.authService.userSubject
            .subscribe(profile => {
            this.profile = profile;
            this.updateView();
        });
    }
    set authRequireLogin(show) {
        this.updateView();
    }
    set authRequireLoginElse(ref) {
        this.elseRef = ref;
        this.updateView();
    }
    set authRequireLoginThen(ref) {
        this.thenRef = ref;
        this.updateView();
    }
    updateView() {
        this.viewContainer.clear();
        if (this.profile) {
            this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                $implicit: this.profile,
            });
        }
        else if (!!this.elseRef) {
            this.viewContainer.createEmbeddedView(this.elseRef);
        }
    }
}
RequireLoginDirective.ɵfac = function RequireLoginDirective_Factory(t) { return new (t || RequireLoginDirective)(i0.ɵɵdirectiveInject(OidcAuthService), i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
RequireLoginDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: RequireLoginDirective, selectors: [["", "authRequireLogin", ""]], inputs: { authRequireLogin: "authRequireLogin", authRequireLoginElse: "authRequireLoginElse", authRequireLoginThen: "authRequireLoginThen" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequireLoginDirective, [{
        type: Directive,
        args: [{
                selector: '[authRequireLogin]'
            }]
    }], function () { return [{ type: OidcAuthService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, { authRequireLogin: [{
            type: Input
        }], authRequireLoginElse: [{
            type: Input
        }], authRequireLoginThen: [{
            type: Input
        }] }); })();

class RequireOwnerDirective {
    constructor(authService, templateRef, viewContainer) {
        this.authService = authService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.profile = undefined;
        this.show = false;
        this.authService.userSubject
            .subscribe(profile => {
            this.profile = profile;
            this.updateView();
        });
    }
    set authRequireOwner(ownerId) {
        var _a;
        const show = (ownerId.toLowerCase() === ((_a = this.profile) === null || _a === void 0 ? void 0 : _a.sub.toLowerCase()));
        if (show != this.show) {
            this.show = show;
            this.updateView();
        }
    }
    set authRequireOwnerElse(ref) {
        this.elseRef = ref;
        this.updateView();
    }
    set authRequireOwnerThen(ref) {
        this.thenRef = ref;
        this.updateView();
    }
    updateView() {
        this.viewContainer.clear();
        if (this.show) {
            this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, { $implicit: this.profile });
        }
        else if (!!this.elseRef) {
            this.viewContainer.createEmbeddedView(this.elseRef);
        }
    }
}
RequireOwnerDirective.ɵfac = function RequireOwnerDirective_Factory(t) { return new (t || RequireOwnerDirective)(i0.ɵɵdirectiveInject(OidcAuthService), i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
RequireOwnerDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: RequireOwnerDirective, selectors: [["", "authRequireOwner", ""]], inputs: { authRequireOwner: "authRequireOwner", authRequireOwnerElse: "authRequireOwnerElse", authRequireOwnerThen: "authRequireOwnerThen" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequireOwnerDirective, [{
        type: Directive,
        args: [{
                selector: '[authRequireOwner]'
            }]
    }], function () { return [{ type: OidcAuthService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, { authRequireOwner: [{
            type: Input
        }], authRequireOwnerElse: [{
            type: Input
        }], authRequireOwnerThen: [{
            type: Input
        }] }); })();

class RequireRoleDirective {
    constructor(authService, templateRef, viewContainer) {
        this.authService = authService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.profile = undefined;
        this.show = false;
        this.authService.userSubject
            .subscribe(profile => {
            this.profile = profile;
            this.updateView();
        });
    }
    set authRequireRole(role) {
        var _a;
        const roles = (_a = this.profile) === null || _a === void 0 ? void 0 : _a.roles;
        const show = !!(roles === null || roles === void 0 ? void 0 : roles.find(x => x.toLowerCase() === role.toLowerCase()));
        if (show != this.show) {
            this.show = show;
            this.updateView();
        }
    }
    set authRequireRoleElse(ref) {
        this.elseRef = ref;
        this.updateView();
    }
    set authRequireRoleThen(ref) {
        this.thenRef = ref;
        this.updateView();
    }
    updateView() {
        this.viewContainer.clear();
        if (this.show) {
            this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                $implicit: this.profile,
            });
        }
        else if (!!this.elseRef) {
            this.viewContainer.createEmbeddedView(this.elseRef);
        }
    }
}
RequireRoleDirective.ɵfac = function RequireRoleDirective_Factory(t) { return new (t || RequireRoleDirective)(i0.ɵɵdirectiveInject(OidcAuthService), i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
RequireRoleDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: RequireRoleDirective, selectors: [["", "authRequireRole", ""]], inputs: { authRequireRole: "authRequireRole", authRequireRoleElse: "authRequireRoleElse", authRequireRoleThen: "authRequireRoleThen" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequireRoleDirective, [{
        type: Directive,
        args: [{
                selector: '[authRequireRole]'
            }]
    }], function () { return [{ type: OidcAuthService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, { authRequireRole: [{
            type: Input
        }], authRequireRoleElse: [{
            type: Input
        }], authRequireRoleThen: [{
            type: Input
        }] }); })();

/*
 * Public API Surface of utils
 */

class AuthGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate(route, state) {
        if (this.authService.isLoggedIn) {
            return true;
        }
        this.router.navigate(['/oidc-auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(i0.ɵɵinject(i1.Router), i0.ɵɵinject(OidcAuthService)); };
AuthGuard.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthGuard, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.Router }, { type: OidcAuthService }]; }, null); })();

/*
 * Public API Surface of utils
 */

/*
 * Public API Surface of utils
 */

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
class AuthRoutingModule {
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

class AuthInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    intercept(request, next) {
        if (this.authService.isLoggedIn) {
            //console.log("Adding authentication header");
            request = request.clone({
                setHeaders: {
                    Authorization: this.authService.authorizationHeader
                }
            });
        }
        else {
            //console.log("Not adding authentication header");
        }
        return next.handle(request);
    }
}
AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) { return new (t || AuthInterceptor)(i0.ɵɵinject(OidcAuthService)); };
AuthInterceptor.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthInterceptor, factory: AuthInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthInterceptor, [{
        type: Injectable
    }], function () { return [{ type: OidcAuthService }]; }, null); })();

class OidcAuthModule {
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

/*
 * Public API Surface of auth-oidc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthGuard, LoginCallbackComponent, LoginRedirectComponent, LogoutCallbackComponent, LogoutRedirectComponent, OidcAuthConfigToken, OidcAuthModule, OidcAuthService, RequireLoginDirective, RequireOwnerDirective, RequireRoleDirective };
//# sourceMappingURL=auth-oidc.js.map
