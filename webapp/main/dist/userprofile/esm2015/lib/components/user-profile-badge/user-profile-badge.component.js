import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/user-profile.service";
import * as i2 from "@angular/router";
import * as i3 from "utils";
import * as i4 from "../user-profile-badge-view/user-profile-badge-view.component";
import * as i5 from "@angular/common";
export class UserProfileBadgeComponent {
    constructor(userProfileService, router, activatedRoute) {
        this.userProfileService = userProfileService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.onSelect = (item) => { };
        this.errorDesc = "";
        this.loading = false;
        this.response = null;
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            var _a;
            this.userId = (_a = params.userId) !== null && _a !== void 0 ? _a : this.paramUserId;
            this.fetchUserProfile(this.userId);
        });
    }
    fetchUserProfile(userId) {
        this.userId = userId;
        this.loading = true;
        this.userProfileService.one("", this.userId)
            .subscribe({
            next: (result) => {
                this.response = result;
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                console.log(this.errorDesc);
            }
        });
    }
    get userProfileItem() {
        return this.response;
    }
    handleViewEvent(evt) {
        switch (evt.opcode) {
            case 'select':
                this.onSelect(evt.item);
                break;
        }
    }
}
UserProfileBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileBadgeComponent, deps: [{ token: i1.UserProfileService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
UserProfileBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: UserProfileBadgeComponent, selector: "user-profile-badge", inputs: { paramUserId: ["userid", "paramUserId"], contentTemplate: "contentTemplate", onSelect: "onSelect" }, ngImport: i0, template: "<utils-loader *ngIf=\"loading; else contents\"></utils-loader>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc; else viewer\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #viewer>\n    <user-profile-badge-view\n        [userProfile]=\"userProfileItem\" \n        [contentTemplate]=\"contentTemplate\"\n        (onSelectItem)=\"handleViewEvent($event)\">\n    </user-profile-badge-view>\n</ng-template>", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i4.UserProfileBadgeViewComponent, selector: "user-profile-badge-view", inputs: ["userProfile", "contentTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'user-profile-badge',
                    templateUrl: './user-profile-badge.component.html',
                    styleUrls: ['./user-profile-badge.component.css']
                }]
        }], ctorParameters: function () { return [{ type: i1.UserProfileService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { paramUserId: [{
                type: Input,
                args: ["userid"]
            }], contentTemplate: [{
                type: Input
            }], onSelect: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLWJhZGdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VzZXJwcm9maWxlL3NyYy9saWIvY29tcG9uZW50cy91c2VyLXByb2ZpbGUtYmFkZ2UvdXNlci1wcm9maWxlLWJhZGdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VzZXJwcm9maWxlL3NyYy9saWIvY29tcG9uZW50cy91c2VyLXByb2ZpbGUtYmFkZ2UvdXNlci1wcm9maWxlLWJhZGdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQVd0RSxNQUFNLE9BQU8seUJBQXlCO0lBWXBDLFlBQ1Usa0JBQXNDLEVBQ3RDLE1BQWMsRUFDZCxjQUE4QjtRQUY5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFYL0IsYUFBUSxHQUFzQyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBS3BFLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQU92QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTs7WUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFBLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFPLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFjO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDekMsU0FBUyxDQUNWO1lBQ0UsSUFBSSxFQUFFLENBQUMsTUFBZ0MsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQztZQUNELEtBQUssRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUE4QjtRQUM1QyxRQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDakIsS0FBSyxRQUFRO2dCQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFDLE1BQU07U0FDL0M7SUFDSCxDQUFDOztzSEF2RFUseUJBQXlCOzBHQUF6Qix5QkFBeUIsd0tDWHRDLDRoQkFjYzsyRkRIRCx5QkFBeUI7a0JBTHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsV0FBVyxFQUFFLHFDQUFxQztvQkFDbEQsU0FBUyxFQUFFLENBQUMsb0NBQW9DLENBQUM7aUJBQ2xEOzJKQUdrQixXQUFXO3NCQUEzQixLQUFLO3VCQUFDLFFBQVE7Z0JBQ04sZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZU1vZGVsLCBVc2VyUHJvZmlsZVJlc3BvbnNlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdXNlci1wcm9maWxlJztcbmltcG9ydCB7IFVzZXJQcm9maWxlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXItcHJvZmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJQcm9maWxlQmFkZ2VWaWV3RXZlbnQgfSBmcm9tICcuLi91c2VyLXByb2ZpbGUtYmFkZ2Utdmlldy91c2VyLXByb2ZpbGUtYmFkZ2Utdmlldy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1c2VyLXByb2ZpbGUtYmFkZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vdXNlci1wcm9maWxlLWJhZGdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdXNlci1wcm9maWxlLWJhZGdlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBVc2VyUHJvZmlsZUJhZGdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoXCJ1c2VyaWRcIikgcGFyYW1Vc2VySWQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgb25TZWxlY3Q6ICh0b3BpYzogVXNlclByb2ZpbGVNb2RlbCkgPT4gdm9pZCA9IChpdGVtKSA9PiB7fTtcblxuICB1c2VySWQ/OiBzdHJpbmc7XG5cbiAgcmVzcG9uc2UgOiBVc2VyUHJvZmlsZVJlc3BvbnNlTW9kZWx8bnVsbDtcbiAgZXJyb3JEZXNjOiBhbnkgPSBcIlwiO1xuICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB1c2VyUHJvZmlsZVNlcnZpY2U6IFVzZXJQcm9maWxlU2VydmljZSwgXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIFxuICB7IFxuICAgIHRoaXMucmVzcG9uc2UgPSBudWxsO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICB0aGlzLnVzZXJJZCA9IHBhcmFtcy51c2VySWQgPz8gdGhpcy5wYXJhbVVzZXJJZDtcbiAgICAgIHRoaXMuZmV0Y2hVc2VyUHJvZmlsZSh0aGlzLnVzZXJJZCEpO1xuICAgIH0pO1xuICB9XG5cbiAgZmV0Y2hVc2VyUHJvZmlsZSh1c2VySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnVzZXJQcm9maWxlU2VydmljZS5vbmUoXCJcIiwgdGhpcy51c2VySWQpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAge1xuICAgICAgICBuZXh0OiAocmVzdWx0OiBVc2VyUHJvZmlsZVJlc3BvbnNlTW9kZWwpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc3BvbnNlID0gcmVzdWx0O1xuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvckRlc2MgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVycm9yRGVzYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0IHVzZXJQcm9maWxlSXRlbSgpOiBVc2VyUHJvZmlsZU1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5yZXNwb25zZSE7XG4gIH1cblxuICBoYW5kbGVWaWV3RXZlbnQoZXZ0OiBVc2VyUHJvZmlsZUJhZGdlVmlld0V2ZW50KSB7XG4gICAgc3dpdGNoKGV2dC5vcGNvZGUpIHtcbiAgICAgIGNhc2UgJ3NlbGVjdCc6IHRoaXMub25TZWxlY3QoZXZ0Lml0ZW0pOyBicmVhaztcbiAgICB9XG4gIH1cbn1cbiIsIjx1dGlscy1sb2FkZXIgKm5nSWY9XCJsb2FkaW5nOyBlbHNlIGNvbnRlbnRzXCI+PC91dGlscy1sb2FkZXI+XG5cbjxuZy10ZW1wbGF0ZSAjY29udGVudHM+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwiZXJyb3JEZXNjOyBlbHNlIHZpZXdlclwiIFtkaXNtaXNzYWJsZV09XCJmYWxzZVwiIFttaW5pbWFsXT1cImZhbHNlXCI+XG4gICAgICAgIDxwPkFuIGVycm9yIG9jY3VycmVkIGFjY2Vzc2luZyB0aGUgcG9zdDoge3sgZXJyb3JEZXNjIH19PC9wPlxuICAgIDwvdXRpbHMtYWxlcnQ+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI3ZpZXdlcj5cbiAgICA8dXNlci1wcm9maWxlLWJhZGdlLXZpZXdcbiAgICAgICAgW3VzZXJQcm9maWxlXT1cInVzZXJQcm9maWxlSXRlbVwiIFxuICAgICAgICBbY29udGVudFRlbXBsYXRlXT1cImNvbnRlbnRUZW1wbGF0ZVwiXG4gICAgICAgIChvblNlbGVjdEl0ZW0pPVwiaGFuZGxlVmlld0V2ZW50KCRldmVudClcIj5cbiAgICA8L3VzZXItcHJvZmlsZS1iYWRnZS12aWV3PlxuPC9uZy10ZW1wbGF0ZT4iXX0=