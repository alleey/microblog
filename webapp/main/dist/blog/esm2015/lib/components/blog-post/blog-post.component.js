import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/posts.service";
import * as i2 from "@angular/router";
import * as i3 from "utils";
import * as i4 from "../blog-post-view/blog-post-view.component";
import * as i5 from "@angular/common";
export class BlogPostComponent {
    constructor(postService, router, activatedRoute) {
        this.postService = postService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.permalink = "";
        this.errorDesc = "";
        this.loading = false;
        this.response = null;
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.fetchPost(params.postId, params.slug);
        });
    }
    fetchPost(postId, postSlug) {
        this.postId = postId;
        this.postSlug = postSlug;
        this.loading = true;
        this.postService.one("posts", this.postId)
            .subscribe({
            next: (result) => {
                this.postItem = result;
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                console.log(this.errorDesc);
            }
        });
    }
    set postItem(item) {
        this.response = item;
        this.response.permalink = window.location.origin + this.router.url;
        this.postId = this.response.id;
        this.postSlug = this.response.slug;
    }
    get postItem() {
        return this.response;
    }
    handleViewEvent(evt) {
        switch (evt.opcode) {
            case 'edit':
                this.editPost(evt.item);
                break;
            case 'delete':
                this.deletePost(evt.item);
                break;
        }
    }
    editPost(post) {
        this.router.navigate(['/posts', 'edit', post.id]);
    }
    deletePost(post) {
    }
}
BlogPostComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostComponent, deps: [{ token: i1.PostsService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
BlogPostComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostComponent, selector: "blog-post", inputs: { headerTemplate: "headerTemplate", contentTemplate: "contentTemplate", footerTemplate: "footerTemplate" }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc; else viewer\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #viewer>\n    <blog-post-view \n        [post]=\"postItem\" \n        [topics]=\"postItem?.topics\"\n        [headerTemplate]=\"headerTemplate\"\n        [contentTemplate]=\"contentTemplate\"\n        [footerTemplate]=\"footerTemplate\"\n        (onSelectItem)=\"handleViewEvent($event)\">\n    </blog-post-view>\n</ng-template>", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i4.BlogPostViewComponent, selector: "blog-post-view", inputs: ["post", "topics", "enableComments", "headerTemplate", "contentTemplate", "footerTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-post',
                    templateUrl: './blog-post.component.html',
                    styleUrls: ['./blog-post.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.PostsService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy1wb3N0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Jsb2cvc3JjL2xpYi9jb21wb25lbnRzL2Jsb2ctcG9zdC9ibG9nLXBvc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvYmxvZy1wb3N0L2Jsb2ctcG9zdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBa0MsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFZakYsTUFBTSxPQUFPLGlCQUFpQjtJQWM1QixZQUNVLFdBQXlCLEVBQ3pCLE1BQWMsRUFDZCxjQUE4QjtRQUY5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUN6QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBVHhDLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFHdkIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBT3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWMsRUFBRSxRQUFpQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN2QyxTQUFTLENBQ1Y7WUFDRSxJQUFJLEVBQUUsQ0FBQyxNQUE2QixFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDO1lBQ0QsS0FBSyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsSUFBMkI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFzQjtRQUNwQyxRQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDakIsS0FBSyxNQUFNO2dCQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDNUMsS0FBSyxRQUFRO2dCQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUFDLE1BQU07U0FDakQ7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQW1CO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQW1CO0lBRTlCLENBQUM7OzhHQXpFVSxpQkFBaUI7a0dBQWpCLGlCQUFpQixxS0NaOUIsaXBCQW1CYzsyRkRQRCxpQkFBaUI7a0JBTDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFdBQVcsRUFBRSw0QkFBNEI7b0JBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQztxSkFHVSxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCbG9nUG9zdE1vZGVsLCBCbG9nUG9zdFJlc3BvbnNlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmxvZy1wb3N0JztcbmltcG9ydCB7IFRvcGljTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvdG9waWMnO1xuaW1wb3J0IHsgUG9zdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcG9zdHMuc2VydmljZSc7XG5pbXBvcnQgeyBCbG9nUG9zdFZpZXdFdmVudCB9IGZyb20gJy4uL2Jsb2ctcG9zdC12aWV3L2Jsb2ctcG9zdC12aWV3LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jsb2ctcG9zdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ibG9nLXBvc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ibG9nLXBvc3QuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCbG9nUG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgcG9zdElkPzogbnVtYmVyO1xuICBwb3N0U2x1Zz86IHN0cmluZztcbiAgcGVybWFsaW5rOiBzdHJpbmcgPSBcIlwiO1xuXG4gIHJlc3BvbnNlIDogQmxvZ1Bvc3RSZXNwb25zZU1vZGVsfG51bGw7XG4gIGVycm9yRGVzYzogYW55ID0gXCJcIjtcbiAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcG9zdFNlcnZpY2U6IFBvc3RzU2VydmljZSwgXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIFxuICB7IFxuICAgIHRoaXMucmVzcG9uc2UgPSBudWxsO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICB0aGlzLmZldGNoUG9zdChwYXJhbXMucG9zdElkLCBwYXJhbXMuc2x1Zyk7XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaFBvc3QocG9zdElkOiBudW1iZXIsIHBvc3RTbHVnPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5wb3N0SWQgPSBwb3N0SWQ7XG4gICAgdGhpcy5wb3N0U2x1ZyA9IHBvc3RTbHVnO1xuXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnBvc3RTZXJ2aWNlLm9uZShcInBvc3RzXCIsIHRoaXMucG9zdElkKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgIHtcbiAgICAgICAgbmV4dDogKHJlc3VsdDogQmxvZ1Bvc3RSZXNwb25zZU1vZGVsKSA9PiB7XG4gICAgICAgICAgdGhpcy5wb3N0SXRlbSA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JEZXNjID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5lcnJvckRlc2MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHNldCBwb3N0SXRlbShpdGVtOiBCbG9nUG9zdFJlc3BvbnNlTW9kZWwpIHtcbiAgICB0aGlzLnJlc3BvbnNlID0gaXRlbTtcbiAgICB0aGlzLnJlc3BvbnNlLnBlcm1hbGluayA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyB0aGlzLnJvdXRlci51cmw7XG4gICAgdGhpcy5wb3N0SWQgPSB0aGlzLnJlc3BvbnNlLmlkO1xuICAgIHRoaXMucG9zdFNsdWcgPSB0aGlzLnJlc3BvbnNlLnNsdWc7XG4gIH1cblxuICBnZXQgcG9zdEl0ZW0oKTogQmxvZ1Bvc3RSZXNwb25zZU1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5yZXNwb25zZSE7XG4gIH1cblxuICBoYW5kbGVWaWV3RXZlbnQoZXZ0OiBCbG9nUG9zdFZpZXdFdmVudCkge1xuICAgIHN3aXRjaChldnQub3Bjb2RlKSB7XG4gICAgICBjYXNlICdlZGl0JzogdGhpcy5lZGl0UG9zdChldnQuaXRlbSk7IGJyZWFrO1xuICAgICAgY2FzZSAnZGVsZXRlJzogdGhpcy5kZWxldGVQb3N0KGV2dC5pdGVtKTsgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZWRpdFBvc3QocG9zdDogQmxvZ1Bvc3RNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Bvc3RzJywgJ2VkaXQnLCBwb3N0LmlkXSk7XG4gIH1cblxuICBkZWxldGVQb3N0KHBvc3Q6IEJsb2dQb3N0TW9kZWwpOiB2b2lkIHtcbiAgICBcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImxvYWRpbmc7IGVsc2UgY29udGVudHNcIj5cbiAgICA8dXRpbHMtbG9hZGVyPjwvdXRpbHMtbG9hZGVyPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjY29udGVudHM+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwiZXJyb3JEZXNjOyBlbHNlIHZpZXdlclwiIFtkaXNtaXNzYWJsZV09XCJmYWxzZVwiIFttaW5pbWFsXT1cImZhbHNlXCI+XG4gICAgICAgIDxwPkFuIGVycm9yIG9jY3VycmVkIGFjY2Vzc2luZyB0aGUgcG9zdDoge3sgZXJyb3JEZXNjIH19PC9wPlxuICAgIDwvdXRpbHMtYWxlcnQ+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI3ZpZXdlcj5cbiAgICA8YmxvZy1wb3N0LXZpZXcgXG4gICAgICAgIFtwb3N0XT1cInBvc3RJdGVtXCIgXG4gICAgICAgIFt0b3BpY3NdPVwicG9zdEl0ZW0/LnRvcGljc1wiXG4gICAgICAgIFtoZWFkZXJUZW1wbGF0ZV09XCJoZWFkZXJUZW1wbGF0ZVwiXG4gICAgICAgIFtjb250ZW50VGVtcGxhdGVdPVwiY29udGVudFRlbXBsYXRlXCJcbiAgICAgICAgW2Zvb3RlclRlbXBsYXRlXT1cImZvb3RlclRlbXBsYXRlXCJcbiAgICAgICAgKG9uU2VsZWN0SXRlbSk9XCJoYW5kbGVWaWV3RXZlbnQoJGV2ZW50KVwiPlxuICAgIDwvYmxvZy1wb3N0LXZpZXc+XG48L25nLXRlbXBsYXRlPiJdfQ==