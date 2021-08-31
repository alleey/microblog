import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../services/posts.service";
import * as i2 from "@angular/router";
import * as i3 from "utils";
import * as i4 from "../blog-post-list-view/blog-post-list-view.component";
import * as i5 from "@angular/common";
export class BlogPostListComponent {
    constructor(postService, router, activatedRoute) {
        var _a;
        this.postService = postService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.onSelect = (item) => this.navigateToPost(item);
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
        this.subscription.add(this.postService.onChange.subscribe({ next: () => this.fetchPage(0) }));
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
        this.postService.all((_a = this.state) === null || _a === void 0 ? void 0 : _a.endpoint, this.pageable)
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
        if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.posts))
            return [];
        return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.posts;
    }
    get page() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
    }
    handleListViewEvent(evt) {
        switch (evt.opcode) {
            case 'select':
                this.onSelect(evt.item);
                break;
        }
    }
    navigateToPost(post) {
        this.router.navigate(["/posts", post.id, post.slug]);
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
BlogPostListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostListComponent, deps: [{ token: i1.PostsService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
BlogPostListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostListComponent, selector: "blog-post-list", inputs: { noContentsTemplate: "noContentsTemplate", itemTemplate: "itemTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectPost", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"true\">\n        <p>\n            The specified request could not be completed!\n        </p>\n        <hr>\n        <p class=\"mb-0\">Error Details: </p>\n        <p>{{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    <blog-post-list-view\n        [posts]=\"items\"\n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\"\n        (onSelectItem)=\"handleListViewEvent($event)\">\n    </blog-post-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }, { type: i4.BlogPostListViewComponent, selector: "blog-post-list-view", inputs: ["posts", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-post-list',
                    templateUrl: './blog-post-list.component.html',
                    styleUrls: ['./blog-post-list.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.PostsService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { noContentsTemplate: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], onSelect: [{
                type: Input,
                args: ['onSelectPost']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy1wb3N0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvYmxvZy1wb3N0LWxpc3QvYmxvZy1wb3N0LWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvYmxvZy1wb3N0LWxpc3QvYmxvZy1wb3N0LWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBTWpGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7QUFPcEMsTUFBTSxPQUFPLHFCQUFxQjtJQW9CaEMsWUFDVSxXQUF5QixFQUN6QixNQUFjLEVBQ2QsY0FBOEI7O1FBRjlCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBQ3pCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFmeEMsYUFBUSxHQUNOLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTXRDLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLDBDQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCxR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QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCbG9nUG9zdE1vZGVsLCBCbG9nUG9zdExpc3RSZXNwb25zZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Jsb2ctcG9zdCc7XG5pbXBvcnQgeyBQb3N0c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9wb3N0cy5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VhYmxlLCBQYWdlTW9kZWwgfSBmcm9tICd1dGlscyc7XG5pbXBvcnQgeyBCbG9nUG9zdExpc3RWaWV3RXZlbnQgfSBmcm9tICcuLi9ibG9nLXBvc3QtbGlzdC12aWV3L2Jsb2ctcG9zdC1saXN0LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdibG9nLXBvc3QtbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ibG9nLXBvc3QtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Jsb2ctcG9zdC1saXN0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQmxvZ1Bvc3RMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIG5vQ29udGVudHNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCdvblNlbGVjdFBvc3QnKSBcbiAgb25TZWxlY3Q6IChwb3N0OiBCbG9nUG9zdE1vZGVsKSA9PiB2b2lkID0gXG4gICAgKGl0ZW0pID0+IHRoaXMubmF2aWdhdGVUb1Bvc3QoaXRlbSk7XG5cbiAgc3RhdGU6IGFueTtcblxuICBwYWdlYWJsZTogUGFnZWFibGU7XG4gIHJlc3BvbnNlIDogQmxvZ1Bvc3RMaXN0UmVzcG9uc2VNb2RlbHxudWxsO1xuICBlcnJvckRlc2M6IGFueSA9IFwiXCI7XG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBvc3RTZXJ2aWNlOiBQb3N0c1NlcnZpY2UsIFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIFxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSBcbiAgeyBcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5yb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb24oKT8uZXh0cmFzLnN0YXRlO1xuICAgIHRoaXMucmVzcG9uc2UgPSBudWxsO1xuICAgIHRoaXMucGFnZWFibGUgPSB7XG4gICAgICBwYWdlOiAwXG4gICAgfTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgY29uc3QgcGFnZU51bSA9IHBhcmFtcy5wYWdlTnVtID8/IDA7XG4gICAgICB0aGlzLmZldGNoUGFnZShwYWdlTnVtKTtcbiAgICB9KTtcbiAgICAvLyBSZXF1ZXJ5IHdoZW4gdGhlIGJhY2tlbmQgZGF0YSBjaGFuZ2VzXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5wb3N0U2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoeyBuZXh0OiAoKSA9PiB0aGlzLmZldGNoUGFnZSgwKSB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZmV0Y2hQYWdlKHBhZ2VOdW06IG51bWJlcik6IHZvaWQge1xuICAgIC8vY29uc3Qgcm91dGVQYXJhbXMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwO1xuICAgIC8vdGhpcy5vcmdhbml6YXRpb25JZCA9IHJvdXRlUGFyYW1zLmdldCgnb3JnSWQnKSBhcyBzdHJpbmc7ICBcbiAgICB0aGlzLnBhZ2VhYmxlLnBhZ2UgPSBwYWdlTnVtO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5wb3N0U2VydmljZS5hbGwodGhpcy5zdGF0ZT8uZW5kcG9pbnQsIHRoaXMucGFnZWFibGUpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAge1xuICAgICAgICBuZXh0OiAocmVzdWx0OiBCbG9nUG9zdExpc3RSZXNwb25zZU1vZGVsKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JEZXNjID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5lcnJvckRlc2MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldCBpdGVtcygpOiBCbG9nUG9zdE1vZGVsW10ge1xuICAgIGlmKCF0aGlzLnJlc3BvbnNlPy5fZW1iZWRkZWQucG9zdHMpXG4gICAgICByZXR1cm4gW107XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2U/Ll9lbWJlZGRlZC5wb3N0cztcbiAgfVxuXG4gIGdldCBwYWdlKCk6IFBhZ2VNb2RlbHx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlPy5wYWdlO1xuICB9XG5cbiAgaGFuZGxlTGlzdFZpZXdFdmVudChldnQ6IEJsb2dQb3N0TGlzdFZpZXdFdmVudCkge1xuICAgIHN3aXRjaChldnQub3Bjb2RlKSB7XG4gICAgICBjYXNlICdzZWxlY3QnOiB0aGlzLm9uU2VsZWN0KGV2dC5pdGVtKTsgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbmF2aWdhdGVUb1Bvc3QocG9zdDogQmxvZ1Bvc3RNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9wb3N0c1wiLCBwb3N0LmlkLCBwb3N0LnNsdWddKTtcbiAgfVxuXG4gIGdvdG9QYWdlKGV2dDphbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZldGNoUGFnZShldnQtMSk7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJsb2FkaW5nOyBlbHNlIGNvbnRlbnRzXCI+XG4gICAgPHV0aWxzLWxvYWRlcj48L3V0aWxzLWxvYWRlcj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2NvbnRlbnRzPlxuICAgIDx1dGlscy1hbGVydCAqbmdJZj1cImVycm9yRGVzYztlbHNlIGl0ZW1zTGlzdFwiIFtkaXNtaXNzYWJsZV09XCJ0cnVlXCI+XG4gICAgICAgIDxwPlxuICAgICAgICAgICAgVGhlIHNwZWNpZmllZCByZXF1ZXN0IGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQhXG4gICAgICAgIDwvcD5cbiAgICAgICAgPGhyPlxuICAgICAgICA8cCBjbGFzcz1cIm1iLTBcIj5FcnJvciBEZXRhaWxzOiA8L3A+XG4gICAgICAgIDxwPnt7IGVycm9yRGVzYyB9fTwvcD5cbiAgICA8L3V0aWxzLWFsZXJ0PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNpdGVtc0xpc3Q+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImhlYWRlclRlbXBsYXRlIHx8IGRlZmF1bHRIZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8dXRpbHMtcGFnZXIgW3BhZ2VdPVwicGFnZVwiIChvblNlbGVjdFBhZ2UpPVwiZ290b1BhZ2UoJGV2ZW50KVwiPjwvdXRpbHMtcGFnZXI+XG4gICAgPGJsb2ctcG9zdC1saXN0LXZpZXdcbiAgICAgICAgW3Bvc3RzXT1cIml0ZW1zXCJcbiAgICAgICAgW2l0ZW1UZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgICAgICBbbm9Db250ZW50c1RlbXBsYXRlXT1cIm5vQ29udGVudHNUZW1wbGF0ZVwiXG4gICAgICAgIChvblNlbGVjdEl0ZW0pPVwiaGFuZGxlTGlzdFZpZXdFdmVudCgkZXZlbnQpXCI+XG4gICAgPC9ibG9nLXBvc3QtbGlzdC12aWV3PlxuICAgIDx1dGlscy1wYWdlciBbcGFnZV09XCJwYWdlXCIgKG9uU2VsZWN0UGFnZSk9XCJnb3RvUGFnZSgkZXZlbnQpXCI+PC91dGlscy1wYWdlcj5cblxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiZm9vdGVyVGVtcGxhdGUgfHwgZGVmYXVsdEZvb3RlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0aGlzIH1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0SGVhZGVyVGVtcGxhdGU+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRGb290ZXJUZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=