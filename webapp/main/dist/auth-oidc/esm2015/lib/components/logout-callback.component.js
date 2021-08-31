import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
export class LogoutCallbackComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.completeSignout();
    }
}
LogoutCallbackComponent.ɵfac = function LogoutCallbackComponent_Factory(t) { return new (t || LogoutCallbackComponent)(i0.ɵɵdirectiveInject(i1.OidcAuthService)); };
LogoutCallbackComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LogoutCallbackComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LogoutCallbackComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogoutCallbackComponent, [{
        type: Component,
        args: [{
                template: ``
            }]
    }], function () { return [{ type: i1.OidcAuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb3V0LWNhbGxiYWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgtb2lkYy9zcmMvbGliL2NvbXBvbmVudHMvbG9nb3V0LWNhbGxiYWNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7QUFNbEQsTUFBTSxPQUFPLHVCQUF1QjtJQUVsQyxZQUFvQixXQUE0QjtRQUE1QixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7SUFBSSxDQUFDO0lBRXJELFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7OzhGQU5VLHVCQUF1QjswRUFBdkIsdUJBQXVCO3VGQUF2Qix1QkFBdUI7Y0FIbkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxFQUFFO2FBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2lkY0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgYFxufSlcbmV4cG9ydCBjbGFzcyBMb2dvdXRDYWxsYmFja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogT2lkY0F1dGhTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmNvbXBsZXRlU2lnbm91dCgpO1xuICB9XG5cbn1cbiJdfQ==