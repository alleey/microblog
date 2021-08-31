import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = function (a0) { return { $implicit: a0 }; };
function BadgeComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    const _r4 = i0.ɵɵreference(5);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.inactiveControlTemplate || _r4)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx_r0));
} }
function BadgeComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0, 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const _r2 = i0.ɵɵreference(3);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r1.activeControlTemplate || _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx_r1));
} }
function BadgeComponent_ng_template_2_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 8);
    i0.ɵɵelementEnd();
} }
const _c1 = function (a1) { return ["btn", a1]; };
function BadgeComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function BadgeComponent_ng_template_2_Template_a_click_0_listener() { const item_r6 = ctx.$implicit; return item_r6.fireRemove(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 5, 6);
    i0.ɵɵprojection(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, BadgeComponent_ng_template_2_span_5_Template, 2, 0, "span", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const _r7 = i0.ɵɵreference(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c1, "btn-" + item_r6.kind));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r6.activeCaption, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !_r7.innerHTML.trim());
} }
function BadgeComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function BadgeComponent_ng_template_4_Template_a_click_0_listener() { const item_r10 = ctx.$implicit; return item_r10.fireAdd(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, "btn-outline-" + item_r10.kind));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r10.inactiveCaption || item_r10.activeCaption, " ");
} }
const _c2 = ["*"];
export class BadgeComponent {
    constructor() {
        this.isActive = false;
        this.activeCaption = "";
        this.inactiveCaption = "";
        this.kind = "primary";
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    ngOnInit() { }
    fireAdd() {
        this.onAdd.emit();
    }
    fireRemove() {
        this.onRemove.emit();
    }
}
BadgeComponent.ɵfac = function BadgeComponent_Factory(t) { return new (t || BadgeComponent)(); };
BadgeComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BadgeComponent, selectors: [["utils-badge"]], inputs: { isActive: "isActive", activeCaption: "activeCaption", inactiveCaption: "inactiveCaption", kind: "kind", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, outputs: { onAdd: "onAdd", onRemove: "onRemove" }, ngContentSelectors: _c2, decls: 6, vars: 2, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], ["defaultActiveControlTemplate", ""], ["defaultInactiveControlTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 3, "ngClass", "click"], [1, "badge", "badge-light"], ["ref", ""], [4, "ngIf"], [1, "fa", "fa-star"]], template: function BadgeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, BadgeComponent_ng_container_0_Template, 1, 4, "ng-container", 0);
        i0.ɵɵtemplate(1, BadgeComponent_ng_container_1_Template, 1, 4, "ng-container", 0);
        i0.ɵɵtemplate(2, BadgeComponent_ng_template_2_Template, 6, 5, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(4, BadgeComponent_ng_template_4_Template, 2, 4, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.isActive);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isActive);
    } }, directives: [i1.NgIf, i1.NgTemplateOutlet, i1.NgClass], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BadgeComponent, [{
        type: Component,
        args: [{
                selector: 'utils-badge',
                templateUrl: './badge.component.html',
                styleUrls: ['./badge.component.css']
            }]
    }], function () { return []; }, { isActive: [{
            type: Input
        }], activeCaption: [{
            type: Input
        }], inactiveCaption: [{
            type: Input
        }], kind: [{
            type: Input
        }], activeControlTemplate: [{
            type: Input
        }], inactiveControlTemplate: [{
            type: Input
        }], onAdd: [{
            type: Output
        }], onRemove: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdXRpbHMvc3JjL2xpYi9jb21wb25lbnRzL2JhZGdlL2JhZGdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3V0aWxzL3NyYy9saWIvY29tcG9uZW50cy9iYWRnZS9iYWRnZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7OztJQ0E1RiwyQkFJZTs7OztJQUZYLHdFQUE4RSwrREFBQTs7O0lBR2xGLDJCQUllOzs7O0lBRlgsc0VBQTBFLCtEQUFBOzs7SUFRdEUsNEJBQW9DO0lBQ2hDLHVCQUEwQjtJQUM5QixpQkFBTzs7OztJQUxYLDRCQUFxRjtJQUE1QixtSUFBUyxvQkFBaUIsSUFBQztJQUNoRixZQUNBO0lBQUEsa0NBQXFDO0lBQUEsa0JBQXlCO0lBQUEsaUJBQU87SUFDckUsK0VBRU87SUFDWCxpQkFBSTs7OztJQU5hLDJFQUF1QztJQUNwRCxlQUNBO0lBREEsc0RBQ0E7SUFDTyxlQUEyQjtJQUEzQiw0Q0FBMkI7OztJQU90Qyw0QkFBMEY7SUFBekIsb0lBQVMsa0JBQWMsSUFBQztJQUNyRixZQUNKO0lBQUEsaUJBQUk7OztJQUZhLG9GQUErQztJQUM1RCxlQUNKO0lBREksbUZBQ0o7OztBRGpCSixNQUFNLE9BQU8sY0FBYztJQWF6QjtRQVhTLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFDM0Isb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0IsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUt4QixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUV4QixDQUFDO0lBRWpCLFFBQVEsS0FBVSxDQUFDO0lBRW5CLE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs0RUF2QlUsY0FBYztpRUFBZCxjQUFjOztRQ1AzQixpRkFJZTtRQUNmLGlGQUllO1FBRWYsZ0hBUWM7UUFFZCxnSEFJYzs7UUF4QlQsb0NBQWU7UUFLZixlQUFjO1FBQWQsbUNBQWM7O3VGRENOLGNBQWM7Y0FMMUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzthQUNyQztzQ0FHVSxRQUFRO2tCQUFoQixLQUFLO1lBQ0csYUFBYTtrQkFBckIsS0FBSztZQUNHLGVBQWU7a0JBQXZCLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFFRyxxQkFBcUI7a0JBQTdCLEtBQUs7WUFDRyx1QkFBdUI7a0JBQS9CLEtBQUs7WUFFSSxLQUFLO2tCQUFkLE1BQU07WUFDRyxRQUFRO2tCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXRpbHMtYmFkZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFkZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9iYWRnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQmFkZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFjdGl2ZUNhcHRpb246IHN0cmluZyA9IFwiXCI7XG4gIEBJbnB1dCgpIGluYWN0aXZlQ2FwdGlvbjogc3RyaW5nID0gXCJcIjtcbiAgQElucHV0KCkga2luZDogc3RyaW5nID0gXCJwcmltYXJ5XCI7XG5cbiAgQElucHV0KCkgYWN0aXZlQ29udHJvbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBpbmFjdGl2ZUNvbnRyb2xUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICBAT3V0cHV0KCkgb25BZGQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBmaXJlQWRkKCk6IHZvaWQge1xuICAgIHRoaXMub25BZGQuZW1pdCgpO1xuICB9XG5cbiAgZmlyZVJlbW92ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9uUmVtb3ZlLmVtaXQoKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciBcbiAgICAqbmdJZj1cIiFpc0FjdGl2ZVwiIFxuICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImluYWN0aXZlQ29udHJvbFRlbXBsYXRlIHx8IGRlZmF1bHRJbmFjdGl2ZUNvbnRyb2xUZW1wbGF0ZVwiXG4gICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0aGlzIH1cIj5cbjwvbmctY29udGFpbmVyPlxuPG5nLWNvbnRhaW5lciBcbiAgICAqbmdJZj1cImlzQWN0aXZlXCIgXG4gICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiYWN0aXZlQ29udHJvbFRlbXBsYXRlIHx8IGRlZmF1bHRBY3RpdmVDb250cm9sVGVtcGxhdGVcIlxuICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0QWN0aXZlQ29udHJvbFRlbXBsYXRlIGxldC1pdGVtPlxuICAgIDxhIHR5cGU9XCJidXR0b25cIiBbbmdDbGFzc109XCJbJ2J0bicsICdidG4tJyArIGl0ZW0ua2luZF1cIiAoY2xpY2spPVwiaXRlbS5maXJlUmVtb3ZlKClcIj5cbiAgICAgICAge3tpdGVtLmFjdGl2ZUNhcHRpb259fVxuICAgICAgICA8c3BhbiAjcmVmIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtbGlnaHRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiFyZWYuaW5uZXJIVE1MLnRyaW0oKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zdGFyXCI+PC9pPlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9hPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0SW5hY3RpdmVDb250cm9sVGVtcGxhdGUgbGV0LWl0ZW0+XG4gICAgPGEgdHlwZT1cImJ1dHRvblwiIFtuZ0NsYXNzXT1cIlsnYnRuJywgJ2J0bi1vdXRsaW5lLScgKyBpdGVtLmtpbmRdXCIgKGNsaWNrKT1cIml0ZW0uZmlyZUFkZCgpXCI+XG4gICAgICAgIHt7aXRlbS5pbmFjdGl2ZUNhcHRpb24gfHwgaXRlbS5hY3RpdmVDYXB0aW9ufX1cbiAgICA8L2E+XG48L25nLXRlbXBsYXRlPiJdfQ==