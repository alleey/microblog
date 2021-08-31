import { OnInit, TemplateRef } from '@angular/core';
import { OidcAuthService } from 'auth-oidc';
import { FollowedByModel } from '../../models/followed-by';
import { FollowingService } from '../../services/following.service';
import * as i0 from "@angular/core";
export declare class FollowedByBadgeComponent implements OnInit {
    private service;
    private authService;
    userId: string;
    activeControlTemplate: TemplateRef<any> | undefined;
    inactiveControlTemplate: TemplateRef<any> | undefined;
    item?: FollowedByModel;
    loading: boolean;
    constructor(service: FollowingService, authService: OidcAuthService);
    ngOnInit(): void;
    get isActive(): boolean;
    checkStatus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FollowedByBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FollowedByBadgeComponent, "followed-by-badge", never, { "userId": "userid"; "activeControlTemplate": "activeControlTemplate"; "inactiveControlTemplate": "inactiveControlTemplate"; }, {}, never, never>;
}
