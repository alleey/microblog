import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { UserManager, UserManagerSettings, User as OidcUser, Profile as OidcProfile } from 'oidc-client';
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
};

export const OidcAuthConfigToken = new InjectionToken<OidcAuthConfig>("AuthServiceConfig");

export type User = OidcUser;
export type Profile = OidcProfile;

@Injectable({
  providedIn: 'root'
})
export class OidcAuthService {

  private userManager: UserManager;
  private redirectUrl!: string;

  public userSubject = new BehaviorSubject<User|null>(null); 

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
          this.userSubject.next(user);
          //console.log(user);
      });
  }

  // get isLoggedIn(): boolean {
  //   if(this.config.mock)
  //     return true;
  //   //console.log(this.user);
  //   return this.user != null && !this.user.expired;
  // }

  public get user(): User|null {
    return this.userSubject.getValue();
  }

  public get claims(): Profile|undefined {
    return this.user?.profile;
  }

  startSignin(): Promise<void> {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    this.redirectUrl = snapshot.url;
    return this.userManager.signinRedirect();
  }

  completeSignin(): Promise<void> {
    return this.userManager.signinRedirectCallback().then(user => {
      this.userSubject.next(user);
      //console.log("Login ok: " + user + " redirecting to " + this.redirectUrl);
      this.router.navigateByUrl(this.redirectUrl);
    });
  }

  startSignout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  completeSignout(): Promise<void> {
    return this.userManager.signoutRedirectCallback().then(user => {
      this.userSubject.next(null);
      //console.log("Logout ok redirecting to " + this.redirectUrl);
      this.router.navigateByUrl("/");
    });
  }
}
