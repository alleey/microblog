import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Component, Input, EventEmitter, Output, NgModule } from '@angular/core';
import { Subject, throwError, Subscription } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as i2 from 'auth-oidc';
import { OidcAuthModule } from 'auth-oidc';
import * as i2$1 from '@angular/common/http';
import * as i3 from 'utils';
import { UtilsModule } from 'utils';
import * as i2$2 from '@angular/router';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

const FollowingServiceConfigToken = new InjectionToken("FollowingServiceConfig");
const FollowersModuleConfigToken = new InjectionToken("FollowersModuleConfig");

/*
 * Public API Surface of bookmarks
 */

/*
 * Public API Surface of bookmarks
 */

;
class FollowingService {
    constructor(config, authService, httpClient) {
        this.config = config;
        this.authService = authService;
        this.httpClient = httpClient;
        this.onChange = new Subject();
        this.authService.userSubject.subscribe(profile => {
            this.userProfile = profile;
        });
    }
    followedByOne(endpoint, userId, followedById) {
        var _a;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
        console.info("followed-by : " + followedById);
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/followedBy/${followedById}`)
            .pipe(map(data => {
            return data;
        }));
    }
    followedBy(endpoint, userId, pageable) {
        var _a;
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/followedBy`, {
            params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "followedByName,asc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    findFollowedByMatching(endpoint, userId, name, pageable) {
        var _a;
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
        const query = {
            "conditions": [
                { "attribute": "followedByName.fullName", "operator": "like", "value": `%${name}%` }
            ]
        };
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/followedBy/search`, {
            "params": {
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "followedByName,asc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    followingOne(endpoint, userId, followedById) {
        var _a;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following/${followedById}`)
            .pipe(map(data => {
            return data;
        }));
    }
    following(endpoint, userId, pageable) {
        var _a;
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following`, {
            params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "userName,asc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    findFollowingMatching(endpoint, userId, name, pageable) {
        var _a;
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
        const query = {
            "conditions": [
                { "attribute": "userName.fullName", "operator": "like", "value": `%${name}%` }
            ]
        };
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following/search`, {
            "params": {
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "userName,asc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    follow(endpoint, followReq) {
        var _a, _b;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        followReq.followedById = !!followReq.followedById ? followReq.followedById : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
        followReq.followedByName = !!followReq.followedByName ? followReq.followedByName : (_b = this.userProfile) === null || _b === void 0 ? void 0 : _b.name;
        const owner = followReq.followedById;
        return this.httpClient
            .put(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following`, followReq)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    unfollow(endpoint, userId, userToUnfollow) {
        var _a;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const owner = !!userId ? userId : (_a = this.userProfile) === null || _a === void 0 ? void 0 : _a.sub;
        return this.httpClient
            .delete(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following/${userToUnfollow}`)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
}
FollowingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingService, deps: [{ token: FollowingServiceConfigToken }, { token: i2.OidcAuthService }, { token: i2$1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
FollowingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FollowingServiceConfigToken]
                }] }, { type: i2.OidcAuthService }, { type: i2$1.HttpClient }]; } });

class FollowedByBadgeComponent {
    constructor(service, authService) {
        this.service = service;
        this.authService = authService;
        this.userId = "";
        this.loading = false;
        this.authService.userSubject.subscribe(profile => {
            this.checkStatus();
        });
    }
    ngOnInit() { }
    get isActive() {
        var _a;
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.userId) != undefined;
    }
    checkStatus() {
        this.service.followedByOne("", "", this.userId).subscribe({
            next: (result) => {
                this.item = result;
                this.loading = false;
                console.log(result);
            },
            error: (err) => {
                this.loading = false;
                console.log(err.message);
            }
        });
    }
}
FollowedByBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowedByBadgeComponent, deps: [{ token: FollowingService }, { token: i2.OidcAuthService }], target: i0.ɵɵFactoryTarget.Component });
FollowedByBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowedByBadgeComponent, selector: "followed-by-badge", inputs: { userId: ["userid", "userId"], activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'FOLLOWS YOU'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\">\n</utils-badge>", styles: [""], components: [{ type: i3.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowedByBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'followed-by-badge',
                    templateUrl: './followed-by-badge.component.html',
                    styleUrls: ['./followed-by-badge.component.css']
                }]
        }], ctorParameters: function () { return [{ type: FollowingService }, { type: i2.OidcAuthService }]; }, propDecorators: { userId: [{
                type: Input,
                args: ["userid"]
            }], activeControlTemplate: [{
                type: Input
            }], inactiveControlTemplate: [{
                type: Input
            }] } });

class FollowersListViewComponent {
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
FollowersListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FollowersListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowersListViewComponent, selector: "followed-by-list-view", inputs: { items: "items", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"items\">\n    <ul class=\"list-group checked-list-box\">\n        <li class=\"list-group-item\" *ngFor=\"let x of items; index as i\">\n            <ng-container \n                [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-container>\n<ng-container *ngIf=\"!items\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <span class=\"ml-2\" (click)=\"parent.selectItem(item, 'select')\">{{item.fullName}}</span>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    The list is empty at the moment!\n</ng-template>", styles: [""], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'followed-by-list-view',
                    templateUrl: './followed-by-list-view.component.html',
                    styleUrls: ['./followed-by-list-view.component.css']
                }]
        }], propDecorators: { items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });

class FollowersListComponent {
    constructor(followersService, router, activatedRoute) {
        this.followersService = followersService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.enableSearch = false;
        this.filterText = '';
        this.onSelect = (item) => { };
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
        this.subscription.add(this.followersService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) }));
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
            this.followersService.findFollowedByMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
        }
        else {
            this.followersService.followedBy("", "", this.pageable).subscribe(this.responseHandler);
        }
    }
    get items() {
        var _a, _b;
        return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.followedBy;
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
        }
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
FollowersListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersListComponent, deps: [{ token: FollowingService }, { token: i2$2.Router }, { token: i2$2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
FollowersListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowersListComponent, selector: "followed-by-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <followed-by-list-view \n            [items]=\"items\" \n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </followed-by-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: FollowersListViewComponent, selector: "followed-by-list-view", inputs: ["items", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'followed-by-list',
                    templateUrl: './followed-by-list.component.html',
                    styleUrls: ['./followed-by-list.component.css']
                }]
        }], ctorParameters: function () { return [{ type: FollowingService }, { type: i2$2.Router }, { type: i2$2.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
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

class FollowingBadgeComponent {
    constructor(service, authService) {
        this.service = service;
        this.authService = authService;
        this.userId = "";
        this.userName = "";
        this.loading = false;
        this.authService.userSubject.subscribe(profile => {
            this.checkStatus();
        });
    }
    ngOnInit() { }
    get isActive() {
        var _a;
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.userId) != undefined;
    }
    checkStatus() {
        this.service.followingOne("", "", this.userId).subscribe({
            next: (result) => {
                this.item = result;
                this.loading = false;
                console.log(result);
            },
            error: (err) => {
                this.loading = false;
                console.log(err.message);
            }
        });
    }
    follow() {
        const request = {
            userId: this.userId,
            userName: this.userName,
            followedById: "",
            followedByName: ""
        };
        this.service.follow("", request).subscribe({
            error: (err) => {
                console.log(err.message);
            }
        });
    }
    unfollow() {
        if (this.item)
            this.service.unfollow("", "", this.item.userId).subscribe({
                next: () => { },
                error: (err) => {
                    console.log(err.message);
                }
            });
    }
}
FollowingBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingBadgeComponent, deps: [{ token: FollowingService }, { token: i2.OidcAuthService }], target: i0.ɵɵFactoryTarget.Component });
FollowingBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowingBadgeComponent, selector: "following-badge", inputs: { userId: ["userid", "userId"], userName: "userName", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'FOLLOWING'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\"\n    (onAdd)=\"follow()\"\n    (onRemove)=\"unfollow()\">\n</utils-badge>", styles: [""], components: [{ type: i3.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'following-badge',
                    templateUrl: './following-badge.component.html',
                    styleUrls: ['./following-badge.component.css']
                }]
        }], ctorParameters: function () { return [{ type: FollowingService }, { type: i2.OidcAuthService }]; }, propDecorators: { userId: [{
                type: Input,
                args: ["userid"]
            }], userName: [{
                type: Input
            }], activeControlTemplate: [{
                type: Input
            }], inactiveControlTemplate: [{
                type: Input
            }] } });

class FollowingListViewComponent {
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
FollowingListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FollowingListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowingListViewComponent, selector: "following-list-view", inputs: { items: "items", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"items\">\n    <ul class=\"list-group checked-list-box\">\n        <li class=\"list-group-item\" *ngFor=\"let x of items; index as i\">\n            <ng-container \n                [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n            </ng-container>\n        </li>\n    </ul>\n</ng-container>\n<ng-container *ngIf=\"!items\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <span class=\"ml-2\" (click)=\"parent.selectItem(item, 'select')\">{{item.fullName}}</span>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    The list is empty at the moment!\n</ng-template>", styles: [""], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'following-list-view',
                    templateUrl: './following-list-view.component.html',
                    styleUrls: ['./following-list-view.component.css']
                }]
        }], propDecorators: { items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });

class FollowingListComponent {
    constructor(followersService, router, activatedRoute) {
        this.followersService = followersService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.enableSearch = false;
        this.filterText = '';
        this.onSelect = (item) => { };
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
        this.subscription.add(this.followersService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) }));
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
            this.followersService.findFollowingMatching("", "", this.filterText, this.pageable).subscribe(this.responseHandler);
        }
        else {
            this.followersService.following("", "", this.pageable).subscribe(this.responseHandler);
        }
    }
    get items() {
        var _a, _b;
        return (_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.following;
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
        }
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
FollowingListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingListComponent, deps: [{ token: FollowingService }, { token: i2$2.Router }, { token: i2$2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
FollowingListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowingListComponent, selector: "following-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectBookmark", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the bookmarks list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <div class=\"py-1\">\n        <utils-search-box (onApplyFilter)=\"onApplyFilter\" *ngIf=\"enableSearch\"></utils-search-box>\n        <following-list-view \n            [items]=\"items\" \n            [itemTemplate]=\"itemTemplate\"\n            [noContentsTemplate]=\"noContentsTemplate\"\n            (onSelectItem)=\"handleListViewEvent($event)\">\n        </following-list-view>\n        <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    </div>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: FollowingListViewComponent, selector: "following-list-view", inputs: ["items", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'following-list',
                    templateUrl: './following-list.component.html',
                    styleUrls: ['./following-list.component.css']
                }]
        }], ctorParameters: function () { return [{ type: FollowingService }, { type: i2$2.Router }, { type: i2$2.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
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

/*
 * Public API Surface of bookmarks
 */

/*
 * Public API Surface of bookmarks
 */

class FollowersModule {
    static forRoot(config) {
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
    }
}
FollowersModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FollowersModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersModule, declarations: [FollowersListViewComponent,
        FollowersListComponent,
        FollowingListViewComponent,
        FollowingListComponent,
        FollowedByBadgeComponent,
        FollowingBadgeComponent], imports: [CommonModule, i2.OidcAuthModule, UtilsModule], exports: [FollowersListViewComponent,
        FollowersListComponent,
        FollowingListViewComponent,
        FollowingListComponent,
        FollowedByBadgeComponent,
        FollowingBadgeComponent] });
FollowersModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersModule, imports: [[
            CommonModule,
            OidcAuthModule.forChild(),
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersModule, decorators: [{
            type: NgModule,
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
                        CommonModule,
                        OidcAuthModule.forChild(),
                        UtilsModule
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

export { FollowedByBadgeComponent, FollowersListComponent, FollowersListViewComponent, FollowersModule, FollowersModuleConfigToken, FollowingBadgeComponent, FollowingListComponent, FollowingListViewComponent, FollowingService, FollowingServiceConfigToken };
//# sourceMappingURL=followers.js.map
