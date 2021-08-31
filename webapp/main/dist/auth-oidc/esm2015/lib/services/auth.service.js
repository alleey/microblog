import { Inject, Injectable, InjectionToken } from '@angular/core';
import { UserManager } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export const OidcAuthConfigToken = new InjectionToken("AuthServiceConfig");
export class OidcAuthService {
    constructor(config, router) {
        this.config = config;
        this.router = router;
        this.user = null;
        this.userSubject = new BehaviorSubject(undefined);
        const oidcConfig = {
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
        if (config.mock)
            this.userSubject.next(config.mock);
        else
            this.userManager.getUser().then(user => {
                if (user === null || user === void 0 ? void 0 : user.expired) {
                    user = null;
                }
                this.user = user;
                this.userSubject.next(user === null || user === void 0 ? void 0 : user.profile);
                //console.log(user);
            });
    }
    get isLoggedIn() {
        if (this.config.mock)
            return true;
        //console.log(this.user);
        return this.user != null && !this.user.expired;
    }
    get claims() {
        return this.userSubject.getValue();
    }
    get authorizationHeader() {
        const user = this.user;
        if (!user) {
            return '';
        }
        return `${user.token_type} ${user.access_token}`;
    }
    startSignin() {
        const snapshot = this.router.routerState.snapshot;
        this.redirectUrl = snapshot.url;
        return this.userManager.signinRedirect();
    }
    completeSignin() {
        return this.userManager.signinRedirectCallback().then(user => {
            this.user = user;
            this.userSubject.next(user === null || user === void 0 ? void 0 : user.profile);
            //console.log("Login ok: " + user + " redirecting to " + this.redirectUrl);
            this.router.navigateByUrl(this.redirectUrl);
        });
    }
    startSignout() {
        return this.userManager.signoutRedirect();
    }
    completeSignout() {
        return this.userManager.signoutRedirectCallback().then(user => {
            this.user = null;
            this.userSubject.next(undefined);
            //console.log("Logout ok redirecting to " + this.redirectUrl);
            this.router.navigateByUrl("/");
        });
    }
}
OidcAuthService.ɵfac = function OidcAuthService_Factory(t) { return new (t || OidcAuthService)(i0.ɵɵinject(OidcAuthConfigToken), i0.ɵɵinject(i1.Router)); };
OidcAuthService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OidcAuthService, factory: OidcAuthService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OidcAuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [OidcAuthConfigToken]
            }] }, { type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXV0aC1vaWRjL3NyYy9saWIvc2VydmljZXMvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRSxPQUFPLEVBQUUsV0FBVyxFQUFzQyxNQUFNLGFBQWEsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFnQnZDLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLElBQUksY0FBYyxDQUFpQixtQkFBbUIsQ0FBQyxDQUFDO0FBSzNGLE1BQU0sT0FBTyxlQUFlO0lBUTFCLFlBQ3VDLE1BQXNCLEVBQ25ELE1BQWM7UUFEZSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUNuRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUGhCLFNBQUksR0FBZ0IsSUFBSSxDQUFDO1FBRzFCLGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQW9CLFNBQVMsQ0FBQyxDQUFDO1FBTXJFLE1BQU0sVUFBVSxHQUF3QjtZQUN0QyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDL0IsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVztZQUNyQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQjtZQUMzRCxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1lBQ3ZDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDeEIsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0I7WUFDdEQsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMs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LEVBQUUsTUFBTTthQUNuQjs7c0JBVUksTUFBTTt1QkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBVc2VyTWFuYWdlciwgVXNlck1hbmFnZXJTZXR0aW5ncywgVXNlciwgUHJvZmlsZSB9IGZyb20gJ29pZGMtY2xpZW50JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgT2lkY0F1dGhDb25maWcge1xuICBjbGllbnRJZDogc3RyaW5nLCAgICAgICAgICAgICAgIC8vIGNsaWVudF9pZFxuICBmaWx0ZXJQcm90b2NvbENsYWltcz86IGJvb2xlYW4sIC8vIGZpbHRlclByb3RvY29sQ2xhaW1zXG4gIGdyYW50VHlwZT86IHN0cmluZyxcbiAgaXNzdWVyOiBzdHJpbmcsICAgICAgICAgICAgICAgICAvLyBhdXRob3JpdHlcbiAgbG9hZFVzZXJJbmZvPzogYm9vbGVhbiwgICAgICAgICAvLyBsb2FkVXNlckluZm9cbiAgcG9zdExvZ291dFJlZGlyZWN0VXJpPzogc3RyaW5nLCAvLyBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmlcbiAgcmVkaXJlY3RVcmk6IHN0cmluZywgICAgICAgICAgICAvLyByZWRpcmVjdF91cmlcbiAgcmVzcG9uc2VUeXBlOiBzdHJpbmcsICAgICAgICAgICAvLyByZXNwb25zZV90eXBlXG4gIHNjb3BlOiBzdHJpbmcsICAgICAgICAgICAgICAgICAgLy8gc2NvcGVcbiAgbW9jaz86IGFueSAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIHRlc3RpbmcvZGV2ZWxvcG1lbnRcbn1cblxuZXhwb3J0IGNvbnN0IE9pZGNBdXRoQ29uZmlnVG9rZW4gPSBuZXcgSW5qZWN0aW9uVG9rZW48T2lkY0F1dGhDb25maWc+KFwiQXV0aFNlcnZpY2VDb25maWdcIik7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE9pZGNBdXRoU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB1c2VyTWFuYWdlcjogVXNlck1hbmFnZXI7XG4gIHByaXZhdGUgdXNlcjogVXNlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHJlZGlyZWN0VXJsITogc3RyaW5nO1xuXG4gIHB1YmxpYyB1c2VyU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZmlsZXx1bmRlZmluZWQ+KHVuZGVmaW5lZCk7IFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoT2lkY0F1dGhDb25maWdUb2tlbikgcHJpdmF0ZSBjb25maWc6IE9pZGNBdXRoQ29uZmlnLCBcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSBcbiAge1xuICAgIGNvbnN0IG9pZGNDb25maWc6IFVzZXJNYW5hZ2VyU2V0dGluZ3MgPSB7XG4gICAgICBhdXRob3JpdHk6IHRoaXMuY29uZmlnLmlzc3VlcixcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jb25maWcuY2xpZW50SWQsXG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpLFxuICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpOiB0aGlzLmNvbmZpZy5wb3N0TG9nb3V0UmVkaXJlY3RVcmksXG4gICAgICByZXNwb25zZV90eXBlOiB0aGlzLmNvbmZpZy5yZXNwb25zZVR5cGUsXG4gICAgICBzY29wZTogdGhpcy5jb25maWcuc2NvcGUsXG4gICAgICBmaWx0ZXJQcm90b2NvbENsYWltczogdGhpcy5jb25maWcuZmlsdGVyUHJvdG9jb2xDbGFpbXMsXG4gICAgICBsb2FkVXNlckluZm86IHRoaXMuY29uZmlnLmxvYWRVc2VySW5mb1xuICAgIH07XG5cbiAgICB0aGlzLnVzZXJNYW5hZ2VyID0gbmV3IFVzZXJNYW5hZ2VyKG9pZGNDb25maWcpO1xuXG4gICAgaWYoY29uZmlnLm1vY2spXG4gICAgICB0aGlzLnVzZXJTdWJqZWN0Lm5leHQoY29uZmlnLm1vY2spO1xuICAgIGVsc2UgXG4gICAgICB0aGlzLnVzZXJNYW5hZ2VyLmdldFVzZXIoKS50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmKHVzZXI/LmV4cGlyZWQpIHtcbiAgICAgICAgICAgIHVzZXIgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICAgIHRoaXMudXNlclN1YmplY3QubmV4dCh1c2VyPy5wcm9maWxlKTtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHVzZXIpO1xuICAgICAgfSk7XG4gIH1cblxuICBnZXQgaXNMb2dnZWRJbigpOiBib29sZWFuIHtcbiAgICBpZih0aGlzLmNvbmZpZy5tb2NrKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnVzZXIpO1xuICAgIHJldHVybiB0aGlzLnVzZXIgIT0gbnVsbCAmJiAhdGhpcy51c2VyLmV4cGlyZWQ7XG4gIH1cblxuICBnZXQgY2xhaW1zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudXNlclN1YmplY3QuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIGdldCBhdXRob3JpemF0aW9uSGVhZGVyKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMudXNlcjtcbiAgICBpZighdXNlcikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gYCR7dXNlci50b2tlbl90eXBlfSAke3VzZXIuYWNjZXNzX3Rva2VufWA7XG4gIH1cblxuICBzdGFydFNpZ25pbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzbmFwc2hvdDogUm91dGVyU3RhdGVTbmFwc2hvdCA9IHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90O1xuICAgIHRoaXMucmVkaXJlY3RVcmwgPSBzbmFwc2hvdC51cmw7XG4gICAgcmV0dXJuIHRoaXMudXNlck1hbmFnZXIuc2lnbmluUmVkaXJlY3QoKTtcbiAgfVxuXG4gIGNvbXBsZXRlU2lnbmluKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJNYW5hZ2VyLnNpZ25pblJlZGlyZWN0Q2FsbGJhY2soKS50aGVuKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgIHRoaXMudXNlclN1YmplY3QubmV4dCh1c2VyPy5wcm9maWxlKTtcbiAgICAgIC8vY29uc29sZS5sb2coXCJMb2dpbiBvazogXCIgKyB1c2VyICsgXCIgcmVkaXJlY3RpbmcgdG8gXCIgKyB0aGlzLnJlZGlyZWN0VXJsKTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGhpcy5yZWRpcmVjdFVybCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGFydFNpZ25vdXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlck1hbmFnZXIuc2lnbm91dFJlZGlyZWN0KCk7XG4gIH1cblxuICBjb21wbGV0ZVNpZ25vdXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlck1hbmFnZXIuc2lnbm91dFJlZGlyZWN0Q2FsbGJhY2soKS50aGVuKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgIHRoaXMudXNlclN1YmplY3QubmV4dCh1bmRlZmluZWQpO1xuICAgICAgLy9jb25zb2xlLmxvZyhcIkxvZ291dCBvayByZWRpcmVjdGluZyB0byBcIiArIHRoaXMucmVkaXJlY3RVcmwpO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChcIi9cIik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==