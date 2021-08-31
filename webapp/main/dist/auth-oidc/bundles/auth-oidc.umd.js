(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('oidc-client'), require('rxjs'), require('@angular/router'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('auth-oidc', ['exports', '@angular/core', 'oidc-client', 'rxjs', '@angular/router', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['auth-oidc'] = {}, global.ng.core, global.oidcClient, global.rxjs, global.ng.router, global.ng.common.http));
}(this, (function (exports, i0, oidcClient, rxjs, i1, http) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var OidcAuthConfigToken = new i0.InjectionToken("AuthServiceConfig");
    var OidcAuthService = /** @class */ (function () {
        function OidcAuthService(config, router) {
            var _this = this;
            this.config = config;
            this.router = router;
            this.user = null;
            this.userSubject = new rxjs.BehaviorSubject(undefined);
            var oidcConfig = {
                authority: this.config.issuer,
                client_id: this.config.clientId,
                redirect_uri: this.config.redirectUri,
                post_logout_redirect_uri: this.config.postLogoutRedirectUri,
                response_type: this.config.responseType,
                scope: this.config.scope,
                filterProtocolClaims: this.config.filterProtocolClaims,
                loadUserInfo: this.config.loadUserInfo
            };
            this.userManager = new oidcClient.UserManager(oidcConfig);
            if (config.mock)
                this.userSubject.next(config.mock);
            else
                this.userManager.getUser().then(function (user) {
                    if (user === null || user === void 0 ? void 0 : user.expired) {
                        user = null;
                    }
                    _this.user = user;
                    _this.userSubject.next(user === null || user === void 0 ? void 0 : user.profile);
                    //console.log(user);
                });
        }
        Object.defineProperty(OidcAuthService.prototype, "isLoggedIn", {
            get: function () {
                if (this.config.mock)
                    return true;
                //console.log(this.user);
                return this.user != null && !this.user.expired;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OidcAuthService.prototype, "claims", {
            get: function () {
                return this.userSubject.getValue();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OidcAuthService.prototype, "authorizationHeader", {
            get: function () {
                var user = this.user;
                if (!user) {
                    return '';
                }
                return user.token_type + " " + user.access_token;
            },
            enumerable: false,
            configurable: true
        });
        OidcAuthService.prototype.startSignin = function () {
            var snapshot = this.router.routerState.snapshot;
            this.redirectUrl = snapshot.url;
            return this.userManager.signinRedirect();
        };
        OidcAuthService.prototype.completeSignin = function () {
            var _this = this;
            return this.userManager.signinRedirectCallback().then(function (user) {
                _this.user = user;
                _this.userSubject.next(user === null || user === void 0 ? void 0 : user.profile);
                //console.log("Login ok: " + user + " redirecting to " + this.redirectUrl);
                _this.router.navigateByUrl(_this.redirectUrl);
            });
        };
        OidcAuthService.prototype.startSignout = function () {
            return this.userManager.signoutRedirect();
        };
        OidcAuthService.prototype.completeSignout = function () {
            var _this = this;
            return this.userManager.signoutRedirectCallback().then(function (user) {
                _this.user = null;
                _this.userSubject.next(undefined);
                //console.log("Logout ok redirecting to " + this.redirectUrl);
                _this.router.navigateByUrl("/");
            });
        };
        return OidcAuthService;
    }());
    OidcAuthService.ɵfac = function OidcAuthService_Factory(t) { return new (t || OidcAuthService)(i0__namespace.ɵɵinject(OidcAuthConfigToken), i0__namespace.ɵɵinject(i1__namespace.Router)); };
    OidcAuthService.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: OidcAuthService, factory: OidcAuthService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(OidcAuthService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [OidcAuthConfigToken]
                        }] }, { type: i1__namespace.Router }];
        }, null);
    })();

    var LoginCallbackComponent = /** @class */ (function () {
        function LoginCallbackComponent(authService) {
            this.authService = authService;
        }
        LoginCallbackComponent.prototype.ngOnInit = function () {
            this.authService.completeSignin();
        };
        return LoginCallbackComponent;
    }());
    LoginCallbackComponent.ɵfac = function LoginCallbackComponent_Factory(t) { return new (t || LoginCallbackComponent)(i0__namespace.ɵɵdirectiveInject(OidcAuthService)); };
    LoginCallbackComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: LoginCallbackComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LoginCallbackComponent_Template(rf, ctx) { }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LoginCallbackComponent, [{
                type: i0.Component,
                args: [{
                        template: ""
                    }]
            }], function () { return [{ type: OidcAuthService }]; }, null);
    })();

    var LoginRedirectComponent = /** @class */ (function () {
        function LoginRedirectComponent(authService) {
            this.authService = authService;
        }
        LoginRedirectComponent.prototype.ngOnInit = function () {
            this.authService.startSignin();
        };
        return LoginRedirectComponent;
    }());
    LoginRedirectComponent.ɵfac = function LoginRedirectComponent_Factory(t) { return new (t || LoginRedirectComponent)(i0__namespace.ɵɵdirectiveInject(OidcAuthService)); };
    LoginRedirectComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: LoginRedirectComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LoginRedirectComponent_Template(rf, ctx) { }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LoginRedirectComponent, [{
                type: i0.Component,
                args: [{
                        template: ""
                    }]
            }], function () { return [{ type: OidcAuthService }]; }, null);
    })();

    var LogoutCallbackComponent = /** @class */ (function () {
        function LogoutCallbackComponent(authService) {
            this.authService = authService;
        }
        LogoutCallbackComponent.prototype.ngOnInit = function () {
            this.authService.completeSignout();
        };
        return LogoutCallbackComponent;
    }());
    LogoutCallbackComponent.ɵfac = function LogoutCallbackComponent_Factory(t) { return new (t || LogoutCallbackComponent)(i0__namespace.ɵɵdirectiveInject(OidcAuthService)); };
    LogoutCallbackComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: LogoutCallbackComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LogoutCallbackComponent_Template(rf, ctx) { }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LogoutCallbackComponent, [{
                type: i0.Component,
                args: [{
                        template: ""
                    }]
            }], function () { return [{ type: OidcAuthService }]; }, null);
    })();

    var LogoutRedirectComponent = /** @class */ (function () {
        function LogoutRedirectComponent(authService) {
            this.authService = authService;
        }
        LogoutRedirectComponent.prototype.ngOnInit = function () {
            this.authService.startSignout();
        };
        return LogoutRedirectComponent;
    }());
    LogoutRedirectComponent.ɵfac = function LogoutRedirectComponent_Factory(t) { return new (t || LogoutRedirectComponent)(i0__namespace.ɵɵdirectiveInject(OidcAuthService)); };
    LogoutRedirectComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: LogoutRedirectComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LogoutRedirectComponent_Template(rf, ctx) { }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LogoutRedirectComponent, [{
                type: i0.Component,
                args: [{
                        template: ""
                    }]
            }], function () { return [{ type: OidcAuthService }]; }, null);
    })();

    /*
     * Public API Surface of utils
     */

    var RequireLoginDirective = /** @class */ (function () {
        function RequireLoginDirective(authService, templateRef, viewContainer) {
            var _this = this;
            this.authService = authService;
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.profile = undefined;
            this.authService.userSubject
                .subscribe(function (profile) {
                _this.profile = profile;
                _this.updateView();
            });
        }
        Object.defineProperty(RequireLoginDirective.prototype, "authRequireLogin", {
            set: function (show) {
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RequireLoginDirective.prototype, "authRequireLoginElse", {
            set: function (ref) {
                this.elseRef = ref;
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RequireLoginDirective.prototype, "authRequireLoginThen", {
            set: function (ref) {
                this.thenRef = ref;
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        RequireLoginDirective.prototype.updateView = function () {
            this.viewContainer.clear();
            if (this.profile) {
                this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                    $implicit: this.profile,
                });
            }
            else if (!!this.elseRef) {
                this.viewContainer.createEmbeddedView(this.elseRef);
            }
        };
        return RequireLoginDirective;
    }());
    RequireLoginDirective.ɵfac = function RequireLoginDirective_Factory(t) { return new (t || RequireLoginDirective)(i0__namespace.ɵɵdirectiveInject(OidcAuthService), i0__namespace.ɵɵdirectiveInject(i0__namespace.TemplateRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.ViewContainerRef)); };
    RequireLoginDirective.ɵdir = /*@__PURE__*/ i0__namespace.ɵɵdefineDirective({ type: RequireLoginDirective, selectors: [["", "authRequireLogin", ""]], inputs: { authRequireLogin: "authRequireLogin", authRequireLoginElse: "authRequireLoginElse", authRequireLoginThen: "authRequireLoginThen" } });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(RequireLoginDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[authRequireLogin]'
                    }]
            }], function () { return [{ type: OidcAuthService }, { type: i0__namespace.TemplateRef }, { type: i0__namespace.ViewContainerRef }]; }, { authRequireLogin: [{
                    type: i0.Input
                }], authRequireLoginElse: [{
                    type: i0.Input
                }], authRequireLoginThen: [{
                    type: i0.Input
                }] });
    })();

    var RequireOwnerDirective = /** @class */ (function () {
        function RequireOwnerDirective(authService, templateRef, viewContainer) {
            var _this = this;
            this.authService = authService;
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.profile = undefined;
            this.show = false;
            this.authService.userSubject
                .subscribe(function (profile) {
                _this.profile = profile;
                _this.updateView();
            });
        }
        Object.defineProperty(RequireOwnerDirective.prototype, "authRequireOwner", {
            set: function (ownerId) {
                var _a;
                var show = (ownerId.toLowerCase() === ((_a = this.profile) === null || _a === void 0 ? void 0 : _a.sub.toLowerCase()));
                if (show != this.show) {
                    this.show = show;
                    this.updateView();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RequireOwnerDirective.prototype, "authRequireOwnerElse", {
            set: function (ref) {
                this.elseRef = ref;
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RequireOwnerDirective.prototype, "authRequireOwnerThen", {
            set: function (ref) {
                this.thenRef = ref;
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        RequireOwnerDirective.prototype.updateView = function () {
            this.viewContainer.clear();
            if (this.show) {
                this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, { $implicit: this.profile });
            }
            else if (!!this.elseRef) {
                this.viewContainer.createEmbeddedView(this.elseRef);
            }
        };
        return RequireOwnerDirective;
    }());
    RequireOwnerDirective.ɵfac = function RequireOwnerDirective_Factory(t) { return new (t || RequireOwnerDirective)(i0__namespace.ɵɵdirectiveInject(OidcAuthService), i0__namespace.ɵɵdirectiveInject(i0__namespace.TemplateRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.ViewContainerRef)); };
    RequireOwnerDirective.ɵdir = /*@__PURE__*/ i0__namespace.ɵɵdefineDirective({ type: RequireOwnerDirective, selectors: [["", "authRequireOwner", ""]], inputs: { authRequireOwner: "authRequireOwner", authRequireOwnerElse: "authRequireOwnerElse", authRequireOwnerThen: "authRequireOwnerThen" } });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(RequireOwnerDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[authRequireOwner]'
                    }]
            }], function () { return [{ type: OidcAuthService }, { type: i0__namespace.TemplateRef }, { type: i0__namespace.ViewContainerRef }]; }, { authRequireOwner: [{
                    type: i0.Input
                }], authRequireOwnerElse: [{
                    type: i0.Input
                }], authRequireOwnerThen: [{
                    type: i0.Input
                }] });
    })();

    var RequireRoleDirective = /** @class */ (function () {
        function RequireRoleDirective(authService, templateRef, viewContainer) {
            var _this = this;
            this.authService = authService;
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.profile = undefined;
            this.show = false;
            this.authService.userSubject
                .subscribe(function (profile) {
                _this.profile = profile;
                _this.updateView();
            });
        }
        Object.defineProperty(RequireRoleDirective.prototype, "authRequireRole", {
            set: function (role) {
                var _a;
                var roles = (_a = this.profile) === null || _a === void 0 ? void 0 : _a.roles;
                var show = !!(roles === null || roles === void 0 ? void 0 : roles.find(function (x) { return x.toLowerCase() === role.toLowerCase(); }));
                if (show != this.show) {
                    this.show = show;
                    this.updateView();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RequireRoleDirective.prototype, "authRequireRoleElse", {
            set: function (ref) {
                this.elseRef = ref;
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RequireRoleDirective.prototype, "authRequireRoleThen", {
            set: function (ref) {
                this.thenRef = ref;
                this.updateView();
            },
            enumerable: false,
            configurable: true
        });
        RequireRoleDirective.prototype.updateView = function () {
            this.viewContainer.clear();
            if (this.show) {
                this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                    $implicit: this.profile,
                });
            }
            else if (!!this.elseRef) {
                this.viewContainer.createEmbeddedView(this.elseRef);
            }
        };
        return RequireRoleDirective;
    }());
    RequireRoleDirective.ɵfac = function RequireRoleDirective_Factory(t) { return new (t || RequireRoleDirective)(i0__namespace.ɵɵdirectiveInject(OidcAuthService), i0__namespace.ɵɵdirectiveInject(i0__namespace.TemplateRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.ViewContainerRef)); };
    RequireRoleDirective.ɵdir = /*@__PURE__*/ i0__namespace.ɵɵdefineDirective({ type: RequireRoleDirective, selectors: [["", "authRequireRole", ""]], inputs: { authRequireRole: "authRequireRole", authRequireRoleElse: "authRequireRoleElse", authRequireRoleThen: "authRequireRoleThen" } });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(RequireRoleDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[authRequireRole]'
                    }]
            }], function () { return [{ type: OidcAuthService }, { type: i0__namespace.TemplateRef }, { type: i0__namespace.ViewContainerRef }]; }, { authRequireRole: [{
                    type: i0.Input
                }], authRequireRoleElse: [{
                    type: i0.Input
                }], authRequireRoleThen: [{
                    type: i0.Input
                }] });
    })();

    /*
     * Public API Surface of utils
     */

    var AuthGuard = /** @class */ (function () {
        function AuthGuard(router, authService) {
            this.router = router;
            this.authService = authService;
        }
        AuthGuard.prototype.canActivate = function (route, state) {
            if (this.authService.isLoggedIn) {
                return true;
            }
            this.router.navigate(['/oidc-auth/login'], { queryParams: { returnUrl: state.url } });
            return false;
        };
        return AuthGuard;
    }());
    AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(OidcAuthService)); };
    AuthGuard.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(AuthGuard, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: i1__namespace.Router }, { type: OidcAuthService }]; }, null);
    })();

    /*
     * Public API Surface of utils
     */

    /*
     * Public API Surface of utils
     */

    var routes = [
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
    var AuthRoutingModule = /** @class */ (function () {
        function AuthRoutingModule() {
        }
        return AuthRoutingModule;
    }());
    AuthRoutingModule.ɵfac = function AuthRoutingModule_Factory(t) { return new (t || AuthRoutingModule)(); };
    AuthRoutingModule.ɵmod = /*@__PURE__*/ i0__namespace.ɵɵdefineNgModule({ type: AuthRoutingModule });
    AuthRoutingModule.ɵinj = /*@__PURE__*/ i0__namespace.ɵɵdefineInjector({ imports: [[i1.RouterModule.forChild(routes)], i1.RouterModule] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(AuthRoutingModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.RouterModule.forChild(routes)],
                        exports: [i1.RouterModule]
                    }]
            }], null, null);
    })();
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(AuthRoutingModule, { imports: [i1__namespace.RouterModule], exports: [i1.RouterModule] }); })();

    var AuthInterceptor = /** @class */ (function () {
        function AuthInterceptor(authService) {
            this.authService = authService;
        }
        AuthInterceptor.prototype.intercept = function (request, next) {
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
        };
        return AuthInterceptor;
    }());
    AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) { return new (t || AuthInterceptor)(i0__namespace.ɵɵinject(OidcAuthService)); };
    AuthInterceptor.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: AuthInterceptor, factory: AuthInterceptor.ɵfac });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(AuthInterceptor, [{
                type: i0.Injectable
            }], function () { return [{ type: OidcAuthService }]; }, null);
    })();

    var OidcAuthModule = /** @class */ (function () {
        function OidcAuthModule() {
        }
        OidcAuthModule.forRoot = function (config) {
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
                        provide: http.HTTP_INTERCEPTORS,
                        useClass: AuthInterceptor,
                        multi: true
                    }
                ]
            };
        };
        OidcAuthModule.forChild = function () {
            return {
                ngModule: OidcAuthModule,
            };
        };
        return OidcAuthModule;
    }());
    OidcAuthModule.ɵfac = function OidcAuthModule_Factory(t) { return new (t || OidcAuthModule)(); };
    OidcAuthModule.ɵmod = /*@__PURE__*/ i0__namespace.ɵɵdefineNgModule({ type: OidcAuthModule });
    OidcAuthModule.ɵinj = /*@__PURE__*/ i0__namespace.ɵɵdefineInjector({ imports: [[
                AuthRoutingModule
            ]] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(OidcAuthModule, [{
                type: i0.NgModule,
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
            }], null, null);
    })();
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(OidcAuthModule, { declarations: [LoginCallbackComponent,
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
                RequireRoleDirective] });
    })();

    /*
     * Public API Surface of auth-oidc
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AuthGuard = AuthGuard;
    exports.LoginCallbackComponent = LoginCallbackComponent;
    exports.LoginRedirectComponent = LoginRedirectComponent;
    exports.LogoutCallbackComponent = LogoutCallbackComponent;
    exports.LogoutRedirectComponent = LogoutRedirectComponent;
    exports.OidcAuthConfigToken = OidcAuthConfigToken;
    exports.OidcAuthModule = OidcAuthModule;
    exports.OidcAuthService = OidcAuthService;
    exports.RequireLoginDirective = RequireLoginDirective;
    exports.RequireOwnerDirective = RequireOwnerDirective;
    exports.RequireRoleDirective = RequireRoleDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=auth-oidc.umd.js.map
