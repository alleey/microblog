import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcAuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
export declare class AuthGuard implements CanActivate {
    private router;
    private authService;
    constructor(router: Router, authService: OidcAuthService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthGuard>;
}
//# sourceMappingURL=auth.guard.d.ts.map