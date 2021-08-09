import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

import { UserManager, UserManagerSettings, User, Profile } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';


export interface OidcAuthConfig {
  clientId: string,               // client_id
  filterProtocolClaims?: boolean, // filterProtocolClaims
  grantType?: string,
  issuer: string,                 // authority
  loadUserInfo?: boolean,         // loadUserInfo
  postLogoutRedirectUri?: string, // post_logout_redirect_uri
  redirectUri: string,            // redirect_uri
  responseType: string,           // response_type
  scope: string,                  // scope
  mock?: any                       // for testing/development
}

export const OidcAuthConfigToken = new InjectionToken<OidcAuthConfig>("AuthServiceConfig");

@Injectable({
  providedIn: 'root'
})
export class OidcAuthService {

  private userManager: UserManager;
  private user: User | null = null;
  private redirectUrl!: string;

  public userSubject = new BehaviorSubject<Profile|undefined>(undefined); 

  constructor(
    @Inject(OidcAuthConfigToken) private config: OidcAuthConfig, 
    private router: Router) 
  {
    const oidcConfig: UserManagerSettings = {
      authority: this.config.issuer,
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      post_logout_redirect_uri: this.config.postLogoutRedirectUri,
      response_type: this.config.responseType,
      scope: this.config.scope,
      filterProtocolClaims: this.config.filterProtocolClaims,
      loadUserInfo: this.config.loadUserInfo
    };

    this.userManager = new UserManager(oidcConfig);

    if(config.mock)
      this.userSubject.next(config.mock);
    else 
      this.userManager.getUser().then(user => {
          if(user?.expired) {
            user = null;
          }
          this.user = user;
          this.userSubject.next(user?.profile);
          //console.log(user);
      });
  }

  get isLoggedIn(): boolean {
    if(this.config.mock)
      return true;
    //console.log(this.user);
    return this.user != null && !this.user.expired;
  }

  get claims(): any {
    return this.userSubject.getValue();
  }

  get authorizationHeader(): string {
    const user = this.user;
    if(!user) {
      return '';
    }
    return `${user.token_type} ${user.access_token}`;
  }

  startSignin(): Promise<void> {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    this.redirectUrl = snapshot.url;
    return this.userManager.signinRedirect();
  }

  completeSignin(): Promise<void> {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
      this.userSubject.next(user?.profile);
      //console.log("Login ok: " + user + " redirecting to " + this.redirectUrl);
      this.router.navigateByUrl(this.redirectUrl);
    });
  }

  startSignout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  completeSignout(): Promise<void> {
    return this.userManager.signoutRedirectCallback().then(user => {
      this.user = null;
      this.userSubject.next(undefined);
      //console.log("Logout ok redirecting to " + this.redirectUrl);
      this.router.navigateByUrl("/");
    });
  }
}
