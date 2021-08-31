import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
export class RequireRoleDirective {
    constructor(authService, templateRef, viewContainer) {
        this.authService = authService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.profile = undefined;
        this.show = false;
        this.authService.userSubject
            .subscribe(profile => {
            this.profile = profile;
            this.updateView();
        });
    }
    set authRequireRole(role) {
        var _a;
        const roles = (_a = this.profile) === null || _a === void 0 ? void 0 : _a.roles;
        const show = !!(roles === null || roles === void 0 ? void 0 : roles.find(x => x.toLowerCase() === role.toLowerCase()));
        if (show != this.show) {
            this.show = show;
            this.updateView();
        }
    }
    set authRequireRoleElse(ref) {
        this.elseRef = ref;
        this.updateView();
    }
    set authRequireRoleThen(ref) {
        this.thenRef = ref;
        this.updateView();
    }
    updateView() {
        this.viewContainer.clear();
        if (this.show) {
            this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                $implicit: this.profile,
            });
        }
        else if (!!this.elseRef) {
            this.viewContainer.createEmbeddedView(this.elseRef);
        }
    }
}
RequireRoleDirective.ɵfac = function RequireRoleDirective_Factory(t) { return new (t || RequireRoleDirective)(i0.ɵɵdirectiveInject(i1.OidcAuthService), i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
RequireRoleDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: RequireRoleDirective, selectors: [["", "authRequireRole", ""]], inputs: { authRequireRole: "authRequireRole", authRequireRoleElse: "authRequireRoleElse", authRequireRoleThen: "authRequireRoleThen" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequireRoleDirective, [{
        type: Directive,
        args: [{
                selector: '[authRequireRole]'
            }]
    }], function () { return [{ type: i1.OidcAuthService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, { authRequireRole: [{
            type: Input
        }], authRequireRoleElse: [{
            type: Input
        }], authRequireRoleThen: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1yb2xlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgtb2lkYy9zcmMvbGliL2RpcmVjdGl2ZXMvcmVxdWlyZS1yb2xlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBaUMsTUFBTSxlQUFlLENBQUM7OztBQU1oRixNQUFNLE9BQU8sb0JBQW9CO0lBTy9CLFlBQW9CLFdBQTRCLEVBQ3RDLFdBQTZCLEVBQzdCLGFBQStCO1FBRnJCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBUGpDLFlBQU8sR0FBUSxTQUFTLENBQUM7UUFHekIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQU01QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDekIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUNJLGVBQWUsQ0FBQyxJQUFZOztRQUM5QixNQUFNLEtBQUssR0FBYSxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLEtBQUssQ0FBQztRQUM1QyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBLENBQUM7UUFDeEUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUQsSUFDSSxtQkFBbUIsQ0FBQyxHQUFxQjtRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQ0ksbUJBQW1CLENBQUMsR0FBcUI7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEQsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ3hCLENBQUMsQ0FBQztTQUNKO2FBQ0ksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7O3dGQXBEVSxvQkFBb0I7dUVBQXBCLG9CQUFvQjt1RkFBcEIsb0JBQW9CO2NBSGhDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2FBQzlCOzJIQW9CSyxlQUFlO2tCQURsQixLQUFLO1lBV0YsbUJBQW1CO2tCQUR0QixLQUFLO1lBT0YsbUJBQW1CO2tCQUR0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9pZGNBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thdXRoUmVxdWlyZVJvbGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXF1aXJlUm9sZURpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBwcm9maWxlOiBhbnkgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgdGhlblJlZjogVGVtcGxhdGVSZWY8YW55Pnx1bmRlZmluZWQ7XG4gIHByaXZhdGUgZWxzZVJlZjogVGVtcGxhdGVSZWY8YW55Pnx1bmRlZmluZWQ7XG4gIHByaXZhdGUgc2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IE9pZGNBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikgXG4gIHsgXG4gICAgdGhpcy5hdXRoU2VydmljZS51c2VyU3ViamVjdFxuICAgICAgLnN1YnNjcmliZShwcm9maWxlID0+IHtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gcHJvZmlsZTtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBhdXRoUmVxdWlyZVJvbGUocm9sZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgcm9sZXM6IHN0cmluZ1tdID0gdGhpcy5wcm9maWxlPy5yb2xlcztcbiAgICBjb25zdCBzaG93ID0gISFyb2xlcz8uZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gcm9sZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBpZiAoc2hvdyAhPSB0aGlzLnNob3cpIHtcbiAgICAgIHRoaXMuc2hvdyA9IHNob3c7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgYXV0aFJlcXVpcmVSb2xlRWxzZShyZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLmVsc2VSZWYgPSByZWY7XG4gICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgYXV0aFJlcXVpcmVSb2xlVGhlbihyZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLnRoZW5SZWYgPSByZWY7XG4gICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gIH1cblxuICB1cGRhdGVWaWV3KCkgOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcblxuICAgIGlmICh0aGlzLnNob3cpIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICAgICEhdGhpcy50aGVuUmVmID8gdGhpcy50aGVuUmVmIDogdGhpcy50ZW1wbGF0ZVJlZiwge1xuICAgICAgICAkaW1wbGljaXQ6IHRoaXMucHJvZmlsZSxcbiAgICAgIH0pO1xuICAgIH0gXG4gICAgZWxzZSBpZiAoISF0aGlzLmVsc2VSZWYpIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5lbHNlUmVmKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==