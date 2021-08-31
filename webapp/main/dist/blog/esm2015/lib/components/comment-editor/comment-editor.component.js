import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsServiceConfigToken } from '../../config/config';
import * as i0 from "@angular/core";
import * as i1 from "../../services/comments.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "utils";
import * as i5 from "@angular/forms";
export class CommentEditorComponent {
    constructor(config, commentsService, location, activatedRoute) {
        this.config = config;
        this.commentsService = commentsService;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.updateMode = true;
        this.comment = null;
        this.successDesc = "";
        this.errorDesc = "";
        this.loading = false;
        this.fetchResponseHandler = {
            next: (result) => {
                this.blogComment = result;
                this.updateForm();
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                return false;
            }
        };
    }
    ngOnInit() {
        this.form = new FormGroup({
            "text": new FormControl("", [
                Validators.required,
                Validators.maxLength(this.config.maxContentLength)
            ]),
        });
        this.activatedRoute.params.subscribe(params => {
            var _a, _b;
            this.postId = (_a = params.postId) !== null && _a !== void 0 ? _a : this.paramPostId;
            this.commentId = (_b = params.commentId) !== null && _b !== void 0 ? _b : this.paramCommentId;
            if (this.isUpdateMode)
                this.fetchComment(this.commentId);
        });
    }
    get isUpdateMode() {
        return this.updateMode && this.commentId !== undefined;
    }
    get text() { return this.form.get('text'); }
    set blogComment(item) {
        var _a;
        this.comment = this.updateMode ? item : null;
        this.commentId = this.updateMode ? (_a = this.comment) === null || _a === void 0 ? void 0 : _a.id : undefined;
        console.info("Got comment id: " + this.commentId);
    }
    updateForm() {
        var _a;
        this.text.setValue((_a = this.comment) === null || _a === void 0 ? void 0 : _a.text);
    }
    fetchComment(commentId) {
        this.loading = true;
        this.commentsService
            .one("", this.postId, commentId)
            .subscribe(this.fetchResponseHandler);
    }
    createNewComment() {
        var _a;
        this.commentsService
            .create("", this.postId, (_a = this.text) === null || _a === void 0 ? void 0 : _a.value)
            .subscribe(this.fetchResponseHandler);
    }
    updateComment() {
        var _a;
        this.commentsService
            .update("", this.postId, this.commentId, (_a = this.text) === null || _a === void 0 ? void 0 : _a.value)
            .subscribe(this.fetchResponseHandler);
    }
    cancel() {
        this.location.back();
    }
}
CommentEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentEditorComponent, deps: [{ token: CommentsServiceConfigToken }, { token: i1.CommentsService }, { token: i2.Location }, { token: i3.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
CommentEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentEditorComponent, selector: "comment-editor", inputs: { headerTemplate: "headerTemplate", paramPostId: ["postId", "paramPostId"], paramCommentId: ["commentId", "paramCommentId"], updateMode: "updateMode" }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #defaultTitleTemplate let-item>\n    <div class=\"d-flex justify-content-between\">\n        <div>\n            <h5>POST A COMMENT</h5>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #contents>\n    <ng-container \n        [ngTemplateOutlet]=\"headerTemplate || defaultTitleTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n    <utils-alert *ngIf=\"successDesc\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>{{ successDesc }}</p>\n    </utils-alert>\n    <utils-alert *ngIf=\"errorDesc; else editor\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #editor>\n    <form [formGroup]=\"form\" novalidate onSubmit=\"return false;\">\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <textarea class=\"form-control\" id=\"postText\" rows=\"3\" formControlName=\"text\" required></textarea>\n                <div *ngIf=\"text?.invalid && (text?.dirty || text?.touched)\">\n                    <utils-alert *ngIf=\"text?.errors?.pattern\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Sorry, cannot leave this empty!\n                    </utils-alert>\n                </div>\n            </div>\n        </div>\n        <div class=\"mb-3\" *ngIf=\"!isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Post\" (click)=\"createNewComment()\">\n        </div>\n        <div class=\"mb-3\" *ngIf=\"isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Update\" (click)=\"updateComment()\">\n        </div>\n    </form>\n</ng-template>\n", styles: [""], components: [{ type: i4.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i4.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'comment-editor',
                    templateUrl: './comment-editor.component.html',
                    styleUrls: ['./comment-editor.component.css']
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [CommentsServiceConfigToken]
                }] }, { type: i1.CommentsService }, { type: i2.Location }, { type: i3.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
                type: Input
            }], paramPostId: [{
                type: Input,
                args: ["postId"]
            }], paramCommentId: [{
                type: Input,
                args: ["commentId"]
            }], updateMode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvY29tbWVudC1lZGl0b3IvY29tbWVudC1lZGl0b3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvY29tbWVudC1lZGl0b3IvY29tbWVudC1lZGl0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRSxPQUFPLEVBQXlCLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7QUFTeEYsTUFBTSxPQUFPLHNCQUFzQjtJQWlCakMsWUFDOEMsTUFBNkIsRUFDakUsZUFBZ0MsRUFDaEMsUUFBa0IsRUFDbEIsY0FBOEI7UUFITSxXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUNqRSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFoQi9CLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFJcEMsWUFBTyxHQUF1QixJQUFJLENBQUM7UUFFbkMsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBNEN6Qix5QkFBb0IsR0FBRztZQUNyQixJQUFJLEVBQUUsQ0FBQyxNQUE0QixFQUFFLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO2dCQUMxQixJQUFJLENBQUMs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QUM7YUFDM0QsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzttSEEzRlUsc0JBQXNCLGtCQWtCdkIsMEJBQTBCO3VHQWxCekIsc0JBQXNCLHVOQ2JuQyw4M0RBNkNBOzJGRGhDYSxzQkFBc0I7a0JBTGxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsV0FBVyxFQUFFLGlDQUFpQztvQkFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7aUJBQzlDOzswQkFtQkksTUFBTTsyQkFBQywwQkFBMEI7OEhBaEIzQixjQUFjO3NCQUF0QixLQUFLO2dCQUNXLFdBQVc7c0JBQTNCLEtBQUs7dUJBQUMsUUFBUTtnQkFDSyxjQUFjO3NCQUFqQyxLQUFLO3VCQUFDLFdBQVc7Z0JBQ1QsVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29tbWVudHNTZXJ2aWNlQ29uZmlnLCBDb21tZW50c1NlcnZpY2VDb25maWdUb2tlbiB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWcnO1xuaW1wb3J0IHsgQ29tbWVudE1vZGVsLCBDb21tZW50UmVzcG9uc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9jb21tZW50JztcbmltcG9ydCB7IENvbW1lbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbW1lbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjb21tZW50LWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21tZW50LWVkaXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbW1lbnQtZWRpdG9yLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tZW50RWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KFwicG9zdElkXCIpIHBhcmFtUG9zdElkPzogbnVtYmVyO1xuICBASW5wdXQoXCJjb21tZW50SWRcIikgcGFyYW1Db21tZW50SWQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHVwZGF0ZU1vZGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHBvc3RJZD86IG51bWJlcjtcbiAgY29tbWVudElkPzogbnVtYmVyO1xuICBjb21tZW50IDogQ29tbWVudE1vZGVsfG51bGwgPSBudWxsO1xuXG4gIHN1Y2Nlc3NEZXNjOiBhbnkgPSBcIlwiO1xuICBlcnJvckRlc2M6IGFueSA9IFwiXCI7XG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBmb3JtITogRm9ybUdyb3VwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQ29tbWVudHNTZXJ2aWNlQ29uZmlnVG9rZW4pIHByaXZhdGUgY29uZmlnOiBDb21tZW50c1NlcnZpY2VDb25maWcsXG4gICAgcHJpdmF0ZSBjb21tZW50c1NlcnZpY2U6IENvbW1lbnRzU2VydmljZSwgXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKFxuICAgIHtcbiAgICAgIFwidGV4dFwiOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xuICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgVmFsaWRhdG9ycy5tYXhMZW5ndGgodGhpcy5jb25maWcubWF4Q29udGVudExlbmd0aClcbiAgICAgIF0pLFxuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICB0aGlzLnBvc3RJZCA9IHBhcmFtcy5wb3N0SWQgPz8gdGhpcy5wYXJhbVBvc3RJZDtcbiAgICAgIHRoaXMuY29tbWVudElkID0gcGFyYW1zLmNvbW1lbnRJZCA/PyB0aGlzLnBhcmFtQ29tbWVudElkO1xuICAgICAgaWYodGhpcy5pc1VwZGF0ZU1vZGUpXG4gICAgICAgIHRoaXMuZmV0Y2hDb21tZW50KHRoaXMuY29tbWVudElkISk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgaXNVcGRhdGVNb2RlKCk6IGJvb2xlYW4geyBcbiAgICByZXR1cm4gdGhpcy51cGRhdGVNb2RlICYmIHRoaXMuY29tbWVudElkICE9PSB1bmRlZmluZWQ7IFxuICB9XG5cbiAgZ2V0IHRleHQoKSB7IHJldHVybiB0aGlzLmZvcm0uZ2V0KCd0ZXh0Jyk7IH1cblxuICBzZXQgYmxvZ0NvbW1lbnQoaXRlbTogQ29tbWVudE1vZGVsKSB7XG4gICAgdGhpcy5jb21tZW50ID0gdGhpcy51cGRhdGVNb2RlID8gaXRlbSA6IG51bGw7XG4gICAgdGhpcy5jb21tZW50SWQgPSB0aGlzLnVwZGF0ZU1vZGUgPyB0aGlzLmNvbW1lbnQ/LmlkIDogdW5kZWZpbmVkO1xuICAgIGNvbnNvbGUuaW5mbyhcIkdvdCBjb21tZW50IGlkOiBcIiArIHRoaXMuY29tbWVudElkISk7XG4gIH1cblxuICB1cGRhdGVGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMudGV4dCEuc2V0VmFsdWUgKHRoaXMuY29tbWVudD8udGV4dCk7XG4gIH1cblxuICBmZXRjaFJlc3BvbnNlSGFuZGxlciA9IHtcbiAgICBuZXh0OiAocmVzdWx0OiBDb21tZW50UmVzcG9uc2VNb2RlbCkgPT4ge1xuICAgICAgdGhpcy5ibG9nQ29tbWVudCA9IHJlc3VsdDtcbiAgICAgIHRoaXMudXBkYXRlRm9ybSgpO1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICBlcnJvcjogKGVycjogYW55KSA9PiB7XG4gICAgICB0aGlzLmVycm9yRGVzYyA9IGVyci5tZXNzYWdlO1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGZldGNoQ29tbWVudChjb21tZW50SWQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5jb21tZW50c1NlcnZpY2VcbiAgICAgIC5vbmUoXCJcIiwgdGhpcy5wb3N0SWQhLCBjb21tZW50SWQpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuZmV0Y2hSZXNwb25zZUhhbmRsZXIpO1xuICB9ICAgICAgXG5cbiAgY3JlYXRlTmV3Q29tbWVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbW1lbnRzU2VydmljZVxuICAgICAgLmNyZWF0ZShcIlwiLCB0aGlzLnBvc3RJZCEsIHRoaXMudGV4dD8udmFsdWUpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuZmV0Y2hSZXNwb25zZUhhbmRsZXIpO1xuICB9XG5cbiAgdXBkYXRlQ29tbWVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbW1lbnRzU2VydmljZVxuICAgICAgLnVwZGF0ZShcIlwiLCB0aGlzLnBvc3RJZCEsIHRoaXMuY29tbWVudElkISwgdGhpcy50ZXh0Py52YWx1ZSlcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5mZXRjaFJlc3BvbnNlSGFuZGxlcik7XG4gIH1cblxuICBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJsb2FkaW5nOyBlbHNlIGNvbnRlbnRzXCI+XG4gICAgPHV0aWxzLWxvYWRlcj48L3V0aWxzLWxvYWRlcj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRUaXRsZVRlbXBsYXRlIGxldC1pdGVtPlxuICAgIDxkaXYgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoNT5QT1NUIEEgQ09NTUVOVDwvaDU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNjb250ZW50cz5cbiAgICA8bmctY29udGFpbmVyIFxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJoZWFkZXJUZW1wbGF0ZSB8fCBkZWZhdWx0VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwic3VjY2Vzc0Rlc2NcIiBbZGlzbWlzc2FibGVdPVwiZmFsc2VcIiBbbWluaW1hbF09XCJmYWxzZVwiPlxuICAgICAgICA8cD57eyBzdWNjZXNzRGVzYyB9fTwvcD5cbiAgICA8L3V0aWxzLWFsZXJ0PlxuICAgIDx1dGlscy1hbGVydCAqbmdJZj1cImVycm9yRGVzYzsgZWxzZSBlZGl0b3JcIiBbZGlzbWlzc2FibGVdPVwiZmFsc2VcIiBbbWluaW1hbF09XCJmYWxzZVwiPlxuICAgICAgICA8cD5BbiBlcnJvciBvY2N1cnJlZCBhY2Nlc3NpbmcgdGhlIHBvc3Q6IHt7IGVycm9yRGVzYyB9fTwvcD5cbiAgICA8L3V0aWxzLWFsZXJ0PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNlZGl0b3I+XG4gICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJmb3JtXCIgbm92YWxpZGF0ZSBvblN1Ym1pdD1cInJldHVybiBmYWxzZTtcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1iLTMgY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJwb3N0VGV4dFwiIHJvd3M9XCIzXCIgZm9ybUNvbnRyb2xOYW1lPVwidGV4dFwiIHJlcXVpcmVkPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInRleHQ/LmludmFsaWQgJiYgKHRleHQ/LmRpcnR5IHx8IHRleHQ/LnRvdWNoZWQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDx1dGlscy1hbGVydCAqbmdJZj1cInRleHQ/LmVycm9ycz8ucGF0dGVyblwiIFtkaXNtaXNzYWJsZV09XCJmYWxzZVwiIFttaW5pbWFsXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNvcnJ5LCBjYW5ub3QgbGVhdmUgdGhpcyBlbXB0eSFcbiAgICAgICAgICAgICAgICAgICAgPC91dGlscy1hbGVydD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1iLTNcIiAqbmdJZj1cIiFpc1VwZGF0ZU1vZGVcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwibG9hZGluZyB8fCAhZm9ybS52YWxpZFwiIHZhbHVlPVwiUG9zdFwiIChjbGljayk9XCJjcmVhdGVOZXdDb21tZW50KClcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYi0zXCIgKm5nSWY9XCJpc1VwZGF0ZU1vZGVcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwibG9hZGluZyB8fCAhZm9ybS52YWxpZFwiIHZhbHVlPVwiVXBkYXRlXCIgKGNsaWNrKT1cInVwZGF0ZUNvbW1lbnQoKVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG48L25nLXRlbXBsYXRlPlxuIl19