import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/bookmarks.service";
import * as i2 from "utils";
export class BookmarkBadgeComponent {
    constructor(service) {
        this.service = service;
        this.url = "";
        this.caption = "";
        this.loading = false;
        this.responseHandler = {
            next: (result) => {
                this.item = result;
                this.loading = false;
                console.log(result);
            },
            error: (err) => {
                this.loading = false;
                console.log(err.message);
            }
        };
    }
    ngOnInit() {
        this.checkStatus();
    }
    get isActive() {
        var _a;
        return ((_a = this.item) === null || _a === void 0 ? void 0 : _a.id) != undefined;
    }
    checkStatus() {
        this.service.findByUrl("bookmarks", this.url).subscribe(this.responseHandler);
    }
    createBookmark() {
        this.service.create("bookmarks", this.caption, this.url).subscribe(this.responseHandler);
    }
    deleteBookmark() {
        if (this.item)
            this.service.delete("bookmarks", this.item.id).subscribe({
                next: () => { },
                error: (err) => {
                    console.log(err.message);
                }
            });
    }
}
BookmarkBadgeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkBadgeComponent, deps: [{ token: i1.BookmarksService }], target: i0.ɵɵFactoryTarget.Component });
BookmarkBadgeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BookmarkBadgeComponent, selector: "bookmark-badge", inputs: { url: "url", caption: "caption", activeControlTemplate: "activeControlTemplate", inactiveControlTemplate: "inactiveControlTemplate" }, ngImport: i0, template: "<utils-badge \n    [isActive]=\"isActive\"\n    [activeCaption]=\"'Bookmark'\"\n    [activeControlTemplate]=\"activeControlTemplate\"\n    [inactiveControlTemplate]=\"inactiveControlTemplate\"\n    (onAdd)=\"createBookmark()\"\n    (onRemove)=\"deleteBookmark()\">\n</utils-badge>", styles: [""], components: [{ type: i2.BadgeComponent, selector: "utils-badge", inputs: ["isActive", "activeCaption", "inactiveCaption", "kind", "activeControlTemplate", "inactiveControlTemplate"], outputs: ["onAdd", "onRemove"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarkBadgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bookmark-badge',
                    templateUrl: './bookmark-badge.component.html',
                    styleUrls: ['./bookmark-badge.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.BookmarksService }]; }, propDecorators: { url: [{
                type: Input
            }], caption: [{
                type: Input
            }], activeControlTemplate: [{
                type: Input
            }], inactiveControlTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmstYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYm9va21hcmtzL3NyYy9saWIvY29tcG9uZW50cy9ib29rbWFyay1iYWRnZS9ib29rbWFyay1iYWRnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ib29rbWFya3Mvc3JjL2xpYi9jb21wb25lbnRzL2Jvb2ttYXJrLWJhZGdlL2Jvb2ttYXJrLWJhZGdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7OztBQVV0RSxNQUFNLE9BQU8sc0JBQXNCO0lBV2pDLFlBQW9CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBVHBDLFFBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQU05QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBWXpCLG9CQUFlLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsTUFBNkIsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFdEIsQ0FBQztZQUNELEtBQUssRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQztTQUNGLENBQUM7SUFyQitDLENBQUM7SUFFbEQsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxRQUFROztRQUNWLE9BQU8sQ0FBQSxNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLEVBQUUsS0FBSSxTQUFTLENBQUM7SUFDcEMsQ0FBQztJQWVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUcsSUFBSSxDQUFDLElBQUk7WUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3ZELElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO2dCQUNkLEtBQUssRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO29CQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQzthQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7O21IQWxEVSxzQkFBc0I7dUdBQXRCLHNCQUFzQixzTUNWbkMsMFJBT2M7MkZER0Qsc0JBQXNCO2tCQUxsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFdBQVcsRUFBRSxpQ0FBaUM7b0JBQzlDLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO2lCQUMvQzt1R0FHVSxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUVHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFDRyx1QkFBdUI7c0JBQS9CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJvb2ttYXJrTW9kZWwsIEJvb2ttYXJrUmVzcG9uc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9ib29rbWFyayc7XG5pbXBvcnQgeyBCb29rbWFya3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYm9va21hcmtzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdib29rbWFyay1iYWRnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ib29rbWFyay1iYWRnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Jvb2ttYXJrLWJhZGdlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQm9va21hcmtCYWRnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgdXJsOiBzdHJpbmcgPSBcIlwiO1xuICBASW5wdXQoKSBjYXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xuXG4gIEBJbnB1dCgpIGFjdGl2ZUNvbnRyb2xUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgaW5hY3RpdmVDb250cm9sVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgaXRlbT86IEJvb2ttYXJrTW9kZWw7XG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IEJvb2ttYXJrc1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tTdGF0dXMoKTtcbiAgfVxuXG4gIGdldCBpc0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtPy5pZCAhPSB1bmRlZmluZWQ7XG4gIH1cblxuICByZXNwb25zZUhhbmRsZXIgPSB7XG4gICAgbmV4dDogKHJlc3VsdDogQm9va21hcmtSZXNwb25zZU1vZGVsKSA9PiB7XG4gICAgICB0aGlzLml0ZW0gPSByZXN1bHQ7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICB9LFxuICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IHtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcblxuICBjaGVja1N0YXR1cygpIHtcbiAgICB0aGlzLnNlcnZpY2UuZmluZEJ5VXJsKFwiYm9va21hcmtzXCIsIHRoaXMudXJsKS5zdWJzY3JpYmUodGhpcy5yZXNwb25zZUhhbmRsZXIpO1xuICB9XG5cbiAgY3JlYXRlQm9va21hcmsoKTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2aWNlLmNyZWF0ZShcImJvb2ttYXJrc1wiLCB0aGlzLmNhcHRpb24sIHRoaXMudXJsKS5zdWJzY3JpYmUodGhpcy5yZXNwb25zZUhhbmRsZXIpO1xuICB9XG5cbiAgZGVsZXRlQm9va21hcmsoKTogdm9pZCB7XG4gICAgaWYodGhpcy5pdGVtKVxuICAgICAgdGhpcy5zZXJ2aWNlLmRlbGV0ZShcImJvb2ttYXJrc1wiLCB0aGlzLml0ZW0uaWQpLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6ICgpID0+IHt9LFxuICAgICAgICBlcnJvcjogKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIiwiPHV0aWxzLWJhZGdlIFxuICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZVwiXG4gICAgW2FjdGl2ZUNhcHRpb25dPVwiJ0Jvb2ttYXJrJ1wiXG4gICAgW2FjdGl2ZUNvbnRyb2xUZW1wbGF0ZV09XCJhY3RpdmVDb250cm9sVGVtcGxhdGVcIlxuICAgIFtpbmFjdGl2ZUNvbnRyb2xUZW1wbGF0ZV09XCJpbmFjdGl2ZUNvbnRyb2xUZW1wbGF0ZVwiXG4gICAgKG9uQWRkKT1cImNyZWF0ZUJvb2ttYXJrKClcIlxuICAgIChvblJlbW92ZSk9XCJkZWxldGVCb29rbWFyaygpXCI+XG48L3V0aWxzLWJhZGdlPiJdfQ==