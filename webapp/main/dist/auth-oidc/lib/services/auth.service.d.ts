import { InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export interface OidcAuthConfig {
    clientId: string;
    filterProtocolClaims?: boolean;
    grantType?: string;
    issuer: string;
    loadUserInfo?: boolean;
    postLogoutRedirectUri?: string;
    redirectUri: string;
    responseType: string;
    scope: string;
    mock?: any;
}
export declare const OidcAuthConfigToken: InjectionToken<OidcAuthConfig>;
export declare class OidcAuthService {
    private config;
    private router;
    private userManager;
    private user;
    private redirectUrl;
    userSubject: BehaviorSubject<Profile | undefined>;
    constructor(config: OidcAuthConfig, router: Router);
    get isLoggedIn(): boolean;
    get claims(): any;
    get authorizationHeader(): string;
    startSignin(): Promise<void>;
    completeSignin(): Promise<void>;
    startSignout(): Promise<void>;
    completeSignout(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OidcAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OidcAuthService>;
}
//# sourceMappingURL=auth.service.d.ts.map