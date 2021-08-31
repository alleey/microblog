(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/router'), require('utils'), require('@angular/common'), require('auth-oidc')) :
    typeof define === 'function' && define.amd ? define('bookmarks', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common/http', '@angular/router', 'utils', '@angular/common', 'auth-oidc'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bookmarks = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common.http, global.ng.router, global.i3, global.ng.common, global.i1$2));
}(this, (function (exports, i0, rxjs, operators, i1, i2, i3, i1$1, i1$2) { 'use strict';

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
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);

    var BookmarksServiceConfigToken = new i0.InjectionToken("BookmarksServiceConfig");
    var BookmarksModuleConfigToken = new i0.InjectionToken("BookmarksModuleConfig");

    /*
     * Public API Surface of bookmarks
     */

    /*
     * Public API Surface of bookmarks
     */

    var BookmarksService = /** @class */ (function () {
        function BookmarksService(config, httpClient) {
            this.config = config;
            this.httpClient = httpClient;
            this.onChange = new rxjs.Subject();
        }
        BookmarksService.prototype.all = function (endpoint, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint, {
                params: {
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "caption,asc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        BookmarksService.prototype.findMatchingCaption = function (endpoint, caption, pageable) {
            var query = {
                "conditions": [
                    { "attribute": "caption", "operator": "like", "value": "%" + caption + "%" }
                ]
            };
            return this.search(endpoint, query, pageable);
        };
        BookmarksService.prototype.search = function (endpoint, query, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/search", {
                "params": {
                    "q": JSON.stringify(query),
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "caption,asc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        BookmarksService.prototype.findByUrl = function (endpoint, url) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var query = {
                "conditions": [
                    { "attribute": "url", "operator": "eq", "value": url }
                ]
            };
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/search", {
                "params": { "q": JSON.stringify(query) }
            })
                .pipe(operators.map(function (data) {
                return data._embedded.bookmarks[0];
            }));
        };
        BookmarksService.prototype.create = function (endpoint, caption, url) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var boomarkRepr = {
                "url": url, "caption": caption
            };
            return this.httpClient
                .post(this.config.serviceBaseUrl + "/" + apiEndpoint, boomarkRepr)
                .pipe(operators.map(function (data) {
                return data;
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        BookmarksService.prototype.delete = function (endpoint, id) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .delete(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id)
                .pipe(operators.catchError(function (error) {
                return rxjs.throwError(new Error(error.status));
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        return BookmarksService;
    }());
    BookmarksService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarksService, deps: [{ token: BookmarksServiceConfigToken }, { token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    BookmarksService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarksService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarksService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [BookmarksServiceConfigToken]
                        }] }, { type: i1__namespace.HttpClient }];
        } });

    var BookmarkListViewComponent = /** @class */ (function () {
        function BookmarkListViewComponent() {
            this.onSelectItem = new i0.EventEmitter();
        }
        BookmarkListViewComponent.prototype.ngOnInit = function () { };
        BookmarkListViewComponent.prototype.selectItem = function (item, opcode) {
            this.onSelectItem.emit({
                opcode: opcode,
                item: item
            });
        };
        return BookmarkListViewComponent;
    }());
    BookmarkListViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarkListViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    BookmarkListViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkListViewComponent, selector: "bookmark-list-view", inputs: { bookmarks: "bookmarks", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"bookmarks\">\n    <ul class=\"list-group checked-list-box\">\n        <li class=\"list-group-item\" *ngFor=\"let x of bookmarks; index as i\">\n            <ng-container \n                [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-container>\n<ng-container *ngIf=\"!bookmarks\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <i class=\"fa fa-times\" (click)=\"parent.selectItem(item, 'delete')\"></i>\n    <a class=\"ml-2\" class=\"ml-1 bookmark-list-bookmark-title\" (click)=\"parent.selectItem(item, 'select')\">{{item.caption}}</a>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No bookmark found!\n</ng-template>", styles: [".bookmark-list-bookmark-title{cursor:pointer}"], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarkListViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'bookmark-list-view',
                        templateUrl: './bookmark-list-view.component.html',
                        styleUrls: ['./bookmark-list-view.component.scss']
                    }]
            }], propDecorators: { bookmarks: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], onSelectItem: [{
                    type: i0.Output
                }] } });

    var BookmarkListComponent = /** @class */ (function () {
        function BookmarkListComponent(bookmarksService, router, activatedRoute) {
            var _this = this;
            this.bookmarksService = bookmarksService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.enableSearch = true;
            this.filterText = '';
            this.onSelect = function (item) { return _this.navigateBookmark(item); };
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
        BookmarkListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
                _this.fetchPage(pageNum);
            });
            // Requery when the backend data changes
            this.subscription.add(this.bookmarksService.onChange.subscribe({ next: function () { return _this.fetchPage(_this.pageable.page); } }));
        };
        BookmarkListComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        BookmarkListComponent.prototype.onApplyFilter = function (text) {
            this.filterText = text;
            this.fetchPage(0);
        };
        BookmarkListComponent.prototype.fetchPage = function (pageNum) {
            this.pageable.page = pageNum;
            if (!!this.filterText) {
                this.bookmarksService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
            }
            else {
                this.bookmarksService.all("", this.pageable).subscribe(this.responseHandler);
            }
        };
        Object.defineProperty(BookmarkListComponent.prototype, "items", {
            get: function () {
                var _a, _b;
                return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.bookmarks;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BookmarkListComponent.prototype, "page", {
            get: function () {
                var _a;
                return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BookmarkListComponent.prototype, "hasItems", {
            get: function () {
                var _a;
                return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
            },
            enumerable: false,
            configurable: true
        });
        BookmarkListComponent.prototype.handleListViewEvent = function (evt) {
            switch (evt.opcode) {
                case 'select':
                    this.onSelect(evt.item);
                    break;
                case 'delete':
                    this.deleteBookmark(evt.item);
                    break;
            }
        };
        BookmarkListComponent.prototype.navigateBookmark = function (bookmark) {
            console.info("Navigate to " + bookmark.url);
            window.location.href = bookmark.url;
        };
        BookmarkListComponent.prototype.deleteBookmark = function (bookmark) {
            var _this = this;
            this.bookmarksService.delete("", bookmark.id)
                .subscribe({
                error: function (err) {
                    _this.errorDesc = err.message;
                }
            });
        };
        BookmarkListComponent.prototype.gotoPage = function (evt) {
            this.fetchPage(evt - 1);
        };
        return BookmarkListComponent;
    }());
    BookmarkListComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarkListComponent, deps: [{ token: BookmarksService }, { token: i2__namespace.Router }, { token: i2__namespace.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    BookmarkListComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkListComponent, selector: "bookmark-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <bookmark-list-view\n            [bookmarks]=\"items\"\n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </bookmark-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3__namespace.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: BookmarkListViewComponent, selector: "bookmark-list-view", inputs: ["bookmarks", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3__namespace.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarkListComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'bookmark-list',
                        templateUrl: './bookmark-list.component.html',
                        styleUrls: ['./bookmark-list.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: BookmarksService }, { type: i2__namespace.Router }, { type: i2__namespace.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
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

    var BookmarkBadgeComponent = /** @class */ (function () {
        function BookmarkBadgeComponent(service) {
            var _this = this;
            this.service = service;
            this.url = "";
            this.caption = "";
            this.loading = false;
            this.responseHandler = {
                next: function (result) {
                    _this.item = result;
                    _this.loading = false;
                    console.log(result);
                },
                error: function (err) {
                    _this.loading = false;
                    console.log(err.message);
                }
            };
        }
        BookmarkBadgeComponent.prototype.ngOnInit = function () {
            this.checkStatus();
        };
        Object.defineProperty(BookmarkBadgeComponent.prototype, "isActive", {
            get: function () {
                var _a;
                return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.id) != undefined;
            },
            enumerable: false,
            configurable: true
        });
        BookmarkBadgeComponent.prototype.checkStatus = function () {
            this.service.findByUrl("bookmarks", this.url).subscribe(this.responseHandler);
        };
        BookmarkBadgeComponent.prototype.createBookmark = function () {
            this.service.create("bookmarks", this.caption, this.url).subscribe(this.responseHandler);
        };
        BookmarkBadgeComponent.prototype.deleteBookmark = function () {
            if (this.item)
                this.service.delete("bookmarks", this.item.id).subscribe({
                    next: function () { },
                    error: function (err) {
                        console.log(err.message);
                    }
                });
        };
        return BookmarkBadgeComponent;
    }());
    BookmarkBadgeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarkBadgeComponent, deps: [{ token: BookmarksService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    BookmarkBadgeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkBadgeComponent, selector: "bookmark-badge", inputs: { url: "url", caption: "caption", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0__namespace, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'Bookmark'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\"\n    (onAdd)=\"createBookmark()\"\n    (onRemove)=\"deleteBookmark()\">\n</utils-badge>", styles: [""], components: [{ type: i3__namespace.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarkBadgeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'bookmark-badge',
                        templateUrl: './bookmark-badge.component.html',
                        styleUrls: ['./bookmark-badge.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: BookmarksService }]; }, propDecorators: { url: [{
                    type: i0.Input
                }], caption: [{
                    type: i0.Input
                }], activeControlTemplate: [{
                    type: i0.Input
                }], inactiveControlTemplate: [{
                    type: i0.Input
                }] } });

    /*
     * Public API Surface of bookmarks
     */

    /*
     * Public API Surface of bookmarks
     */

    var BookmarksModule = /** @class */ (function () {
        function BookmarksModule() {
        }
        BookmarksModule.forRoot = function (config) {
            return {
                ngModule: BookmarksModule,
                providers: [
                    BookmarksService,
                    {
                        provide: BookmarksServiceConfigToken,
                        useValue: config.bookmarks
                    }
                ]
            };
        };
        return BookmarksModule;
    }());
    BookmarksModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarksModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BookmarksModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarksModule, declarations: [BookmarkListViewComponent,
            BookmarkListComponent,
            BookmarkBadgeComponent], imports: [i1$1.CommonModule, i1__namespace$2.OidcAuthModule, i3.UtilsModule], exports: [BookmarkListViewComponent,
            BookmarkListComponent,
            BookmarkBadgeComponent] });
    BookmarksModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarksModule, imports: [[
                i1$1.CommonModule,
                i1$2.OidcAuthModule.forChild(),
                i3.UtilsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BookmarksModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            BookmarkListViewComponent,
                            BookmarkListComponent,
                            BookmarkBadgeComponent
                        ],
                        imports: [
                            i1$1.CommonModule,
                            i1$2.OidcAuthModule.forChild(),
                            i3.UtilsModule
                        ],
                        exports: [
                            BookmarkListViewComponent,
                            BookmarkListComponent,
                            BookmarkBadgeComponent
                        ]
                    }]
            }] });

    /*
     * Public API Surface of bookmarks
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BookmarkBadgeComponent = BookmarkBadgeComponent;
    exports.BookmarkListComponent = BookmarkListComponent;
    exports.BookmarkListViewComponent = BookmarkListViewComponent;
    exports.BookmarksModule = BookmarksModule;
    exports.BookmarksModuleConfigToken = BookmarksModuleConfigToken;
    exports.BookmarksService = BookmarksService;
    exports.BookmarksServiceConfigToken = BookmarksServiceConfigToken;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bookmarks.umd.js.map
