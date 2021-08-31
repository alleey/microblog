import { OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel, UserProfileResponseModel } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfileBadgeViewEvent } from '../user-profile-badge-view/user-profile-badge-view.component';
import * as i0 from "@angular/core";
export declare class UserProfileBadgeComponent implements OnInit {
    private userProfileService;
    private router;
    private activatedRoute;
    paramUserId?: string;
    contentTemplate: TemplateRef<any> | undefined;
    onSelect: (topic: UserProfileModel) => void;
    userId?: string;
    response: UserProfileResponseModel | null;
    errorDesc: any;
    loading: boolean;
    constructor(userProfileService: UserProfileService, router: Router, activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    fetchUserProfile(userId: string): void;
    get userProfileItem(): UserProfileModel;
    handleViewEvent(evt: UserProfileBadgeViewEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserProfileBadgeComponent, "user-profile-badge", never, { "paramUserId": "userid"; "contentTemplate": "contentTemplate"; "onSelect": "onSelect"; }, {}, never, never>;
}
