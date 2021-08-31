import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { Subject, throwError, Subscription } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import * as i2 from '@angular/router';
import * as i3 from 'utils';
import { UtilsModule } from 'utils';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$2 from 'auth-oidc';
import { OidcAuthModule } from 'auth-oidc';

const BookmarksServiceConfigToken = new InjectionToken("BookmarksServiceConfig");
const BookmarksModuleConfigToken = new InjectionToken("BookmarksModuleConfig");

/*
 * Public API Surface of bookmarks
 */

/*
 * Public API Surface of bookmarks
 */

class BookmarksService {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.onChange = new Subject();
    }
    all(endpoint, pageable) {
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}`, {
            params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    findMatchingCaption(endpoint, caption, pageable) {
        const query = {
            "conditions": [
                { "attribute": "caption", "operator": "like", "value": `%${caption}%` }
            ]
        };
        return this.search(endpoint, query, pageable);
    }
    search(endpoint, query, pageable) {
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, {
            "params": {
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    findByUrl(endpoint, url) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const query = {
            "conditions": [
                { "attribute": "url", "operator": "eq", "value": url }
            ]
        };
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, {
            "params": { "q": JSON.stringify(query) }
        })
            .pipe(map(data => {
            return data._embedded.bookmarks[0];
        }));
    }
    create(endpoint, caption, url) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const boomarkRepr = {
            "url": url, "caption": caption
        };
        return this.httpClient
            .post(`${this.config.serviceBaseUrl}/${apiEndpoint}`, boomarkRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    delete(endpoint, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .delete(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
}
BookmarksService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksService, deps: [{ token: BookmarksServiceConfigToken }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
BookmarksService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [BookmarksServiceConfigToken]
                }] }, { type: i1.HttpClient }]; } });

class BookmarkListViewComponent {
    constructor() {
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    selectItem(item, opcode) {
        this.onSelectItem.emit({
            opcode: opcode,
            item: item
        });
    }
}
BookmarkListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BookmarkListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkListViewComponent, selector: "bookmark-list-view", inputs: { bookmarks: "bookmarks", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"bookmarks\">\n    <ul class=\"list-group checked-list-box\">\n        <li class=\"list-group-item\" *ngFor=\"let x of bookmarks; index as i\">\n            <ng-container \n                [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-container>\n<ng-container *ngIf=\"!bookmarks\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <i class=\"fa fa-times\" (click)=\"parent.selectItem(item, 'delete')\"></i>\n    <a class=\"ml-2\" class=\"ml-1 bookmark-list-bookmark-title\" (click)=\"parent.selectItem(item, 'select')\">{{item.caption}}</a>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No bookmark found!\n</ng-template>", styles: [".bookmark-list-bookmark-title{cursor:pointer}"], directives: [{ type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bookmark-list-view',
                    templateUrl: './bookmark-list-view.component.html',
                    styleUrls: ['./bookmark-list-view.component.scss']
                }]
        }], propDecorators: { bookmarks: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });

class BookmarkListComponent {
    constructor(bookmarksService, router, activatedRoute) {
        this.bookmarksService = bookmarksService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.enableSearch = true;
        this.filterText = '';
        this.onSelect = (item) => this.navigateBookmark(item);
        this.errorDesc = "";
        this.loading = false;
        this.subscription = new Subscription();
        this.responseHandler = {
            next: (result) => {
                this.response = result;
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                console.log(this.errorDesc);
            }
        };
        this.response = null;
        this.pageable = {
            page: 0
        };
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            var _a;
            const pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
            this.fetchPage(pageNum);
        });
        // Requery when the backend data changes
        this.subscription.add(this.bookmarksService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onApplyFilter(text) {
        this.filterText = text;
        this.fetchPage(0);
    }
    fetchPage(pageNum) {
        this.pageable.page = pageNum;
        if (!!this.filterText) {
            this.bookmarksService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
        }
        else {
            this.bookmarksService.all("", this.pageable).subscribe(this.responseHandler);
        }
    }
    get items() {
        var _a, _b;
        return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.bookmarks;
    }
    get page() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
    }
    get hasItems() {
        var _a;
        return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
    }
    handleListViewEvent(evt) {
        switch (evt.opcode) {
            case 'select':
                this.onSelect(evt.item);
                break;
            case 'delete':
                this.deleteBookmark(evt.item);
                break;
        }
    }
    navigateBookmark(bookmark) {
        console.info(`Navigate to ${bookmark.url}`);
        window.location.href = bookmark.url;
    }
    deleteBookmark(bookmark) {
        this.bookmarksService.delete("", bookmark.id)
            .subscribe({
            error: (err) => {
                this.errorDesc = err.message;
            }
        });
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
BookmarkListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkListComponent, deps: [{ token: BookmarksService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
BookmarkListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkListComponent, selector: "bookmark-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <bookmark-list-view\n            [bookmarks]=\"items\"\n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </bookmark-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: BookmarkListViewComponent, selector: "bookmark-list-view", inputs: ["bookmarks", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bookmark-list',
                    templateUrl: './bookmark-list.component.html',
                    styleUrls: ['./bookmark-list.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: BookmarksService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
                type: Input
            }], filterText: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], onSelect: [{
                type: Input,
                args: ['onSelectBookmark']
            }] } });

class BookmarkBadgeComponent {
    constructor(service) {
        this.service = service;
        this.url = "";
        this.caption = "";
        this.loading = false;
        this.responseHandler = {
            next: (result) => {
                this.item = result;
                this.loading = false;
                console.log(result);
            },
            error: (err) => {
                this.loading = false;
                console.log(err.message);
            }
        };
    }
    ngOnInit() {
        this.checkStatus();
    }
    get isActive() {
        var _a;
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.id) != undefined;
    }
    checkStatus() {
        this.service.findByUrl("bookmarks", this.url).subscribe(this.responseHandler);
    }
    createBookmark() {
        this.service.create("bookmarks", this.caption, this.url).subscribe(this.responseHandler);
    }
    deleteBookmark() {
        if (this.item)
            this.service.delete("bookmarks", this.item.id).subscribe({
                next: () => { },
                error: (err) => {
                    console.log(err.message);
                }
            });
    }
}
BookmarkBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkBadgeComponent, deps: [{ token: BookmarksService }], target: i0.ɵɵFactoryTarget.Component });
BookmarkBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkBadgeComponent, selector: "bookmark-badge", inputs: { url: "url", caption: "caption", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'Bookmark'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\"\n    (onAdd)=\"createBookmark()\"\n    (onRemove)=\"deleteBookmark()\">\n</utils-badge>", styles: [""], components: [{ type: i3.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bookmark-badge',
                    templateUrl: './bookmark-badge.component.html',
                    styleUrls: ['./bookmark-badge.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: BookmarksService }]; }, propDecorators: { url: [{
                type: Input
            }], caption: [{
                type: Input
            }], activeControlTemplate: [{
                type: Input
            }], inactiveControlTemplate: [{
                type: Input
            }] } });

/*
 * Public API Surface of bookmarks
 */

/*
 * Public API Surface of bookmarks
 */

class BookmarksModule {
    static forRoot(config) {
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
    }
}
BookmarksModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BookmarksModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksModule, declarations: [BookmarkListViewComponent,
        BookmarkListComponent,
        BookmarkBadgeComponent], imports: [CommonModule, i1$2.OidcAuthModule, UtilsModule], exports: [BookmarkListViewComponent,
        BookmarkListComponent,
        BookmarkBadgeComponent] });
BookmarksModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksModule, imports: [[
            CommonModule,
            OidcAuthModule.forChild(),
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        BookmarkListViewComponent,
                        BookmarkListComponent,
                        BookmarkBadgeComponent
                    ],
                    imports: [
                        CommonModule,
                        OidcAuthModule.forChild(),
                        UtilsModule
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

export { BookmarkBadgeComponent, BookmarkListComponent, BookmarkListViewComponent, BookmarksModule, BookmarksModuleConfigToken, BookmarksService, BookmarksServiceConfigToken };
//# sourceMappingURL=bookmarks.js.map
