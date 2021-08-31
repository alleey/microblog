import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
export class RequireLoginDirective {
    constructor(authService, templateRef, viewContainer) {
        this.authService = authService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.profile = undefined;
        this.authService.userSubject
            .subscribe(profile => {
            this.profile = profile;
            this.updateView();
        });
    }
    set authRequireLogin(show) {
        this.updateView();
    }
    set authRequireLoginElse(ref) {
        this.elseRef = ref;
        this.updateView();
    }
    set authRequireLoginThen(ref) {
        this.thenRef = ref;
        this.updateView();
    }
    updateView() {
        this.viewContainer.clear();
        if (this.profile) {
            this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, {
                $implicit: this.profile,
            });
        }
        else if (!!this.elseRef) {
            this.viewContainer.createEmbeddedView(this.elseRef);
        }
    }
}
RequireLoginDirective.ɵfac = function RequireLoginDirective_Factory(t) { return new (t || RequireLoginDirective)(i0.ɵɵdirectiveInject(i1.OidcAuthService), i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
RequireLoginDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: RequireLoginDirective, selectors: [["", "authRequireLogin", ""]], inputs: { authRequireLogin: "authRequireLogin", authRequireLoginElse: "authRequireLoginElse", authRequireLoginThen: "authRequireLoginThen" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequireLoginDirective, [{
        type: Directive,
        args: [{
                selector: '[authRequireLogin]'
            }]
    }], function () { return [{ type: i1.OidcAuthService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, { authRequireLogin: [{
            type: Input
        }], authRequireLoginElse: [{
            type: Input
        }], authRequireLoginThen: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1sb2dpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdXRoLW9pZGMvc3JjL2xpYi9kaXJlY3RpdmVzL3JlcXVpcmUtbG9naW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFpQyxNQUFNLGVBQWUsQ0FBQzs7O0FBTWhGLE1BQU0sT0FBTyxxQkFBcUI7SUFNaEMsWUFBb0IsV0FBNEIsRUFDdEMsV0FBNkIsRUFDN0IsYUFBK0I7UUFGckIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFOakMsWUFBTyxHQUFRLFNBQVMsQ0FBQztRQVEvQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDekIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUNJLGdCQUFnQixDQUFDLElBQWE7UUFDaEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUNJLG9CQUFvQixDQUFDLEdBQXFCO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFDSSxvQkFBb0IsQ0FBQyxHQUFxQjtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTNCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEQsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ3hCLENBQUMsQ0FBQztTQUNKO2FBQ0ksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7OzBGQTlDVSxxQkFBcUI7d0VBQXJCLHFCQUFxQjt1RkFBckIscUJBQXFCO2NBSGpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzJIQW1CSyxnQkFBZ0I7a0JBRG5CLEtBQUs7WUFNRixvQkFBb0I7a0JBRHZCLEtBQUs7WUFPRixvQkFBb0I7a0JBRHZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2lkY0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2F1dGhSZXF1aXJlTG9naW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXF1aXJlTG9naW5EaXJlY3RpdmUge1xuXG4gIHByaXZhdGUgcHJvZmlsZTogYW55ID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIHRoZW5SZWY6IFRlbXBsYXRlUmVmPGFueT58dW5kZWZpbmVkO1xuICBwcml2YXRlIGVsc2VSZWY6IFRlbXBsYXRlUmVmPGFueT58dW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IE9pZGNBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikgXG4gIHsgXG4gICAgdGhpcy5hdXRoU2VydmljZS51c2VyU3ViamVjdFxuICAgICAgLnN1YnNjcmliZShwcm9maWxlID0+IHtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gcHJvZmlsZTtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBhdXRoUmVxdWlyZUxvZ2luKHNob3c6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBhdXRoUmVxdWlyZUxvZ2luRWxzZShyZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLmVsc2VSZWYgPSByZWY7XG4gICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgYXV0aFJlcXVpcmVMb2dpblRoZW4ocmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgdGhpcy50aGVuUmVmID0gcmVmO1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgdXBkYXRlVmlldygpIDogdm9pZCB7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICBpZiAodGhpcy5wcm9maWxlKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgICAhIXRoaXMudGhlblJlZiA/IHRoaXMudGhlblJlZiA6IHRoaXMudGVtcGxhdGVSZWYsIHtcbiAgICAgICAgJGltcGxpY2l0OiB0aGlzLnByb2ZpbGUsXG4gICAgICB9KTtcbiAgICB9IFxuICAgIGVsc2UgaWYgKCEhdGhpcy5lbHNlUmVmKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuZWxzZVJlZik7XG4gICAgfVxuICB9XG59XG4iXX0=