(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/router'), require('utils'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('userprofile', ['exports', '@angular/core', 'rxjs/operators', '@angular/common/http', '@angular/router', 'utils', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.userprofile = {}, global.ng.core, global.rxjs.operators, global.ng.common.http, global.ng.router, global.i3, global.ng.common));
}(this, (function (exports, i0, operators, i1, i2, i3, i1$1) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

    var UserProfileServiceConfigToken = new i0.InjectionToken("UserProfileServiceConfig");
    var UserProfileModuleConfigToken = new i0.InjectionToken("UserProfileModuleConfig");

    /*
     * Public API Surface of bookmarks
     */

    var UserProfileService = /** @class */ (function () {
        function UserProfileService(config, httpClient) {
            this.config = config;
            this.httpClient = httpClient;
        }
        UserProfileService.prototype.one = function (endpoint, id) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id)
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        return UserProfileService;
    }());
    UserProfileService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileService, deps: [{ token: UserProfileServiceConfigToken }, { token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    UserProfileService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [UserProfileServiceConfigToken]
                        }] }, { type: i1__namespace.HttpClient }];
        } });

    var UserProfileBadgeViewComponent = /** @class */ (function () {
        function UserProfileBadgeViewComponent() {
            this.onSelectItem = new i0.EventEmitter();
        }
        UserProfileBadgeViewComponent.prototype.ngOnInit = function () { };
        Object.defineProperty(UserProfileBadgeViewComponent.prototype, "userId", {
            get: function () {
                return this.userProfile.id;
            },
            enumerable: false,
            configurable: true
        });
        UserProfileBadgeViewComponent.prototype.selectItem = function (item, opcode) {
            this.onSelectItem.emit({
                opcode: opcode,
                item: item
            });
        };
        return UserProfileBadgeViewComponent;
    }());
    UserProfileBadgeViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileBadgeViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    UserProfileBadgeViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: UserProfileBadgeViewComponent, selector: "user-profile-badge-view", inputs: { userProfile: "userProfile", contentTemplate: "contentTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0__namespace, template: "<ng-container \n  [ngTemplateOutlet]=\"contentTemplate || defaultContentTemplate\"\n  [ngTemplateOutletContext]=\"{ $implicit: userProfile, list: this }\" \n  *ngIf=\"userProfile\">\n</ng-container>\n\n<ng-template #defaultContentTemplate let-item let-parent=\"list\">\n  <span (click)=\"parent.selectItem(item, 'select')\" class=\"fullname\">{{item.firstName}} {{item.lastName}}</span>\n</ng-template>\n", styles: [".fullname{font-weight:700}"], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileBadgeViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'user-profile-badge-view',
                        templateUrl: './user-profile-badge-view.component.html',
                        styleUrls: ['./user-profile-badge-view.component.css']
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { userProfile: [{
                    type: i0.Input
                }], contentTemplate: [{
                    type: i0.Input
                }], onSelectItem: [{
                    type: i0.Output
                }] } });

    var UserProfileBadgeComponent = /** @class */ (function () {
        function UserProfileBadgeComponent(userProfileService, router, activatedRoute) {
            this.userProfileService = userProfileService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.onSelect = function (item) { };
            this.errorDesc = "";
            this.loading = false;
            this.response = null;
        }
        UserProfileBadgeComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                _this.userId = (_a = params.userId) !== null && _a !== void 0 ? _a : _this.paramUserId;
                _this.fetchUserProfile(_this.userId);
            });
        };
        UserProfileBadgeComponent.prototype.fetchUserProfile = function (userId) {
            var _this = this;
            this.userId = userId;
            this.loading = true;
            this.userProfileService.one("", this.userId)
                .subscribe({
                next: function (result) {
                    _this.response = result;
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    console.log(_this.errorDesc);
                }
            });
        };
        Object.defineProperty(UserProfileBadgeComponent.prototype, "userProfileItem", {
            get: function () {
                return this.response;
            },
            enumerable: false,
            configurable: true
        });
        UserProfileBadgeComponent.prototype.handleViewEvent = function (evt) {
            switch (evt.opcode) {
                case 'select':
                    this.onSelect(evt.item);
                    break;
            }
        };
        return UserProfileBadgeComponent;
    }());
    UserProfileBadgeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileBadgeComponent, deps: [{ token: UserProfileService }, { token: i2__namespace.Router }, { token: i2__namespace.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    UserProfileBadgeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: UserProfileBadgeComponent, selector: "user-profile-badge", inputs: { paramUserId: ["userid", "paramUserId"], contentTemplate: "contentTemplate", onSelect: "onSelect" }, ngImport: i0__namespace, template: "<utils-loader *ngIf=\"loading; else contents\"></utils-loader>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc; else viewer\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #viewer>\n    <user-profile-badge-view\n        [userProfile]=\"userProfileItem\" \n        [contentTemplate]=\"contentTemplate\"\n        (onSelectItem)=\"handleViewEvent($event)\">\n    </user-profile-badge-view>\n</ng-template>", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: UserProfileBadgeViewComponent, selector: "user-profile-badge-view", inputs: ["userProfile", "contentTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileBadgeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'user-profile-badge',
                        templateUrl: './user-profile-badge.component.html',
                        styleUrls: ['./user-profile-badge.component.css']
                    }]
            }], ctorParameters: function () { return [{ type: UserProfileService }, { type: i2__namespace.Router }, { type: i2__namespace.ActivatedRoute }]; }, propDecorators: { paramUserId: [{
                    type: i0.Input,
                    args: ["userid"]
                }], contentTemplate: [{
                    type: i0.Input
                }], onSelect: [{
                    type: i0.Input
                }] } });

    /*
     * Public API Surface of user-profile
     */

    /*
     * Public API Surface of user-profile
     */

    /*
     * Public API Surface of user-profile
     */

    var UserProfileModule = /** @class */ (function () {
        function UserProfileModule() {
        }
        UserProfileModule.forRoot = function (config) {
            return {
                ngModule: UserProfileModule,
                providers: [
                    UserProfileService,
                    {
                        provide: UserProfileServiceConfigToken,
                        useValue: config.userProfiles
                    }
                ]
            };
        };
        return UserProfileModule;
    }());
    UserProfileModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    UserProfileModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileModule, declarations: [UserProfileBadgeViewComponent,
            UserProfileBadgeComponent], imports: [i1$1.CommonModule,
            i3.UtilsModule], exports: [UserProfileBadgeViewComponent,
            UserProfileBadgeComponent] });
    UserProfileModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileModule, imports: [[
                i1$1.CommonModule,
                i3.UtilsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: UserProfileModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            UserProfileBadgeViewComponent,
                            UserProfileBadgeComponent
                        ],
                        imports: [
                            i1$1.CommonModule,
                            i3.UtilsModule
                        ],
                        exports: [
                            UserProfileBadgeViewComponent,
                            UserProfileBadgeComponent
                        ]
                    }]
            }] });

    /*
     * Public API Surface of userprofile
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.UserProfileBadgeComponent = UserProfileBadgeComponent;
    exports.UserProfileBadgeViewComponent = UserProfileBadgeViewComponent;
    exports.UserProfileModule = UserProfileModule;
    exports.UserProfileModuleConfigToken = UserProfileModuleConfigToken;
    exports.UserProfileService = UserProfileService;
    exports.UserProfileServiceConfigToken = UserProfileServiceConfigToken;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=userprofile.umd.js.map
