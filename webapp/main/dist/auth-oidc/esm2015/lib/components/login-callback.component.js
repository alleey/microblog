import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
export class LoginCallbackComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.completeSignin();
    }
}
LoginCallbackComponent.ɵfac = function LoginCallbackComponent_Factory(t) { return new (t || LoginCallbackComponent)(i0.ɵɵdirectiveInject(i1.OidcAuthService)); };
LoginCallbackComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginCallbackComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function LoginCallbackComponent_Template(rf, ctx) { }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginCallbackComponent, [{
        type: Component,
        args: [{
                template: ``
            }]
    }], function () { return [{ type: i1.OidcAuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tY2FsbGJhY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXV0aC1vaWRjL3NyYy9saWIvY29tcG9uZW50cy9sb2dpbi1jYWxsYmFjay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7O0FBTWxELE1BQU0sT0FBTyxzQkFBc0I7SUFFakMsWUFBb0IsV0FBNEI7UUFBNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO0lBQUksQ0FBQztJQUVyRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs0RkFOVSxzQkFBc0I7eUVBQXRCLHNCQUFzQjt1RkFBdEIsc0JBQXNCO2NBSGxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsRUFBRTthQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9pZGNBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogYGBcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5DYWxsYmFja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogT2lkY0F1dGhTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmNvbXBsZXRlU2lnbmluKCk7XG4gIH1cblxufVxuIl19