import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class UserProfileBadgeViewComponent {
    constructor() {
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    get userId() {
        return this.userProfile.id;
    }
    selectItem(item, opcode) {
        this.onSelectItem.emit({
            opcode: opcode,
            item: item
        });
    }
}
UserProfileBadgeViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileBadgeViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserProfileBadgeViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: UserProfileBadgeViewComponent, selector: "user-profile-badge-view", inputs: { userProfile: "userProfile", contentTemplate: "contentTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container \n  [ngTemplateOutlet]=\"contentTemplate || defaultContentTemplate\"\n  [ngTemplateOutletContext]=\"{ $implicit: userProfile, list: this }\" \n  *ngIf=\"userProfile\">\n</ng-container>\n\n<ng-template #defaultContentTemplate let-item let-parent=\"list\">\n  <span (click)=\"parent.selectItem(item, 'select')\" class=\"fullname\">{{item.firstName}} {{item.lastName}}</span>\n</ng-template>\n", styles: [".fullname{font-weight:700}"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileBadgeViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'user-profile-badge-view',
                    templateUrl: './user-profile-badge-view.component.html',
                    styleUrls: ['./user-profile-badge-view.component.css']
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { userProfile: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLWJhZGdlLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdXNlcnByb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL3VzZXItcHJvZmlsZS1iYWRnZS12aWV3L3VzZXItcHJvZmlsZS1iYWRnZS12aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VzZXJwcm9maWxlL3NyYy9saWIvY29tcG9uZW50cy91c2VyLXByb2ZpbGUtYmFkZ2Utdmlldy91c2VyLXByb2ZpbGUtYmFkZ2Utdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7QUFXNUYsTUFBTSxPQUFPLDZCQUE2QjtJQVF4QztRQUZVLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7SUFFdkQsQ0FBQztJQUVqQixRQUFRLEtBQVcsQ0FBQztJQUVwQixJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBc0IsRUFBRSxNQUFjO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDOzswSEFyQlUsNkJBQTZCOzhHQUE3Qiw2QkFBNkIsc0xDWDFDLHNaQVNBOzJGREVhLDZCQUE2QjtrQkFMekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxXQUFXLEVBQUUsMENBQTBDO29CQUN2RCxTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztpQkFDdkQ7MEVBR1UsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxlQUFlO3NCQUF2QixLQUFLO2dCQUVJLFlBQVk7c0JBQXJCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld0V2ZW50IH0gZnJvbSAndXRpbHMnO1xuaW1wb3J0IHsgVXNlclByb2ZpbGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy91c2VyLXByb2ZpbGUnO1xuXG5leHBvcnQgdHlwZSBVc2VyUHJvZmlsZUJhZGdlVmlld0V2ZW50ID0gVmlld0V2ZW50PFVzZXJQcm9maWxlTW9kZWw+O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1c2VyLXByb2ZpbGUtYmFkZ2UtdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLXByb2ZpbGUtYmFkZ2Utdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3VzZXItcHJvZmlsZS1iYWRnZS12aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBVc2VyUHJvZmlsZUJhZGdlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgdXNlclByb2ZpbGUhOiBVc2VyUHJvZmlsZU1vZGVsO1xuXG4gIEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICBAT3V0cHV0KCkgb25TZWxlY3RJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxVc2VyUHJvZmlsZUJhZGdlVmlld0V2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7IH1cblxuICBnZXQgdXNlcklkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudXNlclByb2ZpbGUuaWQ7XG4gIH1cblxuICBzZWxlY3RJdGVtKGl0ZW06IFVzZXJQcm9maWxlTW9kZWwsIG9wY29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vblNlbGVjdEl0ZW0uZW1pdCh7XG4gICAgICBvcGNvZGU6IG9wY29kZSxcbiAgICAgIGl0ZW06IGl0ZW1cbiAgICB9KTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciBcbiAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlIHx8IGRlZmF1bHRDb250ZW50VGVtcGxhdGVcIlxuICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHVzZXJQcm9maWxlLCBsaXN0OiB0aGlzIH1cIiBcbiAgKm5nSWY9XCJ1c2VyUHJvZmlsZVwiPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdENvbnRlbnRUZW1wbGF0ZSBsZXQtaXRlbSBsZXQtcGFyZW50PVwibGlzdFwiPlxuICA8c3BhbiAoY2xpY2spPVwicGFyZW50LnNlbGVjdEl0ZW0oaXRlbSwgJ3NlbGVjdCcpXCIgY2xhc3M9XCJmdWxsbmFtZVwiPnt7aXRlbS5maXJzdE5hbWV9fSB7e2l0ZW0ubGFzdE5hbWV9fTwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=