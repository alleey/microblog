import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { map } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import * as i2 from '@angular/router';
import * as i3 from 'utils';
import { UtilsModule } from 'utils';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';

const UserProfileServiceConfigToken = new InjectionToken("UserProfileServiceConfig");
const UserProfileModuleConfigToken = new InjectionToken("UserProfileModuleConfig");

/*
 * Public API Surface of bookmarks
 */

class UserProfileService {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
    }
    one(endpoint, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(map(data => {
            return data;
        }));
    }
}
UserProfileService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileService, deps: [{ token: UserProfileServiceConfigToken }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
UserProfileService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [UserProfileServiceConfigToken]
                }] }, { type: i1.HttpClient }]; } });

class UserProfileBadgeViewComponent {
    constructor() {
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    get userId() {
        return this.userProfile.id;
    }
    selectItem(item, opcode) {
        this.onSelectItem.emit({
            opcode: opcode,
            item: item
        });
    }
}
UserProfileBadgeViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileBadgeViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserProfileBadgeViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: UserProfileBadgeViewComponent, selector: "user-profile-badge-view", inputs: { userProfile: "userProfile", contentTemplate: "contentTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container \n  [ngTemplateOutlet]=\"contentTemplate || defaultContentTemplate\"\n  [ngTemplateOutletContext]=\"{ $implicit: userProfile, list: this }\" \n  *ngIf=\"userProfile\">\n</ng-container>\n\n<ng-template #defaultContentTemplate let-item let-parent=\"list\">\n  <span (click)=\"parent.selectItem(item, 'select')\" class=\"fullname\">{{item.firstName}} {{item.lastName}}</span>\n</ng-template>\n", styles: [".fullname{font-weight:700}"], directives: [{ type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileBadgeViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'user-profile-badge-view',
                    templateUrl: './user-profile-badge-view.component.html',
                    styleUrls: ['./user-profile-badge-view.component.css']
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { userProfile: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });

class UserProfileBadgeComponent {
    constructor(userProfileService, router, activatedRoute) {
        this.userProfileService = userProfileService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.onSelect = (item) => { };
        this.errorDesc = "";
        this.loading = false;
        this.response = null;
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            var _a;
            this.userId = (_a = params.userId) !== null && _a !== void 0 ? _a : this.paramUserId;
            this.fetchUserProfile(this.userId);
        });
    }
    fetchUserProfile(userId) {
        this.userId = userId;
        this.loading = true;
        this.userProfileService.one("", this.userId)
            .subscribe({
            next: (result) => {
                this.response = result;
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                console.log(this.errorDesc);
            }
        });
    }
    get userProfileItem() {
        return this.response;
    }
    handleViewEvent(evt) {
        switch (evt.opcode) {
            case 'select':
                this.onSelect(evt.item);
                break;
        }
    }
}
UserProfileBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileBadgeComponent, deps: [{ token: UserProfileService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
UserProfileBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: UserProfileBadgeComponent, selector: "user-profile-badge", inputs: { paramUserId: ["userid", "paramUserId"], contentTemplate: "contentTemplate", onSelect: "onSelect" }, ngImport: i0, template: "<utils-loader *ngIf=\"loading; else contents\"></utils-loader>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc; else viewer\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #viewer>\n    <user-profile-badge-view\n        [userProfile]=\"userProfileItem\" \n        [contentTemplate]=\"contentTemplate\"\n        (onSelectItem)=\"handleViewEvent($event)\">\n    </user-profile-badge-view>\n</ng-template>", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: UserProfileBadgeViewComponent, selector: "user-profile-badge-view", inputs: ["userProfile", "contentTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'user-profile-badge',
                    templateUrl: './user-profile-badge.component.html',
                    styleUrls: ['./user-profile-badge.component.css']
                }]
        }], ctorParameters: function () { return [{ type: UserProfileService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { paramUserId: [{
                type: Input,
                args: ["userid"]
            }], contentTemplate: [{
                type: Input
            }], onSelect: [{
                type: Input
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

class UserProfileModule {
    static forRoot(config) {
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
    }
}
UserProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileModule, declarations: [UserProfileBadgeViewComponent,
        UserProfileBadgeComponent], imports: [CommonModule,
        UtilsModule], exports: [UserProfileBadgeViewComponent,
        UserProfileBadgeComponent] });
UserProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileModule, imports: [[
            CommonModule,
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        UserProfileBadgeViewComponent,
                        UserProfileBadgeComponent
                    ],
                    imports: [
                        CommonModule,
                        UtilsModule
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

export { UserProfileBadgeComponent, UserProfileBadgeViewComponent, UserProfileModule, UserProfileModuleConfigToken, UserProfileService, UserProfileServiceConfigToken };
//# sourceMappingURL=userprofile.js.map
