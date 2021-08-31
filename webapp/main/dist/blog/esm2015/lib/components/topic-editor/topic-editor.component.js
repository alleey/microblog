import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../services/topics.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "utils";
import * as i5 from "@angular/forms";
export class TopicEditorComponent {
    constructor(topicService, router, location, activatedRoute) {
        this.topicService = topicService;
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.updateMode = true;
        this.topic = null;
        this.errorDesc = "";
        this.loading = false;
        this.fetchResponseHandler = {
            next: (result) => {
                this.theTopic = result;
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
            "caption": new FormControl("", Validators.required)
        });
        this.activatedRoute.params.subscribe(params => {
            var _a;
            this.topicId = (_a = params.topicId) !== null && _a !== void 0 ? _a : this.paramTopicId;
            if (this.isUpdateMode)
                this.fetchTopic(this.topicId);
        });
    }
    get isUpdateMode() {
        return this.updateMode && this.topicId !== undefined;
    }
    get caption() { return this.form.get('caption'); }
    set theTopic(item) {
        var _a;
        this.topic = this.updateMode ? item : null;
        this.topicId = this.updateMode ? (_a = this.topic) === null || _a === void 0 ? void 0 : _a.id : undefined;
        console.info("Got post id: " + this.topicId);
    }
    updateForm() {
        var _a;
        this.caption.setValue((_a = this.topic) === null || _a === void 0 ? void 0 : _a.caption);
    }
    fetchTopic(topicId) {
        this.loading = true;
        this.topicService
            .one("", topicId)
            .subscribe(this.fetchResponseHandler);
    }
    createNewTopic() {
        var _a;
        this.topicService
            .create("", (_a = this.caption) === null || _a === void 0 ? void 0 : _a.value)
            .subscribe(this.fetchResponseHandler);
    }
    updateTopic() {
        var _a;
        this.topicService
            .update("", this.topicId, (_a = this.caption) === null || _a === void 0 ? void 0 : _a.value)
            .subscribe(this.fetchResponseHandler);
    }
    cancel() {
        this.location.back();
    }
}
TopicEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicEditorComponent, deps: [{ token: i1.TopicsService }, { token: i2.Router }, { token: i3.Location }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
TopicEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicEditorComponent, selector: "topic-editor", inputs: { headerTemplate: "headerTemplate", paramTopicId: ["topicId", "paramTopicId"], updateMode: "updateMode" }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #defaultTitleTemplate let-item>\n    <div class=\"d-flex justify-content-between\">\n        <div>\n            <h5>CREATE A NEW TOPIC</h5>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #contents>\n    <ng-container \n        [ngTemplateOutlet]=\"headerTemplate || defaultTitleTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n    <utils-alert *ngIf=\"errorDesc; else editor\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #editor>\n    <form [formGroup]=\"form\" novalidate onSubmit=\"return false;\">\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-9\">\n                <input type=\"text\" class=\"form-control\" id=\"caption\" placeholder=\"Topic name ... \"\n                    formControlName=\"caption\" required>\n\n                <div *ngIf=\"caption?.invalid && (caption?.dirty || caption?.touched)\">\n                    <utils-alert *ngIf=\"caption?.errors?.required\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Name is required.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"caption?.errors?.topicExists\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Topic name is already taken!\n                    </utils-alert>\n                </div>\n\n            </div>\n            <div class=\"mb-3 col-sm-3\" *ngIf=\"!isUpdateMode\">\n                <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Create\" (click)=\"createNewTopic()\">\n            </div>\n            <div class=\"mb-3 col-sm-3\" *ngIf=\"isUpdateMode\">\n                <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Update\" (click)=\"updateTopic()\">\n            </div>\n        </div>\n    </form>\n</ng-template>\n", styles: [""], components: [{ type: i4.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i4.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'topic-editor',
                    templateUrl: './topic-editor.component.html',
                    styleUrls: ['./topic-editor.component.css']
                }]
        }], ctorParameters: function () { return [{ type: i1.TopicsService }, { type: i2.Router }, { type: i3.Location }, { type: i2.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
                type: Input
            }], paramTopicId: [{
                type: Input,
                args: ["topicId"]
            }], updateMode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWMtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Jsb2cvc3JjL2xpYi9jb21wb25lbnRzL3RvcGljLWVkaXRvci90b3BpYy1lZGl0b3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmxvZy9zcmMvbGliL2NvbXBvbmVudHMvdG9waWMtZWRpdG9yL3RvcGljLWVkaXRvci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFVcEUsTUFBTSxPQUFPLG9CQUFvQjtJQWMvQixZQUNVLFlBQTJCLEVBQzNCLE1BQWMsRUFDZCxRQUFrQixFQUNsQixjQUE4QjtRQUg5QixpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFkL0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQUdwQyxVQUFLLEdBQXFCLElBQUksQ0FBQztRQUUvQixjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFzQ3pCLHlCQUFvQixHQUFHO1lBQ3JCLElBQUksRUFBRSxDQUFDLE1BQTBCLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQztZQUNELEtBQUssRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO2dC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QVk7c0JBQTdCLEtBQUs7dUJBQUMsU0FBUztnQkFDUCxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVG9waWNNb2RlbCwgVG9waWNSZXNwb25zZU1vZGVsLCBUb3BpY0xpc3RSZXNwb25zZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RvcGljJztcbmltcG9ydCB7IFRvcGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90b3BpY3Muc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RvcGljLWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90b3BpYy1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90b3BpYy1lZGl0b3IuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRvcGljRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcbiAgQElucHV0KFwidG9waWNJZFwiKSBwYXJhbVRvcGljSWQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHVwZGF0ZU1vZGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHRvcGljSWQ/OiBudW1iZXI7XG4gIHRvcGljIDogVG9waWNNb2RlbHxudWxsID0gbnVsbDtcblxuICBlcnJvckRlc2M6IGFueSA9IFwiXCI7XG4gIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBmb3JtITogRm9ybUdyb3VwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdG9waWNTZXJ2aWNlOiBUb3BpY3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICBcImNhcHRpb25cIjogbmV3IEZvcm1Db250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gICAgfSk7XG5cbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIHRoaXMudG9waWNJZCA9IHBhcmFtcy50b3BpY0lkID8/IHRoaXMucGFyYW1Ub3BpY0lkO1xuICAgICAgaWYodGhpcy5pc1VwZGF0ZU1vZGUpXG4gICAgICAgIHRoaXMuZmV0Y2hUb3BpYyh0aGlzLnRvcGljSWQhKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpc1VwZGF0ZU1vZGUoKTogYm9vbGVhbiB7IFxuICAgIHJldHVybiB0aGlzLnVwZGF0ZU1vZGUgJiYgdGhpcy50b3BpY0lkICE9PSB1bmRlZmluZWQ7IFxuICB9XG4gIGdldCBjYXB0aW9uKCkgeyByZXR1cm4gdGhpcy5mb3JtLmdldCgnY2FwdGlvbicpOyB9XG5cbiAgc2V0IHRoZVRvcGljKGl0ZW06IFRvcGljTW9kZWwpIHtcbiAgICB0aGlzLnRvcGljID0gdGhpcy51cGRhdGVNb2RlID8gaXRlbSA6IG51bGw7XG4gICAgdGhpcy50b3BpY0lkID0gdGhpcy51cGRhdGVNb2RlID8gdGhpcy50b3BpYz8uaWQgOiB1bmRlZmluZWQ7XG4gICAgY29uc29sZS5pbmZvKFwiR290IHBvc3QgaWQ6IFwiICsgdGhpcy50b3BpY0lkISk7XG4gIH1cblxuICB1cGRhdGVGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuY2FwdGlvbiEuc2V0VmFsdWUgKHRoaXMudG9waWM/LmNhcHRpb24pO1xuICB9XG5cbiAgZmV0Y2hSZXNwb25zZUhhbmRsZXIgPSB7XG4gICAgbmV4dDogKHJlc3VsdDogVG9waWNSZXNwb25zZU1vZGVsKSA9PiB7XG4gICAgICB0aGlzLnRoZVRvcGljID0gcmVzdWx0O1xuICAgICAgdGhpcy51cGRhdGVGb3JtKCk7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9LFxuICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZXJyb3JEZXNjID0gZXJyLm1lc3NhZ2U7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgZmV0Y2hUb3BpYyh0b3BpY0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMudG9waWNTZXJ2aWNlXG4gICAgICAub25lKFwiXCIsIHRvcGljSWQpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuZmV0Y2hSZXNwb25zZUhhbmRsZXIpO1xuICB9ICAgICAgXG5cbiAgY3JlYXRlTmV3VG9waWMoKTogdm9pZCB7XG4gICAgdGhpcy50b3BpY1NlcnZpY2VcbiAgICAgIC5jcmVhdGUoXCJcIiwgdGhpcy5jYXB0aW9uPy52YWx1ZSlcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5mZXRjaFJlc3BvbnNlSGFuZGxlcik7XG4gIH1cblxuICB1cGRhdGVUb3BpYygpOiB2b2lkIHtcbiAgICB0aGlzLnRvcGljU2VydmljZVxuICAgICAgLnVwZGF0ZShcIlwiLCB0aGlzLnRvcGljSWQhLCB0aGlzLmNhcHRpb24/LnZhbHVlKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLmZldGNoUmVzcG9uc2VIYW5kbGVyKTtcbiAgfVxuXG4gIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImxvYWRpbmc7IGVsc2UgY29udGVudHNcIj5cbiAgICA8dXRpbHMtbG9hZGVyPjwvdXRpbHMtbG9hZGVyPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRpdGxlVGVtcGxhdGUgbGV0LWl0ZW0+XG4gICAgPGRpdiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGg1PkNSRUFURSBBIE5FVyBUT1BJQzwvaDU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNjb250ZW50cz5cbiAgICA8bmctY29udGFpbmVyIFxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJoZWFkZXJUZW1wbGF0ZSB8fCBkZWZhdWx0VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogdGhpcyB9XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwiZXJyb3JEZXNjOyBlbHNlIGVkaXRvclwiIFtkaXNtaXNzYWJsZV09XCJmYWxzZVwiIFttaW5pbWFsXT1cImZhbHNlXCI+XG4gICAgICAgIDxwPkFuIGVycm9yIG9jY3VycmVkIGFjY2Vzc2luZyB0aGUgcG9zdDoge3sgZXJyb3JEZXNjIH19PC9wPlxuICAgIDwvdXRpbHMtYWxlcnQ+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI2VkaXRvcj5cbiAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cImZvcm1cIiBub3ZhbGlkYXRlIG9uU3VibWl0PVwicmV0dXJuIGZhbHNlO1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWItMyBjb2wtc20tOVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJjYXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJUb3BpYyBuYW1lIC4uLiBcIlxuICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJjYXB0aW9uXCIgcmVxdWlyZWQ+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY2FwdGlvbj8uaW52YWxpZCAmJiAoY2FwdGlvbj8uZGlydHkgfHwgY2FwdGlvbj8udG91Y2hlZClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHV0aWxzLWFsZXJ0ICpuZ0lmPVwiY2FwdGlvbj8uZXJyb3JzPy5yZXF1aXJlZFwiIFtkaXNtaXNzYWJsZV09XCJmYWxzZVwiIFttaW5pbWFsXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWUgaXMgcmVxdWlyZWQuXG4gICAgICAgICAgICAgICAgICAgIDwvdXRpbHMtYWxlcnQ+XG4gICAgICAgICAgICAgICAgICAgIDx1dGlscy1hbGVydCAqbmdJZj1cImNhcHRpb24/LmVycm9ycz8udG9waWNFeGlzdHNcIiBbZGlzbWlzc2FibGVdPVwiZmFsc2VcIiBbbWluaW1hbF09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUb3BpYyBuYW1lIGlzIGFscmVhZHkgdGFrZW4hXG4gICAgICAgICAgICAgICAgICAgIDwvdXRpbHMtYWxlcnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1iLTMgY29sLXNtLTNcIiAqbmdJZj1cIiFpc1VwZGF0ZU1vZGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImxvYWRpbmcgfHwgIWZvcm0udmFsaWRcIiB2YWx1ZT1cIkNyZWF0ZVwiIChjbGljayk9XCJjcmVhdGVOZXdUb3BpYygpXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYi0zIGNvbC1zbS0zXCIgKm5nSWY9XCJpc1VwZGF0ZU1vZGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImxvYWRpbmcgfHwgIWZvcm0udmFsaWRcIiB2YWx1ZT1cIlVwZGF0ZVwiIChjbGljayk9XCJ1cGRhdGVUb3BpYygpXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==