(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('auth-oidc'), require('@angular/common/http'), require('utils'), require('@angular/router'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('followers', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', 'auth-oidc', '@angular/common/http', 'utils', '@angular/router', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.followers = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.i2, global.ng.common.http, global.i3, global.ng.router, global.ng.common));
}(this, (function (exports, i0, rxjs, operators, i2, i2$1, i3, i2$2, i1) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace$2 = /*#__PURE__*/_interopNamespace(i2$2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var FollowingServiceConfigToken = new i0.InjectionToken("FollowingServiceConfig");
    var FollowersModuleConfigToken = new i0.InjectionToken("FollowersModuleConfig");

    /*
     * Public API Surface of bookmarks
     */

    /*
     * Public API Surface of bookmarks
     */

    ;
    var FollowingService = /** @class */ (function () {
        function FollowingService(config, authService, httpClient) {
            var _this = this;
            this.config = config;
            this.authService = authService;
            this.httpClient = httpClient;
            this.onChange = new rxjs.Subject();
            this.authService.userSubject.subscribe(function (profile) {
                _this.userProfile = profile;
            });
        }
        FollowingService.prototype.followedByOne = function (endpoint, userId, followedById) {
            var _a;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            console.info("followed-by : " + followedById);
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + owner + "/followedBy/" + followedById)
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        FollowingService.prototype.followedBy = function (endpoint, userId, pageable) {
            var _a;
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + owner + "/followedBy", {
                params: {
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "followedByName,asc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        FollowingService.prototype.findFollowedByMatching = function (endpoint, userId, name, pageable) {
            var _a;
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            var query = {
                "conditions": [
                    { "attribute": "followedByName.fullName", "operator": "like", "value": "%" + name + "%" }
                ]
            };
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + owner + "/followedBy/search", {
                "params": {
                    "q": JSON.stringify(query),
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "followedByName,asc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        FollowingService.prototype.followingOne = function (endpoint, userId, followedById) {
            var _a;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + owner + "/following/" + followedById)
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        FollowingService.prototype.following = function (endpoint, userId, pageable) {
            var _a;
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + owner + "/following", {
                params: {
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "userName,asc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        FollowingService.prototype.findFollowingMatching = function (endpoint, userId, name, pageable) {
            var _a;
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            var query = {
                "conditions": [
                    { "attribute": "userName.fullName", "operator": "like", "value": "%" + name + "%" }
                ]
            };
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + owner + "/following/search", {
                "params": {
                    "q": JSON.stringify(query),
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "userName,asc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        FollowingService.prototype.follow = function (endpoint, followReq) {
            var _this = this;
            var _a, _b;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            followReq.followedById = !!followReq.followedById ? followReq.followedById : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            followReq.followedByName = !!followReq.followedByName ? followReq.followedByName : (_b = this.userProfile) === null || _b === void 0 ? void 0 : _b.name;
            var owner = followReq.followedById;
            return this.httpClient
                .put(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + owner + "/following", followReq)
                .pipe(operators.catchError(function (error) {
                return rxjs.throwError(new Error(error.status));
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        FollowingService.prototype.unfollow = function (endpoint, userId, userToUnfollow) {
            var _this = this;
            var _a;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
            return this.httpClient
                .delete(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + owner + "/following/" + userToUnfollow)
                .pipe(operators.catchError(function (error) {
                return rxjs.throwError(new Error(error.status));
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        return FollowingService;
    }());
    FollowingService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingService, deps: [{ token: FollowingServiceConfigToken }, { token: i2__namespace.OidcAuthService }, { token: i2__namespace$1.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    FollowingService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [FollowingServiceConfigToken]
                        }] }, { type: i2__namespace.OidcAuthService }, { type: i2__namespace$1.HttpClient }];
        } });

    var FollowedByBadgeComponent = /** @class */ (function () {
        function FollowedByBadgeComponent(service, authService) {
            var _this = this;
            this.service = service;
            this.authService = authService;
            this.userId = "";
            this.loading = false;
            this.authService.userSubject.subscribe(function (profile) {
                _this.checkStatus();
            });
        }
        FollowedByBadgeComponent.prototype.ngOnInit = function () { };
        Object.defineProperty(FollowedByBadgeComponent.prototype, "isActive", {
            get: function () {
                var _a;
                return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.userId) != undefined;
            },
            enumerable: false,
            configurable: true
        });
        FollowedByBadgeComponent.prototype.checkStatus = function () {
            var _this = this;
            this.service.followedByOne("", "", this.userId).subscribe({
                next: function (result) {
                    _this.item = result;
                    _this.loading = false;
                    console.log(result);
                },
                error: function (err) {
                    _this.loading = false;
                    console.log(err.message);
                }
            });
        };
        return FollowedByBadgeComponent;
    }());
    FollowedByBadgeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowedByBadgeComponent, deps: [{ token: FollowingService }, { token: i2__namespace.OidcAuthService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FollowedByBadgeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowedByBadgeComponent, selector: "followed-by-badge", inputs: { userId: ["userid", "userId"], activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0__namespace, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'FOLLOWS YOU'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\">\n</utils-badge>", styles: [""], components: [{ type: i3__namespace.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowedByBadgeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'followed-by-badge',
                        templateUrl: './followed-by-badge.component.html',
                        styleUrls: ['./followed-by-badge.component.css']
                    }]
            }], ctorParameters: function () { return [{ type: FollowingService }, { type: i2__namespace.OidcAuthService }]; }, propDecorators: { userId: [{
                    type: i0.Input,
                    args: ["userid"]
                }], activeControlTemplate: [{
                    type: i0.Input
                }], inactiveControlTemplate: [{
                    type: i0.Input
                }] } });

    var FollowersListViewComponent = /** @class */ (function () {
        function FollowersListViewComponent() {
            this.onSelectItem = new i0.EventEmitter();
        }
        FollowersListViewComponent.prototype.ngOnInit = function () { };
        FollowersListViewComponent.prototype.selectItem = function (item, opcode) {
            this.onSelectItem.emit({
                opcode: opcode,
                item: item
            });
        };
        return FollowersListViewComponent;
    }());
    FollowersListViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowersListViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    FollowersListViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowersListViewComponent, selector: "followed-by-list-view", inputs: { items: "items", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"items\">\n    <ul class=\"list-group checked-list-box\">\n        <li class=\"list-group-item\" *ngFor=\"let x of items; index as i\">\n            <ng-container \n                [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-container>\n<ng-container *ngIf=\"!items\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <span class=\"ml-2\" (click)=\"parent.selectItem(item, 'select')\">{{item.fullName}}</span>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    The list is empty at the moment!\n</ng-template>", styles: [""], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowersListViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'followed-by-list-view',
                        templateUrl: './followed-by-list-view.component.html',
                        styleUrls: ['./followed-by-list-view.component.css']
                    }]
            }], propDecorators: { items: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], onSelectItem: [{
                    type: i0.Output
                }] } });

    var FollowersListComponent = /** @class */ (function () {
        function FollowersListComponent(followersService, router, activatedRoute) {
            var _this = this;
            this.followersService = followersService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.enableSearch = false;
            this.filterText = '';
            this.onSelect = function (item) { };
            this.errorDesc = "";
            this.loading = false;
            this.subscription = new rxjs.Subscription();
            this.responseHandler = {
                next: function (result) {
                    _this.response = result;
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    console.log(_this.errorDesc);
                }
            };
            this.response = null;
            this.pageable = {
                page: 0
            };
        }
        FollowersListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
                _this.fetchPage(pageNum);
            });
            // Requery when the backend data changes
            this.subscription.add(this.followersService.onChange.subscribe({ next: function () { return _this.fetchPage(_this.pageable.page); } }));
        };
        FollowersListComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        FollowersListComponent.prototype.onApplyFilter = function (text) {
            this.filterText = text;
            this.fetchPage(0);
        };
        FollowersListComponent.prototype.fetchPage = function (pageNum) {
            this.pageable.page = pageNum;
            if (!!this.filterText) {
                this.followersService.findFollowedByMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
            }
            else {
                this.followersService.followedBy("", "", this.pageable).subscribe(this.responseHandler);
            }
        };
        Object.defineProperty(FollowersListComponent.prototype, "items", {
            get: function () {
                var _a, _b;
                return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.followedBy;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FollowersListComponent.prototype, "page", {
            get: function () {
                var _a;
                return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FollowersListComponent.prototype, "hasItems", {
            get: function () {
                var _a;
                return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
            },
            enumerable: false,
            configurable: true
        });
        FollowersListComponent.prototype.handleListViewEvent = function (evt) {
            switch (evt.opcode) {
                case 'select':
                    this.onSelect(evt.item);
                    break;
            }
        };
        FollowersListComponent.prototype.gotoPage = function (evt) {
            this.fetchPage(evt - 1);
        };
        return FollowersListComponent;
    }());
    FollowersListComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowersListComponent, deps: [{ token: FollowingService }, { token: i2__namespace$2.Router }, { token: i2__namespace$2.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FollowersListComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowersListComponent, selector: "followed-by-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <followed-by-list-view \n            [items]=\"items\" \n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </followed-by-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3__namespace.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: FollowersListViewComponent, selector: "followed-by-list-view", inputs: ["items", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3__namespace.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowersListComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'followed-by-list',
                        templateUrl: './followed-by-list.component.html',
                        styleUrls: ['./followed-by-list.component.css']
                    }]
            }], ctorParameters: function () { return [{ type: FollowingService }, { type: i2__namespace$2.Router }, { type: i2__namespace$2.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
                    type: i0.Input
                }], filterText: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], headerTemplate: [{
                    type: i0.Input
                }], footerTemplate: [{
                    type: i0.Input
                }], onSelect: [{
                    type: i0.Input,
                    args: ['onSelectBookmark']
                }] } });

    var FollowingBadgeComponent = /** @class */ (function () {
        function FollowingBadgeComponent(service, authService) {
            var _this = this;
            this.service = service;
            this.authService = authService;
            this.userId = "";
            this.userName = "";
            this.loading = false;
            this.authService.userSubject.subscribe(function (profile) {
                _this.checkStatus();
            });
        }
        FollowingBadgeComponent.prototype.ngOnInit = function () { };
        Object.defineProperty(FollowingBadgeComponent.prototype, "isActive", {
            get: function () {
                var _a;
                return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.userId) != undefined;
            },
            enumerable: false,
            configurable: true
        });
        FollowingBadgeComponent.prototype.checkStatus = function () {
            var _this = this;
            this.service.followingOne("", "", this.userId).subscribe({
                next: function (result) {
                    _this.item = result;
                    _this.loading = false;
                    console.log(result);
                },
                error: function (err) {
                    _this.loading = false;
                    console.log(err.message);
                }
            });
        };
        FollowingBadgeComponent.prototype.follow = function () {
            var request = {
                userId: this.userId,
                userName: this.userName,
                followedById: "",
                followedByName: ""
            };
            this.service.follow("", request).subscribe({
                error: function (err) {
                    console.log(err.message);
                }
            });
        };
        FollowingBadgeComponent.prototype.unfollow = function () {
            if (this.item)
                this.service.unfollow("", "", this.item.userId).subscribe({
                    next: function () { },
                    error: function (err) {
                        console.log(err.message);
                    }
                });
        };
        return FollowingBadgeComponent;
    }());
    FollowingBadgeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingBadgeComponent, deps: [{ token: FollowingService }, { token: i2__namespace.OidcAuthService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FollowingBadgeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowingBadgeComponent, selector: "following-badge", inputs: { userId: ["userid", "userId"], userName: "userName", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0__namespace, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'FOLLOWING'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\"\n    (onAdd)=\"follow()\"\n    (onRemove)=\"unfollow()\">\n</utils-badge>", styles: [""], components: [{ type: i3__namespace.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingBadgeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'following-badge',
                        templateUrl: './following-badge.component.html',
                        styleUrls: ['./following-badge.component.css']
                    }]
            }], ctorParameters: function () { return [{ type: FollowingService }, { type: i2__namespace.OidcAuthService }]; }, propDecorators: { userId: [{
                    type: i0.Input,
                    args: ["userid"]
                }], userName: [{
                    type: i0.Input
                }], activeControlTemplate: [{
                    type: i0.Input
                }], inactiveControlTemplate: [{
                    type: i0.Input
                }] } });

    var FollowingListViewComponent = /** @class */ (function () {
        function FollowingListViewComponent() {
            this.onSelectItem = new i0.EventEmitter();
        }
        FollowingListViewComponent.prototype.ngOnInit = function () { };
        FollowingListViewComponent.prototype.selectItem = function (item, opcode) {
            this.onSelectItem.emit({
                opcode: opcode,
                item: item
            });
        };
        return FollowingListViewComponent;
    }());
    FollowingListViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingListViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    FollowingListViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowingListViewComponent, selector: "following-list-view", inputs: { items: "items", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"items\">\n    <ul class=\"list-group checked-list-box\">\n        <li class=\"list-group-item\" *ngFor=\"let x of items; index as i\">\n            <ng-container \n                [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-container>\n<ng-container *ngIf=\"!items\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <span class=\"ml-2\" (click)=\"parent.selectItem(item, 'select')\">{{item.fullName}}</span>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    The list is empty at the moment!\n</ng-template>", styles: [""], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingListViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'following-list-view',
                        templateUrl: './following-list-view.component.html',
                        styleUrls: ['./following-list-view.component.css']
                    }]
            }], propDecorators: { items: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], onSelectItem: [{
                    type: i0.Output
                }] } });

    var FollowingListComponent = /** @class */ (function () {
        function FollowingListComponent(followersService, router, activatedRoute) {
            var _this = this;
            this.followersService = followersService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.enableSearch = false;
            this.filterText = '';
            this.onSelect = function (item) { };
            this.errorDesc = "";
            this.loading = false;
            this.subscription = new rxjs.Subscription();
            this.responseHandler = {
                next: function (result) {
                    _this.response = result;
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    console.log(_this.errorDesc);
                }
            };
            this.response = null;
            this.pageable = {
                page: 0
            };
        }
        FollowingListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
                _this.fetchPage(pageNum);
            });
            // Requery when the backend data changes
            this.subscription.add(this.followersService.onChange.subscribe({ next: function () { return _this.fetchPage(_this.pageable.page); } }));
        };
        FollowingListComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        FollowingListComponent.prototype.onApplyFilter = function (text) {
            this.filterText = text;
            this.fetchPage(0);
        };
        FollowingListComponent.prototype.fetchPage = function (pageNum) {
            this.pageable.page = pageNum;
            if (!!this.filterText) {
                this.followersService.findFollowingMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
            }
            else {
                this.followersService.following("", "", this.pageable).subscribe(this.responseHandler);
            }
        };
        Object.defineProperty(FollowingListComponent.prototype, "items", {
            get: function () {
                var _a, _b;
                return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.following;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FollowingListComponent.prototype, "page", {
            get: function () {
                var _a;
                return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FollowingListComponent.prototype, "hasItems", {
            get: function () {
                var _a;
                return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
            },
            enumerable: false,
            configurable: true
        });
        FollowingListComponent.prototype.handleListViewEvent = function (evt) {
            switch (evt.opcode) {
                case 'select':
                    this.onSelect(evt.item);
                    break;
            }
        };
        FollowingListComponent.prototype.gotoPage = function (evt) {
            this.fetchPage(evt - 1);
        };
        return FollowingListComponent;
    }());
    FollowingListComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingListComponent, deps: [{ token: FollowingService }, { token: i2__namespace$2.Router }, { token: i2__namespace$2.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FollowingListComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowingListComponent, selector: "following-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <following-list-view \n            [items]=\"items\" \n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </following-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3__namespace.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: FollowingListViewComponent, selector: "following-list-view", inputs: ["items", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3__namespace.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowingListComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'following-list',
                        templateUrl: './following-list.component.html',
                        styleUrls: ['./following-list.component.css']
                    }]
            }], ctorParameters: function () { return [{ type: FollowingService }, { type: i2__namespace$2.Router }, { type: i2__namespace$2.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
                    type: i0.Input
                }], filterText: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], headerTemplate: [{
                    type: i0.Input
                }], footerTemplate: [{
                    type: i0.Input
                }], onSelect: [{
                    type: i0.Input,
                    args: ['onSelectBookmark']
                }] } });

    /*
     * Public API Surface of bookmarks
     */

    /*
     * Public API Surface of bookmarks
     */

    var FollowersModule = /** @class */ (function () {
        function FollowersModule() {
        }
        FollowersModule.forRoot = function (config) {
            return {
                ngModule: FollowersModule,
                providers: [
                    FollowingService,
                    {
                        provide: FollowingServiceConfigToken,
                        useValue: config.followers
                    }
                ]
            };
        };
        return FollowersModule;
    }());
    FollowersModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowersModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    FollowersModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowersModule, declarations: [FollowersListViewComponent,
            FollowersListComponent,
            FollowingListViewComponent,
            FollowingListComponent,
            FollowedByBadgeComponent,
            FollowingBadgeComponent], imports: [i1.CommonModule, i2__namespace.OidcAuthModule, i3.UtilsModule], exports: [FollowersListViewComponent,
            FollowersListComponent,
            FollowingListViewComponent,
            FollowingListComponent,
            FollowedByBadgeComponent,
            FollowingBadgeComponent] });
    FollowersModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowersModule, imports: [[
                i1.CommonModule,
                i2.OidcAuthModule.forChild(),
                i3.UtilsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: FollowersModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            FollowersListViewComponent,
                            FollowersListComponent,
                            FollowingListViewComponent,
                            FollowingListComponent,
                            FollowedByBadgeComponent,
                            FollowingBadgeComponent,
                        ],
                        imports: [
                            i1.CommonModule,
                            i2.OidcAuthModule.forChild(),
                            i3.UtilsModule
                        ],
                        exports: [
                            FollowersListViewComponent,
                            FollowersListComponent,
                            FollowingListViewComponent,
                            FollowingListComponent,
                            FollowedByBadgeComponent,
                            FollowingBadgeComponent,
                        ]
                    }]
            }] });

    /*
     * Public API Surface of followers
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FollowedByBadgeComponent = FollowedByBadgeComponent;
    exports.FollowersListComponent = FollowersListComponent;
    exports.FollowersListViewComponent = FollowersListViewComponent;
    exports.FollowersModule = FollowersModule;
    exports.FollowersModuleConfigToken = FollowersModuleConfigToken;
    exports.FollowingBadgeComponent = FollowingBadgeComponent;
    exports.FollowingListComponent = FollowingListComponent;
    exports.FollowingListViewComponent = FollowingListViewComponent;
    exports.FollowingService = FollowingService;
    exports.FollowingServiceConfigToken = FollowingServiceConfigToken;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=followers.umd.js.map
