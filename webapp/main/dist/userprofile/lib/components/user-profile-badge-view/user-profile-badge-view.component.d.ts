import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { UserProfileModel } from '../../models/user-profile';
import * as i0 from "@angular/core";
export declare type UserProfileBadgeViewEvent = ViewEvent<UserProfileModel>;
export declare class UserProfileBadgeViewComponent implements OnInit {
    userProfile: UserProfileModel;
    contentTemplate: TemplateRef<any> | undefined;
    onSelectItem: EventEmitter<UserProfileBadgeViewEvent>;
    constructor();
    ngOnInit(): void;
    get userId(): string;
    selectItem(item: UserProfileModel, opcode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileBadgeViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserProfileBadgeViewComponent, "user-profile-badge-view", never, { "userProfile": "userProfile"; "contentTemplate": "contentTemplate"; }, { "onSelectItem": "onSelectItem"; }, never, never>;
}
