import { OnInit, TemplateRef } from '@angular/core';
import { OidcAuthService } from 'auth-oidc';
import { FollowingModel } from '../../models/following';
import { FollowingService } from '../../services/following.service';
import * as i0 from "@angular/core";
export declare class FollowingBadgeComponent implements OnInit {
    private service;
    private authService;
    userId: string;
    userName: string;
    activeControlTemplate: TemplateRef<any> | undefined;
    inactiveControlTemplate: TemplateRef<any> | undefined;
    item?: FollowingModel;
    loading: boolean;
    constructor(service: FollowingService, authService: OidcAuthService);
    ngOnInit(): void;
    get isActive(): boolean;
    checkStatus(): void;
    follow(): void;
    unfollow(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FollowingBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FollowingBadgeComponent, "following-badge", never, { "userId": "userid"; "userName": "userName"; "activeControlTemplate": "activeControlTemplate"; "inactiveControlTemplate": "inactiveControlTemplate"; }, {}, never, never>;
}
