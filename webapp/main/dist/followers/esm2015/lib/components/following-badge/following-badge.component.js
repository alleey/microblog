import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/following.service";
import * as i2 from "auth-oidc";
import * as i3 from "utils";
export class FollowingBadgeComponent {
    constructor(service, authService) {
        this.service = service;
        this.authService = authService;
        this.userId = "";
        this.userName = "";
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
        this.service.followingOne("", "", this.userId).subscribe({
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
    follow() {
        const request = {
            userId: this.userId,
            userName: this.userName,
            followedById: "",
            followedByName: ""
        };
        this.service.follow("", request).subscribe({
            error: (err) => {
                console.log(err.message);
            }
        });
    }
    unfollow() {
        if (this.item)
            this.service.unfollow("", "", this.item.userId).subscribe({
                next: () => { },
                error: (err) => {
                    console.log(err.message);
                }
            });
    }
}
FollowingBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingBadgeComponent, deps: [{ token: i1.FollowingService }, { token: i2.OidcAuthService }], target: i0.ɵɵFactoryTarget.Component });
FollowingBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FollowingBadgeComponent, selector: "following-badge", inputs: { userId: ["userid", "userId"], userName: "userName", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'FOLLOWING'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\"\n    (onAdd)=\"follow()\"\n    (onRemove)=\"unfollow()\">\n</utils-badge>", styles: [""], components: [{ type: i3.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowingBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'following-badge',
                    templateUrl: './following-badge.component.html',
                    styleUrls: ['./following-badge.component.css']
                }]
        }], ctorParameters: function () { return [{ type: i1.FollowingService }, { type: i2.OidcAuthService }]; }, propDecorators: { userId: [{
                type: Input,
                args: ["userid"]
            }], userName: [{
                type: Input
            }], activeControlTemplate: [{
                type: Input
            }], inactiveControlTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93aW5nLWJhZGdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZvbGxvd2Vycy9zcmMvbGliL2NvbXBvbmVudHMvZm9sbG93aW5nLWJhZGdlL2ZvbGxvd2luZy1iYWRnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mb2xsb3dlcnMvc3JjL2xpYi9jb21wb25lbnRzL2ZvbGxvd2luZy1iYWRnZS9mb2xsb3dpbmctYmFkZ2UuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXVCLE1BQU0sZUFBZSxDQUFDOzs7OztBQVV0RSxNQUFNLE9BQU8sdUJBQXVCO0lBV2xDLFlBQW9CLE9BQXlCLEVBQVUsV0FBNEI7UUFBL0QsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFUbEUsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBTS9CLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFHdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRLEtBQVcsQ0FBQztJQUVwQixJQUFJLFFBQVE7O1FBQ1YsT0FBTyxDQUFBLE1BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsTUFBTSxLQUFJLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUN2RCxJQUFJLEVBQUUsQ0FBQyxNQUE4QixFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2dCQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV0QixDQUFDO1lBQ0QsS0FBSyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLE9BQU8sR0FBa0I7WUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixZQUFZLEVBQUUsRUFBRTtZQUNoQixjQUFjLEVBQUUsRUFBRTtTQUNuQixDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUN2QyxLQUFLLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBRyxJQUFJLENBQUMsSUFBSTtZQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3pELElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO2dCQUNkLEtBQUssRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO29CQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQzthQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7O29IQTVEVSx1QkFBdUI7d0dBQXZCLHVCQUF1QiwyTkNWcEMsNlFBT2M7MkZER0QsdUJBQXVCO2tCQUxuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFdBQVcsRUFBRSxrQ0FBa0M7b0JBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO2lCQUMvQztxSUFHa0IsTUFBTTtzQkFBdEIsS0FBSzt1QkFBQyxRQUFRO2dCQUNOLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLHVCQUF1QjtzQkFBL0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9pZGNBdXRoU2VydmljZSB9IGZyb20gJ2F1dGgtb2lkYyc7XG5pbXBvcnQgeyBGb2xsb3dpbmdNb2RlbCwgRm9sbG93aW5nUmVzcG9uc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9mb2xsb3dpbmcnO1xuaW1wb3J0IHsgRm9sbG93aW5nU2VydmljZSwgRm9sbG93UmVxdWVzdCB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZvbGxvd2luZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9sbG93aW5nLWJhZGdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZvbGxvd2luZy1iYWRnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZvbGxvd2luZy1iYWRnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9sbG93aW5nQmFkZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dChcInVzZXJpZFwiKSB1c2VySWQ6IHN0cmluZyA9IFwiXCI7XG4gIEBJbnB1dCgpIHVzZXJOYW1lOiBzdHJpbmcgPSBcIlwiO1xuXG4gIEBJbnB1dCgpIGFjdGl2ZUNvbnRyb2xUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgaW5hY3RpdmVDb250cm9sVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgaXRlbT86IEZvbGxvd2luZ01vZGVsO1xuICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBGb2xsb3dpbmdTZXJ2aWNlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBPaWRjQXV0aFNlcnZpY2UpIHsgXG4gICAgdGhpcy5hdXRoU2VydmljZS51c2VyU3ViamVjdC5zdWJzY3JpYmUocHJvZmlsZSA9PiB7XG4gICAgICB0aGlzLmNoZWNrU3RhdHVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHsgfVxuXG4gIGdldCBpc0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtPy51c2VySWQgIT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgY2hlY2tTdGF0dXMoKSB7XG4gICAgdGhpcy5zZXJ2aWNlLmZvbGxvd2luZ09uZShcIlwiLCBcIlwiLCB0aGlzLnVzZXJJZCkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChyZXN1bHQ6IEZvbGxvd2luZ1Jlc3BvbnNlTW9kZWwpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgXG4gICAgICB9LFxuICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9sbG93KCk6IHZvaWQge1xuICAgIGNvbnN0IHJlcXVlc3Q6IEZvbGxvd1JlcXVlc3QgPSB7XG4gICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxuICAgICAgdXNlck5hbWU6IHRoaXMudXNlck5hbWUsXG4gICAgICBmb2xsb3dlZEJ5SWQ6IFwiXCIsXG4gICAgICBmb2xsb3dlZEJ5TmFtZTogXCJcIlxuICAgIH07XG4gICAgdGhpcy5zZXJ2aWNlLmZvbGxvdyhcIlwiLCByZXF1ZXN0KS5zdWJzY3JpYmUoe1xuICAgICAgICBlcnJvcjogKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHVuZm9sbG93KCk6IHZvaWQge1xuICAgIGlmKHRoaXMuaXRlbSlcbiAgICAgIHRoaXMuc2VydmljZS51bmZvbGxvdyhcIlwiLCBcIlwiLCB0aGlzLml0ZW0hLnVzZXJJZCkuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogKCkgPT4ge30sXG4gICAgICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iLCI8dXRpbHMtYmFkZ2UgXG4gICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgICBbYWN0aXZlQ2FwdGlvbl09XCInRk9MTE9XSU5HJ1wiXG4gICAgW2FjdGl2ZUNvbnRyb2xUZW1wbGF0ZV09XCJhY3RpdmVDb250cm9sVGVtcGxhdGVcIlxuICAgIFtpbmFjdGl2ZUNvbnRyb2xUZW1wbGF0ZV09XCJpbmFjdGl2ZUNvbnRyb2xUZW1wbGF0ZVwiXG4gICAgKG9uQWRkKT1cImZvbGxvdygpXCJcbiAgICAob25SZW1vdmUpPVwidW5mb2xsb3coKVwiPlxuPC91dGlscy1iYWRnZT4iXX0=