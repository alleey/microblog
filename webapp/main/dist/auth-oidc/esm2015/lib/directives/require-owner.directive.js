import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
export class RequireOwnerDirective {
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
    set authRequireOwner(ownerId) {
        var _a;
        const show = (ownerId.toLowerCase() === ((_a = this.profile) === null || _a === void 0 ? void 0 : _a.sub.toLowerCase()));
        if (show != this.show) {
            this.show = show;
            this.updateView();
        }
    }
    set authRequireOwnerElse(ref) {
        this.elseRef = ref;
        this.updateView();
    }
    set authRequireOwnerThen(ref) {
        this.thenRef = ref;
        this.updateView();
    }
    updateView() {
        this.viewContainer.clear();
        if (this.show) {
            this.viewContainer.createEmbeddedView(!!this.thenRef ? this.thenRef : this.templateRef, { $implicit: this.profile });
        }
        else if (!!this.elseRef) {
            this.viewContainer.createEmbeddedView(this.elseRef);
        }
    }
}
RequireOwnerDirective.ɵfac = function RequireOwnerDirective_Factory(t) { return new (t || RequireOwnerDirective)(i0.ɵɵdirectiveInject(i1.OidcAuthService), i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
RequireOwnerDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: RequireOwnerDirective, selectors: [["", "authRequireOwner", ""]], inputs: { authRequireOwner: "authRequireOwner", authRequireOwnerElse: "authRequireOwnerElse", authRequireOwnerThen: "authRequireOwnerThen" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequireOwnerDirective, [{
        type: Directive,
        args: [{
                selector: '[authRequireOwner]'
            }]
    }], function () { return [{ type: i1.OidcAuthService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, { authRequireOwner: [{
            type: Input
        }], authRequireOwnerElse: [{
            type: Input
        }], authRequireOwnerThen: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1vd25lci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdXRoLW9pZGMvc3JjL2xpYi9kaXJlY3RpdmVzL3JlcXVpcmUtb3duZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFpQyxNQUFNLGVBQWUsQ0FBQzs7O0FBTWhGLE1BQU0sT0FBTyxxQkFBcUI7SUFPaEMsWUFBb0IsV0FBNEIsRUFDdEMsV0FBNkIsRUFDN0IsYUFBK0I7UUFGckIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFQakMsWUFBTyxHQUFRLFNBQVMsQ0FBQztRQUd6QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBTTVCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUN6QixTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQ0ksZ0JBQWdCLENBQUMsT0FBZTs7UUFDbEMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQUssTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUEsQ0FBQyxDQUFDO1FBQ3pFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVELElBQ0ksb0JBQW9CLENBQUMsR0FBcUI7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUNJLG9CQUFvQixDQUFDLEdBQXFCO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUM5RSxDQUFDO1NBQ0g7YUFDSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQzs7MEZBbERVLHFCQUFxQjt3RUFBckIscUJBQXFCO3VGQUFyQixxQkFBcUI7Y0FIakMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7YUFDL0I7MkhBb0JLLGdCQUFnQjtrQkFEbkIsS0FBSztZQVVGLG9CQUFvQjtrQkFEdkIsS0FBSztZQU9GLG9CQUFvQjtrQkFEdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPaWRjQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXV0aFJlcXVpcmVPd25lcl0nXG59KVxuZXhwb3J0IGNsYXNzIFJlcXVpcmVPd25lckRpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBwcm9maWxlOiBhbnkgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgdGhlblJlZjogVGVtcGxhdGVSZWY8YW55Pnx1bmRlZmluZWQ7XG4gIHByaXZhdGUgZWxzZVJlZjogVGVtcGxhdGVSZWY8YW55Pnx1bmRlZmluZWQ7XG4gIHByaXZhdGUgc2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IE9pZGNBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikgXG4gIHsgXG4gICAgdGhpcy5hdXRoU2VydmljZS51c2VyU3ViamVjdFxuICAgICAgLnN1YnNjcmliZShwcm9maWxlID0+IHtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gcHJvZmlsZTtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBhdXRoUmVxdWlyZU93bmVyKG93bmVySWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNob3cgPSAob3duZXJJZC50b0xvd2VyQ2FzZSgpID09PSB0aGlzLnByb2ZpbGU/LnN1Yi50b0xvd2VyQ2FzZSgpKTtcbiAgICBpZiAoc2hvdyAhPSB0aGlzLnNob3cpIHtcbiAgICAgIHRoaXMuc2hvdyA9IHNob3c7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgYXV0aFJlcXVpcmVPd25lckVsc2UocmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgdGhpcy5lbHNlUmVmID0gcmVmO1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGF1dGhSZXF1aXJlT3duZXJUaGVuKHJlZjogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIHRoaXMudGhlblJlZiA9IHJlZjtcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoKSA6IHZvaWQge1xuICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuXG4gICAgaWYgKHRoaXMuc2hvdykge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgICAgISF0aGlzLnRoZW5SZWYgPyB0aGlzLnRoZW5SZWYgOiB0aGlzLnRlbXBsYXRlUmVmLCB7ICRpbXBsaWNpdDogdGhpcy5wcm9maWxlIH1cbiAgICAgICk7XG4gICAgfSBcbiAgICBlbHNlIGlmICghIXRoaXMuZWxzZVJlZikge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmVsc2VSZWYpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=