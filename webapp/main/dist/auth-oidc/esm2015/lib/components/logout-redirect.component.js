import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
export class LogoutRedirectComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.startSignout();
    }
}
LogoutRedirectComponent.ɵfac = function LogoutRedirectComponent_Factory(t) { return new (t || LogoutRedirectComponent)(i0.ɵɵdirectiveInject(i1.OidcAuthService)); };
LogoutRedirectComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LogoutRedirectComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LogoutRedirectComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogoutRedirectComponent, [{
        type: Component,
        args: [{
                template: ``
            }]
    }], function () { return [{ type: i1.OidcAuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb3V0LXJlZGlyZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgtb2lkYy9zcmMvbGliL2NvbXBvbmVudHMvbG9nb3V0LXJlZGlyZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7QUFNbEQsTUFBTSxPQUFPLHVCQUF1QjtJQUVsQyxZQUFvQixXQUE0QjtRQUE1QixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7SUFBSSxDQUFDO0lBRXJELFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xDLENBQUM7OzhGQU5VLHVCQUF1QjswRUFBdkIsdUJBQXVCO3VGQUF2Qix1QkFBdUI7Y0FIbkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxFQUFFO2FBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2lkY0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgYFxufSlcbmV4cG9ydCBjbGFzcyBMb2dvdXRSZWRpcmVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogT2lkY0F1dGhTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnN0YXJ0U2lnbm91dCgpO1xuICB9XG5cbn1cbiJdfQ==