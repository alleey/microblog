(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkzabardast"] = self["webpackChunkzabardast"] || []).push([[179], {
    /***/
    98255:
    /*!*******************************************************!*\
      !*** ./$_lazy_route_resources/ lazy namespace object ***!
      \*******************************************************/

    /***/
    function _(module) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = 98255;
      module.exports = webpackEmptyAsyncContext;
      /***/
    },

    /***/
    28246:
    /*!**********************************************!*\
      !*** ./dist/auth-oidc/fesm2015/auth-oidc.js ***!
      \**********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthGuard": function AuthGuard() {
          return (
            /* binding */
            _AuthGuard
          );
        },

        /* harmony export */
        "LoginCallbackComponent": function LoginCallbackComponent() {
          return (
            /* binding */
            _LoginCallbackComponent
          );
        },

        /* harmony export */
        "LoginRedirectComponent": function LoginRedirectComponent() {
          return (
            /* binding */
            _LoginRedirectComponent
          );
        },

        /* harmony export */
        "LogoutCallbackComponent": function LogoutCallbackComponent() {
          return (
            /* binding */
            _LogoutCallbackComponent
          );
        },

        /* harmony export */
        "LogoutRedirectComponent": function LogoutRedirectComponent() {
          return (
            /* binding */
            _LogoutRedirectComponent
          );
        },

        /* harmony export */
        "OidcAuthConfigToken": function OidcAuthConfigToken() {
          return (
            /* binding */
            _OidcAuthConfigToken
          );
        },

        /* harmony export */
        "OidcAuthModule": function OidcAuthModule() {
          return (
            /* binding */
            _OidcAuthModule
          );
        },

        /* harmony export */
        "OidcAuthService": function OidcAuthService() {
          return (
            /* binding */
            _OidcAuthService
          );
        },

        /* harmony export */
        "RequireLoginDirective": function RequireLoginDirective() {
          return (
            /* binding */
            _RequireLoginDirective
          );
        },

        /* harmony export */
        "RequireOwnerDirective": function RequireOwnerDirective() {
          return (
            /* binding */
            _RequireOwnerDirective
          );
        },

        /* harmony export */
        "RequireRoleDirective": function RequireRoleDirective() {
          return (
            /* binding */
            _RequireRoleDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var oidc_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! oidc-client */
      37000);
      /* harmony import */


      var oidc_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(oidc_client__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      26215);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common/http */
      91841);

      var _OidcAuthConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken("AuthServiceConfig");

      var _OidcAuthService = /*#__PURE__*/function () {
        function _OidcAuthService(config, router) {
          var _this = this;

          _classCallCheck(this, _OidcAuthService);

          this.config = config;
          this.router = router;
          this.user = null;
          this.userSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(undefined);
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
          this.userManager = new oidc_client__WEBPACK_IMPORTED_MODULE_0__.UserManager(oidcConfig);
          if (config.mock) this.userSubject.next(config.mock);else this.userManager.getUser().then(function (user) {
            if (user === null || user === void 0 ? void 0 : user.expired) {
              user = null;
            }

            _this.user = user;

            _this.userSubject.next(user === null || user === void 0 ? void 0 : user.profile); //console.log(user);

          });
        }

        _createClass(_OidcAuthService, [{
          key: "isLoggedIn",
          get: function get() {
            if (this.config.mock) return true; //console.log(this.user);

            return this.user != null && !this.user.expired;
          }
        }, {
          key: "claims",
          get: function get() {
            return this.userSubject.getValue();
          }
        }, {
          key: "authorizationHeader",
          get: function get() {
            var user = this.user;

            if (!user) {
              return '';
            }

            return "".concat(user.token_type, " ").concat(user.access_token);
          }
        }, {
          key: "startSignin",
          value: function startSignin() {
            var snapshot = this.router.routerState.snapshot;
            this.redirectUrl = snapshot.url;
            return this.userManager.signinRedirect();
          }
        }, {
          key: "completeSignin",
          value: function completeSignin() {
            var _this2 = this;

            return this.userManager.signinRedirectCallback().then(function (user) {
              _this2.user = user;

              _this2.userSubject.next(user === null || user === void 0 ? void 0 : user.profile); //console.log("Login ok: " + user + " redirecting to " + this.redirectUrl);


              _this2.router.navigateByUrl(_this2.redirectUrl);
            });
          }
        }, {
          key: "startSignout",
          value: function startSignout() {
            return this.userManager.signoutRedirect();
          }
        }, {
          key: "completeSignout",
          value: function completeSignout() {
            var _this3 = this;

            return this.userManager.signoutRedirectCallback().then(function (user) {
              _this3.user = null;

              _this3.userSubject.next(undefined); //console.log("Logout ok redirecting to " + this.redirectUrl);


              _this3.router.navigateByUrl("/");
            });
          }
        }]);

        return _OidcAuthService;
      }();

      _OidcAuthService.ɵfac = function OidcAuthService_Factory(t) {
        return new (t || _OidcAuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_OidcAuthConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
      };

      _OidcAuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _OidcAuthService,
        factory: _OidcAuthService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_OidcAuthService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
              args: [_OidcAuthConfigToken]
            }]
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router
          }];
        }, null);
      })();

      var _LoginCallbackComponent = /*#__PURE__*/function () {
        function _LoginCallbackComponent(authService) {
          _classCallCheck(this, _LoginCallbackComponent);

          this.authService = authService;
        }

        _createClass(_LoginCallbackComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.authService.completeSignin();
          }
        }]);

        return _LoginCallbackComponent;
      }();

      _LoginCallbackComponent.ɵfac = function LoginCallbackComponent_Factory(t) {
        return new (t || _LoginCallbackComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_OidcAuthService));
      };

      _LoginCallbackComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _LoginCallbackComponent,
        selectors: [["ng-component"]],
        decls: 0,
        vars: 0,
        template: function LoginCallbackComponent_Template(rf, ctx) {},
        encapsulation: 2
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_LoginCallbackComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            template: ""
          }]
        }], function () {
          return [{
            type: _OidcAuthService
          }];
        }, null);
      })();

      var _LoginRedirectComponent = /*#__PURE__*/function () {
        function _LoginRedirectComponent(authService) {
          _classCallCheck(this, _LoginRedirectComponent);

          this.authService = authService;
        }

        _createClass(_LoginRedirectComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.authService.startSignin();
          }
        }]);

        return _LoginRedirectComponent;
      }();

      _LoginRedirectComponent.ɵfac = function LoginRedirectComponent_Factory(t) {
        return new (t || _LoginRedirectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_OidcAuthService));
      };

      _LoginRedirectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _LoginRedirectComponent,
        selectors: [["ng-component"]],
        decls: 0,
        vars: 0,
        template: function LoginRedirectComponent_Template(rf, ctx) {},
        encapsulation: 2
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_LoginRedirectComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            template: ""
          }]
        }], function () {
          return [{
            type: _OidcAuthService
          }];
        }, null);
      })();

      var _LogoutCallbackComponent = /*#__PURE__*/function () {
        function _LogoutCallbackComponent(authService) {
          _classCallCheck(this, _LogoutCallbackComponent);

          this.authService = authService;
        }

        _createClass(_LogoutCallbackComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.authService.completeSignout();
          }
        }]);

        return _LogoutCallbackComponent;
      }();

      _LogoutCallbackComponent.ɵfac = function LogoutCallbackComponent_Factory(t) {
        return new (t || _LogoutCallbackComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_OidcAuthService));
      };

      _LogoutCallbackComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _LogoutCallbackComponent,
        selectors: [["ng-component"]],
        decls: 0,
        vars: 0,
        template: function LogoutCallbackComponent_Template(rf, ctx) {},
        encapsulation: 2
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_LogoutCallbackComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            template: ""
          }]
        }], function () {
          return [{
            type: _OidcAuthService
          }];
        }, null);
      })();

      var _LogoutRedirectComponent = /*#__PURE__*/function () {
        function _LogoutRedirectComponent(authService) {
          _classCallCheck(this, _LogoutRedirectComponent);

          this.authService = authService;
        }

        _createClass(_LogoutRedirectComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.authService.startSignout();
          }
        }]);

        return _LogoutRedirectComponent;
      }();

      _LogoutRedirectComponent.ɵfac = function LogoutRedirectComponent_Factory(t) {
        return new (t || _LogoutRedirectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_OidcAuthService));
      };

      _LogoutRedirectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _LogoutRedirectComponent,
        selectors: [["ng-component"]],
        decls: 0,
        vars: 0,
        template: function LogoutRedirectComponent_Template(rf, ctx) {},
        encapsulation: 2
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_LogoutRedirectComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            template: ""
          }]
        }], function () {
          return [{
            type: _OidcAuthService
          }];
        }, null);
      })();
      /*
       * Public API Surface of utils
       */


      var _RequireLoginDirective = /*#__PURE__*/function () {
        function _RequireLoginDirective(authService, templateRef, viewContainer) {
          var _this4 = this;

          _classCallCheck(this, _RequireLoginDirective);

          this.authService = authService;
          this.templateRef = templateRef;
          this.viewContainer = viewContainer;
          this.profile = undefined;
          this.authService.userSubject.subscribe(function (profile) {
            _this4.profile = profile;

            _this4.updateView();
          });
        }

        _createClass(_RequireLoginDirective, [{
          key: "authRequireLogin",
          set: function set(show) {
            this.updateView();
          }
        }, {
          key: "authRequireLoginElse",
          set: function set(ref) {
            this.elseRef = ref;
            this.updateView();
          }
        }, {
          key: "authRequireLoginThen",
          set: function set(ref) {
            this.thenRef = ref;
            this.updateView();
          }
        }, {
          key: "updateView",
          value: function updateView() {
            this.viewContainer.clear();

            if (this.profile) {
              this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                $implicit: this.profile
              });
            } else if (!!this.elseRef) {
              this.viewContainer.createEmbeddedView(this.elseRef);
            }
          }
        }]);

        return _RequireLoginDirective;
      }();

      _RequireLoginDirective.ɵfac = function RequireLoginDirective_Factory(t) {
        return new (t || _RequireLoginDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_OidcAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef));
      };

      _RequireLoginDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _RequireLoginDirective,
        selectors: [["", "authRequireLogin", ""]],
        inputs: {
          authRequireLogin: "authRequireLogin",
          authRequireLoginElse: "authRequireLoginElse",
          authRequireLoginThen: "authRequireLoginThen"
        }
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_RequireLoginDirective, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
          args: [{
            selector: '[authRequireLogin]'
          }]
        }], function () {
          return [{
            type: _OidcAuthService
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef
          }];
        }, {
          authRequireLogin: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          authRequireLoginElse: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          authRequireLoginThen: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }]
        });
      })();

      var _RequireOwnerDirective = /*#__PURE__*/function () {
        function _RequireOwnerDirective(authService, templateRef, viewContainer) {
          var _this5 = this;

          _classCallCheck(this, _RequireOwnerDirective);

          this.authService = authService;
          this.templateRef = templateRef;
          this.viewContainer = viewContainer;
          this.profile = undefined;
          this.show = false;
          this.authService.userSubject.subscribe(function (profile) {
            _this5.profile = profile;

            _this5.updateView();
          });
        }

        _createClass(_RequireOwnerDirective, [{
          key: "authRequireOwner",
          set: function set(ownerId) {
            var _a;

            var show = ownerId.toLowerCase() === ((_a = this.profile) === null || _a === void 0 ? void 0 : _a.sub.toLowerCase());

            if (show != this.show) {
              this.show = show;
              this.updateView();
            }
          }
        }, {
          key: "authRequireOwnerElse",
          set: function set(ref) {
            this.elseRef = ref;
            this.updateView();
          }
        }, {
          key: "authRequireOwnerThen",
          set: function set(ref) {
            this.thenRef = ref;
            this.updateView();
          }
        }, {
          key: "updateView",
          value: function updateView() {
            this.viewContainer.clear();

            if (this.show) {
              this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                $implicit: this.profile
              });
            } else if (!!this.elseRef) {
              this.viewContainer.createEmbeddedView(this.elseRef);
            }
          }
        }]);

        return _RequireOwnerDirective;
      }();

      _RequireOwnerDirective.ɵfac = function RequireOwnerDirective_Factory(t) {
        return new (t || _RequireOwnerDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_OidcAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef));
      };

      _RequireOwnerDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _RequireOwnerDirective,
        selectors: [["", "authRequireOwner", ""]],
        inputs: {
          authRequireOwner: "authRequireOwner",
          authRequireOwnerElse: "authRequireOwnerElse",
          authRequireOwnerThen: "authRequireOwnerThen"
        }
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_RequireOwnerDirective, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
          args: [{
            selector: '[authRequireOwner]'
          }]
        }], function () {
          return [{
            type: _OidcAuthService
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef
          }];
        }, {
          authRequireOwner: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          authRequireOwnerElse: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          authRequireOwnerThen: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }]
        });
      })();

      var _RequireRoleDirective = /*#__PURE__*/function () {
        function _RequireRoleDirective(authService, templateRef, viewContainer) {
          var _this6 = this;

          _classCallCheck(this, _RequireRoleDirective);

          this.authService = authService;
          this.templateRef = templateRef;
          this.viewContainer = viewContainer;
          this.profile = undefined;
          this.show = false;
          this.authService.userSubject.subscribe(function (profile) {
            _this6.profile = profile;

            _this6.updateView();
          });
        }

        _createClass(_RequireRoleDirective, [{
          key: "authRequireRole",
          set: function set(role) {
            var _a;

            var roles = (_a = this.profile) === null || _a === void 0 ? void 0 : _a.roles;
            var show = !!(roles === null || roles === void 0 ? void 0 : roles.find(function (x) {
              return x.toLowerCase() === role.toLowerCase();
            }));

            if (show != this.show) {
              this.show = show;
              this.updateView();
            }
          }
        }, {
          key: "authRequireRoleElse",
          set: function set(ref) {
            this.elseRef = ref;
            this.updateView();
          }
        }, {
          key: "authRequireRoleThen",
          set: function set(ref) {
            this.thenRef = ref;
            this.updateView();
          }
        }, {
          key: "updateView",
          value: function updateView() {
            this.viewContainer.clear();

            if (this.show) {
              this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                $implicit: this.profile
              });
            } else if (!!this.elseRef) {
              this.viewContainer.createEmbeddedView(this.elseRef);
            }
          }
        }]);

        return _RequireRoleDirective;
      }();

      _RequireRoleDirective.ɵfac = function RequireRoleDirective_Factory(t) {
        return new (t || _RequireRoleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_OidcAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef));
      };

      _RequireRoleDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _RequireRoleDirective,
        selectors: [["", "authRequireRole", ""]],
        inputs: {
          authRequireRole: "authRequireRole",
          authRequireRoleElse: "authRequireRoleElse",
          authRequireRoleThen: "authRequireRoleThen"
        }
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_RequireRoleDirective, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
          args: [{
            selector: '[authRequireRole]'
          }]
        }], function () {
          return [{
            type: _OidcAuthService
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef
          }];
        }, {
          authRequireRole: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          authRequireRoleElse: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          authRequireRoleThen: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }]
        });
      })();
      /*
       * Public API Surface of utils
       */


      var _AuthGuard = /*#__PURE__*/function () {
        function _AuthGuard(router, authService) {
          _classCallCheck(this, _AuthGuard);

          this.router = router;
          this.authService = authService;
        }

        _createClass(_AuthGuard, [{
          key: "canActivate",
          value: function canActivate(route, state) {
            if (this.authService.isLoggedIn) {
              return true;
            }

            this.router.navigate(['/oidc-auth/login'], {
              queryParams: {
                returnUrl: state.url
              }
            });
            return false;
          }
        }]);

        return _AuthGuard;
      }();

      _AuthGuard.ɵfac = function AuthGuard_Factory(t) {
        return new (t || _AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_OidcAuthService));
      };

      _AuthGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _AuthGuard,
        factory: _AuthGuard.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_AuthGuard, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router
          }, {
            type: _OidcAuthService
          }];
        }, null);
      })();
      /*
       * Public API Surface of utils
       */

      /*
       * Public API Surface of utils
       */


      var routes = [{
        path: 'oidc-auth/login',
        component: _LoginRedirectComponent
      }, {
        path: 'oidc-auth/login-callback',
        component: _LoginCallbackComponent
      }, {
        path: 'oidc-auth/logout',
        component: _LogoutRedirectComponent
      }, {
        path: 'oidc-auth/logout-callback',
        component: _LogoutCallbackComponent
      }];

      var AuthRoutingModule = function AuthRoutingModule() {
        _classCallCheck(this, AuthRoutingModule);
      };

      AuthRoutingModule.ɵfac = function AuthRoutingModule_Factory(t) {
        return new (t || AuthRoutingModule)();
      };

      AuthRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: AuthRoutingModule
      });
      AuthRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AuthRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
          args: [{
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
          }]
        }], null, null);
      })();

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AuthRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
        });
      })();

      var AuthInterceptor = /*#__PURE__*/function () {
        function AuthInterceptor(authService) {
          _classCallCheck(this, AuthInterceptor);

          this.authService = authService;
        }

        _createClass(AuthInterceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            if (this.authService.isLoggedIn) {
              //console.log("Adding authentication header");
              request = request.clone({
                setHeaders: {
                  Authorization: this.authService.authorizationHeader
                }
              });
            } else {//console.log("Not adding authentication header");
            }

            return next.handle(request);
          }
        }]);

        return AuthInterceptor;
      }();

      AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) {
        return new (t || AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_OidcAuthService));
      };

      AuthInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: AuthInterceptor,
        factory: AuthInterceptor.ɵfac
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AuthInterceptor, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
        }], function () {
          return [{
            type: _OidcAuthService
          }];
        }, null);
      })();

      var _OidcAuthModule = /*#__PURE__*/function () {
        function _OidcAuthModule() {
          _classCallCheck(this, _OidcAuthModule);
        }

        _createClass(_OidcAuthModule, null, [{
          key: "forRoot",
          value: function forRoot(config) {
            return {
              ngModule: _OidcAuthModule,
              providers: [_OidcAuthService, _AuthGuard, {
                provide: _OidcAuthConfigToken,
                useValue: config
              }, {
                provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
              }]
            };
          }
        }, {
          key: "forChild",
          value: function forChild() {
            return {
              ngModule: _OidcAuthModule
            };
          }
        }]);

        return _OidcAuthModule;
      }();

      _OidcAuthModule.ɵfac = function OidcAuthModule_Factory(t) {
        return new (t || _OidcAuthModule)();
      };

      _OidcAuthModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: _OidcAuthModule
      });
      _OidcAuthModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        imports: [[AuthRoutingModule]]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_OidcAuthModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
          args: [{
            declarations: [_LoginCallbackComponent, _LoginRedirectComponent, _LogoutCallbackComponent, _LogoutRedirectComponent, _RequireLoginDirective, _RequireOwnerDirective, _RequireRoleDirective],
            imports: [AuthRoutingModule],
            exports: [_LoginCallbackComponent, _LoginRedirectComponent, _LogoutCallbackComponent, _LogoutRedirectComponent, _RequireLoginDirective, _RequireOwnerDirective, _RequireRoleDirective]
          }]
        }], null, null);
      })();

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](_OidcAuthModule, {
          declarations: [_LoginCallbackComponent, _LoginRedirectComponent, _LogoutCallbackComponent, _LogoutRedirectComponent, _RequireLoginDirective, _RequireOwnerDirective, _RequireRoleDirective],
          imports: [AuthRoutingModule],
          exports: [_LoginCallbackComponent, _LoginRedirectComponent, _LogoutCallbackComponent, _LogoutRedirectComponent, _RequireLoginDirective, _RequireOwnerDirective, _RequireRoleDirective]
        });
      })();
      /*
       * Public API Surface of auth-oidc
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    84652:
    /*!************************************!*\
      !*** ./dist/blog/fesm2015/blog.js ***!
      \************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "BlogModule": function BlogModule() {
          return (
            /* binding */
            _BlogModule
          );
        },

        /* harmony export */
        "BlogModuleConfigToken": function BlogModuleConfigToken() {
          return (
            /* binding */
            _BlogModuleConfigToken
          );
        },

        /* harmony export */
        "BlogPostComponent": function BlogPostComponent() {
          return (
            /* binding */
            _BlogPostComponent
          );
        },

        /* harmony export */
        "BlogPostEditorComponent": function BlogPostEditorComponent() {
          return (
            /* binding */
            _BlogPostEditorComponent
          );
        },

        /* harmony export */
        "BlogPostListComponent": function BlogPostListComponent() {
          return (
            /* binding */
            _BlogPostListComponent
          );
        },

        /* harmony export */
        "BlogPostListViewComponent": function BlogPostListViewComponent() {
          return (
            /* binding */
            _BlogPostListViewComponent
          );
        },

        /* harmony export */
        "BlogPostViewComponent": function BlogPostViewComponent() {
          return (
            /* binding */
            _BlogPostViewComponent
          );
        },

        /* harmony export */
        "CommentListComponent": function CommentListComponent() {
          return (
            /* binding */
            _CommentListComponent
          );
        },

        /* harmony export */
        "CommentListViewComponent": function CommentListViewComponent() {
          return (
            /* binding */
            _CommentListViewComponent
          );
        },

        /* harmony export */
        "CommentsServiceConfigToken": function CommentsServiceConfigToken() {
          return (
            /* binding */
            _CommentsServiceConfigToken
          );
        },

        /* harmony export */
        "PostsService": function PostsService() {
          return (
            /* binding */
            _PostsService
          );
        },

        /* harmony export */
        "PostsServiceConfigToken": function PostsServiceConfigToken() {
          return (
            /* binding */
            _PostsServiceConfigToken
          );
        },

        /* harmony export */
        "TopicListComponent": function TopicListComponent() {
          return (
            /* binding */
            _TopicListComponent
          );
        },

        /* harmony export */
        "TopicListViewComponent": function TopicListViewComponent() {
          return (
            /* binding */
            _TopicListViewComponent
          );
        },

        /* harmony export */
        "TopicsService": function TopicsService() {
          return (
            /* binding */
            _TopicsService
          );
        },

        /* harmony export */
        "TopicsServiceConfigToken": function TopicsServiceConfigToken() {
          return (
            /* binding */
            _TopicsServiceConfigToken
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      79765);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      40205);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs */
      10826);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs */
      25917);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      88002);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      68307);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      5304);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! utils */
      84739);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! auth-oidc */
      28246);
      /* harmony import */


      var ngx_markdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ngx-markdown */
      76715);

      var _c0 = function _c0(a0, a1, a2) {
        return {
          $implicit: a0,
          index: a1,
          list: a2
        };
      };

      function TopicListViewComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var x_r7 = ctx.$implicit;
          var i_r8 = ctx.index;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r6.itemTemplate || _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](2, _c0, x_r7, i_r8, ctx_r6));
        }
      }

      function TopicListViewComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TopicListViewComponent_ng_container_0_ng_container_1_Template, 2, 6, "ng-container", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.topics);
        }
      }

      var _c1 = function _c1(a0) {
        return {
          $implicit: a0
        };
      };

      function TopicListViewComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.noContentsTemplate || _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, ctx_r1));
        }
      }

      function TopicListViewComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopicListViewComponent_ng_template_2_Template_a_click_0_listener() {
            var item_r9 = ctx.$implicit;
            var parent_r10 = ctx.list;
            return parent_r10.selectItem(item_r9, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r9 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r9.caption);
        }
      }

      function TopicListViewComponent_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " No topic found!\n");
        }
      }

      function CommentEditorComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function CommentEditorComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h5");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "POST A COMMENT");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function CommentEditorComponent_ng_template_3_utils_alert_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8.successDesc);
        }
      }

      function CommentEditorComponent_ng_template_3_utils_alert_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred accessing the post: ", ctx_r9.errorDesc, "");
        }
      }

      function CommentEditorComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CommentEditorComponent_ng_template_3_utils_alert_1_Template, 3, 3, "utils-alert", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CommentEditorComponent_ng_template_3_utils_alert_2_Template, 3, 3, "utils-alert", 7);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r1)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.successDesc);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.errorDesc)("ngIfElse", _r5);
        }
      }

      function CommentEditorComponent_ng_template_5_div_4_utils_alert_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Sorry, cannot leave this empty! ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function CommentEditorComponent_ng_template_5_div_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CommentEditorComponent_ng_template_5_div_4_utils_alert_1_Template, 2, 2, "utils-alert", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r10.text == null ? null : ctx_r10.text.errors == null ? null : ctx_r10.text.errors.pattern);
        }
      }

      function CommentEditorComponent_ng_template_5_div_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CommentEditorComponent_ng_template_5_div_5_Template_input_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r14.createNewComment();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r11.loading || !ctx_r11.form.valid);
        }
      }

      function CommentEditorComponent_ng_template_5_div_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CommentEditorComponent_ng_template_5_div_6_Template_input_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r16.updateComment();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r12.loading || !ctx_r12.form.valid);
        }
      }

      function CommentEditorComponent_ng_template_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "textarea", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CommentEditorComponent_ng_template_5_div_4_Template, 2, 1, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CommentEditorComponent_ng_template_5_div_5_Template, 2, 1, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, CommentEditorComponent_ng_template_5_div_6_Template, 2, 1, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r6.form);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r6.text == null ? null : ctx_r6.text.invalid) && ((ctx_r6.text == null ? null : ctx_r6.text.dirty) || (ctx_r6.text == null ? null : ctx_r6.text.touched)));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r6.isUpdateMode);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.isUpdateMode);
        }
      }

      var _c2 = function _c2(a0, a1) {
        return {
          $implicit: a0,
          list: a1
        };
      };

      function CommentListViewComponent_ng_container_0_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var x_r7 = ctx.$implicit;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r6.itemTemplate || _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c2, x_r7, ctx_r6));
        }
      }

      function CommentListViewComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CommentListViewComponent_ng_container_0_div_1_Template, 2, 5, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.comments);
        }
      }

      function CommentListViewComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.noContentsTemplate || _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, ctx_r1));
        }
      }

      function CommentListViewComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "prettyDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "hr", 8);
        }

        if (rf & 2) {
          var item_r8 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", item_r8.owner, " commented on ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 3, item_r8.createdOn), ".");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r8.text, " ");
        }
      }

      function CommentListViewComponent_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " No comments yet!\n");
        }
      }

      function CommentListComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function CommentListComponent_ng_template_1_utils_alert_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " The specified request could not be completed! ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "hr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Error Details: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9.errorDesc);
        }
      }

      function CommentListComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CommentListComponent_ng_template_1_utils_alert_0_Template, 8, 2, "utils-alert", 5);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorDesc)("ngIfElse", _r3);
        }
      }

      function CommentListComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "utils-pager", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectPage", function CommentListComponent_ng_template_3_Template_utils_pager_onSelectPage_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r10.gotoPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "comment-list-view", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "utils-pager", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectPage", function CommentListComponent_ng_template_3_Template_utils_pager_onSelectPage_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r12.gotoPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](4, 8);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("page", ctx_r4.page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("comments", ctx_r4.items)("itemTemplate", ctx_r4.itemTemplate)("noContentsTemplate", ctx_r4.noContentsTemplate);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("page", ctx_r4.page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.footerTemplate || _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, ctx_r4));
        }
      }

      function CommentListComponent_ng_template_5_Template(rf, ctx) {}

      function CommentListComponent_ng_template_7_Template(rf, ctx) {}

      function BlogPostViewComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](3, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.headerTemplate || _r3)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](6, _c2, ctx_r0.post, ctx_r0));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.contentTemplate || _r1)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](9, _c2, ctx_r0.post, ctx_r0));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.footerTemplate || _r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](12, _c2, ctx_r0.post, ctx_r0));
        }
      }

      function BlogPostViewComponent_ng_template_1_ng_container_6_comment_editor_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "comment-editor", 13);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("updateMode", false);
        }
      }

      function BlogPostViewComponent_ng_template_1_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostViewComponent_ng_template_1_ng_container_6_comment_editor_1_Template, 1, 1, "comment-editor", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "hr", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h5");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Comments:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "blog-comment-list", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("postId", ctx_r9.postId);
        }
      }

      function BlogPostViewComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h5");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Posted under Topics:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "blog-topic-list-view", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "hr", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, BlogPostViewComponent_ng_template_1_ng_container_6_Template, 7, 2, "ng-container", 9);
        }

        if (rf & 2) {
          var item_r7 = ctx.$implicit;
          var parent_r8 = ctx.list;

          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r7.text, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("topics", ctx_r2.topics);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", parent_r8.enableComments);
        }
      }

      function BlogPostViewComponent_ng_template_3_div_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogPostViewComponent_ng_template_3_div_8_Template_a_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            var item_r11 = ctx_r16.$implicit;
            var parent_r12 = ctx_r16.list;
            return parent_r12.selectItem(item_r11, "edit");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function BlogPostViewComponent_ng_template_3_div_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogPostViewComponent_ng_template_3_div_9_Template_a_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            var item_r11 = ctx_r19.$implicit;
            var parent_r12 = ctx_r19.list;
            return parent_r12.selectItem(item_r11, "delete");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Delete");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function BlogPostViewComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "prettyDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, BlogPostViewComponent_ng_template_3_div_8_Template, 3, 0, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, BlogPostViewComponent_ng_template_3_div_9_Template, 3, 0, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "hr", 8);
        }

        if (rf & 2) {
          var item_r11 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r11.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", item_r11.owner, " created the post on ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 5, item_r11.createdOn), ".");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireOwner", item_r11.owner);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireOwner", item_r11.owner);
        }
      }

      function BlogPostViewComponent_ng_template_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "hr", 8);
        }
      }

      function BlogPostComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function BlogPostComponent_ng_template_1_utils_alert_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred accessing the post: ", ctx_r5.errorDesc, "");
        }
      }

      function BlogPostComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BlogPostComponent_ng_template_1_utils_alert_0_Template, 3, 3, "utils-alert", 3);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorDesc)("ngIfElse", _r3);
        }
      }

      function BlogPostComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "blog-post-view", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectItem", function BlogPostComponent_ng_template_3_Template_blog_post_view_onSelectItem_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r6.handleViewEvent($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("post", ctx_r4.postItem)("topics", ctx_r4.postItem == null ? null : ctx_r4.postItem.topics)("headerTemplate", ctx_r4.headerTemplate)("contentTemplate", ctx_r4.contentTemplate)("footerTemplate", ctx_r4.footerTemplate);
        }
      }

      function TopicListComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function TopicListComponent_ng_template_1_utils_alert_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred fetching the topics list: ", ctx_r9.errorDesc, "");
        }
      }

      function TopicListComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TopicListComponent_ng_template_1_utils_alert_0_Template, 3, 3, "utils-alert", 5);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorDesc)("ngIfElse", _r3);
        }
      }

      function TopicListComponent_ng_template_3_utils_search_box_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-search-box", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onApplyFilter", function TopicListComponent_ng_template_3_utils_search_box_1_Template_utils_search_box_onApplyFilter_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r11.onApplyFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function TopicListComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TopicListComponent_ng_template_3_utils_search_box_1_Template, 1, 0, "utils-search-box", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "blog-topic-list-view", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectItem", function TopicListComponent_ng_template_3_Template_blog_topic_list_view_onSelectItem_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r13.handleListViewEvent($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "utils-pager", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectPage", function TopicListComponent_ng_template_3_Template_utils_pager_onSelectPage_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r15.gotoPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](4, 7);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.enableSearch);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("topics", ctx_r4.items)("itemTemplate", ctx_r4.itemTemplate)("noContentsTemplate", ctx_r4.noContentsTemplate);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("page", ctx_r4.page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.footerTemplate || _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, ctx_r4));
        }
      }

      function TopicListComponent_ng_template_5_Template(rf, ctx) {}

      function TopicListComponent_ng_template_7_Template(rf, ctx) {}

      function TopicSelectorComponent_utils_alert_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", true)("minimal", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Sorry, cannot select more than ", ctx_r0.maxTopics, " topics for a post. ");
        }
      }

      function TopicEditorComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function TopicEditorComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h5");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "CREATE A NEW TOPIC");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function TopicEditorComponent_ng_template_3_utils_alert_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred accessing the post: ", ctx_r8.errorDesc, "");
        }
      }

      function TopicEditorComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TopicEditorComponent_ng_template_3_utils_alert_1_Template, 3, 3, "utils-alert", 6);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r1)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.errorDesc)("ngIfElse", _r5);
        }
      }

      function TopicEditorComponent_ng_template_5_div_4_utils_alert_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Name is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function TopicEditorComponent_ng_template_5_div_4_utils_alert_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Topic name is already taken! ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function TopicEditorComponent_ng_template_5_div_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TopicEditorComponent_ng_template_5_div_4_utils_alert_1_Template, 2, 2, "utils-alert", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TopicEditorComponent_ng_template_5_div_4_utils_alert_2_Template, 2, 2, "utils-alert", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r9.caption == null ? null : ctx_r9.caption.errors == null ? null : ctx_r9.caption.errors.required);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r9.caption == null ? null : ctx_r9.caption.errors == null ? null : ctx_r9.caption.errors.topicExists);
        }
      }

      function TopicEditorComponent_ng_template_5_div_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopicEditorComponent_ng_template_5_div_5_Template_input_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r14.createNewTopic();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r10.loading || !ctx_r10.form.valid);
        }
      }

      function TopicEditorComponent_ng_template_5_div_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopicEditorComponent_ng_template_5_div_6_Template_input_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r16.updateTopic();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r11.loading || !ctx_r11.form.valid);
        }
      }

      function TopicEditorComponent_ng_template_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TopicEditorComponent_ng_template_5_div_4_Template, 3, 2, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TopicEditorComponent_ng_template_5_div_5_Template, 2, 1, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, TopicEditorComponent_ng_template_5_div_6_Template, 2, 1, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r6.form);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r6.caption == null ? null : ctx_r6.caption.invalid) && ((ctx_r6.caption == null ? null : ctx_r6.caption.dirty) || (ctx_r6.caption == null ? null : ctx_r6.caption.touched)));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r6.isUpdateMode);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.isUpdateMode);
        }
      }

      var _c3 = ["topicSelector"];

      function BlogPostEditorComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function BlogPostEditorComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h5");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "WRITE A POST");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogPostEditorComponent_ng_template_1_Template_a_click_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r10.cancel();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Cancel");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "hr", 7);
        }
      }

      function BlogPostEditorComponent_ng_template_3_utils_alert_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r12.successDesc);
        }
      }

      function BlogPostEditorComponent_ng_template_3_utils_alert_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred accessing the post: ", ctx_r13.errorDesc, "");
        }
      }

      function BlogPostEditorComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostEditorComponent_ng_template_3_utils_alert_1_Template, 3, 3, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, BlogPostEditorComponent_ng_template_3_utils_alert_2_Template, 3, 3, "utils-alert", 10);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r1)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.successDesc);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.errorDesc)("ngIfElse", _r5);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_6_utils_alert_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Title is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_6_utils_alert_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Title length exceeds limit. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostEditorComponent_ng_template_5_div_6_utils_alert_1_Template, 2, 2, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, BlogPostEditorComponent_ng_template_5_div_6_utils_alert_2_Template, 2, 2, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r14.title == null ? null : ctx_r14.title.errors == null ? null : ctx_r14.title.errors.required);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r14.title == null ? null : ctx_r14.title.errors == null ? null : ctx_r14.title.errors.maxLength);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_14_utils_alert_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Slug is required. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_14_utils_alert_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Slug length exceeds limit. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_14_utils_alert_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Only clean url like expressions are allowed in slugs e.g. this-is-a-valid-slug ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_14_utils_alert_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Slug is already taken! ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_14_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostEditorComponent_ng_template_5_div_14_utils_alert_1_Template, 2, 2, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, BlogPostEditorComponent_ng_template_5_div_14_utils_alert_2_Template, 2, 2, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, BlogPostEditorComponent_ng_template_5_div_14_utils_alert_3_Template, 2, 2, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, BlogPostEditorComponent_ng_template_5_div_14_utils_alert_4_Template, 2, 2, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r15.slug == null ? null : ctx_r15.slug.errors == null ? null : ctx_r15.slug.errors.required);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r15.slug == null ? null : ctx_r15.slug.errors == null ? null : ctx_r15.slug.errors.maxLength);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r15.slug == null ? null : ctx_r15.slug.errors == null ? null : ctx_r15.slug.errors.pattern);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r15.slug == null ? null : ctx_r15.slug.errors == null ? null : ctx_r15.slug.errors.slugExists);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_20_utils_alert_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Sorry, cannot leave this empty! ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_20_utils_alert_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Conent length exceeds limit. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_20_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostEditorComponent_ng_template_5_div_20_utils_alert_1_Template, 2, 2, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, BlogPostEditorComponent_ng_template_5_div_20_utils_alert_2_Template, 2, 2, "utils-alert", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r16.text == null ? null : ctx_r16.text.errors == null ? null : ctx_r16.text.errors.pattern);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r16.text == null ? null : ctx_r16.text.errors == null ? null : ctx_r16.text.errors.maxLength);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_29_Template(rf, ctx) {
        if (rf & 1) {
          var _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogPostEditorComponent_ng_template_5_div_29_Template_input_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r29);

            var ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r28.createNewPost();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r18.loading || !ctx_r18.form.valid);
        }
      }

      function BlogPostEditorComponent_ng_template_5_div_30_Template(rf, ctx) {
        if (rf & 1) {
          var _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogPostEditorComponent_ng_template_5_div_30_Template_input_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31);

            var ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r30.updatePost();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r19.loading || !ctx_r19.form.valid);
        }
      }

      function BlogPostEditorComponent_ng_template_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "label", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Title");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, BlogPostEditorComponent_ng_template_5_div_6_Template, 3, 2, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Slug");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "input", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "input", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogPostEditorComponent_ng_template_5_Template_input_click_13_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r33);

            var ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r32.generateSlug();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, BlogPostEditorComponent_ng_template_5_div_14_Template, 5, 4, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "label", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Write your story here:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "textarea", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, BlogPostEditorComponent_ng_template_5_div_20_Template, 3, 2, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "label", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Preview");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "markdown", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "topic-selector", 26, 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, BlogPostEditorComponent_ng_template_5_div_29_Template, 2, 1, "div", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, BlogPostEditorComponent_ng_template_5_div_30_Template, 2, 1, "div", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r6.form);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r6.title == null ? null : ctx_r6.title.invalid) && ((ctx_r6.title == null ? null : ctx_r6.title.dirty) || (ctx_r6.title == null ? null : ctx_r6.title.touched)));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r6.loading);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r6.slug == null ? null : ctx_r6.slug.invalid) && ((ctx_r6.slug == null ? null : ctx_r6.slug.dirty) || (ctx_r6.slug == null ? null : ctx_r6.slug.touched)));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r6.text == null ? null : ctx_r6.text.invalid) && ((ctx_r6.text == null ? null : ctx_r6.text.dirty) || (ctx_r6.text == null ? null : ctx_r6.text.touched)));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx_r6.text == null ? null : ctx_r6.text.value);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("initialTopics", ctx_r6.selectedTopics)("noContentsTemplate", _r7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r6.isUpdateMode);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.isUpdateMode);
        }
      }

      function BlogPostEditorComponent_ng_template_7_topic_editor_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "topic-editor");
        }
      }

      function BlogPostEditorComponent_ng_template_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " No topic found! ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostEditorComponent_ng_template_7_topic_editor_1_Template, 1, 0, "topic-editor", 32);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireRole", "admin");
        }
      }

      function BlogPostListViewComponent_ng_container_0_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var x_r7 = ctx.$implicit;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r6.itemTemplate || _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c2, x_r7, ctx_r6));
        }
      }

      function BlogPostListViewComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostListViewComponent_ng_container_0_div_1_Template, 2, 5, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.posts);
        }
      }

      function BlogPostListViewComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.noContentsTemplate || _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, ctx_r1));
        }
      }

      function BlogPostListViewComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogPostListViewComponent_ng_template_2_Template_a_click_1_listener() {
            var item_r8 = ctx.$implicit;
            var parent_r9 = ctx.list;
            return parent_r9.selectItem(item_r8, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h4", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "prettyDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "blog-topic-list-view", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlogPostListViewComponent_ng_template_2_Template_button_click_11_listener() {
            var item_r8 = ctx.$implicit;
            var parent_r9 = ctx.list;
            return parent_r9.selectItem(item_r8, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Read More...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "hr", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r8 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r8.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", item_r8.owner, " created the post on ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 5, item_r8.createdOn), ".");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r8.text, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("topics", item_r8.topics);
        }
      }

      function BlogPostListViewComponent_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " No blog posts found! Why not create one?\n");
        }
      }

      function BlogPostListComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function BlogPostListComponent_ng_template_1_utils_alert_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " The specified request could not be completed! ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "hr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Error Details: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r9.errorDesc);
        }
      }

      function BlogPostListComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BlogPostListComponent_ng_template_1_utils_alert_0_Template, 8, 2, "utils-alert", 5);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorDesc)("ngIfElse", _r3);
        }
      }

      function BlogPostListComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "utils-pager", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectPage", function BlogPostListComponent_ng_template_3_Template_utils_pager_onSelectPage_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r10.gotoPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "blog-post-list-view", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectItem", function BlogPostListComponent_ng_template_3_Template_blog_post_list_view_onSelectItem_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r12.handleListViewEvent($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "utils-pager", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectPage", function BlogPostListComponent_ng_template_3_Template_utils_pager_onSelectPage_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r13.gotoPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](4, 8);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("page", ctx_r4.page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("posts", ctx_r4.items)("itemTemplate", ctx_r4.itemTemplate)("noContentsTemplate", ctx_r4.noContentsTemplate);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("page", ctx_r4.page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.footerTemplate || _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, ctx_r4));
        }
      }

      function BlogPostListComponent_ng_template_5_Template(rf, ctx) {}

      function BlogPostListComponent_ng_template_7_Template(rf, ctx) {}

      var _PostsServiceConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("PostsServiceConfig");

      ;

      var _CommentsServiceConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("CommentsServiceConfig");

      ;

      var _TopicsServiceConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("TopicsServiceConfig");

      var _BlogModuleConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("BlogModuleConfig");
      /*
       * Public API Surface of bookmarks
       */

      /*
       * Public API Surface of blog
       */


      var _PostsService = /*#__PURE__*/function () {
        function _PostsService(config, httpClient) {
          _classCallCheck(this, _PostsService);

          this.config = config;
          this.httpClient = httpClient;
          this.onChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        }

        _createClass(_PostsService, [{
          key: "all",
          value: function all(endpoint, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint), {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "createdOn,desc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "one",
          value: function one(endpoint, id) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "findBySlug",
          value: function findBySlug(endpoint, slug) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var query = {
              "conditions": [{
                "attribute": "slug",
                "operator": "eq",
                "value": slug
              }]
            };
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/search"), {
              "params": {
                "q": JSON.stringify(query)
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "create",
          value: function create(endpoint, slug, title, text) {
            var _this7 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var postRepr = {
              "slug": slug,
              "title": title,
              "text": text
            };
            return this.httpClient.post("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint), postRepr).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this7.onChange.next(x);
              }
            }));
          }
        }, {
          key: "update",
          value: function update(endpoint, id, slug, title, text) {
            var _this8 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var postRepr = {
              "slug": slug,
              "title": title,
              "text": text
            };
            return this.httpClient.put("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id), postRepr).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this8.onChange.next(x);
              }
            }));
          }
        }, {
          key: "delete",
          value: function _delete(endpoint, id) {
            var _this9 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient["delete"]("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (error) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new Error(error.status));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this9.onChange.next(x);
              }
            }));
          }
        }, {
          key: "assignTopics",
          value: function assignTopics(endpoint, id, topicIds) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.put("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id, "/topics"), topicIds).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (error) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new Error(error.status));
            }));
          }
        }]);

        return _PostsService;
      }();

      _PostsService.ɵfac = function PostsService_Factory(t) {
        return new (t || _PostsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_PostsServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
      };

      _PostsService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _PostsService,
        factory: _PostsService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_PostsService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_PostsServiceConfigToken]
            }]
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient
          }];
        }, null);
      })();

      var _TopicListViewComponent = /*#__PURE__*/function () {
        function _TopicListViewComponent() {
          _classCallCheck(this, _TopicListViewComponent);

          this.onSelectItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_TopicListViewComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "selectItem",
          value: function selectItem(item, opcode) {
            this.onSelectItem.emit({
              opcode: opcode,
              item: item
            });
          }
        }]);

        return _TopicListViewComponent;
      }();

      _TopicListViewComponent.ɵfac = function TopicListViewComponent_Factory(t) {
        return new (t || _TopicListViewComponent)();
      };

      _TopicListViewComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _TopicListViewComponent,
        selectors: [["blog-topic-list-view"]],
        inputs: {
          topics: "topics",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate"
        },
        outputs: {
          onSelectItem: "onSelectItem"
        },
        decls: 6,
        vars: 2,
        consts: [[4, "ngIf"], ["defaultItemTemplate", ""], ["defaultNoContentsTemplate", ""], [4, "ngFor", "ngForOf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["role", "button", 1, "btn", "btn-danger", "m-1", 3, "click"]],
        template: function TopicListViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TopicListViewComponent_ng_container_0_Template, 2, 1, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TopicListViewComponent_ng_container_1_Template, 2, 4, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TopicListViewComponent_ng_template_2_Template, 2, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TopicListViewComponent_ng_template_4_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.topics);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.topics);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_TopicListViewComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'blog-topic-list-view',
            templateUrl: './topic-list-view.component.html',
            styleUrls: ['./topic-list-view.component.scss']
          }]
        }], null, {
          topics: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelectItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
          }]
        });
      })();

      var CommentsService = /*#__PURE__*/function () {
        function CommentsService(config, httpClient) {
          _classCallCheck(this, CommentsService);

          this.config = config;
          this.httpClient = httpClient;
          this.onChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        }

        _createClass(CommentsService, [{
          key: "all",
          value: function all(endpoint, postId, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(postId, "/comments"), {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "createdOn,desc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "one",
          value: function one(endpoint, postId, id) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(postId, "/comments/").concat(id)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "create",
          value: function create(endpoint, postId, text) {
            var _this10 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var commentRepr = {
              "text": text
            };
            return this.httpClient.post("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(postId, "/comments"), commentRepr).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this10.onChange.next(x);
              }
            }));
          }
        }, {
          key: "update",
          value: function update(endpoint, postId, id, text) {
            var _this11 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var commentRepr = {
              "text": text
            };
            return this.httpClient.put("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(postId, "/comments/").concat(id), commentRepr).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this11.onChange.next(x);
              }
            }));
          }
        }, {
          key: "delete",
          value: function _delete(endpoint, postId, id) {
            var _this12 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient["delete"]("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(postId, "/comments/").concat(id)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (error) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new Error(error.status));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this12.onChange.next(x);
              }
            }));
          }
        }]);

        return CommentsService;
      }();

      CommentsService.ɵfac = function CommentsService_Factory(t) {
        return new (t || CommentsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_CommentsServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
      };

      CommentsService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: CommentsService,
        factory: CommentsService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CommentsService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_CommentsServiceConfigToken]
            }]
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient
          }];
        }, null);
      })();

      var CommentEditorComponent = /*#__PURE__*/function () {
        function CommentEditorComponent(config, commentsService, location, activatedRoute) {
          var _this13 = this;

          _classCallCheck(this, CommentEditorComponent);

          this.config = config;
          this.commentsService = commentsService;
          this.location = location;
          this.activatedRoute = activatedRoute;
          this.updateMode = true;
          this.comment = null;
          this.successDesc = "";
          this.errorDesc = "";
          this.loading = false;
          this.fetchResponseHandler = {
            next: function next(result) {
              _this13.blogComment = result;

              _this13.updateForm();

              _this13.loading = false;
            },
            error: function error(err) {
              _this13.errorDesc = err.message;
              _this13.loading = false;
              return false;
            }
          };
        }

        _createClass(CommentEditorComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this14 = this;

            this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
              "text": new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.maxLength(this.config.maxContentLength)])
            });
            this.activatedRoute.params.subscribe(function (params) {
              var _a, _b;

              _this14.postId = (_a = params.postId) !== null && _a !== void 0 ? _a : _this14.paramPostId;
              _this14.commentId = (_b = params.commentId) !== null && _b !== void 0 ? _b : _this14.paramCommentId;
              if (_this14.isUpdateMode) _this14.fetchComment(_this14.commentId);
            });
          }
        }, {
          key: "isUpdateMode",
          get: function get() {
            return this.updateMode && this.commentId !== undefined;
          }
        }, {
          key: "text",
          get: function get() {
            return this.form.get('text');
          }
        }, {
          key: "blogComment",
          set: function set(item) {
            var _a;

            this.comment = this.updateMode ? item : null;
            this.commentId = this.updateMode ? (_a = this.comment) === null || _a === void 0 ? void 0 : _a.id : undefined;
            console.info("Got comment id: " + this.commentId);
          }
        }, {
          key: "updateForm",
          value: function updateForm() {
            var _a;

            this.text.setValue((_a = this.comment) === null || _a === void 0 ? void 0 : _a.text);
          }
        }, {
          key: "fetchComment",
          value: function fetchComment(commentId) {
            this.loading = true;
            this.commentsService.one("", this.postId, commentId).subscribe(this.fetchResponseHandler);
          }
        }, {
          key: "createNewComment",
          value: function createNewComment() {
            var _a;

            this.commentsService.create("", this.postId, (_a = this.text) === null || _a === void 0 ? void 0 : _a.value).subscribe(this.fetchResponseHandler);
          }
        }, {
          key: "updateComment",
          value: function updateComment() {
            var _a;

            this.commentsService.update("", this.postId, this.commentId, (_a = this.text) === null || _a === void 0 ? void 0 : _a.value).subscribe(this.fetchResponseHandler);
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.location.back();
          }
        }]);

        return CommentEditorComponent;
      }();

      CommentEditorComponent.ɵfac = function CommentEditorComponent_Factory(t) {
        return new (t || CommentEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_CommentsServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CommentsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      CommentEditorComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: CommentEditorComponent,
        selectors: [["comment-editor"]],
        inputs: {
          headerTemplate: "headerTemplate",
          paramPostId: ["postId", "paramPostId"],
          paramCommentId: ["commentId", "paramCommentId"],
          updateMode: "updateMode"
        },
        decls: 7,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["defaultTitleTemplate", ""], ["contents", ""], ["editor", ""], [1, "d-flex", "justify-content-between"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "dismissable", "minimal", 4, "ngIf"], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], ["novalidate", "", "onSubmit", "return false;", 3, "formGroup"], [1, "row"], [1, "mb-3", "col-sm-12"], ["id", "postText", "rows", "3", "formControlName", "text", "required", "", 1, "form-control"], [4, "ngIf"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "button", "value", "Post", 1, "btn", "btn-primary", 3, "disabled", "click"], ["type", "button", "value", "Update", 1, "btn", "btn-primary", 3, "disabled", "click"]],
        template: function CommentEditorComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CommentEditorComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CommentEditorComponent_ng_template_1_Template, 4, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CommentEditorComponent_ng_template_3_Template, 3, 7, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CommentEditorComponent_ng_template_5_Template, 7, 4, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r3);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, utils__WEBPACK_IMPORTED_MODULE_10__.LoaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.RequiredValidator],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CommentEditorComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'comment-editor',
            templateUrl: './comment-editor.component.html',
            styleUrls: ['./comment-editor.component.css']
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_CommentsServiceConfigToken]
            }]
          }, {
            type: CommentsService
          }, {
            type: _angular_common__WEBPACK_IMPORTED_MODULE_7__.Location
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
          }];
        }, {
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          paramPostId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ["postId"]
          }],
          paramCommentId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ["commentId"]
          }],
          updateMode: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();

      var _CommentListViewComponent = /*#__PURE__*/function () {
        function _CommentListViewComponent() {
          _classCallCheck(this, _CommentListViewComponent);

          this.onSelectItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_CommentListViewComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "selectItem",
          value: function selectItem(entity) {
            this.onSelectItem.emit(entity);
          }
        }]);

        return _CommentListViewComponent;
      }();

      _CommentListViewComponent.ɵfac = function CommentListViewComponent_Factory(t) {
        return new (t || _CommentListViewComponent)();
      };

      _CommentListViewComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _CommentListViewComponent,
        selectors: [["comment-list-view"]],
        inputs: {
          comments: "comments",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate"
        },
        outputs: {
          onSelectItem: "onSelectItem"
        },
        decls: 6,
        vars: 2,
        consts: [[4, "ngIf"], ["defaultItemTemplate", ""], ["defaultNoContentsTemplate", ""], ["class", "bg-light", 4, "ngFor", "ngForOf"], [1, "bg-light"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "created"], [1, "posttext"], [1, "my-4"]],
        template: function CommentListViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CommentListViewComponent_ng_container_0_Template, 2, 1, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CommentListViewComponent_ng_container_1_Template, 2, 4, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CommentListViewComponent_ng_template_2_Template, 6, 5, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CommentListViewComponent_ng_template_4_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.comments);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.comments);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet],
        pipes: [utils__WEBPACK_IMPORTED_MODULE_10__.PrettyDatePipe],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_CommentListViewComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'comment-list-view',
            templateUrl: './comment-list-view.component.html',
            styleUrls: ['./comment-list-view.component.css']
          }]
        }], null, {
          comments: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelectItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
          }]
        });
      })();

      var _CommentListComponent = /*#__PURE__*/function () {
        function _CommentListComponent(commentsService, router, activatedRoute) {
          _classCallCheck(this, _CommentListComponent);

          var _a;

          this.commentsService = commentsService;
          this.router = router;
          this.activatedRoute = activatedRoute;
          this.errorDesc = "";
          this.loading = false;
          this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subscription();
          this.state = (_a = this.router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras.state;
          this.response = null;
          this.pageable = {
            page: 0
          };
        }

        _createClass(_CommentListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this15 = this;

            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;

              _this15.fetchPage(pageNum);
            }); // Requery when the backend data changes

            this.subscription.add(this.commentsService.onChange.subscribe({
              next: function next() {
                return _this15.fetchPage(0);
              }
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }, {
          key: "fetchPage",
          value: function fetchPage(pageNum) {
            var _this16 = this;

            var _a; //const routeParams = this.route.snapshot.paramMap;
            //this.organizationId = routeParams.get('orgId') as string;  


            this.pageable.page = pageNum;
            this.loading = true;
            this.commentsService.all((_a = this.state) === null || _a === void 0 ? void 0 : _a.endpoint, this.postId, this.pageable).subscribe({
              next: function next(result) {
                _this16.response = result;
                _this16.loading = false;
              },
              error: function error(err) {
                _this16.errorDesc = err.message;
                _this16.loading = false;
                console.log(_this16.errorDesc);
              }
            });
          }
        }, {
          key: "items",
          get: function get() {
            var _a, _b;

            if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.comments)) return [];
            return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.comments;
          }
        }, {
          key: "page",
          get: function get() {
            var _a;

            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
          }
        }, {
          key: "gotoPage",
          value: function gotoPage(evt) {
            this.fetchPage(evt - 1);
          }
        }]);

        return _CommentListComponent;
      }();

      _CommentListComponent.ɵfac = function CommentListComponent_Factory(t) {
        return new (t || _CommentListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CommentsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      _CommentListComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _CommentListComponent,
        selectors: [["blog-comment-list"]],
        inputs: {
          postId: "postId",
          noContentsTemplate: "noContentsTemplate",
          itemTemplate: "itemTemplate",
          headerTemplate: "headerTemplate",
          footerTemplate: "footerTemplate"
        },
        decls: 9,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["contents", ""], ["itemsList", ""], ["defaultHeaderTemplate", ""], ["defaultFooterTemplate", ""], [3, "dismissable", 4, "ngIf", "ngIfElse"], [3, "dismissable"], [1, "mb-0"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "page", "onSelectPage"], [3, "comments", "itemTemplate", "noContentsTemplate"]],
        template: function CommentListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CommentListComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CommentListComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CommentListComponent_ng_template_3_Template, 5, 13, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CommentListComponent_ng_template_5_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, CommentListComponent_ng_template_7_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r1);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, utils__WEBPACK_IMPORTED_MODULE_10__.LoaderComponent, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, utils__WEBPACK_IMPORTED_MODULE_10__.PagerComponent, _CommentListViewComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_CommentListComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'blog-comment-list',
            templateUrl: './comment-list.component.html',
            styleUrls: ['./comment-list.component.css']
          }]
        }], function () {
          return [{
            type: CommentsService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
          }];
        }, {
          postId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          footerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();

      var _BlogPostViewComponent = /*#__PURE__*/function () {
        function _BlogPostViewComponent() {
          _classCallCheck(this, _BlogPostViewComponent);

          this.enableComments = true;
          this.onSelectItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_BlogPostViewComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "postId",
          get: function get() {
            return this.post.id;
          }
        }, {
          key: "selectItem",
          value: function selectItem(item, opcode) {
            this.onSelectItem.emit({
              opcode: opcode,
              item: item
            });
          }
        }]);

        return _BlogPostViewComponent;
      }();

      _BlogPostViewComponent.ɵfac = function BlogPostViewComponent_Factory(t) {
        return new (t || _BlogPostViewComponent)();
      };

      _BlogPostViewComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BlogPostViewComponent,
        selectors: [["blog-post-view"]],
        inputs: {
          post: "post",
          topics: "topics",
          enableComments: "enableComments",
          headerTemplate: "headerTemplate",
          contentTemplate: "contentTemplate",
          footerTemplate: "footerTemplate"
        },
        outputs: {
          onSelectItem: "onSelectItem"
        },
        decls: 7,
        vars: 1,
        consts: [["class", "bg-light p-4", 4, "ngIf"], ["defaultContentTemplate", ""], ["defaultHeaderTemplate", ""], ["defaultFooterTemplate", ""], [1, "bg-light", "p-4"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "posttext"], [3, "topics"], [1, "my-4"], [4, "ngIf"], [3, "updateMode", 4, "authRequireLogin"], [1, "mb-3", "col-sm-12"], [3, "postId"], [3, "updateMode"], [1, "d-flex", "justify-content-between"], [1, "blog-post-list-post-title"], [1, "created"], ["class", "ml-1", 4, "authRequireOwner"], [1, "ml-1"], ["role", "button", 1, "btn", "btn-success", 3, "click"], [1, "d-flex"]],
        template: function BlogPostViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BlogPostViewComponent_div_0_Template, 4, 15, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostViewComponent_ng_template_1_Template, 7, 3, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, BlogPostViewComponent_ng_template_3_Template, 11, 7, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, BlogPostViewComponent_ng_template_5_Template, 2, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.post);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, _TopicListViewComponent, auth_oidc__WEBPACK_IMPORTED_MODULE_12__.RequireLoginDirective, _CommentListComponent, CommentEditorComponent, auth_oidc__WEBPACK_IMPORTED_MODULE_12__.RequireOwnerDirective],
        pipes: [utils__WEBPACK_IMPORTED_MODULE_10__.PrettyDatePipe],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BlogPostViewComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'blog-post-view',
            templateUrl: './blog-post-view.component.html',
            styleUrls: ['./blog-post-view.component.scss']
          }]
        }], function () {
          return [];
        }, {
          post: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          topics: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          enableComments: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          contentTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          footerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelectItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
          }]
        });
      })();

      var _BlogPostComponent = /*#__PURE__*/function () {
        function _BlogPostComponent(postService, router, activatedRoute) {
          _classCallCheck(this, _BlogPostComponent);

          this.postService = postService;
          this.router = router;
          this.activatedRoute = activatedRoute;
          this.permalink = "";
          this.errorDesc = "";
          this.loading = false;
          this.response = null;
        }

        _createClass(_BlogPostComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this17 = this;

            this.activatedRoute.params.subscribe(function (params) {
              _this17.fetchPost(params.postId, params.slug);
            });
          }
        }, {
          key: "fetchPost",
          value: function fetchPost(postId, postSlug) {
            var _this18 = this;

            this.postId = postId;
            this.postSlug = postSlug;
            this.loading = true;
            this.postService.one("posts", this.postId).subscribe({
              next: function next(result) {
                _this18.postItem = result;
                _this18.loading = false;
              },
              error: function error(err) {
                _this18.errorDesc = err.message;
                _this18.loading = false;
                console.log(_this18.errorDesc);
              }
            });
          }
        }, {
          key: "postItem",
          get: function get() {
            return this.response;
          },
          set: function set(item) {
            this.response = item;
            this.response.permalink = window.location.origin + this.router.url;
            this.postId = this.response.id;
            this.postSlug = this.response.slug;
          }
        }, {
          key: "handleViewEvent",
          value: function handleViewEvent(evt) {
            switch (evt.opcode) {
              case 'edit':
                this.editPost(evt.item);
                break;

              case 'delete':
                this.deletePost(evt.item);
                break;
            }
          }
        }, {
          key: "editPost",
          value: function editPost(post) {
            this.router.navigate(['/posts', 'edit', post.id]);
          }
        }, {
          key: "deletePost",
          value: function deletePost(post) {}
        }]);

        return _BlogPostComponent;
      }();

      _BlogPostComponent.ɵfac = function BlogPostComponent_Factory(t) {
        return new (t || _BlogPostComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_PostsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      _BlogPostComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BlogPostComponent,
        selectors: [["blog-post"]],
        inputs: {
          headerTemplate: "headerTemplate",
          contentTemplate: "contentTemplate",
          footerTemplate: "footerTemplate"
        },
        decls: 5,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["contents", ""], ["viewer", ""], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], [3, "post", "topics", "headerTemplate", "contentTemplate", "footerTemplate", "onSelectItem"]],
        template: function BlogPostComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BlogPostComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, BlogPostComponent_ng_template_3_Template, 1, 5, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r1);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, utils__WEBPACK_IMPORTED_MODULE_10__.LoaderComponent, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent, _BlogPostViewComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BlogPostComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'blog-post',
            templateUrl: './blog-post.component.html',
            styleUrls: ['./blog-post.component.scss']
          }]
        }], function () {
          return [{
            type: _PostsService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
          }];
        }, {
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          contentTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          footerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();

      function uniqueSlugValidator(postService) {
        return function (control) {
          var slug = control.value;

          if (!slug || control.pristine) {
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_13__.of)(null);
          }

          return postService.findBySlug("", slug).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (response) {
            return !!response.page.totalElements ? {
              'slugExists': true
            } : null;
          }));
        };
      }

      var _TopicsService = /*#__PURE__*/function () {
        function _TopicsService(config, httpClient) {
          _classCallCheck(this, _TopicsService);

          this.config = config;
          this.httpClient = httpClient;
          this.onChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        }

        _createClass(_TopicsService, [{
          key: "all",
          value: function all(endpoint, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint), {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "one",
          value: function one(endpoint, id) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "findByCaption",
          value: function findByCaption(endpoint, caption, pageable) {
            var query = {
              "conditions": [{
                "attribute": "caption",
                "operator": "eq",
                "value": "%".concat(caption, "%")
              }]
            };
            return this.search(endpoint, query, pageable);
          }
        }, {
          key: "findMatchingCaption",
          value: function findMatchingCaption(endpoint, caption, pageable) {
            var query = {
              "conditions": [{
                "attribute": "caption",
                "operator": "like",
                "value": "%".concat(caption, "%")
              }]
            };
            return this.search(endpoint, query, pageable);
          }
        }, {
          key: "search",
          value: function search(endpoint, query, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/search"), {
              "params": {
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "create",
          value: function create(endpoint, caption) {
            var _this19 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var topicRepr = {
              "caption": caption
            };
            return this.httpClient.post("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint), topicRepr).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this19.onChange.next(x);
              }
            }));
          }
        }, {
          key: "update",
          value: function update(endpoint, id, caption) {
            var _this20 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var topicRepr = {
              "caption": caption
            };
            return this.httpClient.put("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id), topicRepr).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this20.onChange.next(x);
              }
            }));
          }
        }, {
          key: "delete",
          value: function _delete(endpoint, id) {
            var _this21 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient["delete"]("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (error) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new Error(error.status));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this21.onChange.next(x);
              }
            }));
          }
        }]);

        return _TopicsService;
      }();

      _TopicsService.ɵfac = function TopicsService_Factory(t) {
        return new (t || _TopicsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_TopicsServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
      };

      _TopicsService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _TopicsService,
        factory: _TopicsService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_TopicsService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_TopicsServiceConfigToken]
            }]
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient
          }];
        }, null);
      })();

      var _TopicListComponent = /*#__PURE__*/function () {
        function _TopicListComponent(topicsService, router, activatedRoute) {
          var _this22 = this;

          _classCallCheck(this, _TopicListComponent);

          this.topicsService = topicsService;
          this.router = router;
          this.activatedRoute = activatedRoute;
          this.enableSearch = true;
          this.filterText = '';

          this.onSelect = function (item) {
            return _this22.navigateToTopicPosts(item);
          };

          this.errorDesc = "";
          this.loading = false;
          this.filter = "";
          this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subscription();
          this.responseHandler = {
            next: function next(result) {
              _this22.response = result;
              _this22.loading = false;
            },
            error: function error(err) {
              _this22.errorDesc = err.message;
              _this22.loading = false;
              console.log(_this22.errorDesc);
            }
          };
          this.response = null;
          this.pageable = {
            page: 0
          };
        }

        _createClass(_TopicListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this23 = this;

            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;

              _this23.fetchPage(pageNum);
            }); // Requery when the backend data changes

            this.subscription.add(this.topicsService.onChange.subscribe({
              next: function next() {
                return _this23.fetchPage(_this23.pageable.page);
              }
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }, {
          key: "onApplyFilter",
          value: function onApplyFilter(text) {
            this.filterText = text;
            this.fetchPage(0);
          }
        }, {
          key: "fetchPage",
          value: function fetchPage(pageNum) {
            this.pageable.page = pageNum;

            if (!!this.filterText) {
              this.topicsService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
            } else {
              this.topicsService.all("", this.pageable).subscribe(this.responseHandler);
            }
          }
        }, {
          key: "items",
          get: function get() {
            var _a, _b;

            if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.topics)) return [];
            return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.topics;
          }
        }, {
          key: "page",
          get: function get() {
            var _a;

            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
          }
        }, {
          key: "hasItems",
          get: function get() {
            var _a;

            return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
          }
        }, {
          key: "handleListViewEvent",
          value: function handleListViewEvent(evt) {
            switch (evt.opcode) {
              case 'select':
                this.onSelect(evt.item);
                break;
            }
          }
        }, {
          key: "navigateToTopicPosts",
          value: function navigateToTopicPosts(topic) {
            this.router.navigate(['/topics', topic.id, "posts"], {
              state: {
                "endpoint": "topics/".concat(topic.id, "/posts")
              }
            });
          }
        }, {
          key: "gotoPage",
          value: function gotoPage(evt) {
            this.fetchPage(evt - 1);
          }
        }]);

        return _TopicListComponent;
      }();

      _TopicListComponent.ɵfac = function TopicListComponent_Factory(t) {
        return new (t || _TopicListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_TopicsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      _TopicListComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _TopicListComponent,
        selectors: [["blog-topic-list"]],
        inputs: {
          enableSearch: "enableSearch",
          filterText: "filterText",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate",
          headerTemplate: "headerTemplate",
          footerTemplate: "footerTemplate",
          onSelect: ["onSelectTopic", "onSelect"]
        },
        decls: 9,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["contents", ""], ["itemsList", ""], ["defaultHeaderTemplate", ""], ["defaultFooterTemplate", ""], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "onApplyFilter", 4, "ngIf"], [3, "topics", "itemTemplate", "noContentsTemplate", "onSelectItem"], [3, "page", "onSelectPage"], [3, "onApplyFilter"]],
        template: function TopicListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TopicListComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TopicListComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TopicListComponent_ng_template_3_Template, 5, 13, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TopicListComponent_ng_template_5_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, TopicListComponent_ng_template_7_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r1);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, utils__WEBPACK_IMPORTED_MODULE_10__.LoaderComponent, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, _TopicListViewComponent, utils__WEBPACK_IMPORTED_MODULE_10__.PagerComponent, utils__WEBPACK_IMPORTED_MODULE_10__.SearchBoxComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_TopicListComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'blog-topic-list',
            templateUrl: './topic-list.component.html',
            styleUrls: ['./topic-list.component.scss']
          }]
        }], function () {
          return [{
            type: _TopicsService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
          }];
        }, {
          enableSearch: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          filterText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          footerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ['onSelectTopic']
          }]
        });
      })();

      var TopicSelectorComponent = /*#__PURE__*/function () {
        function TopicSelectorComponent() {
          var _this24 = this;

          _classCallCheck(this, TopicSelectorComponent);

          this.maxTopics = 10;
          this.maxTopicsError = false;
          this.initialTopics = [];
          this.selectedTopics = [];

          this.topicClicked = function (item) {
            if (_this24.isTopicSelected(item)) _this24.unselectTopic(item);else _this24.selectTopic(item);
          };
        }

        _createClass(TopicSelectorComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.selectedTopics = this.initialTopics;
          }
        }, {
          key: "isTopicSelected",
          value: function isTopicSelected(topic) {
            return this.selectedTopics.findIndex(function (i) {
              return i.caption.toUpperCase() === topic.caption.toUpperCase();
            }) > -1;
          }
        }, {
          key: "selectTopic",
          value: function selectTopic(topic) {
            this.maxTopicsError = !!this.maxTopics && this.selectedTopics.length >= this.maxTopics;

            if (this.maxTopicsError) {
              return;
            }

            this.selectedTopics.push(topic);
            this.selectedTopics.sort(function (a, b) {
              return a.caption.toUpperCase().localeCompare(b.caption.toUpperCase());
            });
          }
        }, {
          key: "unselectTopic",
          value: function unselectTopic(topic) {
            this.selectedTopics = this.selectedTopics.filter(function (i) {
              return i.caption.toUpperCase() !== topic.caption.toUpperCase();
            });
            this.maxTopicsError = !!this.maxTopics && this.selectedTopics.length >= this.maxTopics;
          }
        }]);

        return TopicSelectorComponent;
      }();

      TopicSelectorComponent.ɵfac = function TopicSelectorComponent_Factory(t) {
        return new (t || TopicSelectorComponent)();
      };

      TopicSelectorComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: TopicSelectorComponent,
        selectors: [["topic-selector"]],
        inputs: {
          maxTopics: "maxTopics",
          initialTopics: "initialTopics",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate"
        },
        decls: 8,
        vars: 5,
        consts: [[1, "form-label"], [3, "topics"], [3, "dismissable", "minimal", 4, "ngIf"], [3, "itemTemplate", "noContentsTemplate", "onSelectTopic"], [3, "dismissable", "minimal"]],
        template: function TopicSelectorComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Selected Topics:");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "blog-topic-list-view", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TopicSelectorComponent_utils_alert_4_Template, 2, 3, "utils-alert", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Available Topics:");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "blog-topic-list", 3);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("topics", ctx.selectedTopics);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.maxTopicsError);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("itemTemplate", ctx.itemTemplate)("noContentsTemplate", ctx.noContentsTemplate)("onSelectTopic", ctx.topicClicked);
          }
        },
        directives: [_TopicListViewComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _TopicListComponent, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TopicSelectorComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'topic-selector',
            templateUrl: './topic-selector.component.html',
            styleUrls: ['./topic-selector.component.css']
          }]
        }], function () {
          return [];
        }, {
          maxTopics: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          initialTopics: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();

      var TopicEditorComponent = /*#__PURE__*/function () {
        function TopicEditorComponent(topicService, router, location, activatedRoute) {
          var _this25 = this;

          _classCallCheck(this, TopicEditorComponent);

          this.topicService = topicService;
          this.router = router;
          this.location = location;
          this.activatedRoute = activatedRoute;
          this.updateMode = true;
          this.topic = null;
          this.errorDesc = "";
          this.loading = false;
          this.fetchResponseHandler = {
            next: function next(result) {
              _this25.theTopic = result;

              _this25.updateForm();

              _this25.loading = false;
            },
            error: function error(err) {
              _this25.errorDesc = err.message;
              _this25.loading = false;
              return false;
            }
          };
        }

        _createClass(TopicEditorComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this26 = this;

            this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
              "caption": new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl("", _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required)
            });
            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              _this26.topicId = (_a = params.topicId) !== null && _a !== void 0 ? _a : _this26.paramTopicId;
              if (_this26.isUpdateMode) _this26.fetchTopic(_this26.topicId);
            });
          }
        }, {
          key: "isUpdateMode",
          get: function get() {
            return this.updateMode && this.topicId !== undefined;
          }
        }, {
          key: "caption",
          get: function get() {
            return this.form.get('caption');
          }
        }, {
          key: "theTopic",
          set: function set(item) {
            var _a;

            this.topic = this.updateMode ? item : null;
            this.topicId = this.updateMode ? (_a = this.topic) === null || _a === void 0 ? void 0 : _a.id : undefined;
            console.info("Got post id: " + this.topicId);
          }
        }, {
          key: "updateForm",
          value: function updateForm() {
            var _a;

            this.caption.setValue((_a = this.topic) === null || _a === void 0 ? void 0 : _a.caption);
          }
        }, {
          key: "fetchTopic",
          value: function fetchTopic(topicId) {
            this.loading = true;
            this.topicService.one("", topicId).subscribe(this.fetchResponseHandler);
          }
        }, {
          key: "createNewTopic",
          value: function createNewTopic() {
            var _a;

            this.topicService.create("", (_a = this.caption) === null || _a === void 0 ? void 0 : _a.value).subscribe(this.fetchResponseHandler);
          }
        }, {
          key: "updateTopic",
          value: function updateTopic() {
            var _a;

            this.topicService.update("", this.topicId, (_a = this.caption) === null || _a === void 0 ? void 0 : _a.value).subscribe(this.fetchResponseHandler);
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.location.back();
          }
        }]);

        return TopicEditorComponent;
      }();

      TopicEditorComponent.ɵfac = function TopicEditorComponent_Factory(t) {
        return new (t || TopicEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_TopicsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      TopicEditorComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: TopicEditorComponent,
        selectors: [["topic-editor"]],
        inputs: {
          headerTemplate: "headerTemplate",
          paramTopicId: ["topicId", "paramTopicId"],
          updateMode: "updateMode"
        },
        decls: 7,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["defaultTitleTemplate", ""], ["contents", ""], ["editor", ""], [1, "d-flex", "justify-content-between"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], ["novalidate", "", "onSubmit", "return false;", 3, "formGroup"], [1, "row"], [1, "mb-3", "col-sm-9"], ["type", "text", "id", "caption", "placeholder", "Topic name ... ", "formControlName", "caption", "required", "", 1, "form-control"], [4, "ngIf"], ["class", "mb-3 col-sm-3", 4, "ngIf"], [3, "dismissable", "minimal", 4, "ngIf"], [1, "mb-3", "col-sm-3"], ["type", "button", "value", "Create", 1, "btn", "btn-primary", 3, "disabled", "click"], ["type", "button", "value", "Update", 1, "btn", "btn-primary", 3, "disabled", "click"]],
        template: function TopicEditorComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TopicEditorComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TopicEditorComponent_ng_template_1_Template, 4, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TopicEditorComponent_ng_template_3_Template, 2, 6, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TopicEditorComponent_ng_template_5_Template, 7, 4, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r3);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, utils__WEBPACK_IMPORTED_MODULE_10__.LoaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.RequiredValidator],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TopicEditorComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'topic-editor',
            templateUrl: './topic-editor.component.html',
            styleUrls: ['./topic-editor.component.css']
          }]
        }], function () {
          return [{
            type: _TopicsService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router
          }, {
            type: _angular_common__WEBPACK_IMPORTED_MODULE_7__.Location
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
          }];
        }, {
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          paramTopicId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ["topicId"]
          }],
          updateMode: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();

      function slugify(text) {
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
        var newText = text.split('').map(function (letter, i) {
          return letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        });
        return newText.toString() // Cast to string
        .toLowerCase() // Convert the string to lowercase letters
        .trim() // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-y-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
      }

      var _BlogPostEditorComponent = /*#__PURE__*/function () {
        function _BlogPostEditorComponent(config, postService, location, activatedRoute) {
          var _this27 = this;

          _classCallCheck(this, _BlogPostEditorComponent);

          this.config = config;
          this.postService = postService;
          this.location = location;
          this.activatedRoute = activatedRoute;
          this.updateMode = true;
          this.post = null;
          this.successDesc = "";
          this.errorDesc = "";
          this.loading = false;
          this.fetchResponseHandler = {
            next: function next(result) {
              _this27.blogPost = result;

              _this27.updateForm();

              _this27.loading = false;
            },
            error: function error(err) {
              _this27.errorDesc = err.message;
              _this27.loading = false;
              return false;
            }
          };
          this.updateResponseHandler = {
            next: function next(result) {
              _this27.blogPost = result;

              _this27.assignTopics();
            },
            error: function error(err) {
              _this27.errorDesc = err.message;
              _this27.loading = false;
              return false;
            }
          };
        }

        _createClass(_BlogPostEditorComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this28 = this;

            var _a;

            this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
              "title": new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.maxLength(this.config.maxTitleLength)]),
              "slug": new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.maxLength(this.config.maxTitleLength), _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.pattern(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)], uniqueSlugValidator(this.postService)),
              "text": new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.maxLength(this.config.maxContentLength)])
            });
            (_a = this.title) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (val) {
              var _a, _b;

              if (!((_a = _this28.slug) === null || _a === void 0 ? void 0 : _a.touched) || !((_b = _this28.slug) === null || _b === void 0 ? void 0 : _b.value)) {
                _this28.generateSlug();
              }
            });
            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              _this28.postId = (_a = params.postId) !== null && _a !== void 0 ? _a : _this28.paramPostId;
              if (_this28.isUpdateMode) _this28.fetchPost(_this28.postId);
            });
          }
        }, {
          key: "isUpdateMode",
          get: function get() {
            return this.updateMode && this.postId !== undefined;
          }
        }, {
          key: "title",
          get: function get() {
            return this.form.get('title');
          }
        }, {
          key: "slug",
          get: function get() {
            return this.form.get('slug');
          }
        }, {
          key: "text",
          get: function get() {
            return this.form.get('text');
          }
        }, {
          key: "selectedTopics",
          get: function get() {
            var _a;

            return ((_a = this.post) === null || _a === void 0 ? void 0 : _a.topics) || [];
          }
        }, {
          key: "blogPost",
          set: function set(item) {
            var _a;

            this.post = this.updateMode ? item : null;
            this.postId = this.updateMode ? (_a = this.post) === null || _a === void 0 ? void 0 : _a.id : undefined;
            console.info("Got post id: " + this.postId);
          }
        }, {
          key: "generateSlug",
          value: function generateSlug() {
            var _a, _b;

            (_a = this.slug) === null || _a === void 0 ? void 0 : _a.setValue(slugify((_b = this.title) === null || _b === void 0 ? void 0 : _b.value));
          }
        }, {
          key: "updateForm",
          value: function updateForm() {
            var _a, _b, _c;

            this.title.setValue((_a = this.post) === null || _a === void 0 ? void 0 : _a.title);
            this.slug.setValue((_b = this.post) === null || _b === void 0 ? void 0 : _b.slug);
            this.text.setValue((_c = this.post) === null || _c === void 0 ? void 0 : _c.text);
          }
        }, {
          key: "fetchPost",
          value: function fetchPost(postId) {
            this.loading = true;
            this.postService.one("posts", postId).subscribe(this.fetchResponseHandler);
          }
        }, {
          key: "createNewPost",
          value: function createNewPost() {
            var _a, _b, _c;

            this.postService.create("posts", (_a = this.slug) === null || _a === void 0 ? void 0 : _a.value, (_b = this.title) === null || _b === void 0 ? void 0 : _b.value, (_c = this.text) === null || _c === void 0 ? void 0 : _c.value).subscribe(this.updateResponseHandler);
          }
        }, {
          key: "updatePost",
          value: function updatePost() {
            var _a, _b, _c;

            this.postService.update("posts", this.postId, (_a = this.slug) === null || _a === void 0 ? void 0 : _a.value, (_b = this.title) === null || _b === void 0 ? void 0 : _b.value, (_c = this.text) === null || _c === void 0 ? void 0 : _c.value).subscribe(this.updateResponseHandler);
          }
        }, {
          key: "assignTopics",
          value: function assignTopics() {
            var _this29 = this;

            var selectedTopics = this.topicSelector.selectedTopics.map(function (i) {
              return i.id;
            });
            console.info(selectedTopics);
            this.postService.assignTopics("posts", this.postId, selectedTopics).subscribe({
              next: function next() {
                _this29.updateForm();

                _this29.successDesc = "Post updated successfully!";
                _this29.loading = false;
              },
              error: function error(err) {
                _this29.errorDesc = err.message;
                _this29.loading = false;
                return false;
              }
            });
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.location.back();
          }
        }]);

        return _BlogPostEditorComponent;
      }();

      _BlogPostEditorComponent.ɵfac = function BlogPostEditorComponent_Factory(t) {
        return new (t || _BlogPostEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_PostsServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_PostsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      _BlogPostEditorComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BlogPostEditorComponent,
        selectors: [["blog-post-editor"]],
        viewQuery: function BlogPostEditorComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c3, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.topicSelector = _t.first);
          }
        },
        inputs: {
          headerTemplate: "headerTemplate",
          paramPostId: ["postId", "paramPostId"],
          updateMode: "updateMode"
        },
        decls: 9,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["defaultTitleTemplate", ""], ["contents", ""], ["editor", ""], ["topicsNotFoundTemplate", ""], [1, "d-flex", "justify-content-between"], ["role", "button", 1, "btn", "btn-success", 3, "click"], [1, "my-4"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "dismissable", "minimal", 4, "ngIf"], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], ["novalidate", "", "onSubmit", "return false;", 3, "formGroup"], [1, "row"], [1, "mb-3", "col-sm-12"], ["for", "title", 1, "form-label"], ["type", "text", "id", "title", "placeholder", "Title of your post ... ", "formControlName", "title", "required", "", 1, "form-control"], [4, "ngIf"], ["for", "slug", 1, "form-label"], ["type", "text", "id", "slug", "placeholder", "Slug goes here ... e.g. this-is-a-valid-slug", "formControlName", "slug", "required", "", 1, "form-control"], ["type", "button", "value", "Auto Generate", 1, "btn", "btn-primary", "ml-1", 3, "disabled", "click"], [1, "mb-3", "col-sm-6"], ["for", "text", 1, "form-label"], ["id", "postText", "rows", "3", "formControlName", "text", "required", "", 1, "form-control"], [1, "form-label"], [1, "variable-binding", 3, "data"], [3, "initialTopics", "noContentsTemplate"], ["topicSelector", ""], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "button", "value", "Post", 1, "btn", "btn-primary", 3, "disabled", "click"], ["type", "button", "value", "Update", 1, "btn", "btn-primary", 3, "disabled", "click"], [4, "authRequireRole"]],
        template: function BlogPostEditorComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BlogPostEditorComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostEditorComponent_ng_template_1_Template, 8, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, BlogPostEditorComponent_ng_template_3_Template, 3, 7, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, BlogPostEditorComponent_ng_template_5_Template, 31, 10, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, BlogPostEditorComponent_ng_template_7_Template, 2, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r3);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, utils__WEBPACK_IMPORTED_MODULE_10__.LoaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.RequiredValidator, ngx_markdown__WEBPACK_IMPORTED_MODULE_14__.MarkdownComponent, TopicSelectorComponent, auth_oidc__WEBPACK_IMPORTED_MODULE_12__.RequireRoleDirective, TopicEditorComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BlogPostEditorComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'blog-post-editor',
            templateUrl: './blog-post-editor.component.html',
            styleUrls: ['./blog-post-editor.component.scss']
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_PostsServiceConfigToken]
            }]
          }, {
            type: _PostsService
          }, {
            type: _angular_common__WEBPACK_IMPORTED_MODULE_7__.Location
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
          }];
        }, {
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          paramPostId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ["postId"]
          }],
          updateMode: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          topicSelector: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
            args: ['topicSelector']
          }]
        });
      })();

      var _BlogPostListViewComponent = /*#__PURE__*/function () {
        function _BlogPostListViewComponent() {
          _classCallCheck(this, _BlogPostListViewComponent);

          this.onSelectItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_BlogPostListViewComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "selectItem",
          value: function selectItem(item, opcode) {
            this.onSelectItem.emit({
              opcode: opcode,
              item: item
            });
          }
        }]);

        return _BlogPostListViewComponent;
      }();

      _BlogPostListViewComponent.ɵfac = function BlogPostListViewComponent_Factory(t) {
        return new (t || _BlogPostListViewComponent)();
      };

      _BlogPostListViewComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BlogPostListViewComponent,
        selectors: [["blog-post-list-view"]],
        inputs: {
          posts: "posts",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate"
        },
        outputs: {
          onSelectItem: "onSelectItem"
        },
        decls: 6,
        vars: 2,
        consts: [[4, "ngIf"], ["defaultItemTemplate", ""], ["defaultNoContentsTemplate", ""], ["class", "bg-light", 4, "ngFor", "ngForOf"], [1, "bg-light"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-1"], [3, "click"], [1, "blog-post-list-post-title"], [1, "created"], [1, "posttext"], [3, "topics"], [1, "btn", "btn-success", 3, "click"], [1, "my-4"]],
        template: function BlogPostListViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BlogPostListViewComponent_ng_container_0_Template, 2, 1, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostListViewComponent_ng_container_1_Template, 2, 4, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, BlogPostListViewComponent_ng_template_2_Template, 14, 7, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, BlogPostListViewComponent_ng_template_4_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.posts);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.posts);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, _TopicListViewComponent],
        pipes: [utils__WEBPACK_IMPORTED_MODULE_10__.PrettyDatePipe],
        styles: [".created[_ngcontent-%COMP%]{padding-top:5px;padding-bottom:5px}.posttext[_ngcontent-%COMP%]{padding-top:10px;padding-bottom:10px}.blog-post-list-post-title[_ngcontent-%COMP%]{cursor:pointer;text-decoration:underline}"]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BlogPostListViewComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'blog-post-list-view',
            templateUrl: './blog-post-list-view.component.html',
            styleUrls: ['./blog-post-list-view.component.scss']
          }]
        }], null, {
          posts: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelectItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
          }]
        });
      })();

      var _BlogPostListComponent = /*#__PURE__*/function () {
        function _BlogPostListComponent(postService, router, activatedRoute) {
          var _this30 = this;

          _classCallCheck(this, _BlogPostListComponent);

          var _a;

          this.postService = postService;
          this.router = router;
          this.activatedRoute = activatedRoute;

          this.onSelect = function (item) {
            return _this30.navigateToPost(item);
          };

          this.errorDesc = "";
          this.loading = false;
          this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subscription();
          this.state = (_a = this.router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras.state;
          this.response = null;
          this.pageable = {
            page: 0
          };
        }

        _createClass(_BlogPostListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this31 = this;

            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;

              _this31.fetchPage(pageNum);
            }); // Requery when the backend data changes

            this.subscription.add(this.postService.onChange.subscribe({
              next: function next() {
                return _this31.fetchPage(0);
              }
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }, {
          key: "fetchPage",
          value: function fetchPage(pageNum) {
            var _this32 = this;

            var _a; //const routeParams = this.route.snapshot.paramMap;
            //this.organizationId = routeParams.get('orgId') as string;  


            this.pageable.page = pageNum;
            this.loading = true;
            this.postService.all((_a = this.state) === null || _a === void 0 ? void 0 : _a.endpoint, this.pageable).subscribe({
              next: function next(result) {
                _this32.response = result;
                _this32.loading = false;
              },
              error: function error(err) {
                _this32.errorDesc = err.message;
                _this32.loading = false;
                console.log(_this32.errorDesc);
              }
            });
          }
        }, {
          key: "items",
          get: function get() {
            var _a, _b;

            if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.posts)) return [];
            return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.posts;
          }
        }, {
          key: "page",
          get: function get() {
            var _a;

            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
          }
        }, {
          key: "handleListViewEvent",
          value: function handleListViewEvent(evt) {
            switch (evt.opcode) {
              case 'select':
                this.onSelect(evt.item);
                break;
            }
          }
        }, {
          key: "navigateToPost",
          value: function navigateToPost(post) {
            this.router.navigate(["/posts", post.id, post.slug]);
          }
        }, {
          key: "gotoPage",
          value: function gotoPage(evt) {
            this.fetchPage(evt - 1);
          }
        }]);

        return _BlogPostListComponent;
      }();

      _BlogPostListComponent.ɵfac = function BlogPostListComponent_Factory(t) {
        return new (t || _BlogPostListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_PostsService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      _BlogPostListComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BlogPostListComponent,
        selectors: [["blog-post-list"]],
        inputs: {
          noContentsTemplate: "noContentsTemplate",
          itemTemplate: "itemTemplate",
          headerTemplate: "headerTemplate",
          footerTemplate: "footerTemplate",
          onSelect: ["onSelectPost", "onSelect"]
        },
        decls: 9,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["contents", ""], ["itemsList", ""], ["defaultHeaderTemplate", ""], ["defaultFooterTemplate", ""], [3, "dismissable", 4, "ngIf", "ngIfElse"], [3, "dismissable"], [1, "mb-0"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "page", "onSelectPage"], [3, "posts", "itemTemplate", "noContentsTemplate", "onSelectItem"]],
        template: function BlogPostListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BlogPostListComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BlogPostListComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, BlogPostListComponent_ng_template_3_Template, 5, 13, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, BlogPostListComponent_ng_template_5_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, BlogPostListComponent_ng_template_7_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r1);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, utils__WEBPACK_IMPORTED_MODULE_10__.LoaderComponent, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, utils__WEBPACK_IMPORTED_MODULE_10__.PagerComponent, _BlogPostListViewComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BlogPostListComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'blog-post-list',
            templateUrl: './blog-post-list.component.html',
            styleUrls: ['./blog-post-list.component.scss']
          }]
        }], function () {
          return [{
            type: _PostsService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
          }];
        }, {
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          footerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ['onSelectPost']
          }]
        });
      })();
      /*
       * Public API Surface of bookmarks
       */

      /*
       * Public API Surface of blog
       */


      var _BlogModule = /*#__PURE__*/function () {
        function _BlogModule() {
          _classCallCheck(this, _BlogModule);
        }

        _createClass(_BlogModule, null, [{
          key: "forRoot",
          value: function forRoot(config) {
            return {
              ngModule: _BlogModule,
              providers: [_PostsService, _TopicsService, {
                provide: _PostsServiceConfigToken,
                useValue: config.posts
              }, {
                provide: _CommentsServiceConfigToken,
                useValue: config.comments
              }, {
                provide: _TopicsServiceConfigToken,
                useValue: config.topics
              }]
            };
          }
        }]);

        return _BlogModule;
      }();

      _BlogModule.ɵfac = function BlogModule_Factory(t) {
        return new (t || _BlogModule)();
      };

      _BlogModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: _BlogModule
      });
      _BlogModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule, ngx_markdown__WEBPACK_IMPORTED_MODULE_14__.MarkdownModule.forChild(), auth_oidc__WEBPACK_IMPORTED_MODULE_12__.OidcAuthModule.forChild(), utils__WEBPACK_IMPORTED_MODULE_10__.UtilsModule]]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BlogModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
          args: [{
            declarations: [_BlogPostListViewComponent, _BlogPostListComponent, _TopicListViewComponent, _TopicListComponent, _BlogPostEditorComponent, _BlogPostComponent, _BlogPostViewComponent, TopicSelectorComponent, TopicEditorComponent, _CommentListComponent, _CommentListViewComponent, CommentEditorComponent],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule, ngx_markdown__WEBPACK_IMPORTED_MODULE_14__.MarkdownModule.forChild(), auth_oidc__WEBPACK_IMPORTED_MODULE_12__.OidcAuthModule.forChild(), utils__WEBPACK_IMPORTED_MODULE_10__.UtilsModule],
            exports: [_BlogPostListViewComponent, _BlogPostListComponent, _TopicListViewComponent, _TopicListComponent, _BlogPostEditorComponent, _BlogPostComponent, _BlogPostViewComponent]
          }]
        }], null, null);
      })();
      /*
       * Public API Surface of blog
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    22125:
    /*!**********************************************!*\
      !*** ./dist/bookmarks/fesm2015/bookmarks.js ***!
      \**********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "BookmarkBadgeComponent": function BookmarkBadgeComponent() {
          return (
            /* binding */
            _BookmarkBadgeComponent
          );
        },

        /* harmony export */
        "BookmarkListComponent": function BookmarkListComponent() {
          return (
            /* binding */
            _BookmarkListComponent
          );
        },

        /* harmony export */
        "BookmarkListViewComponent": function BookmarkListViewComponent() {
          return (
            /* binding */
            _BookmarkListViewComponent
          );
        },

        /* harmony export */
        "BookmarksModule": function BookmarksModule() {
          return (
            /* binding */
            _BookmarksModule
          );
        },

        /* harmony export */
        "BookmarksModuleConfigToken": function BookmarksModuleConfigToken() {
          return (
            /* binding */
            _BookmarksModuleConfigToken
          );
        },

        /* harmony export */
        "BookmarksService": function BookmarksService() {
          return (
            /* binding */
            _BookmarksService
          );
        },

        /* harmony export */
        "BookmarksServiceConfigToken": function BookmarksServiceConfigToken() {
          return (
            /* binding */
            _BookmarksServiceConfigToken
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      79765);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      40205);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs */
      10826);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      88002);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      68307);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      5304);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! utils */
      84739);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! auth-oidc */
      28246);

      var _c0 = function _c0(a0, a1, a2) {
        return {
          $implicit: a0,
          index: a1,
          list: a2
        };
      };

      function BookmarkListViewComponent_ng_container_0_li_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var x_r7 = ctx.$implicit;
          var i_r8 = ctx.index;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r6.itemTemplate || _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](2, _c0, x_r7, i_r8, ctx_r6));
        }
      }

      function BookmarkListViewComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, BookmarkListViewComponent_ng_container_0_li_2_Template, 2, 6, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.bookmarks);
        }
      }

      var _c1 = function _c1(a0) {
        return {
          $implicit: a0
        };
      };

      function BookmarkListViewComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.noContentsTemplate || _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, ctx_r1));
        }
      }

      function BookmarkListViewComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "i", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BookmarkListViewComponent_ng_template_2_Template_i_click_0_listener() {
            var item_r9 = ctx.$implicit;
            var parent_r10 = ctx.list;
            return parent_r10.selectItem(item_r9, "delete");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BookmarkListViewComponent_ng_template_2_Template_a_click_1_listener() {
            var item_r9 = ctx.$implicit;
            var parent_r10 = ctx.list;
            return parent_r10.selectItem(item_r9, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r9 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r9.caption);
        }
      }

      function BookmarkListViewComponent_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " No bookmark found!\n");
        }
      }

      function BookmarkListComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function BookmarkListComponent_ng_template_1_utils_alert_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred fetching the bookmarks list: ", ctx_r9.errorDesc, "");
        }
      }

      function BookmarkListComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BookmarkListComponent_ng_template_1_utils_alert_0_Template, 3, 3, "utils-alert", 5);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorDesc)("ngIfElse", _r3);
        }
      }

      function BookmarkListComponent_ng_template_3_utils_search_box_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-search-box", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onApplyFilter", function BookmarkListComponent_ng_template_3_utils_search_box_2_Template_utils_search_box_onApplyFilter_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r11.onApplyFilter;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function BookmarkListComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, BookmarkListComponent_ng_template_3_utils_search_box_2_Template, 1, 0, "utils-search-box", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "bookmark-list-view", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectItem", function BookmarkListComponent_ng_template_3_Template_bookmark_list_view_onSelectItem_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r13.handleListViewEvent($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "utils-pager", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectPage", function BookmarkListComponent_ng_template_3_Template_utils_pager_onSelectPage_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r15.gotoPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](5, 7);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.enableSearch);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("bookmarks", ctx_r4.items)("itemTemplate", ctx_r4.itemTemplate)("noContentsTemplate", ctx_r4.noContentsTemplate);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("page", ctx_r4.page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.footerTemplate || _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, ctx_r4));
        }
      }

      function BookmarkListComponent_ng_template_5_Template(rf, ctx) {}

      function BookmarkListComponent_ng_template_7_Template(rf, ctx) {}

      var _BookmarksServiceConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("BookmarksServiceConfig");

      var _BookmarksModuleConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("BookmarksModuleConfig");
      /*
       * Public API Surface of bookmarks
       */

      /*
       * Public API Surface of bookmarks
       */


      var _BookmarksService = /*#__PURE__*/function () {
        function _BookmarksService(config, httpClient) {
          _classCallCheck(this, _BookmarksService);

          this.config = config;
          this.httpClient = httpClient;
          this.onChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        }

        _createClass(_BookmarksService, [{
          key: "all",
          value: function all(endpoint, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint), {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "findMatchingCaption",
          value: function findMatchingCaption(endpoint, caption, pageable) {
            var query = {
              "conditions": [{
                "attribute": "caption",
                "operator": "like",
                "value": "%".concat(caption, "%")
              }]
            };
            return this.search(endpoint, query, pageable);
          }
        }, {
          key: "search",
          value: function search(endpoint, query, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/search"), {
              "params": {
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "findByUrl",
          value: function findByUrl(endpoint, url) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var query = {
              "conditions": [{
                "attribute": "url",
                "operator": "eq",
                "value": url
              }]
            };
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/search"), {
              "params": {
                "q": JSON.stringify(query)
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data._embedded.bookmarks[0];
            }));
          }
        }, {
          key: "create",
          value: function create(endpoint, caption, url) {
            var _this33 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var boomarkRepr = {
              "url": url,
              "caption": caption
            };
            return this.httpClient.post("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint), boomarkRepr).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this33.onChange.next(x);
              }
            }));
          }
        }, {
          key: "delete",
          value: function _delete(endpoint, id) {
            var _this34 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient["delete"]("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (error) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new Error(error.status));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this34.onChange.next(x);
              }
            }));
          }
        }]);

        return _BookmarksService;
      }();

      _BookmarksService.ɵfac = function BookmarksService_Factory(t) {
        return new (t || _BookmarksService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_BookmarksServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
      };

      _BookmarksService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _BookmarksService,
        factory: _BookmarksService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BookmarksService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_BookmarksServiceConfigToken]
            }]
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient
          }];
        }, null);
      })();

      var _BookmarkListViewComponent = /*#__PURE__*/function () {
        function _BookmarkListViewComponent() {
          _classCallCheck(this, _BookmarkListViewComponent);

          this.onSelectItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_BookmarkListViewComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "selectItem",
          value: function selectItem(item, opcode) {
            this.onSelectItem.emit({
              opcode: opcode,
              item: item
            });
          }
        }]);

        return _BookmarkListViewComponent;
      }();

      _BookmarkListViewComponent.ɵfac = function BookmarkListViewComponent_Factory(t) {
        return new (t || _BookmarkListViewComponent)();
      };

      _BookmarkListViewComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BookmarkListViewComponent,
        selectors: [["bookmark-list-view"]],
        inputs: {
          bookmarks: "bookmarks",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate"
        },
        outputs: {
          onSelectItem: "onSelectItem"
        },
        decls: 6,
        vars: 2,
        consts: [[4, "ngIf"], ["defaultItemTemplate", ""], ["defaultNoContentsTemplate", ""], [1, "list-group", "checked-list-box"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "list-group-item"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "fa", "fa-times", 3, "click"], [1, "ml-1", "bookmark-list-bookmark-title", 3, "click"]],
        template: function BookmarkListViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BookmarkListViewComponent_ng_container_0_Template, 3, 1, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BookmarkListViewComponent_ng_container_1_Template, 2, 4, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, BookmarkListViewComponent_ng_template_2_Template, 3, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, BookmarkListViewComponent_ng_template_4_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.bookmarks);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.bookmarks);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet],
        styles: [".bookmark-list-bookmark-title[_ngcontent-%COMP%]{cursor:pointer}"]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BookmarkListViewComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'bookmark-list-view',
            templateUrl: './bookmark-list-view.component.html',
            styleUrls: ['./bookmark-list-view.component.scss']
          }]
        }], null, {
          bookmarks: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelectItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
          }]
        });
      })();

      var _BookmarkListComponent = /*#__PURE__*/function () {
        function _BookmarkListComponent(bookmarksService, router, activatedRoute) {
          var _this35 = this;

          _classCallCheck(this, _BookmarkListComponent);

          this.bookmarksService = bookmarksService;
          this.router = router;
          this.activatedRoute = activatedRoute;
          this.enableSearch = true;
          this.filterText = '';

          this.onSelect = function (item) {
            return _this35.navigateBookmark(item);
          };

          this.errorDesc = "";
          this.loading = false;
          this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subscription();
          this.responseHandler = {
            next: function next(result) {
              _this35.response = result;
              _this35.loading = false;
            },
            error: function error(err) {
              _this35.errorDesc = err.message;
              _this35.loading = false;
              console.log(_this35.errorDesc);
            }
          };
          this.response = null;
          this.pageable = {
            page: 0
          };
        }

        _createClass(_BookmarkListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this36 = this;

            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;

              _this36.fetchPage(pageNum);
            }); // Requery when the backend data changes

            this.subscription.add(this.bookmarksService.onChange.subscribe({
              next: function next() {
                return _this36.fetchPage(_this36.pageable.page);
              }
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }, {
          key: "onApplyFilter",
          value: function onApplyFilter(text) {
            this.filterText = text;
            this.fetchPage(0);
          }
        }, {
          key: "fetchPage",
          value: function fetchPage(pageNum) {
            this.pageable.page = pageNum;

            if (!!this.filterText) {
              this.bookmarksService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
            } else {
              this.bookmarksService.all("", this.pageable).subscribe(this.responseHandler);
            }
          }
        }, {
          key: "items",
          get: function get() {
            var _a, _b;

            return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.bookmarks;
          }
        }, {
          key: "page",
          get: function get() {
            var _a;

            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
          }
        }, {
          key: "hasItems",
          get: function get() {
            var _a;

            return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
          }
        }, {
          key: "handleListViewEvent",
          value: function handleListViewEvent(evt) {
            switch (evt.opcode) {
              case 'select':
                this.onSelect(evt.item);
                break;

              case 'delete':
                this.deleteBookmark(evt.item);
                break;
            }
          }
        }, {
          key: "navigateBookmark",
          value: function navigateBookmark(bookmark) {
            console.info("Navigate to ".concat(bookmark.url));
            window.location.href = bookmark.url;
          }
        }, {
          key: "deleteBookmark",
          value: function deleteBookmark(bookmark) {
            var _this37 = this;

            this.bookmarksService["delete"]("", bookmark.id).subscribe({
              error: function error(err) {
                _this37.errorDesc = err.message;
              }
            });
          }
        }, {
          key: "gotoPage",
          value: function gotoPage(evt) {
            this.fetchPage(evt - 1);
          }
        }]);

        return _BookmarkListComponent;
      }();

      _BookmarkListComponent.ɵfac = function BookmarkListComponent_Factory(t) {
        return new (t || _BookmarkListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_BookmarksService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      _BookmarkListComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BookmarkListComponent,
        selectors: [["bookmark-list"]],
        inputs: {
          enableSearch: "enableSearch",
          filterText: "filterText",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate",
          headerTemplate: "headerTemplate",
          footerTemplate: "footerTemplate",
          onSelect: ["onSelectBookmark", "onSelect"]
        },
        decls: 9,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["contents", ""], ["itemsList", ""], ["defaultHeaderTemplate", ""], ["defaultFooterTemplate", ""], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "py-1"], [3, "onApplyFilter", 4, "ngIf"], [3, "bookmarks", "itemTemplate", "noContentsTemplate", "onSelectItem"], [3, "page", "onSelectPage"], [3, "onApplyFilter"]],
        template: function BookmarkListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, BookmarkListComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, BookmarkListComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, BookmarkListComponent_ng_template_3_Template, 6, 13, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, BookmarkListComponent_ng_template_5_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, BookmarkListComponent_ng_template_7_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r1);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, utils__WEBPACK_IMPORTED_MODULE_10__.LoaderComponent, utils__WEBPACK_IMPORTED_MODULE_10__.AlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgTemplateOutlet, _BookmarkListViewComponent, utils__WEBPACK_IMPORTED_MODULE_10__.PagerComponent, utils__WEBPACK_IMPORTED_MODULE_10__.SearchBoxComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BookmarkListComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'bookmark-list',
            templateUrl: './bookmark-list.component.html',
            styleUrls: ['./bookmark-list.component.scss']
          }]
        }], function () {
          return [{
            type: _BookmarksService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute
          }];
        }, {
          enableSearch: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          filterText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          footerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ['onSelectBookmark']
          }]
        });
      })();

      var _BookmarkBadgeComponent = /*#__PURE__*/function () {
        function _BookmarkBadgeComponent(service) {
          var _this38 = this;

          _classCallCheck(this, _BookmarkBadgeComponent);

          this.service = service;
          this.url = "";
          this.caption = "";
          this.loading = false;
          this.responseHandler = {
            next: function next(result) {
              _this38.item = result;
              _this38.loading = false;
              console.log(result);
            },
            error: function error(err) {
              _this38.loading = false;
              console.log(err.message);
            }
          };
        }

        _createClass(_BookmarkBadgeComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.checkStatus();
          }
        }, {
          key: "isActive",
          get: function get() {
            var _a;

            return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.id) != undefined;
          }
        }, {
          key: "checkStatus",
          value: function checkStatus() {
            this.service.findByUrl("bookmarks", this.url).subscribe(this.responseHandler);
          }
        }, {
          key: "createBookmark",
          value: function createBookmark() {
            this.service.create("bookmarks", this.caption, this.url).subscribe(this.responseHandler);
          }
        }, {
          key: "deleteBookmark",
          value: function deleteBookmark() {
            if (this.item) this.service["delete"]("bookmarks", this.item.id).subscribe({
              next: function next() {},
              error: function error(err) {
                console.log(err.message);
              }
            });
          }
        }]);

        return _BookmarkBadgeComponent;
      }();

      _BookmarkBadgeComponent.ɵfac = function BookmarkBadgeComponent_Factory(t) {
        return new (t || _BookmarkBadgeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_BookmarksService));
      };

      _BookmarkBadgeComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _BookmarkBadgeComponent,
        selectors: [["bookmark-badge"]],
        inputs: {
          url: "url",
          caption: "caption",
          activeControlTemplate: "activeControlTemplate",
          inactiveControlTemplate: "inactiveControlTemplate"
        },
        decls: 1,
        vars: 4,
        consts: [[3, "isActive", "activeCaption", "activeControlTemplate", "inactiveControlTemplate", "onAdd", "onRemove"]],
        template: function BookmarkBadgeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-badge", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onAdd", function BookmarkBadgeComponent_Template_utils_badge_onAdd_0_listener() {
              return ctx.createBookmark();
            })("onRemove", function BookmarkBadgeComponent_Template_utils_badge_onRemove_0_listener() {
              return ctx.deleteBookmark();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isActive", ctx.isActive)("activeCaption", "Bookmark")("activeControlTemplate", ctx.activeControlTemplate)("inactiveControlTemplate", ctx.inactiveControlTemplate);
          }
        },
        directives: [utils__WEBPACK_IMPORTED_MODULE_10__.BadgeComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BookmarkBadgeComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'bookmark-badge',
            templateUrl: './bookmark-badge.component.html',
            styleUrls: ['./bookmark-badge.component.scss']
          }]
        }], function () {
          return [{
            type: _BookmarksService
          }];
        }, {
          url: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          caption: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          activeControlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          inactiveControlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();
      /*
       * Public API Surface of bookmarks
       */

      /*
       * Public API Surface of bookmarks
       */


      var _BookmarksModule = /*#__PURE__*/function () {
        function _BookmarksModule() {
          _classCallCheck(this, _BookmarksModule);
        }

        _createClass(_BookmarksModule, null, [{
          key: "forRoot",
          value: function forRoot(config) {
            return {
              ngModule: _BookmarksModule,
              providers: [_BookmarksService, {
                provide: _BookmarksServiceConfigToken,
                useValue: config.bookmarks
              }]
            };
          }
        }]);

        return _BookmarksModule;
      }();

      _BookmarksModule.ɵfac = function BookmarksModule_Factory(t) {
        return new (t || _BookmarksModule)();
      };

      _BookmarksModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: _BookmarksModule
      });
      _BookmarksModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, auth_oidc__WEBPACK_IMPORTED_MODULE_11__.OidcAuthModule.forChild(), utils__WEBPACK_IMPORTED_MODULE_10__.UtilsModule]]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_BookmarksModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
          args: [{
            declarations: [_BookmarkListViewComponent, _BookmarkListComponent, _BookmarkBadgeComponent],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, auth_oidc__WEBPACK_IMPORTED_MODULE_11__.OidcAuthModule.forChild(), utils__WEBPACK_IMPORTED_MODULE_10__.UtilsModule],
            exports: [_BookmarkListViewComponent, _BookmarkListComponent, _BookmarkBadgeComponent]
          }]
        }], null, null);
      })();
      /*
       * Public API Surface of bookmarks
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    46620:
    /*!**********************************************!*\
      !*** ./dist/followers/fesm2015/followers.js ***!
      \**********************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FollowedByBadgeComponent": function FollowedByBadgeComponent() {
          return (
            /* binding */
            _FollowedByBadgeComponent
          );
        },

        /* harmony export */
        "FollowersListComponent": function FollowersListComponent() {
          return (
            /* binding */
            _FollowersListComponent
          );
        },

        /* harmony export */
        "FollowersListViewComponent": function FollowersListViewComponent() {
          return (
            /* binding */
            _FollowersListViewComponent
          );
        },

        /* harmony export */
        "FollowersModule": function FollowersModule() {
          return (
            /* binding */
            _FollowersModule
          );
        },

        /* harmony export */
        "FollowersModuleConfigToken": function FollowersModuleConfigToken() {
          return (
            /* binding */
            _FollowersModuleConfigToken
          );
        },

        /* harmony export */
        "FollowingBadgeComponent": function FollowingBadgeComponent() {
          return (
            /* binding */
            _FollowingBadgeComponent
          );
        },

        /* harmony export */
        "FollowingListComponent": function FollowingListComponent() {
          return (
            /* binding */
            _FollowingListComponent
          );
        },

        /* harmony export */
        "FollowingListViewComponent": function FollowingListViewComponent() {
          return (
            /* binding */
            _FollowingListViewComponent
          );
        },

        /* harmony export */
        "FollowingService": function FollowingService() {
          return (
            /* binding */
            _FollowingService
          );
        },

        /* harmony export */
        "FollowingServiceConfigToken": function FollowingServiceConfigToken() {
          return (
            /* binding */
            _FollowingServiceConfigToken
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      79765);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      40205);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs */
      10826);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      88002);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      5304);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      68307);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! auth-oidc */
      28246);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! utils */
      84739);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common */
      38583);

      var _c0 = function _c0(a0, a1, a2) {
        return {
          $implicit: a0,
          index: a1,
          list: a2
        };
      };

      function FollowersListViewComponent_ng_container_0_li_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var x_r7 = ctx.$implicit;
          var i_r8 = ctx.index;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r6.itemTemplate || _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](2, _c0, x_r7, i_r8, ctx_r6));
        }
      }

      function FollowersListViewComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FollowersListViewComponent_ng_container_0_li_2_Template, 2, 6, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.items);
        }
      }

      var _c1 = function _c1(a0) {
        return {
          $implicit: a0
        };
      };

      function FollowersListViewComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.noContentsTemplate || _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, ctx_r1));
        }
      }

      function FollowersListViewComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FollowersListViewComponent_ng_template_2_Template_span_click_0_listener() {
            var item_r9 = ctx.$implicit;
            var parent_r10 = ctx.list;
            return parent_r10.selectItem(item_r9, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r9 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r9.fullName);
        }
      }

      function FollowersListViewComponent_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " The list is empty at the moment!\n");
        }
      }

      function FollowersListComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function FollowersListComponent_ng_template_1_utils_alert_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred fetching the bookmarks list: ", ctx_r9.errorDesc, "");
        }
      }

      function FollowersListComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FollowersListComponent_ng_template_1_utils_alert_0_Template, 3, 3, "utils-alert", 5);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorDesc)("ngIfElse", _r3);
        }
      }

      function FollowersListComponent_ng_template_3_utils_search_box_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-search-box", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onApplyFilter", function FollowersListComponent_ng_template_3_utils_search_box_2_Template_utils_search_box_onApplyFilter_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r11.onApplyFilter;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function FollowersListComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FollowersListComponent_ng_template_3_utils_search_box_2_Template, 1, 0, "utils-search-box", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "followed-by-list-view", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectItem", function FollowersListComponent_ng_template_3_Template_followed_by_list_view_onSelectItem_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r13.handleListViewEvent($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "utils-pager", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectPage", function FollowersListComponent_ng_template_3_Template_utils_pager_onSelectPage_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r15.gotoPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](5, 7);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.enableSearch);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("items", ctx_r4.items)("itemTemplate", ctx_r4.itemTemplate)("noContentsTemplate", ctx_r4.noContentsTemplate);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("page", ctx_r4.page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.footerTemplate || _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, ctx_r4));
        }
      }

      function FollowersListComponent_ng_template_5_Template(rf, ctx) {}

      function FollowersListComponent_ng_template_7_Template(rf, ctx) {}

      function FollowingListViewComponent_ng_container_0_li_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var x_r7 = ctx.$implicit;
          var i_r8 = ctx.index;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r6.itemTemplate || _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](2, _c0, x_r7, i_r8, ctx_r6));
        }
      }

      function FollowingListViewComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FollowingListViewComponent_ng_container_0_li_2_Template, 2, 6, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.items);
        }
      }

      function FollowingListViewComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.noContentsTemplate || _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, ctx_r1));
        }
      }

      function FollowingListViewComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FollowingListViewComponent_ng_template_2_Template_span_click_0_listener() {
            var item_r9 = ctx.$implicit;
            var parent_r10 = ctx.list;
            return parent_r10.selectItem(item_r9, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r9 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r9.fullName);
        }
      }

      function FollowingListViewComponent_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " The list is empty at the moment!\n");
        }
      }

      function FollowingListComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "utils-loader");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function FollowingListComponent_ng_template_1_utils_alert_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred fetching the bookmarks list: ", ctx_r9.errorDesc, "");
        }
      }

      function FollowingListComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FollowingListComponent_ng_template_1_utils_alert_0_Template, 3, 3, "utils-alert", 5);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorDesc)("ngIfElse", _r3);
        }
      }

      function FollowingListComponent_ng_template_3_utils_search_box_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-search-box", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onApplyFilter", function FollowingListComponent_ng_template_3_utils_search_box_2_Template_utils_search_box_onApplyFilter_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r11.onApplyFilter;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function FollowingListComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FollowingListComponent_ng_template_3_utils_search_box_2_Template, 1, 0, "utils-search-box", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "following-list-view", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectItem", function FollowingListComponent_ng_template_3_Template_following_list_view_onSelectItem_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r13.handleListViewEvent($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "utils-pager", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectPage", function FollowingListComponent_ng_template_3_Template_utils_pager_onSelectPage_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r15.gotoPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](5, 7);
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.headerTemplate || _r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c1, ctx_r4));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.enableSearch);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("items", ctx_r4.items)("itemTemplate", ctx_r4.itemTemplate)("noContentsTemplate", ctx_r4.noContentsTemplate);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("page", ctx_r4.page);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.footerTemplate || _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c1, ctx_r4));
        }
      }

      function FollowingListComponent_ng_template_5_Template(rf, ctx) {}

      function FollowingListComponent_ng_template_7_Template(rf, ctx) {}

      var _FollowingServiceConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("FollowingServiceConfig");

      var _FollowersModuleConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("FollowersModuleConfig");
      /*
       * Public API Surface of bookmarks
       */

      /*
       * Public API Surface of bookmarks
       */


      ;

      var _FollowingService = /*#__PURE__*/function () {
        function _FollowingService(config, authService, httpClient) {
          var _this39 = this;

          _classCallCheck(this, _FollowingService);

          this.config = config;
          this.authService = authService;
          this.httpClient = httpClient;
          this.onChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
          this.authService.userSubject.subscribe(function (profile) {
            _this39.userProfile = profile;
          });
        }

        _createClass(_FollowingService, [{
          key: "followedByOne",
          value: function followedByOne(endpoint, userId, followedById) {
            var _a;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            console.info("followed-by : " + followedById);
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(owner, "/followedBy/").concat(followedById)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "followedBy",
          value: function followedBy(endpoint, userId, pageable) {
            var _a;

            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(owner, "/followedBy"), {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "followedByName,asc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "findFollowedByMatching",
          value: function findFollowedByMatching(endpoint, userId, name, pageable) {
            var _a;

            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            var query = {
              "conditions": [{
                "attribute": "followedByName.fullName",
                "operator": "like",
                "value": "%".concat(name, "%")
              }]
            };
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(owner, "/followedBy/search"), {
              "params": {
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "followedByName,asc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "followingOne",
          value: function followingOne(endpoint, userId, followedById) {
            var _a;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(owner, "/following/").concat(followedById)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "following",
          value: function following(endpoint, userId, pageable) {
            var _a;

            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(owner, "/following"), {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "userName,asc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "findFollowingMatching",
          value: function findFollowingMatching(endpoint, userId, name, pageable) {
            var _a;

            var page = pageable ? pageable.page : 0;
            var pageSize = pageable && pageable.limit ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            var query = {
              "conditions": [{
                "attribute": "userName.fullName",
                "operator": "like",
                "value": "%".concat(name, "%")
              }]
            };
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(owner, "/following/search"), {
              "params": {
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "userName,asc"
              }
            }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "follow",
          value: function follow(endpoint, followReq) {
            var _this40 = this;

            var _a, _b;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            followReq.followedById = !!followReq.followedById ? followReq.followedById : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            followReq.followedByName = !!followReq.followedByName ? followReq.followedByName : (_b = this.userProfile) === null || _b === void 0 ? void 0 : _b.name;
            var owner = followReq.followedById;
            return this.httpClient.put("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(owner, "/following"), followReq).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (error) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(new Error(error.status));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)({
              next: function next(x) {
                _this40.onChange.next(x);
              }
            }));
          }
        }, {
          key: "unfollow",
          value: function unfollow(endpoint, userId, userToUnfollow) {
            var _this41 = this;

            var _a;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            return this.httpClient["delete"]("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(owner, "/following/").concat(userToUnfollow)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(function (error) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(new Error(error.status));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)({
              next: function next(x) {
                _this41.onChange.next(x);
              }
            }));
          }
        }]);

        return _FollowingService;
      }();

      _FollowingService.ɵfac = function FollowingService_Factory(t) {
        return new (t || _FollowingService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_FollowingServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](auth_oidc__WEBPACK_IMPORTED_MODULE_6__.OidcAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient));
      };

      _FollowingService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _FollowingService,
        factory: _FollowingService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_FollowingService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_FollowingServiceConfigToken]
            }]
          }, {
            type: auth_oidc__WEBPACK_IMPORTED_MODULE_6__.OidcAuthService
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient
          }];
        }, null);
      })();

      var _FollowedByBadgeComponent = /*#__PURE__*/function () {
        function _FollowedByBadgeComponent(service, authService) {
          var _this42 = this;

          _classCallCheck(this, _FollowedByBadgeComponent);

          this.service = service;
          this.authService = authService;
          this.userId = "";
          this.loading = false;
          this.authService.userSubject.subscribe(function (profile) {
            _this42.checkStatus();
          });
        }

        _createClass(_FollowedByBadgeComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "isActive",
          get: function get() {
            var _a;

            return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.userId) != undefined;
          }
        }, {
          key: "checkStatus",
          value: function checkStatus() {
            var _this43 = this;

            this.service.followedByOne("", "", this.userId).subscribe({
              next: function next(result) {
                _this43.item = result;
                _this43.loading = false;
                console.log(result);
              },
              error: function error(err) {
                _this43.loading = false;
                console.log(err.message);
              }
            });
          }
        }]);

        return _FollowedByBadgeComponent;
      }();

      _FollowedByBadgeComponent.ɵfac = function FollowedByBadgeComponent_Factory(t) {
        return new (t || _FollowedByBadgeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_FollowingService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](auth_oidc__WEBPACK_IMPORTED_MODULE_6__.OidcAuthService));
      };

      _FollowedByBadgeComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FollowedByBadgeComponent,
        selectors: [["followed-by-badge"]],
        inputs: {
          userId: ["userid", "userId"],
          activeControlTemplate: "activeControlTemplate",
          inactiveControlTemplate: "inactiveControlTemplate"
        },
        decls: 1,
        vars: 4,
        consts: [[3, "isActive", "activeCaption", "activeControlTemplate", "inactiveControlTemplate"]],
        template: function FollowedByBadgeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "utils-badge", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isActive", ctx.isActive)("activeCaption", "FOLLOWS YOU")("activeControlTemplate", ctx.activeControlTemplate)("inactiveControlTemplate", ctx.inactiveControlTemplate);
          }
        },
        directives: [utils__WEBPACK_IMPORTED_MODULE_8__.BadgeComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_FollowedByBadgeComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'followed-by-badge',
            templateUrl: './followed-by-badge.component.html',
            styleUrls: ['./followed-by-badge.component.css']
          }]
        }], function () {
          return [{
            type: _FollowingService
          }, {
            type: auth_oidc__WEBPACK_IMPORTED_MODULE_6__.OidcAuthService
          }];
        }, {
          userId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ["userid"]
          }],
          activeControlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          inactiveControlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();

      var _FollowersListViewComponent = /*#__PURE__*/function () {
        function _FollowersListViewComponent() {
          _classCallCheck(this, _FollowersListViewComponent);

          this.onSelectItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_FollowersListViewComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "selectItem",
          value: function selectItem(item, opcode) {
            this.onSelectItem.emit({
              opcode: opcode,
              item: item
            });
          }
        }]);

        return _FollowersListViewComponent;
      }();

      _FollowersListViewComponent.ɵfac = function FollowersListViewComponent_Factory(t) {
        return new (t || _FollowersListViewComponent)();
      };

      _FollowersListViewComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FollowersListViewComponent,
        selectors: [["followed-by-list-view"]],
        inputs: {
          items: "items",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate"
        },
        outputs: {
          onSelectItem: "onSelectItem"
        },
        decls: 6,
        vars: 2,
        consts: [[4, "ngIf"], ["defaultItemTemplate", ""], ["defaultNoContentsTemplate", ""], [1, "list-group", "checked-list-box"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "list-group-item"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ml-2", 3, "click"]],
        template: function FollowersListViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FollowersListViewComponent_ng_container_0_Template, 3, 1, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FollowersListViewComponent_ng_container_1_Template, 2, 4, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FollowersListViewComponent_ng_template_2_Template, 2, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, FollowersListViewComponent_ng_template_4_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.items);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.items);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgTemplateOutlet],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_FollowersListViewComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'followed-by-list-view',
            templateUrl: './followed-by-list-view.component.html',
            styleUrls: ['./followed-by-list-view.component.css']
          }]
        }], null, {
          items: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelectItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
          }]
        });
      })();

      var _FollowersListComponent = /*#__PURE__*/function () {
        function _FollowersListComponent(followersService, router, activatedRoute) {
          var _this44 = this;

          _classCallCheck(this, _FollowersListComponent);

          this.followersService = followersService;
          this.router = router;
          this.activatedRoute = activatedRoute;
          this.enableSearch = false;
          this.filterText = '';

          this.onSelect = function (item) {};

          this.errorDesc = "";
          this.loading = false;
          this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subscription();
          this.responseHandler = {
            next: function next(result) {
              _this44.response = result;
              _this44.loading = false;
            },
            error: function error(err) {
              _this44.errorDesc = err.message;
              _this44.loading = false;
              console.log(_this44.errorDesc);
            }
          };
          this.response = null;
          this.pageable = {
            page: 0
          };
        }

        _createClass(_FollowersListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this45 = this;

            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;

              _this45.fetchPage(pageNum);
            }); // Requery when the backend data changes

            this.subscription.add(this.followersService.onChange.subscribe({
              next: function next() {
                return _this45.fetchPage(_this45.pageable.page);
              }
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }, {
          key: "onApplyFilter",
          value: function onApplyFilter(text) {
            this.filterText = text;
            this.fetchPage(0);
          }
        }, {
          key: "fetchPage",
          value: function fetchPage(pageNum) {
            this.pageable.page = pageNum;

            if (!!this.filterText) {
              this.followersService.findFollowedByMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
            } else {
              this.followersService.followedBy("", "", this.pageable).subscribe(this.responseHandler);
            }
          }
        }, {
          key: "items",
          get: function get() {
            var _a, _b;

            return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.followedBy;
          }
        }, {
          key: "page",
          get: function get() {
            var _a;

            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
          }
        }, {
          key: "hasItems",
          get: function get() {
            var _a;

            return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
          }
        }, {
          key: "handleListViewEvent",
          value: function handleListViewEvent(evt) {
            switch (evt.opcode) {
              case 'select':
                this.onSelect(evt.item);
                break;
            }
          }
        }, {
          key: "gotoPage",
          value: function gotoPage(evt) {
            this.fetchPage(evt - 1);
          }
        }]);

        return _FollowersListComponent;
      }();

      _FollowersListComponent.ɵfac = function FollowersListComponent_Factory(t) {
        return new (t || _FollowersListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_FollowingService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute));
      };

      _FollowersListComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FollowersListComponent,
        selectors: [["followed-by-list"]],
        inputs: {
          enableSearch: "enableSearch",
          filterText: "filterText",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate",
          headerTemplate: "headerTemplate",
          footerTemplate: "footerTemplate",
          onSelect: ["onSelectBookmark", "onSelect"]
        },
        decls: 9,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["contents", ""], ["itemsList", ""], ["defaultHeaderTemplate", ""], ["defaultFooterTemplate", ""], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "py-1"], [3, "onApplyFilter", 4, "ngIf"], [3, "items", "itemTemplate", "noContentsTemplate", "onSelectItem"], [3, "page", "onSelectPage"], [3, "onApplyFilter"]],
        template: function FollowersListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FollowersListComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FollowersListComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, FollowersListComponent_ng_template_3_Template, 6, 13, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, FollowersListComponent_ng_template_5_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, FollowersListComponent_ng_template_7_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r1);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, utils__WEBPACK_IMPORTED_MODULE_8__.LoaderComponent, utils__WEBPACK_IMPORTED_MODULE_8__.AlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgTemplateOutlet, _FollowersListViewComponent, utils__WEBPACK_IMPORTED_MODULE_8__.PagerComponent, utils__WEBPACK_IMPORTED_MODULE_8__.SearchBoxComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_FollowersListComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'followed-by-list',
            templateUrl: './followed-by-list.component.html',
            styleUrls: ['./followed-by-list.component.css']
          }]
        }], function () {
          return [{
            type: _FollowingService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute
          }];
        }, {
          enableSearch: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          filterText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          footerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ['onSelectBookmark']
          }]
        });
      })();

      var _FollowingBadgeComponent = /*#__PURE__*/function () {
        function _FollowingBadgeComponent(service, authService) {
          var _this46 = this;

          _classCallCheck(this, _FollowingBadgeComponent);

          this.service = service;
          this.authService = authService;
          this.userId = "";
          this.userName = "";
          this.loading = false;
          this.authService.userSubject.subscribe(function (profile) {
            _this46.checkStatus();
          });
        }

        _createClass(_FollowingBadgeComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "isActive",
          get: function get() {
            var _a;

            return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.userId) != undefined;
          }
        }, {
          key: "checkStatus",
          value: function checkStatus() {
            var _this47 = this;

            this.service.followingOne("", "", this.userId).subscribe({
              next: function next(result) {
                _this47.item = result;
                _this47.loading = false;
                console.log(result);
              },
              error: function error(err) {
                _this47.loading = false;
                console.log(err.message);
              }
            });
          }
        }, {
          key: "follow",
          value: function follow() {
            var request = {
              userId: this.userId,
              userName: this.userName,
              followedById: "",
              followedByName: ""
            };
            this.service.follow("", request).subscribe({
              error: function error(err) {
                console.log(err.message);
              }
            });
          }
        }, {
          key: "unfollow",
          value: function unfollow() {
            if (this.item) this.service.unfollow("", "", this.item.userId).subscribe({
              next: function next() {},
              error: function error(err) {
                console.log(err.message);
              }
            });
          }
        }]);

        return _FollowingBadgeComponent;
      }();

      _FollowingBadgeComponent.ɵfac = function FollowingBadgeComponent_Factory(t) {
        return new (t || _FollowingBadgeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_FollowingService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](auth_oidc__WEBPACK_IMPORTED_MODULE_6__.OidcAuthService));
      };

      _FollowingBadgeComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FollowingBadgeComponent,
        selectors: [["following-badge"]],
        inputs: {
          userId: ["userid", "userId"],
          userName: "userName",
          activeControlTemplate: "activeControlTemplate",
          inactiveControlTemplate: "inactiveControlTemplate"
        },
        decls: 1,
        vars: 4,
        consts: [[3, "isActive", "activeCaption", "activeControlTemplate", "inactiveControlTemplate", "onAdd", "onRemove"]],
        template: function FollowingBadgeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-badge", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onAdd", function FollowingBadgeComponent_Template_utils_badge_onAdd_0_listener() {
              return ctx.follow();
            })("onRemove", function FollowingBadgeComponent_Template_utils_badge_onRemove_0_listener() {
              return ctx.unfollow();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isActive", ctx.isActive)("activeCaption", "FOLLOWING")("activeControlTemplate", ctx.activeControlTemplate)("inactiveControlTemplate", ctx.inactiveControlTemplate);
          }
        },
        directives: [utils__WEBPACK_IMPORTED_MODULE_8__.BadgeComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_FollowingBadgeComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'following-badge',
            templateUrl: './following-badge.component.html',
            styleUrls: ['./following-badge.component.css']
          }]
        }], function () {
          return [{
            type: _FollowingService
          }, {
            type: auth_oidc__WEBPACK_IMPORTED_MODULE_6__.OidcAuthService
          }];
        }, {
          userId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ["userid"]
          }],
          userName: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          activeControlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          inactiveControlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();

      var _FollowingListViewComponent = /*#__PURE__*/function () {
        function _FollowingListViewComponent() {
          _classCallCheck(this, _FollowingListViewComponent);

          this.onSelectItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_FollowingListViewComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "selectItem",
          value: function selectItem(item, opcode) {
            this.onSelectItem.emit({
              opcode: opcode,
              item: item
            });
          }
        }]);

        return _FollowingListViewComponent;
      }();

      _FollowingListViewComponent.ɵfac = function FollowingListViewComponent_Factory(t) {
        return new (t || _FollowingListViewComponent)();
      };

      _FollowingListViewComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FollowingListViewComponent,
        selectors: [["following-list-view"]],
        inputs: {
          items: "items",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate"
        },
        outputs: {
          onSelectItem: "onSelectItem"
        },
        decls: 6,
        vars: 2,
        consts: [[4, "ngIf"], ["defaultItemTemplate", ""], ["defaultNoContentsTemplate", ""], [1, "list-group", "checked-list-box"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "list-group-item"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ml-2", 3, "click"]],
        template: function FollowingListViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FollowingListViewComponent_ng_container_0_Template, 3, 1, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FollowingListViewComponent_ng_container_1_Template, 2, 4, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FollowingListViewComponent_ng_template_2_Template, 2, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, FollowingListViewComponent_ng_template_4_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.items);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.items);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgTemplateOutlet],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_FollowingListViewComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'following-list-view',
            templateUrl: './following-list-view.component.html',
            styleUrls: ['./following-list-view.component.css']
          }]
        }], null, {
          items: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelectItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
          }]
        });
      })();

      var _FollowingListComponent = /*#__PURE__*/function () {
        function _FollowingListComponent(followersService, router, activatedRoute) {
          var _this48 = this;

          _classCallCheck(this, _FollowingListComponent);

          this.followersService = followersService;
          this.router = router;
          this.activatedRoute = activatedRoute;
          this.enableSearch = false;
          this.filterText = '';

          this.onSelect = function (item) {};

          this.errorDesc = "";
          this.loading = false;
          this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subscription();
          this.responseHandler = {
            next: function next(result) {
              _this48.response = result;
              _this48.loading = false;
            },
            error: function error(err) {
              _this48.errorDesc = err.message;
              _this48.loading = false;
              console.log(_this48.errorDesc);
            }
          };
          this.response = null;
          this.pageable = {
            page: 0
          };
        }

        _createClass(_FollowingListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this49 = this;

            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;

              _this49.fetchPage(pageNum);
            }); // Requery when the backend data changes

            this.subscription.add(this.followersService.onChange.subscribe({
              next: function next() {
                return _this49.fetchPage(_this49.pageable.page);
              }
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }, {
          key: "onApplyFilter",
          value: function onApplyFilter(text) {
            this.filterText = text;
            this.fetchPage(0);
          }
        }, {
          key: "fetchPage",
          value: function fetchPage(pageNum) {
            this.pageable.page = pageNum;

            if (!!this.filterText) {
              this.followersService.findFollowingMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
            } else {
              this.followersService.following("", "", this.pageable).subscribe(this.responseHandler);
            }
          }
        }, {
          key: "items",
          get: function get() {
            var _a, _b;

            return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.following;
          }
        }, {
          key: "page",
          get: function get() {
            var _a;

            return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
          }
        }, {
          key: "hasItems",
          get: function get() {
            var _a;

            return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
          }
        }, {
          key: "handleListViewEvent",
          value: function handleListViewEvent(evt) {
            switch (evt.opcode) {
              case 'select':
                this.onSelect(evt.item);
                break;
            }
          }
        }, {
          key: "gotoPage",
          value: function gotoPage(evt) {
            this.fetchPage(evt - 1);
          }
        }]);

        return _FollowingListComponent;
      }();

      _FollowingListComponent.ɵfac = function FollowingListComponent_Factory(t) {
        return new (t || _FollowingListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_FollowingService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute));
      };

      _FollowingListComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FollowingListComponent,
        selectors: [["following-list"]],
        inputs: {
          enableSearch: "enableSearch",
          filterText: "filterText",
          itemTemplate: "itemTemplate",
          noContentsTemplate: "noContentsTemplate",
          headerTemplate: "headerTemplate",
          footerTemplate: "footerTemplate",
          onSelect: ["onSelectBookmark", "onSelect"]
        },
        decls: 9,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["contents", ""], ["itemsList", ""], ["defaultHeaderTemplate", ""], ["defaultFooterTemplate", ""], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "py-1"], [3, "onApplyFilter", 4, "ngIf"], [3, "items", "itemTemplate", "noContentsTemplate", "onSelectItem"], [3, "page", "onSelectPage"], [3, "onApplyFilter"]],
        template: function FollowingListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FollowingListComponent_div_0_Template, 2, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FollowingListComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, FollowingListComponent_ng_template_3_Template, 6, 13, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, FollowingListComponent_ng_template_5_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, FollowingListComponent_ng_template_7_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r1);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, utils__WEBPACK_IMPORTED_MODULE_8__.LoaderComponent, utils__WEBPACK_IMPORTED_MODULE_8__.AlertComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgTemplateOutlet, _FollowingListViewComponent, utils__WEBPACK_IMPORTED_MODULE_8__.PagerComponent, utils__WEBPACK_IMPORTED_MODULE_8__.SearchBoxComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_FollowingListComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'following-list',
            templateUrl: './following-list.component.html',
            styleUrls: ['./following-list.component.css']
          }]
        }], function () {
          return [{
            type: _FollowingService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute
          }];
        }, {
          enableSearch: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          filterText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          itemTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          noContentsTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          headerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          footerTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ['onSelectBookmark']
          }]
        });
      })();
      /*
       * Public API Surface of bookmarks
       */

      /*
       * Public API Surface of bookmarks
       */


      var _FollowersModule = /*#__PURE__*/function () {
        function _FollowersModule() {
          _classCallCheck(this, _FollowersModule);
        }

        _createClass(_FollowersModule, null, [{
          key: "forRoot",
          value: function forRoot(config) {
            return {
              ngModule: _FollowersModule,
              providers: [_FollowingService, {
                provide: _FollowingServiceConfigToken,
                useValue: config.followers
              }]
            };
          }
        }]);

        return _FollowersModule;
      }();

      _FollowersModule.ɵfac = function FollowersModule_Factory(t) {
        return new (t || _FollowersModule)();
      };

      _FollowersModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: _FollowersModule
      });
      _FollowersModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, auth_oidc__WEBPACK_IMPORTED_MODULE_6__.OidcAuthModule.forChild(), utils__WEBPACK_IMPORTED_MODULE_8__.UtilsModule]]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_FollowersModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
          args: [{
            declarations: [_FollowersListViewComponent, _FollowersListComponent, _FollowingListViewComponent, _FollowingListComponent, _FollowedByBadgeComponent, _FollowingBadgeComponent],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, auth_oidc__WEBPACK_IMPORTED_MODULE_6__.OidcAuthModule.forChild(), utils__WEBPACK_IMPORTED_MODULE_8__.UtilsModule],
            exports: [_FollowersListViewComponent, _FollowersListComponent, _FollowingListViewComponent, _FollowingListComponent, _FollowedByBadgeComponent, _FollowingBadgeComponent]
          }]
        }], null, null);
      })();
      /*
       * Public API Surface of followers
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    94578:
    /*!**************************************!*\
      !*** ./dist/stats/fesm2015/stats.js ***!
      \**************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CountersService": function CountersService() {
          return (
            /* binding */
            _CountersService
          );
        },

        /* harmony export */
        "CountersServiceConfigToken": function CountersServiceConfigToken() {
          return (
            /* binding */
            _CountersServiceConfigToken
          );
        },

        /* harmony export */
        "StatsModule": function StatsModule() {
          return (
            /* binding */
            _StatsModule
          );
        },

        /* harmony export */
        "StatsModuleConfigToken": function StatsModuleConfigToken() {
          return (
            /* binding */
            _StatsModuleConfigToken
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      79765);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      40205);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      88002);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      68307);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      5304);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! auth-oidc */
      28246);
      /* harmony import */


      var utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! utils */
      84739);

      var _CountersServiceConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("CountersServiceConfig");

      var _StatsModuleConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("StatsModuleConfig");
      /*
       * Public API Surface of bookmarks
       */

      /*
       * Public API Surface of bookmarks
       */


      ;
      ;

      var _CountersService = /*#__PURE__*/function () {
        function _CountersService(config, httpClient) {
          _classCallCheck(this, _CountersService);

          this.config = config;
          this.httpClient = httpClient;
          this.onChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        }

        _createClass(_CountersService, [{
          key: "getCounterStatistics",
          value: function getCounterStatistics(endpoint, counter) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(counter)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }));
          }
        }, {
          key: "batchUpdate",
          value: function batchUpdate(endpoint, counters) {
            var _this50 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.post("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/batch"), counters).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (data) {
              return data;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this50.onChange.next(x);
              }
            }));
          }
        }, {
          key: "deleteCounter",
          value: function deleteCounter(endpoint, counter) {
            var _this51 = this;

            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient["delete"]("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(counter)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (error) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new Error(error.status));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)({
              next: function next(x) {
                _this51.onChange.next(x);
              }
            }));
          }
        }]);

        return _CountersService;
      }();

      _CountersService.ɵfac = function CountersService_Factory(t) {
        return new (t || _CountersService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_CountersServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
      };

      _CountersService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _CountersService,
        factory: _CountersService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_CountersService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_CountersServiceConfigToken]
            }]
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient
          }];
        }, null);
      })();
      /*
       * Public API Surface of bookmarks
       */


      var _StatsModule = /*#__PURE__*/function () {
        function _StatsModule() {
          _classCallCheck(this, _StatsModule);
        }

        _createClass(_StatsModule, null, [{
          key: "forRoot",
          value: function forRoot(config) {
            return {
              ngModule: _StatsModule,
              providers: [{
                provide: _CountersServiceConfigToken,
                useValue: config.counters
              }]
            };
          }
        }]);

        return _StatsModule;
      }();

      _StatsModule.ɵfac = function StatsModule_Factory(t) {
        return new (t || _StatsModule)();
      };

      _StatsModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: _StatsModule
      });
      _StatsModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, auth_oidc__WEBPACK_IMPORTED_MODULE_8__.OidcAuthModule.forChild(), utils__WEBPACK_IMPORTED_MODULE_9__.UtilsModule]]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_StatsModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
          args: [{
            declarations: [],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, auth_oidc__WEBPACK_IMPORTED_MODULE_8__.OidcAuthModule.forChild(), utils__WEBPACK_IMPORTED_MODULE_9__.UtilsModule],
            exports: []
          }]
        }], null, null);
      })();
      /*
       * Public API Surface of stats
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    56643:
    /*!**************************************************!*\
      !*** ./dist/userprofile/fesm2015/userprofile.js ***!
      \**************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UserProfileBadgeComponent": function UserProfileBadgeComponent() {
          return (
            /* binding */
            _UserProfileBadgeComponent
          );
        },

        /* harmony export */
        "UserProfileBadgeViewComponent": function UserProfileBadgeViewComponent() {
          return (
            /* binding */
            _UserProfileBadgeViewComponent
          );
        },

        /* harmony export */
        "UserProfileModule": function UserProfileModule() {
          return (
            /* binding */
            _UserProfileModule
          );
        },

        /* harmony export */
        "UserProfileModuleConfigToken": function UserProfileModuleConfigToken() {
          return (
            /* binding */
            _UserProfileModuleConfigToken
          );
        },

        /* harmony export */
        "UserProfileService": function UserProfileService() {
          return (
            /* binding */
            _UserProfileService
          );
        },

        /* harmony export */
        "UserProfileServiceConfigToken": function UserProfileServiceConfigToken() {
          return (
            /* binding */
            _UserProfileServiceConfigToken
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      88002);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! utils */
      84739);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      38583);

      var _c0 = function _c0(a0, a1) {
        return {
          $implicit: a0,
          list: a1
        };
      };

      function UserProfileBadgeViewComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 2);
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.contentTemplate || _r1)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c0, ctx_r0.userProfile, ctx_r0));
        }
      }

      function UserProfileBadgeViewComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserProfileBadgeViewComponent_ng_template_1_Template_span_click_0_listener() {
            var item_r3 = ctx.$implicit;
            var parent_r4 = ctx.list;
            return parent_r4.selectItem(item_r3, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", item_r3.firstName, " ", item_r3.lastName, "");
        }
      }

      function UserProfileBadgeComponent_utils_loader_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "utils-loader");
        }
      }

      function UserProfileBadgeComponent_ng_template_1_utils_alert_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "utils-alert", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", false)("minimal", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("An error occurred accessing the post: ", ctx_r5.errorDesc, "");
        }
      }

      function UserProfileBadgeComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, UserProfileBadgeComponent_ng_template_1_utils_alert_0_Template, 3, 3, "utils-alert", 3);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.errorDesc)("ngIfElse", _r3);
        }
      }

      function UserProfileBadgeComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "user-profile-badge-view", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onSelectItem", function UserProfileBadgeComponent_ng_template_3_Template_user_profile_badge_view_onSelectItem_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r6.handleViewEvent($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("userProfile", ctx_r4.userProfileItem)("contentTemplate", ctx_r4.contentTemplate);
        }
      }

      var _UserProfileServiceConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("UserProfileServiceConfig");

      var _UserProfileModuleConfigToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("UserProfileModuleConfig");
      /*
       * Public API Surface of bookmarks
       */


      var _UserProfileService = /*#__PURE__*/function () {
        function _UserProfileService(config, httpClient) {
          _classCallCheck(this, _UserProfileService);

          this.config = config;
          this.httpClient = httpClient;
        }

        _createClass(_UserProfileService, [{
          key: "one",
          value: function one(endpoint, id) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient.get("".concat(this.config.serviceBaseUrl, "/").concat(apiEndpoint, "/").concat(id)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(function (data) {
              return data;
            }));
          }
        }]);

        return _UserProfileService;
      }();

      _UserProfileService.ɵfac = function UserProfileService_Factory(t) {
        return new (t || _UserProfileService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_UserProfileServiceConfigToken), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
      };

      _UserProfileService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _UserProfileService,
        factory: _UserProfileService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_UserProfileService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
              args: [_UserProfileServiceConfigToken]
            }]
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient
          }];
        }, null);
      })();

      var _UserProfileBadgeViewComponent = /*#__PURE__*/function () {
        function _UserProfileBadgeViewComponent() {
          _classCallCheck(this, _UserProfileBadgeViewComponent);

          this.onSelectItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        }

        _createClass(_UserProfileBadgeViewComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "userId",
          get: function get() {
            return this.userProfile.id;
          }
        }, {
          key: "selectItem",
          value: function selectItem(item, opcode) {
            this.onSelectItem.emit({
              opcode: opcode,
              item: item
            });
          }
        }]);

        return _UserProfileBadgeViewComponent;
      }();

      _UserProfileBadgeViewComponent.ɵfac = function UserProfileBadgeViewComponent_Factory(t) {
        return new (t || _UserProfileBadgeViewComponent)();
      };

      _UserProfileBadgeViewComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _UserProfileBadgeViewComponent,
        selectors: [["user-profile-badge-view"]],
        inputs: {
          userProfile: "userProfile",
          contentTemplate: "contentTemplate"
        },
        outputs: {
          onSelectItem: "onSelectItem"
        },
        decls: 3,
        vars: 1,
        consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], ["defaultContentTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "fullname", 3, "click"]],
        template: function UserProfileBadgeViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, UserProfileBadgeViewComponent_ng_container_0_Template, 1, 5, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserProfileBadgeViewComponent_ng_template_1_Template, 2, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.userProfile);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgTemplateOutlet],
        styles: [".fullname[_ngcontent-%COMP%]{font-weight:700}"]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_UserProfileBadgeViewComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'user-profile-badge-view',
            templateUrl: './user-profile-badge-view.component.html',
            styleUrls: ['./user-profile-badge-view.component.css']
          }]
        }], function () {
          return [];
        }, {
          userProfile: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          contentTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelectItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
          }]
        });
      })();

      var _UserProfileBadgeComponent = /*#__PURE__*/function () {
        function _UserProfileBadgeComponent(userProfileService, router, activatedRoute) {
          _classCallCheck(this, _UserProfileBadgeComponent);

          this.userProfileService = userProfileService;
          this.router = router;
          this.activatedRoute = activatedRoute;

          this.onSelect = function (item) {};

          this.errorDesc = "";
          this.loading = false;
          this.response = null;
        }

        _createClass(_UserProfileBadgeComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this52 = this;

            this.activatedRoute.params.subscribe(function (params) {
              var _a;

              _this52.userId = (_a = params.userId) !== null && _a !== void 0 ? _a : _this52.paramUserId;

              _this52.fetchUserProfile(_this52.userId);
            });
          }
        }, {
          key: "fetchUserProfile",
          value: function fetchUserProfile(userId) {
            var _this53 = this;

            this.userId = userId;
            this.loading = true;
            this.userProfileService.one("", this.userId).subscribe({
              next: function next(result) {
                _this53.response = result;
                _this53.loading = false;
              },
              error: function error(err) {
                _this53.errorDesc = err.message;
                _this53.loading = false;
                console.log(_this53.errorDesc);
              }
            });
          }
        }, {
          key: "userProfileItem",
          get: function get() {
            return this.response;
          }
        }, {
          key: "handleViewEvent",
          value: function handleViewEvent(evt) {
            switch (evt.opcode) {
              case 'select':
                this.onSelect(evt.item);
                break;
            }
          }
        }]);

        return _UserProfileBadgeComponent;
      }();

      _UserProfileBadgeComponent.ɵfac = function UserProfileBadgeComponent_Factory(t) {
        return new (t || _UserProfileBadgeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_UserProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute));
      };

      _UserProfileBadgeComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _UserProfileBadgeComponent,
        selectors: [["user-profile-badge"]],
        inputs: {
          paramUserId: ["userid", "paramUserId"],
          contentTemplate: "contentTemplate",
          onSelect: "onSelect"
        },
        decls: 5,
        vars: 2,
        consts: [[4, "ngIf", "ngIfElse"], ["contents", ""], ["viewer", ""], [3, "dismissable", "minimal", 4, "ngIf", "ngIfElse"], [3, "dismissable", "minimal"], [3, "userProfile", "contentTemplate", "onSelectItem"]],
        template: function UserProfileBadgeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, UserProfileBadgeComponent_utils_loader_0_Template, 1, 0, "utils-loader", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, UserProfileBadgeComponent_ng_template_1_Template, 1, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, UserProfileBadgeComponent_ng_template_3_Template, 1, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading)("ngIfElse", _r1);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, utils__WEBPACK_IMPORTED_MODULE_5__.LoaderComponent, utils__WEBPACK_IMPORTED_MODULE_5__.AlertComponent, _UserProfileBadgeViewComponent],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_UserProfileBadgeComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
          args: [{
            selector: 'user-profile-badge',
            templateUrl: './user-profile-badge.component.html',
            styleUrls: ['./user-profile-badge.component.css']
          }]
        }], function () {
          return [{
            type: _UserProfileService
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute
          }];
        }, {
          paramUserId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
            args: ["userid"]
          }],
          contentTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }],
          onSelect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
          }]
        });
      })();
      /*
       * Public API Surface of user-profile
       */

      /*
       * Public API Surface of user-profile
       */

      /*
       * Public API Surface of user-profile
       */


      var _UserProfileModule = /*#__PURE__*/function () {
        function _UserProfileModule() {
          _classCallCheck(this, _UserProfileModule);
        }

        _createClass(_UserProfileModule, null, [{
          key: "forRoot",
          value: function forRoot(config) {
            return {
              ngModule: _UserProfileModule,
              providers: [_UserProfileService, {
                provide: _UserProfileServiceConfigToken,
                useValue: config.userProfiles
              }]
            };
          }
        }]);

        return _UserProfileModule;
      }();

      _UserProfileModule.ɵfac = function UserProfileModule_Factory(t) {
        return new (t || _UserProfileModule)();
      };

      _UserProfileModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: _UserProfileModule
      });
      _UserProfileModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, utils__WEBPACK_IMPORTED_MODULE_5__.UtilsModule]]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_UserProfileModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
          args: [{
            declarations: [_UserProfileBadgeViewComponent, _UserProfileBadgeComponent],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, utils__WEBPACK_IMPORTED_MODULE_5__.UtilsModule],
            exports: [_UserProfileBadgeViewComponent, _UserProfileBadgeComponent]
          }]
        }], null, null);
      })();
      /*
       * Public API Surface of userprofile
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    84739:
    /*!**************************************!*\
      !*** ./dist/utils/fesm2015/utils.js ***!
      \**************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AlertComponent": function AlertComponent() {
          return (
            /* binding */
            _AlertComponent
          );
        },

        /* harmony export */
        "BadgeComponent": function BadgeComponent() {
          return (
            /* binding */
            _BadgeComponent
          );
        },

        /* harmony export */
        "ConfigService": function ConfigService() {
          return (
            /* binding */
            _ConfigService
          );
        },

        /* harmony export */
        "LoaderComponent": function LoaderComponent() {
          return (
            /* binding */
            _LoaderComponent
          );
        },

        /* harmony export */
        "PagerComponent": function PagerComponent() {
          return (
            /* binding */
            _PagerComponent
          );
        },

        /* harmony export */
        "PrettyDatePipe": function PrettyDatePipe() {
          return (
            /* binding */
            _PrettyDatePipe
          );
        },

        /* harmony export */
        "SearchBoxComponent": function SearchBoxComponent() {
          return (
            /* binding */
            _SearchBoxComponent
          );
        },

        /* harmony export */
        "SortDirection": function SortDirection() {
          return (
            /* binding */
            _SortDirection
          );
        },

        /* harmony export */
        "UtilsModule": function UtilsModule() {
          return (
            /* binding */
            _UtilsModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      79765);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      54395);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      87519);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      16738);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

      var _SortDirection;

      (function (SortDirection) {
        SortDirection["Asc"] = "asc";
        SortDirection["Desc"] = "desc";
      })(_SortDirection || (_SortDirection = {}));
      /*
       * Public API Surface of utils
       */


      function AlertComponent_ng_template_1_button_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlertComponent_ng_template_1_button_1_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);

            var item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

            return item_r2.fireOnClose();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\xD7");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function AlertComponent_ng_template_1_h4_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h4", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r2.title);
        }
      }

      var _c0$3 = function _c0$3(a1) {
        return ["alert", a1];
      };

      function AlertComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AlertComponent_ng_template_1_button_1_Template, 3, 0, "button", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, AlertComponent_ng_template_1_h4_2_Template, 2, 1, "h4", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r2 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c0$3, "alert-" + item_r2.kind));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r2.dismissable);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !item_r2.minimal);
        }
      }

      var _c1$1 = function _c1$1(a0) {
        return {
          $implicit: a0
        };
      };

      var _c2$1 = ["*"];

      var _AlertComponent = /*#__PURE__*/function () {
        function _AlertComponent() {
          _classCallCheck(this, _AlertComponent);

          this.minimal = false;
          this.dismissable = false;
          this.title = "Oops!";
          this.kind = "danger";
          this.onClosed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        }

        _createClass(_AlertComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "fireOnClose",
          value: function fireOnClose() {
            this.onClosed.emit();
          }
        }]);

        return _AlertComponent;
      }();

      _AlertComponent.ɵfac = function AlertComponent_Factory(t) {
        return new (t || _AlertComponent)();
      };

      _AlertComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _AlertComponent,
        selectors: [["utils-alert"]],
        inputs: {
          minimal: "minimal",
          dismissable: "dismissable",
          title: "title",
          kind: "kind",
          controlTemplate: "controlTemplate"
        },
        outputs: {
          onClosed: "onClosed"
        },
        ngContentSelectors: _c2$1,
        decls: 3,
        vars: 4,
        consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultTemplate", ""], ["role", "alert", 3, "ngClass"], ["type", "button", "class", "close", "data-dismiss", "alert", "aria-label", "Close", 3, "click", 4, "ngIf"], ["class", "alert-heading", 4, "ngIf"], ["type", "button", "data-dismiss", "alert", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "alert-heading"]],
        template: function AlertComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0, 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AlertComponent_ng_template_1_Template, 4, 5, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx.controlTemplate || _r0)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c1$1, ctx));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_AlertComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            selector: 'utils-alert',
            templateUrl: './alert.component.html',
            styleUrls: ['./alert.component.scss']
          }]
        }], function () {
          return [];
        }, {
          minimal: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          dismissable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          title: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          kind: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          controlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          onClosed: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
          }]
        });
      })();

      var _c0$2 = function _c0$2(a0) {
        return {
          $implicit: a0
        };
      };

      function BadgeComponent_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0, 3);
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.inactiveControlTemplate || _r4)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0$2, ctx_r0));
        }
      }

      function BadgeComponent_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0, 3);
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.activeControlTemplate || _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0$2, ctx_r1));
        }
      }

      function BadgeComponent_ng_template_2_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      var _c1 = function _c1(a1) {
        return ["btn", a1];
      };

      function BadgeComponent_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BadgeComponent_ng_template_2_Template_a_click_0_listener() {
            var item_r6 = ctx.$implicit;
            return item_r6.fireRemove();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 5, 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, BadgeComponent_ng_template_2_span_5_Template, 2, 0, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r6 = ctx.$implicit;

          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c1, "btn-" + item_r6.kind));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", item_r6.activeCaption, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !_r7.innerHTML.trim());
        }
      }

      function BadgeComponent_ng_template_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BadgeComponent_ng_template_4_Template_a_click_0_listener() {
            var item_r10 = ctx.$implicit;
            return item_r10.fireAdd();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r10 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c1, "btn-outline-" + item_r10.kind));

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", item_r10.inactiveCaption || item_r10.activeCaption, " ");
        }
      }

      var _c2 = ["*"];

      var _BadgeComponent = /*#__PURE__*/function () {
        function _BadgeComponent() {
          _classCallCheck(this, _BadgeComponent);

          this.isActive = false;
          this.activeCaption = "";
          this.inactiveCaption = "";
          this.kind = "primary";
          this.onAdd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.onRemove = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        }

        _createClass(_BadgeComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "fireAdd",
          value: function fireAdd() {
            this.onAdd.emit();
          }
        }, {
          key: "fireRemove",
          value: function fireRemove() {
            this.onRemove.emit();
          }
        }]);

        return _BadgeComponent;
      }();

      _BadgeComponent.ɵfac = function BadgeComponent_Factory(t) {
        return new (t || _BadgeComponent)();
      };

      _BadgeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _BadgeComponent,
        selectors: [["utils-badge"]],
        inputs: {
          isActive: "isActive",
          activeCaption: "activeCaption",
          inactiveCaption: "inactiveCaption",
          kind: "kind",
          activeControlTemplate: "activeControlTemplate",
          inactiveControlTemplate: "inactiveControlTemplate"
        },
        outputs: {
          onAdd: "onAdd",
          onRemove: "onRemove"
        },
        ngContentSelectors: _c2,
        decls: 6,
        vars: 2,
        consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], ["defaultActiveControlTemplate", ""], ["defaultInactiveControlTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 3, "ngClass", "click"], [1, "badge", "badge-light"], ["ref", ""], [4, "ngIf"], [1, "fa", "fa-star"]],
        template: function BadgeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, BadgeComponent_ng_container_0_Template, 1, 4, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BadgeComponent_ng_container_1_Template, 1, 4, "ng-container", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, BadgeComponent_ng_template_2_Template, 6, 5, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BadgeComponent_ng_template_4_Template, 2, 4, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isActive);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isActive);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_BadgeComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            selector: 'utils-badge',
            templateUrl: './badge.component.html',
            styleUrls: ['./badge.component.css']
          }]
        }], function () {
          return [];
        }, {
          isActive: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          activeCaption: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          inactiveCaption: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          kind: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          activeControlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          inactiveControlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          onAdd: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
          }],
          onRemove: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
          }]
        });
      })();

      function PagerComponent_div_0_li_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PagerComponent_div_0_li_9_Template_a_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);

            var page_r2 = restoredCtx.$implicit;

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

            return ctx_r3.selectItem(page_r2);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var page_r2 = ctx.$implicit;

          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", (ctx_r1.currentPage == null ? null : ctx_r1.currentPage.number) === page_r2 - 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](page_r2);
        }
      }

      function PagerComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "nav");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ul", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "li", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "a", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PagerComponent_div_0_Template_a_click_4_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r5.selectItem(ctx_r5.previousPage);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\xAB");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Previous");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, PagerComponent_div_0_li_9_Template, 3, 3, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "a", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PagerComponent_div_0_Template_a_click_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r7.selectItem(ctx_r7.nextPage);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "span", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "\xBB");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "span", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Next");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("disabled", ctx_r0.previousPage == -1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.pageList);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("disabled", ctx_r0.previousPage == -1);
        }
      }

      var _PagerComponent = /*#__PURE__*/function () {
        function _PagerComponent() {
          _classCallCheck(this, _PagerComponent);

          this.prevNextLinks = true;
          this.maxPageLinks = 10;
          this.onSelectPage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.pageList = [];
        }

        _createClass(_PagerComponent, [{
          key: "page",
          get: function get() {
            return this.currentPage;
          },
          set: function set(value) {
            this.currentPage = value;
            this.pageList = [];
            if (this.currentPage) this.pageList = Array.from({
              length: this.numberOfPages
            }, function (v, k) {
              return k + 1;
            }); //console.info("Current page " + this.currentPage);
          }
        }, {
          key: "numberOfPages",
          get: function get() {
            return this.currentPage ? this.currentPage.totalPages : 0;
          }
        }, {
          key: "previousPage",
          get: function get() {
            if (!this.prevNextLinks || !this.currentPage || this.currentPage.number == 0) return -1;
            return this.currentPage.number - 1;
          }
        }, {
          key: "nextPage",
          get: function get() {
            if (!this.prevNextLinks || !this.currentPage || this.currentPage.number >= this.currentPage.totalPages) return -1;
            return this.currentPage.number + 1;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "selectItem",
          value: function selectItem(page) {
            this.onSelectPage.emit(page);
          }
        }]);

        return _PagerComponent;
      }();

      _PagerComponent.ɵfac = function PagerComponent_Factory(t) {
        return new (t || _PagerComponent)();
      };

      _PagerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _PagerComponent,
        selectors: [["utils-pager"]],
        inputs: {
          prevNextLinks: "prevNextLinks",
          maxPageLinks: "maxPageLinks",
          page: "page"
        },
        outputs: {
          onSelectPage: "onSelectPage"
        },
        decls: 1,
        vars: 1,
        consts: [[4, "ngIf"], [1, "pagination", "flex-wrap"], [1, "page-item"], [1, "page-link", 3, "click"], ["aria-hidden", "true"], [1, "sr-only"], ["class", "page-item", 3, "active", 4, "ngFor", "ngForOf"]],
        template: function PagerComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, PagerComponent_div_0_Template, 16, 5, "div", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.numberOfPages);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_PagerComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            selector: 'utils-pager',
            templateUrl: './pager.component.html',
            styleUrls: ['./pager.component.scss']
          }]
        }], null, {
          prevNextLinks: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          maxPageLinks: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          onSelectPage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
          }],
          page: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }]
        });
      })();

      var _c0$1 = ["searchBox"];

      var _SearchBoxComponent = /*#__PURE__*/function () {
        function _SearchBoxComponent() {
          _classCallCheck(this, _SearchBoxComponent);

          this.debounceTime = 500;
          this.onApplyFilter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.filter$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        }

        _createClass(_SearchBoxComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this54 = this;

            this.subscription = this.filter$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(this.debounceTime), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)()).subscribe(function (filterValue) {
              _this54.onApplyFilter.emit(filterValue);
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }, {
          key: "doSearch",
          value: function doSearch() {
            var value = this.searchBox.nativeElement.value;
            this.filter$.next(value);
          }
        }]);

        return _SearchBoxComponent;
      }();

      _SearchBoxComponent.ɵfac = function SearchBoxComponent_Factory(t) {
        return new (t || _SearchBoxComponent)();
      };

      _SearchBoxComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _SearchBoxComponent,
        selectors: [["utils-search-box"]],
        viewQuery: function SearchBoxComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0$1, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.searchBox = _t.first);
          }
        },
        inputs: {
          debounceTime: "debounceTime"
        },
        outputs: {
          onApplyFilter: "onApplyFilter"
        },
        decls: 5,
        vars: 0,
        consts: [[1, "input-group", "rounded", "py-2"], ["type", "search", "placeholder", "Search", "aria-label", "Search", "aria-describedby", "search-addon", 1, "form-control", "rounded", 3, "input"], ["searchBox", ""], ["id", "search-addon", 1, "input-group-text", "border-0", 3, "click"], [1, "fas", "fa-search"]],
        template: function SearchBoxComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "input", 1, 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function SearchBoxComponent_Template_input_input_1_listener() {
              return ctx.doSearch();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SearchBoxComponent_Template_span_click_3_listener() {
              return ctx.doSearch();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "i", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }
        },
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_SearchBoxComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            selector: 'utils-search-box',
            templateUrl: './search-box.component.html',
            styleUrls: ['./search-box.component.css']
          }]
        }], function () {
          return [];
        }, {
          searchBox: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
            args: ['searchBox']
          }],
          debounceTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }],
          onApplyFilter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
          }]
        });
      })();

      function LoaderComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "strong");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Loading...");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      var _c0 = function _c0(a0) {
        return {
          $implicit: a0
        };
      };

      var _LoaderComponent = /*#__PURE__*/function () {
        function _LoaderComponent() {
          _classCallCheck(this, _LoaderComponent);
        }

        _createClass(_LoaderComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _LoaderComponent;
      }();

      _LoaderComponent.ɵfac = function LoaderComponent_Factory(t) {
        return new (t || _LoaderComponent)();
      };

      _LoaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _LoaderComponent,
        selectors: [["utils-loader"]],
        inputs: {
          controlTemplate: "controlTemplate"
        },
        decls: 3,
        vars: 4,
        consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["defaultTemplate", ""], [1, "d-flex", "align-items-center"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "ml-auto"]],
        template: function LoaderComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0, 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LoaderComponent_ng_template_1_Template, 4, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx.controlTemplate || _r0)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, ctx));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgTemplateOutlet],
        styles: [""]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_LoaderComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
          args: [{
            selector: 'utils-loader',
            templateUrl: './loader.component.html',
            styleUrls: ['./loader.component.css']
          }]
        }], function () {
          return [];
        }, {
          controlTemplate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
          }]
        });
      })();
      /*
       * Public API Surface of utils
       */


      var _ConfigService = /*#__PURE__*/function () {
        function _ConfigService(httpClient) {
          _classCallCheck(this, _ConfigService);

          this.httpClient = httpClient;
          this.uriPrefix = 'assets/data/config/';
          this.uriSuffix = '.json';
        }

        _createClass(_ConfigService, [{
          key: "get",
          value: function get(filename) {
            return this.httpClient.get(this.uriPrefix + filename + this.uriSuffix).toPromise();
          }
        }]);

        return _ConfigService;
      }();

      _ConfigService.ɵfac = function ConfigService_Factory(t) {
        return new (t || _ConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
      };

      _ConfigService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _ConfigService,
        factory: _ConfigService.ɵfac,
        providedIn: 'root'
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_ConfigService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient
          }];
        }, null);
      })();
      /*
       * Public API Surface of utils
       */


      var _PrettyDatePipe = /*#__PURE__*/function () {
        function _PrettyDatePipe() {
          _classCallCheck(this, _PrettyDatePipe);
        }

        _createClass(_PrettyDatePipe, [{
          key: "transform",
          value: function transform(value) {
            return moment__WEBPACK_IMPORTED_MODULE_0__(value).calendar();
          }
        }]);

        return _PrettyDatePipe;
      }();

      _PrettyDatePipe.ɵfac = function PrettyDatePipe_Factory(t) {
        return new (t || _PrettyDatePipe)();
      };

      _PrettyDatePipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
        name: "prettyDate",
        type: _PrettyDatePipe,
        pure: true
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_PrettyDatePipe, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Pipe,
          args: [{
            name: 'prettyDate'
          }]
        }], null, null);
      })();
      /*
       * Public API Surface of utils
       */


      var _UtilsModule = function _UtilsModule() {
        _classCallCheck(this, _UtilsModule);
      };

      _UtilsModule.ɵfac = function UtilsModule_Factory(t) {
        return new (t || _UtilsModule)();
      };

      _UtilsModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: _UtilsModule
      });
      _UtilsModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]]
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](_UtilsModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
          args: [{
            declarations: [_PrettyDatePipe, _PagerComponent, _AlertComponent, _SearchBoxComponent, _LoaderComponent, _BadgeComponent],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
            exports: [_PrettyDatePipe, _PagerComponent, _AlertComponent, _SearchBoxComponent, _LoaderComponent, _BadgeComponent]
          }]
        }], null, null);
      })();

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](_UtilsModule, {
          declarations: [_PrettyDatePipe, _PagerComponent, _AlertComponent, _SearchBoxComponent, _LoaderComponent, _BadgeComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
          exports: [_PrettyDatePipe, _PagerComponent, _AlertComponent, _SearchBoxComponent, _LoaderComponent, _BadgeComponent]
        });
      })();
      /*
       * Public API Surface of utils
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    90158:
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppRoutingModule": function AppRoutingModule() {
          return (
            /* binding */
            _AppRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! auth-oidc */
      28246);
      /* harmony import */


      var blog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! blog */
      84652);
      /* harmony import */


      var _components_app_post_app_post_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./components/app-post/app-post.component */
      10546);
      /* harmony import */


      var _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/app-posts-list/app-posts-list.component */
      95847);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      37716);

      var routes = [{
        path: '',
        redirectTo: '/posts',
        pathMatch: 'full'
      }, {
        path: 'posts',
        component: _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_1__.AppPostsListComponent,
        pathMatch: 'full'
      }, {
        path: 'posts/new',
        component: blog__WEBPACK_IMPORTED_MODULE_2__.BlogPostEditorComponent,
        pathMatch: 'full',
        canActivate: [auth_oidc__WEBPACK_IMPORTED_MODULE_3__.AuthGuard]
      }, {
        path: 'posts/edit/:postId',
        component: blog__WEBPACK_IMPORTED_MODULE_2__.BlogPostEditorComponent,
        pathMatch: 'full',
        canActivate: [auth_oidc__WEBPACK_IMPORTED_MODULE_3__.AuthGuard]
      }, {
        path: 'posts/:pageNum',
        component: _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_1__.AppPostsListComponent
      }, {
        path: 'user/:userId/posts',
        component: _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_1__.AppPostsListComponent,
        pathMatch: 'full'
      }, {
        path: 'user/:userId/posts/:pageNum',
        component: _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_1__.AppPostsListComponent
      }, {
        path: 'topics/:topicId/posts',
        component: _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_1__.AppPostsListComponent,
        pathMatch: 'full'
      }, {
        path: 'topics/:topicId/posts/:pageNum',
        component: _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_1__.AppPostsListComponent
      }, {
        path: 'posts/:postId/:slug',
        component: _components_app_post_app_post_component__WEBPACK_IMPORTED_MODULE_0__.AppPostComponent,
        pathMatch: 'full'
      }, //{ path: 'bookmarks', component: BookmarkListViewComponent }, //
      {
        path: 'login',
        component: _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_1__.AppPostsListComponent,
        pathMatch: 'full',
        canActivate: [auth_oidc__WEBPACK_IMPORTED_MODULE_3__.AuthGuard]
      }, {
        path: 'logout',
        redirectTo: '/oidc-auth/logout',
        pathMatch: 'full'
      }];

      var _AppRoutingModule = function _AppRoutingModule() {
        _classCallCheck(this, _AppRoutingModule);
      };

      _AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || _AppRoutingModule)();
      };

      _AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _AppRoutingModule
      });
      _AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes, {
          onSameUrlNavigation: 'reload'
        })], _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    55041:
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppComponent": function AppComponent() {
          return (
            /* binding */
            _AppComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! auth-oidc */
      28246);
      /* harmony import */


      var blog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! blog */
      84652);
      /* harmony import */


      var bookmarks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! bookmarks */
      22125);
      /* harmony import */


      var followers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! followers */
      46620);

      function AppComponent_a_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_a_8_Template_a_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r10.userPosts();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "My Posts");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppComponent_li_18_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "My Bookmarks");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppComponent_div_22_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "bookmark-list");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppComponent_div_26_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Welcome ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "b");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Logout");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3.userName);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/logout");
        }
      }

      function AppComponent_ng_template_27_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " Not logged in. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Login");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/login");
        }
      }

      function AppComponent_li_30_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Following");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppComponent_li_31_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "My Followers");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppComponent_div_33_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "following-list");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppComponent_div_34_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "followed-by-list");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      var _AppComponent = /*#__PURE__*/function () {
        function _AppComponent(router, authService) {
          var _this55 = this;

          _classCallCheck(this, _AppComponent);

          this.router = router;
          this.authService = authService;
          this.title = 'Pretty Useless Webapp';
          this.links = ['Blog Posts', 'Bookmarks'];
          this.authService.userSubject.subscribe(function (profile) {
            _this55.userProfile = profile;
          });
        }

        _createClass(_AppComponent, [{
          key: "userId",
          get: function get() {
            var _a;

            return (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
          }
        }, {
          key: "userName",
          get: function get() {
            var _a;

            return (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.name;
          }
        }, {
          key: "userPosts",
          value: function userPosts() {
            this.router.navigate(['user', this.userId, 'posts'], {
              state: {
                "endpoint": "users/".concat(this.userId, "/posts")
              }
            });
          }
        }]);

        return _AppComponent;
      }();

      _AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || _AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](auth_oidc__WEBPACK_IMPORTED_MODULE_2__.OidcAuthService));
      };

      _AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _AppComponent,
        selectors: [["app-root"]],
        decls: 38,
        vars: 10,
        consts: [[1, "container-fluid"], [1, "row", "content"], [1, "col-sm-2", "sidenav", "py-3"], ["role", "button", 1, "btn", "btn-primary", "mr-1", 3, "routerLink"], ["class", "btn btn-primary mr-1", "role", "button", 3, "click", 4, "authRequireLogin"], [1, "input-group", "mb-3"], ["type", "text", "placeholder", "Search Blog..", 1, "form-control"], [1, "input-group-btn"], ["type", "button", 1, "btn", "btn-default"], [1, "glyphicon", "glyphicon-search"], ["id", "tab1", "role", "tablist", 1, "nav", "nav-tabs"], [1, "nav-item"], ["id", "topics-tab", "data-toggle", "tab", "href", "#topics", "role", "tab", "aria-controls", "topics", "aria-selected", "", 1, "nav-link", "active"], ["class", "nav-item", 4, "authRequireLogin"], ["id", "tab1Content", 1, "tab-content"], ["id", "topics", "role", "tabpanel", "aria-labelledby", "topics-tab", 1, "tab-pane", "fade", "show", "active"], ["class", "tab-pane fade", "id", "bookmarks", "role", "tabpanel", "aria-labelledby", "bookmarks-tab", 4, "authRequireLogin"], [1, "col-sm-8", "py-3"], ["class", "d-flex justify-content-between", 4, "authRequireLogin", "authRequireLoginElse"], ["nologin", ""], ["id", "tab2", "role", "tablist", 1, "nav", "nav-tabs"], ["id", "tab2Content", 1, "tab-content"], ["class", "tab-pane fade show active", "id", "following", "role", "tabpanel", "aria-labelledby", "following-tab", 4, "authRequireLogin"], ["class", "tab-pane fade", "id", "followers", "role", "tabpanel", "aria-labelledby", "followers-tab", 4, "authRequireLogin"], [1, "row"], [1, "col-sm-12", "sidenav", "py-3"], ["role", "button", 1, "btn", "btn-primary", "mr-1", 3, "click"], ["id", "bookmarks-tab", "data-toggle", "tab", "href", "#bookmarks", "role", "tab", "aria-controls", "bookmarks", "aria-selected", "false", 1, "nav-link"], ["id", "bookmarks", "role", "tabpanel", "aria-labelledby", "bookmarks-tab", 1, "tab-pane", "fade"], [1, "d-flex", "justify-content-between"], ["id", "following-tab", "data-toggle", "tab", "href", "#following", "role", "tab", "aria-controls", "following", "aria-selected", "", 1, "nav-link", "active"], ["id", "followers-tab", "data-toggle", "tab", "href", "#followers", "role", "tab", "aria-controls", "followers", "aria-selected", "false", 1, "nav-link"], ["id", "following", "role", "tabpanel", "aria-labelledby", "following-tab", 1, "tab-pane", "fade", "show", "active"], ["id", "followers", "role", "tabpanel", "aria-labelledby", "followers-tab", 1, "tab-pane", "fade"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Components");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Home");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, AppComponent_a_8_Template, 2, 0, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "span", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "ul", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "li", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "a", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Topics");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, AppComponent_li_18_Template, 3, 0, "li", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "blog-topic-list");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, AppComponent_div_22_Template, 2, 0, "div", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, AppComponent_div_26_Template, 7, 2, "div", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, AppComponent_ng_template_27_Template, 3, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "ul", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, AppComponent_li_30_Template, 3, 0, "li", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, AppComponent_li_31_Template, 3, 0, "li", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, AppComponent_div_33_Template, 2, 0, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, AppComponent_div_34_Template, 2, 0, "div", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, " This is a footer ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](28);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true)("authRequireLoginElse", _r4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkWithHref, auth_oidc__WEBPACK_IMPORTED_MODULE_2__.RequireLoginDirective, blog__WEBPACK_IMPORTED_MODULE_3__.TopicListComponent, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet, bookmarks__WEBPACK_IMPORTED_MODULE_4__.BookmarkListComponent, followers__WEBPACK_IMPORTED_MODULE_5__.FollowingListComponent, followers__WEBPACK_IMPORTED_MODULE_5__.FollowersListComponent],
        styles: ["[_nghost-%COMP%] {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 14px;\n  color: #333;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n\n\n.row.content[_ngcontent-%COMP%] {\n  height: 1500px;\n}\n\n\n\n.sidenav[_ngcontent-%COMP%] {\n  background-color: #f1f1f1;\n  height: 100%;\n}\n\n\n\nfooter[_ngcontent-%COMP%] {\n  background-color: #555;\n  color: white;\n  padding: 15px;\n}\n\n\n\n@media screen and (max-width: 767px) {\n  .sidenav[_ngcontent-%COMP%] {\n    height: auto;\n    padding: 15px;\n  }\n\n  .row.content[_ngcontent-%COMP%] {\n    height: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDBKQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLG1DQUFBO0VBQ0Esa0NBQUE7QUFDSjs7QUFFQSxzRUFBQTs7QUFDQTtFQUFjLGNBQUE7QUFFZDs7QUFBQSw4Q0FBQTs7QUFDQTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQUdGOztBQUFBLDREQUFBOztBQUNBO0VBQ0Usc0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQUdGOztBQUFBLGdFQUFBOztBQUNBO0VBQ0U7SUFDRSxZQUFBO0lBQ0EsYUFBQTtFQUdGOztFQURBO0lBQWMsWUFBQTtFQUtkO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIjtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICMzMzM7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB9XG5cbi8qIFNldCBoZWlnaHQgb2YgdGhlIGdyaWQgc28gLnNpZGVuYXYgY2FuIGJlIDEwMCUgKGFkanVzdCBpZiBuZWVkZWQpICovXG4ucm93LmNvbnRlbnQge2hlaWdodDogMTUwMHB4fVxuXG4vKiBTZXQgZ3JheSBiYWNrZ3JvdW5kIGNvbG9yIGFuZCAxMDAlIGhlaWdodCAqL1xuLnNpZGVuYXYge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi8qIFNldCBibGFjayBiYWNrZ3JvdW5kIGNvbG9yLCB3aGl0ZSB0ZXh0IGFuZCBzb21lIHBhZGRpbmcgKi9cbmZvb3RlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZzogMTVweDtcbn1cblxuLyogT24gc21hbGwgc2NyZWVucywgc2V0IGhlaWdodCB0byAnYXV0bycgZm9yIHNpZGVuYXYgYW5kIGdyaWQgKi9cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5zaWRlbmF2IHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgcGFkZGluZzogMTVweDtcbiAgfVxuICAucm93LmNvbnRlbnQge2hlaWdodDogYXV0bzt9IFxufSJdfQ== */"]
      });
      /***/
    },

    /***/
    36747:
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppModule": function AppModule() {
          return (
            /* binding */
            _AppModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/platform-browser */
      39075);
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app-routing.module */
      90158);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! auth-oidc */
      28246);
      /* harmony import */


      var utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! utils */
      84739);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common/http */
      91841);
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      75835);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../environments/environment */
      92340);
      /* harmony import */


      var ngx_markdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ngx-markdown */
      76715);
      /* harmony import */


      var blog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! blog */
      84652);
      /* harmony import */


      var bookmarks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! bookmarks */
      22125);
      /* harmony import */


      var followers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! followers */
      46620);
      /* harmony import */


      var stats__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! stats */
      94578);
      /* harmony import */


      var userprofile__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! userprofile */
      56643);
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app.component */
      55041);
      /* harmony import */


      var _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./components/app-posts-list/app-posts-list.component */
      95847);
      /* harmony import */


      var _components_app_post_app_post_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./components/app-post/app-post.component */
      10546);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      37716);

      var _AppModule = function _AppModule() {
        _classCallCheck(this, _AppModule);
      };

      _AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || _AppModule)();
      };

      _AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: _AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent]
      });
      _AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[_app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule, blog__WEBPACK_IMPORTED_MODULE_8__.BlogModule.forRoot(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.services), bookmarks__WEBPACK_IMPORTED_MODULE_9__.BookmarksModule.forRoot(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.services), followers__WEBPACK_IMPORTED_MODULE_10__.FollowersModule.forRoot(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.services), stats__WEBPACK_IMPORTED_MODULE_11__.StatsModule.forRoot(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.services), userprofile__WEBPACK_IMPORTED_MODULE_12__.UserProfileModule.forRoot(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.services), utils__WEBPACK_IMPORTED_MODULE_13__.UtilsModule, ngx_markdown__WEBPACK_IMPORTED_MODULE_14__.MarkdownModule.forRoot(), auth_oidc__WEBPACK_IMPORTED_MODULE_15__.OidcAuthModule.forRoot(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.oidc), _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__.BrowserAnimationsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](_AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent, _components_app_posts_list_app_posts_list_component__WEBPACK_IMPORTED_MODULE_3__.AppPostsListComponent, _components_app_post_app_post_component__WEBPACK_IMPORTED_MODULE_4__.AppPostComponent],
          imports: [_app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule, blog__WEBPACK_IMPORTED_MODULE_8__.BlogModule, bookmarks__WEBPACK_IMPORTED_MODULE_9__.BookmarksModule, followers__WEBPACK_IMPORTED_MODULE_10__.FollowersModule, stats__WEBPACK_IMPORTED_MODULE_11__.StatsModule, userprofile__WEBPACK_IMPORTED_MODULE_12__.UserProfileModule, utils__WEBPACK_IMPORTED_MODULE_13__.UtilsModule, ngx_markdown__WEBPACK_IMPORTED_MODULE_14__.MarkdownModule, auth_oidc__WEBPACK_IMPORTED_MODULE_15__.OidcAuthModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__.BrowserAnimationsModule]
        });
      })();
      /***/

    },

    /***/
    10546:
    /*!***********************************************************!*\
      !*** ./src/app/components/app-post/app-post.component.ts ***!
      \***********************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppPostComponent": function AppPostComponent() {
          return (
            /* binding */
            _AppPostComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var blog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! blog */
      84652);
      /* harmony import */


      var userprofile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! userprofile */
      56643);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! auth-oidc */
      28246);
      /* harmony import */


      var bookmarks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! bookmarks */
      22125);
      /* harmony import */


      var utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! utils */
      84739);

      function AppPostComponent_ng_template_1_bookmark_badge_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "bookmark-badge", 11);
        }

        if (rf & 2) {
          var item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("url", item_r4.permalink)("caption", item_r4.title);
        }
      }

      function AppPostComponent_ng_template_1_div_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppPostComponent_ng_template_1_div_11_Template_a_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            var item_r4 = ctx_r11.$implicit;
            var parent_r5 = ctx_r11.list;
            return parent_r5.selectItem(item_r4, "edit");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppPostComponent_ng_template_1_div_12_Template(rf, ctx) {
        if (rf & 1) {
          var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppPostComponent_ng_template_1_div_12_Template_a_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            var item_r4 = ctx_r14.$implicit;
            var parent_r5 = ctx_r14.list;
            return parent_r5.selectItem(item_r4, "delete");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Delete");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppPostComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "user-profile-badge", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "prettyDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, AppPostComponent_ng_template_1_bookmark_badge_10_Template, 1, 2, "bookmark-badge", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, AppPostComponent_ng_template_1_div_11_Template, 3, 0, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, AppPostComponent_ng_template_1_div_12_Template, 3, 0, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "hr", 10);
        }

        if (rf & 2) {
          var item_r4 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r4.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("userid", item_r4.owner);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" posted ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 6, item_r4.createdOn), ". ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireOwner", item_r4.owner);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireOwner", item_r4.owner);
        }
      }

      function AppPostComponent_ng_template_3_Template(rf, ctx) {}

      var _AppPostComponent = /*#__PURE__*/function () {
        function _AppPostComponent() {
          _classCallCheck(this, _AppPostComponent);
        }

        _createClass(_AppPostComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _AppPostComponent;
      }();

      _AppPostComponent.ɵfac = function AppPostComponent_Factory(t) {
        return new (t || _AppPostComponent)();
      };

      _AppPostComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _AppPostComponent,
        selectors: [["app-app-post"]],
        decls: 5,
        vars: 2,
        consts: [[3, "headerTemplate", "footerTemplate"], ["header", ""], ["footer", ""], [1, "d-flex", "justify-content-between"], [1, "blog-post-list-post-title"], [1, "created"], [3, "userid"], [1, "ml-1"], [3, "url", "caption", 4, "authRequireLogin"], ["class", "ml-1", 4, "authRequireOwner"], [1, "my-4"], [3, "url", "caption"], ["role", "button", 1, "btn", "btn-success", 3, "click"]],
        template: function AppPostComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "blog-post", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppPostComponent_ng_template_1_Template, 14, 8, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AppPostComponent_ng_template_3_Template, 0, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTemplate", _r0)("footerTemplate", _r2);
          }
        },
        directives: [blog__WEBPACK_IMPORTED_MODULE_1__.BlogPostComponent, userprofile__WEBPACK_IMPORTED_MODULE_2__.UserProfileBadgeComponent, auth_oidc__WEBPACK_IMPORTED_MODULE_3__.RequireLoginDirective, auth_oidc__WEBPACK_IMPORTED_MODULE_3__.RequireOwnerDirective, bookmarks__WEBPACK_IMPORTED_MODULE_4__.BookmarkBadgeComponent],
        pipes: [utils__WEBPACK_IMPORTED_MODULE_5__.PrettyDatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAtcG9zdC5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    95847:
    /*!***********************************************************************!*\
      !*** ./src/app/components/app-posts-list/app-posts-list.component.ts ***!
      \***********************************************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppPostsListComponent": function AppPostsListComponent() {
          return (
            /* binding */
            _AppPostsListComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var blog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! blog */
      84652);
      /* harmony import */


      var userprofile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! userprofile */
      56643);
      /* harmony import */


      var auth_oidc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! auth-oidc */
      28246);
      /* harmony import */


      var followers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! followers */
      46620);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! utils */
      84739);

      function AppPostsListComponent_ng_template_1_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "followed-by-badge", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "following-badge", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("userid", item_r4.owner);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("userid", item_r4.owner);
        }
      }

      function AppPostsListComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppPostsListComponent_ng_template_1_Template_a_click_1_listener() {
            var item_r4 = ctx.$implicit;
            var parent_r5 = ctx.list;
            return parent_r5.selectItem(item_r4, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "user-profile-badge", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, AppPostsListComponent_ng_template_1_span_5_Template, 3, 2, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "prettyDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "blog-topic-list-view", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppPostsListComponent_ng_template_1_Template_button_click_12_listener() {
            var item_r4 = ctx.$implicit;
            var parent_r5 = ctx.list;
            return parent_r5.selectItem(item_r4, "select");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Read More...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "hr", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r4 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r4.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("userid", item_r4.owner);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireLogin", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" posted ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 6, item_r4.createdOn), ". ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r4.text, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("topics", item_r4.topics);
        }
      }

      var _c0 = function _c0() {
        return ["/posts", "new"];
      };

      function AppPostsListComponent_ng_template_3_a_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "New Topic");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
        }
      }

      function AppPostsListComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h5");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "RECENT POSTS");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "New Post");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, AppPostsListComponent_ng_template_3_a_7_Template, 2, 2, "a", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "hr", 11);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("authRequireRole", "admin");
        }
      }

      var _AppPostsListComponent = /*#__PURE__*/function () {
        function _AppPostsListComponent() {
          _classCallCheck(this, _AppPostsListComponent);
        }

        _createClass(_AppPostsListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _AppPostsListComponent;
      }();

      _AppPostsListComponent.ɵfac = function AppPostsListComponent_Factory(t) {
        return new (t || _AppPostsListComponent)();
      };

      _AppPostsListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _AppPostsListComponent,
        selectors: [["app-posts-list"]],
        decls: 5,
        vars: 2,
        consts: [[3, "headerTemplate", "itemTemplate"], ["thisItemTemplate", ""], ["header", ""], [1, "p-1"], [1, "posttitle", 3, "click"], [1, "created"], [3, "userid"], [4, "authRequireLogin"], [1, "posttext"], [3, "topics"], [1, "btn", "btn-success", 3, "click"], [1, "my-4"], [1, "d-flex", "justify-content-between"], ["role", "button", 1, "btn", "btn-success", "mx-1", 3, "routerLink"], ["class", "btn btn-success mx-1", "role", "button", 3, "routerLink", 4, "authRequireRole"]],
        template: function AppPostsListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "blog-post-list", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppPostsListComponent_ng_template_1_Template, 15, 8, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AppPostsListComponent_ng_template_3_Template, 9, 3, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);

            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTemplate", _r2)("itemTemplate", _r0);
          }
        },
        directives: [blog__WEBPACK_IMPORTED_MODULE_1__.BlogPostListComponent, userprofile__WEBPACK_IMPORTED_MODULE_2__.UserProfileBadgeComponent, auth_oidc__WEBPACK_IMPORTED_MODULE_3__.RequireLoginDirective, blog__WEBPACK_IMPORTED_MODULE_1__.TopicListViewComponent, followers__WEBPACK_IMPORTED_MODULE_4__.FollowedByBadgeComponent, followers__WEBPACK_IMPORTED_MODULE_4__.FollowingBadgeComponent, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkWithHref, auth_oidc__WEBPACK_IMPORTED_MODULE_3__.RequireRoleDirective],
        pipes: [utils__WEBPACK_IMPORTED_MODULE_6__.PrettyDatePipe],
        styles: [".posttitle[_ngcontent-%COMP%] {\n  font-size: 2em;\n  font-weight: bold;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC1wb3N0cy1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksY0FBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQUFKIiwiZmlsZSI6ImFwcC1wb3N0cy1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ucG9zdHRpdGxlIHtcbiAgICBmb250LXNpemU6IDJlbTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG4iXX0= */"]
      });
      /***/
    },

    /***/
    92340:
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "environment": function environment() {
          return (
            /* binding */
            _environment
          );
        }
        /* harmony export */

      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var _environment = {
        production: false,
        oidc: {
          clientId: 'zabardast-public-client',
          filterProtocolClaims: true,
          issuer: 'http://localhost:8080/auth/realms/zabardast',
          loadUserInfo: true,
          redirectUri: 'http://localhost:4200/oidc-auth/login-callback',
          postLogoutRedirectUri: 'http://localhost:4200/oidc-auth/logout-callback',
          responseType: 'code',
          scope: 'openid profile address email phone offline_access' // remove the underscore to mock a login
          // mock: {
          //   acr: "0",
          //   azp: "zabardast-public-client",
          //   email_verified: true,
          //   family_name: "Mock",
          //   given_name: "Zabardast",
          //   jti: "a7caef5e-b2c8-4694-a9ca-2113429604ff",
          //   name: "Zabardast Mock",
          //   preferred_username: "zabardast",
          //   roles: ["offline_access", "uma_authorization", "user"],
          //   sub: "e7deac8e-56b7-4741-a119-757bbb00b999",
          //   typ: "ID",
          // }

        },
        services: {
          posts: {
            serviceBaseUrl: "http://localhost:9081/api/v1",
            defaultEndpoint: "posts",
            pageSize: 10,
            maxTitleLength: 256,
            maxContentLength: 4096
          },
          comments: {
            serviceBaseUrl: "http://localhost:9081/api/v1",
            defaultEndpoint: "posts",
            pageSize: 25,
            maxContentLength: 1024
          },
          topics: {
            serviceBaseUrl: "http://localhost:9081/api/v1",
            defaultEndpoint: "topics",
            pageSize: 25
          },
          bookmarks: {
            serviceBaseUrl: "http://localhost:9080/api/v1",
            defaultEndpoint: "bookmarks",
            pageSize: 25
          },
          userProfiles: {
            serviceBaseUrl: "http://localhost:9082/api/v1",
            defaultEndpoint: "users",
            pageSize: 10
          },
          followers: {
            serviceBaseUrl: "http://localhost:9083/api/v1",
            defaultEndpoint: "users",
            pageSize: 10
          },
          counters: {
            serviceBaseUrl: "http://localhost:9084/api/v1",
            defaultEndpoint: "stats/counters"
          }
        }
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    14431:
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /***/
    function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      39075);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app/app.module */
      36747);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      92340);

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
        (0, _angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    46700:
    /*!***************************************************!*\
      !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
      \***************************************************/

    /***/
    function _(module, __unused_webpack_exports, __webpack_require__) {
      var map = {
        "./af": 26431,
        "./af.js": 26431,
        "./ar": 81286,
        "./ar-dz": 1616,
        "./ar-dz.js": 1616,
        "./ar-kw": 9759,
        "./ar-kw.js": 9759,
        "./ar-ly": 43160,
        "./ar-ly.js": 43160,
        "./ar-ma": 62551,
        "./ar-ma.js": 62551,
        "./ar-sa": 79989,
        "./ar-sa.js": 79989,
        "./ar-tn": 6962,
        "./ar-tn.js": 6962,
        "./ar.js": 81286,
        "./az": 15887,
        "./az.js": 15887,
        "./be": 14572,
        "./be.js": 14572,
        "./bg": 3276,
        "./bg.js": 3276,
        "./bm": 93344,
        "./bm.js": 93344,
        "./bn": 58985,
        "./bn-bd": 83990,
        "./bn-bd.js": 83990,
        "./bn.js": 58985,
        "./bo": 94391,
        "./bo.js": 94391,
        "./br": 46728,
        "./br.js": 46728,
        "./bs": 5536,
        "./bs.js": 5536,
        "./ca": 41043,
        "./ca.js": 41043,
        "./cs": 70420,
        "./cs.js": 70420,
        "./cv": 33513,
        "./cv.js": 33513,
        "./cy": 6771,
        "./cy.js": 6771,
        "./da": 47978,
        "./da.js": 47978,
        "./de": 46061,
        "./de-at": 25204,
        "./de-at.js": 25204,
        "./de-ch": 2653,
        "./de-ch.js": 2653,
        "./de.js": 46061,
        "./dv": 85,
        "./dv.js": 85,
        "./el": 8579,
        "./el.js": 8579,
        "./en-au": 25724,
        "./en-au.js": 25724,
        "./en-ca": 10525,
        "./en-ca.js": 10525,
        "./en-gb": 52847,
        "./en-gb.js": 52847,
        "./en-ie": 67216,
        "./en-ie.js": 67216,
        "./en-il": 39305,
        "./en-il.js": 39305,
        "./en-in": 73364,
        "./en-in.js": 73364,
        "./en-nz": 79130,
        "./en-nz.js": 79130,
        "./en-sg": 11161,
        "./en-sg.js": 11161,
        "./eo": 50802,
        "./eo.js": 50802,
        "./es": 40328,
        "./es-do": 45551,
        "./es-do.js": 45551,
        "./es-mx": 75615,
        "./es-mx.js": 75615,
        "./es-us": 64790,
        "./es-us.js": 64790,
        "./es.js": 40328,
        "./et": 96389,
        "./et.js": 96389,
        "./eu": 52961,
        "./eu.js": 52961,
        "./fa": 26151,
        "./fa.js": 26151,
        "./fi": 7997,
        "./fi.js": 7997,
        "./fil": 58898,
        "./fil.js": 58898,
        "./fo": 37779,
        "./fo.js": 37779,
        "./fr": 28174,
        "./fr-ca": 3287,
        "./fr-ca.js": 3287,
        "./fr-ch": 38867,
        "./fr-ch.js": 38867,
        "./fr.js": 28174,
        "./fy": 50452,
        "./fy.js": 50452,
        "./ga": 45014,
        "./ga.js": 45014,
        "./gd": 74127,
        "./gd.js": 74127,
        "./gl": 72124,
        "./gl.js": 72124,
        "./gom-deva": 6444,
        "./gom-deva.js": 6444,
        "./gom-latn": 37953,
        "./gom-latn.js": 37953,
        "./gu": 76604,
        "./gu.js": 76604,
        "./he": 1222,
        "./he.js": 1222,
        "./hi": 74235,
        "./hi.js": 74235,
        "./hr": 622,
        "./hr.js": 622,
        "./hu": 37735,
        "./hu.js": 37735,
        "./hy-am": 90402,
        "./hy-am.js": 90402,
        "./id": 59187,
        "./id.js": 59187,
        "./is": 30536,
        "./is.js": 30536,
        "./it": 35007,
        "./it-ch": 94667,
        "./it-ch.js": 94667,
        "./it.js": 35007,
        "./ja": 62093,
        "./ja.js": 62093,
        "./jv": 80059,
        "./jv.js": 80059,
        "./ka": 66870,
        "./ka.js": 66870,
        "./kk": 80880,
        "./kk.js": 80880,
        "./km": 1083,
        "./km.js": 1083,
        "./kn": 68785,
        "./kn.js": 68785,
        "./ko": 21721,
        "./ko.js": 21721,
        "./ku": 37851,
        "./ku.js": 37851,
        "./ky": 1727,
        "./ky.js": 1727,
        "./lb": 40346,
        "./lb.js": 40346,
        "./lo": 93002,
        "./lo.js": 93002,
        "./lt": 64035,
        "./lt.js": 64035,
        "./lv": 56927,
        "./lv.js": 56927,
        "./me": 5634,
        "./me.js": 5634,
        "./mi": 94173,
        "./mi.js": 94173,
        "./mk": 86320,
        "./mk.js": 86320,
        "./ml": 11705,
        "./ml.js": 11705,
        "./mn": 31062,
        "./mn.js": 31062,
        "./mr": 92805,
        "./mr.js": 92805,
        "./ms": 11341,
        "./ms-my": 59900,
        "./ms-my.js": 59900,
        "./ms.js": 11341,
        "./mt": 37734,
        "./mt.js": 37734,
        "./my": 19034,
        "./my.js": 19034,
        "./nb": 9324,
        "./nb.js": 9324,
        "./ne": 46495,
        "./ne.js": 46495,
        "./nl": 70673,
        "./nl-be": 76272,
        "./nl-be.js": 76272,
        "./nl.js": 70673,
        "./nn": 72486,
        "./nn.js": 72486,
        "./oc-lnc": 46219,
        "./oc-lnc.js": 46219,
        "./pa-in": 2829,
        "./pa-in.js": 2829,
        "./pl": 78444,
        "./pl.js": 78444,
        "./pt": 53170,
        "./pt-br": 66117,
        "./pt-br.js": 66117,
        "./pt.js": 53170,
        "./ro": 96587,
        "./ro.js": 96587,
        "./ru": 39264,
        "./ru.js": 39264,
        "./sd": 42135,
        "./sd.js": 42135,
        "./se": 95366,
        "./se.js": 95366,
        "./si": 93379,
        "./si.js": 93379,
        "./sk": 46143,
        "./sk.js": 46143,
        "./sl": 196,
        "./sl.js": 196,
        "./sq": 21082,
        "./sq.js": 21082,
        "./sr": 91621,
        "./sr-cyrl": 98963,
        "./sr-cyrl.js": 98963,
        "./sr.js": 91621,
        "./ss": 41404,
        "./ss.js": 41404,
        "./sv": 55685,
        "./sv.js": 55685,
        "./sw": 3872,
        "./sw.js": 3872,
        "./ta": 54106,
        "./ta.js": 54106,
        "./te": 39204,
        "./te.js": 39204,
        "./tet": 83692,
        "./tet.js": 83692,
        "./tg": 86361,
        "./tg.js": 86361,
        "./th": 31735,
        "./th.js": 31735,
        "./tk": 1568,
        "./tk.js": 1568,
        "./tl-ph": 96129,
        "./tl-ph.js": 96129,
        "./tlh": 13759,
        "./tlh.js": 13759,
        "./tr": 81644,
        "./tr.js": 81644,
        "./tzl": 90875,
        "./tzl.js": 90875,
        "./tzm": 16878,
        "./tzm-latn": 11041,
        "./tzm-latn.js": 11041,
        "./tzm.js": 16878,
        "./ug-cn": 74357,
        "./ug-cn.js": 74357,
        "./uk": 74810,
        "./uk.js": 74810,
        "./ur": 86794,
        "./ur.js": 86794,
        "./uz": 28966,
        "./uz-latn": 77959,
        "./uz-latn.js": 77959,
        "./uz.js": 28966,
        "./vi": 35386,
        "./vi.js": 35386,
        "./x-pseudo": 23156,
        "./x-pseudo.js": 23156,
        "./yo": 68028,
        "./yo.js": 68028,
        "./zh-cn": 9330,
        "./zh-cn.js": 9330,
        "./zh-hk": 89380,
        "./zh-hk.js": 89380,
        "./zh-mo": 60874,
        "./zh-mo.js": 60874,
        "./zh-tw": 96508,
        "./zh-tw.js": 96508
      };

      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }

      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }

        return map[req];
      }

      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };

      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = 46700;
      /***/
    }
  },
  /******/
  function (__webpack_require__) {
    // webpackRuntimeModules

    /******/
    "use strict";
    /******/

    /******/

    var __webpack_exec__ = function __webpack_exec__(moduleId) {
      return __webpack_require__(__webpack_require__.s = moduleId);
    };
    /******/


    __webpack_require__.O(0, [736], function () {
      return __webpack_exec__(14431);
    });
    /******/


    var __webpack_exports__ = __webpack_require__.O();
    /******/

  }]);
})();
//# sourceMappingURL=main-es5.js.map