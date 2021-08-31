import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../services/comments.service";
import * as i2 from "@angular/router";
import * as i3 from "utils";
import * as i4 from "../comment-list-view/comment-list-view.component";
import * as i5 from "@angular/common";
export class CommentListComponent {
    constructor(commentsService, router, activatedRoute) {
        var _a;
        this.commentsService = commentsService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.errorDesc = "";
        this.loading = false;
        this.subscription = new Subscription();
        this.state = (_a = this.router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras.state;
        this.response = null;
        this.pageable = {
            page: 0
        };
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            var _a;
            const pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
            this.fetchPage(pageNum);
        });
        // Requery when the backend data changes
        this.subscription.add(this.commentsService.onChange.subscribe({ next: () => this.fetchPage(0) }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    fetchPage(pageNum) {
        var _a;
        //const routeParams = this.route.snapshot.paramMap;
        //this.organizationId = routeParams.get('orgId') as string;  
        this.pageable.page = pageNum;
        this.loading = true;
        this.commentsService.all((_a = this.state) === null || _a === void 0 ? void 0 : _a.endpoint, this.postId, this.pageable)
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
    get items() {
        var _a, _b;
        if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.comments))
            return [];
        return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.comments;
    }
    get page() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
CommentListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentListComponent, deps: [{ token: i1.CommentsService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
CommentListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentListComponent, selector: "blog-comment-list", inputs: { postId: "postId", noContentsTemplate: "noContentsTemplate", itemTemplate: "itemTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate" }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"true\">\n        <p>\n            The specified request could not be completed!\n        </p>\n        <hr>\n        <p class=\"mb-0\">Error Details: </p>\n        <p>{{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    <comment-list-view\n        [comments]=\"items\"\n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\">\n    </comment-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }, { type: i4.CommentListViewComponent, selector: "comment-list-view", inputs: ["comments", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-comment-list',
                    templateUrl: './comment-list.component.html',
                    styleUrls: ['./comment-list.component.css']
                }]
        }], ctorParameters: function () { return [{ type: i1.CommentsService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { postId: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Jsb2cvc3JjL2xpYi9jb21wb25lbnRzL2NvbW1lbnQtbGlzdC9jb21tZW50LWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvY29tbWVudC1saXN0L2NvbW1lbnQtbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBa0MsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQVVwQyxNQUFNLE9BQU8sb0JBQW9CO0lBa0IvQixZQUNVLGVBQWdDLEVBQ2hDLE1BQWMsRUFDZCxjQUE4Qjs7UUFGOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFSeEMsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLGlCQUFZLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFPOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsMENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM5RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2QsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7O1lBQzVDLE1BQU0sT0FBTyxHQUFHLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCx3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDNUUsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQWU7O1FBQ3ZCLG1EQUFtRDtRQUNuRCw2REFBNkQ7UUFDN0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN2RSxTQUFTLENBQ1Y7WUFDRSxJQUFJLEVBQUUsQ0FBQyxNQUFnQyxFQUFFLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDO1lBQ0QsS0FBSyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxLQUFLOztRQUNQLElBQUcsQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLFFBQVEsMENBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQTtZQUNuQyxPQUFPLEVBQUUsQ0FBQztRQUNaLE9BQU8sTUFBQSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLElBQUk7O1FBQ04sT0FBTyxNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQU87UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDOztpSEE5RVUsb0JBQW9CO3FHQUFwQixvQkFBb0IsbU9DWmpDLHl1Q0EwQ0E7MkZEOUJhLG9CQUFvQjtrQkFMaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixXQUFXLEVBQUUsK0JBQStCO29CQUM1QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztpQkFDNUM7d0pBR1UsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBhZ2VhYmxlLCBQYWdlTW9kZWwgfSBmcm9tICd1dGlscyc7XG5pbXBvcnQgeyBDb21tZW50TW9kZWwsIENvbW1lbnRMaXN0UmVzcG9uc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9jb21tZW50JztcbmltcG9ydCB7IENvbW1lbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbW1lbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdibG9nLWNvbW1lbnQtbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21tZW50LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb21tZW50LWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbW1lbnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHBvc3RJZCE6IG51bWJlcjtcblxuICBASW5wdXQoKSBub0NvbnRlbnRzVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gIHN0YXRlOiBhbnk7XG5cbiAgcGFnZWFibGU6IFBhZ2VhYmxlO1xuICByZXNwb25zZSA6IENvbW1lbnRMaXN0UmVzcG9uc2VNb2RlbHxudWxsO1xuICBlcnJvckRlc2M6IGFueSA9IFwiXCI7XG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbW1lbnRzU2VydmljZTogQ29tbWVudHNTZXJ2aWNlLCBcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgXG4gIHsgXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMucm91dGVyLmdldEN1cnJlbnROYXZpZ2F0aW9uKCk/LmV4dHJhcy5zdGF0ZTtcbiAgICB0aGlzLnJlc3BvbnNlID0gbnVsbDtcbiAgICB0aGlzLnBhZ2VhYmxlID0ge1xuICAgICAgcGFnZTogMFxuICAgIH07XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VOdW0gPSBwYXJhbXMucGFnZU51bSA/PyAwO1xuICAgICAgdGhpcy5mZXRjaFBhZ2UocGFnZU51bSk7XG4gICAgfSk7XG4gICAgLy8gUmVxdWVyeSB3aGVuIHRoZSBiYWNrZW5kIGRhdGEgY2hhbmdlc1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY29tbWVudHNTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSh7IG5leHQ6ICgpID0+ICB0aGlzLmZldGNoUGFnZSgwKSB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZmV0Y2hQYWdlKHBhZ2VOdW06IG51bWJlcik6IHZvaWQge1xuICAgIC8vY29uc3Qgcm91dGVQYXJhbXMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwO1xuICAgIC8vdGhpcy5vcmdhbml6YXRpb25JZCA9IHJvdXRlUGFyYW1zLmdldCgnb3JnSWQnKSBhcyBzdHJpbmc7ICBcbiAgICB0aGlzLnBhZ2VhYmxlLnBhZ2UgPSBwYWdlTnVtO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5jb21tZW50c1NlcnZpY2UuYWxsKHRoaXMuc3RhdGU/LmVuZHBvaW50LCB0aGlzLnBvc3RJZCwgdGhpcy5wYWdlYWJsZSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICB7XG4gICAgICAgIG5leHQ6IChyZXN1bHQ6IENvbW1lbnRMaXN0UmVzcG9uc2VNb2RlbCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSByZXN1bHQ7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yRGVzYyA9IGVyci5tZXNzYWdlO1xuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXJyb3JEZXNjKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBnZXQgaXRlbXMoKTogQ29tbWVudE1vZGVsW10ge1xuICAgIGlmKCF0aGlzLnJlc3BvbnNlPy5fZW1iZWRkZWQuY29tbWVudHMpXG4gICAgICByZXR1cm4gW107XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2U/Ll9lbWJlZGRlZC5jb21tZW50cztcbiAgfVxuXG4gIGdldCBwYWdlKCk6IFBhZ2VNb2RlbHx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlPy5wYWdlO1xuICB9XG5cbiAgZ290b1BhZ2UoZXZ0OmFueSk6IHZvaWQge1xuICAgIHRoaXMuZmV0Y2hQYWdlKGV2dC0xKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImxvYWRpbmc7IGVsc2UgY29udGVudHNcIj5cbiAgICA8dXRpbHMtbG9hZGVyPjwvdXRpbHMtbG9hZGVyPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjY29udGVudHM+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwiZXJyb3JEZXNjO2Vsc2UgaXRlbXNMaXN0XCIgW2Rpc21pc3NhYmxlXT1cInRydWVcIj5cbiAgICAgICAgPHA+XG4gICAgICAgICAgICBUaGUgc3BlY2lmaWVkIHJlcXVlc3QgY291bGQgbm90IGJlIGNvbXBsZXRlZCFcbiAgICAgICAgPC9wPlxuICAgICAgICA8aHI+XG4gICAgICAgIDxwIGNsYXNzPVwibWItMFwiPkVycm9yIERldGFpbHM6IDwvcD5cbiAgICAgICAgPHA+e3sgZXJyb3JEZXNjIH19PC9wPlxuICAgIDwvdXRpbHMtYWxlcnQ+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2l0ZW1zTGlzdD5cblxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaGVhZGVyVGVtcGxhdGUgfHwgZGVmYXVsdEhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0aGlzIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDx1dGlscy1wYWdlciBbcGFnZV09XCJwYWdlXCIgKG9uU2VsZWN0UGFnZSk9XCJnb3RvUGFnZSgkZXZlbnQpXCI+PC91dGlscy1wYWdlcj5cbiAgICA8Y29tbWVudC1saXN0LXZpZXdcbiAgICAgICAgW2NvbW1lbnRzXT1cIml0ZW1zXCJcbiAgICAgICAgW2l0ZW1UZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgICAgICBbbm9Db250ZW50c1RlbXBsYXRlXT1cIm5vQ29udGVudHNUZW1wbGF0ZVwiPlxuICAgIDwvY29tbWVudC1saXN0LXZpZXc+XG4gICAgPHV0aWxzLXBhZ2VyIFtwYWdlXT1cInBhZ2VcIiAob25TZWxlY3RQYWdlKT1cImdvdG9QYWdlKCRldmVudClcIj48L3V0aWxzLXBhZ2VyPlxuXG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXJUZW1wbGF0ZSB8fCBkZWZhdWx0Rm9vdGVyVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHRoaXMgfVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRIZWFkZXJUZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdEZvb3RlclRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==