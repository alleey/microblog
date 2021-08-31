import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/following.service";
import * as i2 from "auth-oidc";
import * as i3 from "utils";
export class FollowedByBadgeComponent {
    constructor(service, authService) {
        this.service = service;
        this.authService = authService;
        this.userId = "";
        this.loading = false;
        this.authService.userSubject.subscribe(profile => {
            this.checkStatus();
        });
    }
    ngOnInit() { }
    get isActive() {
        var _a;
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.userId) != undefined;
    }
    checkStatus() {
        this.service.followedByOne("", "", this.userId).subscribe({
            next: (result) => {
                this.item = result;
                this.loading = false;
                console.log(result);
            },
            error: (err) => {
                this.loading = false;
                console.log(err.message);
            }
        });
    }
}
FollowedByBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowedByBadgeComponent, deps: [{ token: i1.FollowingService }, { token: i2.OidcAuthService }], target: i0.ɵɵFactoryTarget.Component });
FollowedByBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowedByBadgeComponent, selector: "followed-by-badge", inputs: { userId: ["userid", "userId"], activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'FOLLOWS YOU'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\">\n</utils-badge>", styles: [""], components: [{ type: i3.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowedByBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'followed-by-badge',
                    templateUrl: './followed-by-badge.component.html',
                    styleUrls: ['./followed-by-badge.component.css']
                }]
        }], ctorParameters: function () { return [{ type: i1.FollowingService }, { type: i2.OidcAuthService }]; }, propDecorators: { userId: [{
                type: Input,
                args: ["userid"]
            }], activeControlTemplate: [{
                type: Input
            }], inactiveControlTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93ZWQtYnktYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZm9sbG93ZXJzL3NyYy9saWIvY29tcG9uZW50cy9mb2xsb3dlZC1ieS1iYWRnZS9mb2xsb3dlZC1ieS1iYWRnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mb2xsb3dlcnMvc3JjL2xpYi9jb21wb25lbnRzL2ZvbGxvd2VkLWJ5LWJhZGdlL2ZvbGxvd2VkLWJ5LWJhZGdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFVdEUsTUFBTSxPQUFPLHdCQUF3QjtJQVVuQyxZQUFvQixPQUF5QixFQUFVLFdBQTRCO1FBQS9ELFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBUmxFLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFNckMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUd2QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsS0FBVyxDQUFDO0lBRXBCLElBQUksUUFBUTs7UUFDVixPQUFPLENBQUEsTUFBQSxJQUFJLENBQUMsSUFBSSwwQ0FBRSxNQUFNLEtBQUksU0FBUyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3hELElBQUksRUFBRSxDQUFDLE1BQStCLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXRCLENBQUM7WUFDRCxLQUFLLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOztxSEFuQ1Usd0JBQXdCO3lHQUF4Qix3QkFBd0IsdU1DVnJDLHNOQUtjOzJGREtELHdCQUF3QjtrQkFMcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixXQUFXLEVBQUUsb0NBQW9DO29CQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDakQ7cUlBR2tCLE1BQU07c0JBQXRCLEtBQUs7dUJBQUMsUUFBUTtnQkFFTixxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0csdUJBQXVCO3NCQUEvQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2lkY0F1dGhTZXJ2aWNlIH0gZnJvbSAnYXV0aC1vaWRjJztcbmltcG9ydCB7IEZvbGxvd2VkQnlNb2RlbCwgRm9sbG93ZWRCeVJlc3BvbnNlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvZm9sbG93ZWQtYnknO1xuaW1wb3J0IHsgRm9sbG93aW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZvbGxvd2luZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9sbG93ZWQtYnktYmFkZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9sbG93ZWQtYnktYmFkZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb2xsb3dlZC1ieS1iYWRnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9sbG93ZWRCeUJhZGdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoXCJ1c2VyaWRcIikgdXNlcklkOiBzdHJpbmcgPSBcIlwiO1xuXG4gIEBJbnB1dCgpIGFjdGl2ZUNvbnRyb2xUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgaW5hY3RpdmVDb250cm9sVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgaXRlbT86IEZvbGxvd2VkQnlNb2RlbDtcbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRm9sbG93aW5nU2VydmljZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogT2lkY0F1dGhTZXJ2aWNlKSB7IFxuICAgIHRoaXMuYXV0aFNlcnZpY2UudXNlclN1YmplY3Quc3Vic2NyaWJlKHByb2ZpbGUgPT4ge1xuICAgICAgdGhpcy5jaGVja1N0YXR1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7IH1cblxuICBnZXQgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbT8udXNlcklkICE9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNoZWNrU3RhdHVzKCkge1xuICAgIHRoaXMuc2VydmljZS5mb2xsb3dlZEJ5T25lKFwiXCIsIFwiXCIsIHRoaXMudXNlcklkKS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKHJlc3VsdDogRm9sbG93ZWRCeVJlc3BvbnNlTW9kZWwpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgXG4gICAgICB9LFxuICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCI8dXRpbHMtYmFkZ2UgXG4gICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgICBbYWN0aXZlQ2FwdGlvbl09XCInRk9MTE9XUyBZT1UnXCJcbiAgICBbYWN0aXZlQ29udHJvbFRlbXBsYXRlXT1cImFjdGl2ZUNvbnRyb2xUZW1wbGF0ZVwiXG4gICAgW2luYWN0aXZlQ29udHJvbFRlbXBsYXRlXT1cImluYWN0aXZlQ29udHJvbFRlbXBsYXRlXCI+XG48L3V0aWxzLWJhZGdlPiJdfQ==