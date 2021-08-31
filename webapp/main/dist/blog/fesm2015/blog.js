import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, EventEmitter, Component, Input, Output, ViewChild, NgModule } from '@angular/core';
import { Subject, throwError, Subscription, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import * as i2$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3 from 'utils';
import { UtilsModule } from 'utils';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/forms';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i5$1 from 'auth-oidc';
import { OidcAuthModule } from 'auth-oidc';
import * as i5$2 from 'ngx-markdown';
import { MarkdownModule } from 'ngx-markdown';

const PostsServiceConfigToken = new InjectionToken("PostsServiceConfig");
;
const CommentsServiceConfigToken = new InjectionToken("CommentsServiceConfig");
;
const TopicsServiceConfigToken = new InjectionToken("TopicsServiceConfig");
const BlogModuleConfigToken = new InjectionToken("BlogModuleConfig");

/*
 * Public API Surface of bookmarks
 */

/*
 * Public API Surface of blog
 */

class PostsService {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.onChange = new Subject();
    }
    all(endpoint, pageable) {
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}`, {
            params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "createdOn,desc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    one(endpoint, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(map(data => {
            return data;
        }));
    }
    findBySlug(endpoint, slug) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const query = {
            "conditions": [
                { "attribute": "slug", "operator": "eq", "value": slug }
            ]
        };
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, {
            "params": { "q": JSON.stringify(query) }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    create(endpoint, slug, title, text) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        let postRepr = {
            "slug": slug, "title": title, "text": text
        };
        return this.httpClient
            .post(`${this.config.serviceBaseUrl}/${apiEndpoint}`, postRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    update(endpoint, id, slug, title, text) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        let postRepr = {
            "slug": slug, "title": title, "text": text
        };
        return this.httpClient
            .put(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`, postRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    delete(endpoint, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .delete(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    assignTopics(endpoint, id, topicIds) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .put(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}/topics`, topicIds)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }));
    }
}
PostsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: PostsService, deps: [{ token: PostsServiceConfigToken }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
PostsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: PostsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: PostsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PostsServiceConfigToken]
                }] }, { type: i1.HttpClient }]; } });

class TopicListViewComponent {
    constructor() {
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    selectItem(item, opcode) {
        this.onSelectItem.emit({
            opcode: opcode,
            item: item
        });
    }
}
TopicListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TopicListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: { topics: "topics", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"topics\">\n    <ng-container *ngFor=\"let x of topics; index as i\">\n        <ng-container \n            [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n        </ng-container>\n    </ng-container>\n</ng-container>\n<ng-container *ngIf=\"!topics\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <a class=\"btn btn-danger m-1\" role=\"button\" (click)=\"parent.selectItem(item, 'select')\">{{item.caption}}</a>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No topic found!\n</ng-template>", styles: [""], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-topic-list-view',
                    templateUrl: './topic-list-view.component.html',
                    styleUrls: ['./topic-list-view.component.scss']
                }]
        }], propDecorators: { topics: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });

class CommentsService {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.onChange = new Subject();
    }
    all(endpoint, postId, pageable) {
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments`, {
            params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "createdOn,desc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    one(endpoint, postId, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`)
            .pipe(map(data => {
            return data;
        }));
    }
    create(endpoint, postId, text) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        let commentRepr = {
            "text": text
        };
        return this.httpClient
            .post(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments`, commentRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    update(endpoint, postId, id, text) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        let commentRepr = {
            "text": text
        };
        return this.httpClient
            .put(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`, commentRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    delete(endpoint, postId, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .delete(`${this.config.serviceBaseUrl}/${apiEndpoint}/${postId}/comments/${id}`)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
}
CommentsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentsService, deps: [{ token: CommentsServiceConfigToken }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
CommentsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [CommentsServiceConfigToken]
                }] }, { type: i1.HttpClient }]; } });

class CommentEditorComponent {
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
CommentEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentEditorComponent, deps: [{ token: CommentsServiceConfigToken }, { token: CommentsService }, { token: i2.Location }, { token: i2$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
CommentEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentEditorComponent, selector: "comment-editor", inputs: { headerTemplate: "headerTemplate", paramPostId: ["postId", "paramPostId"], paramCommentId: ["commentId", "paramCommentId"], updateMode: "updateMode" }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #defaultTitleTemplate let-item>\n    <div class=\"d-flex justify-content-between\">\n        <div>\n            <h5>POST A COMMENT</h5>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #contents>\n    <ng-container \n        [ngTemplateOutlet]=\"headerTemplate || defaultTitleTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n    <utils-alert *ngIf=\"successDesc\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>{{ successDesc }}</p>\n    </utils-alert>\n    <utils-alert *ngIf=\"errorDesc; else editor\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #editor>\n    <form [formGroup]=\"form\" novalidate onSubmit=\"return false;\">\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <textarea class=\"form-control\" id=\"postText\" rows=\"3\" formControlName=\"text\" required></textarea>\n                <div *ngIf=\"text?.invalid && (text?.dirty || text?.touched)\">\n                    <utils-alert *ngIf=\"text?.errors?.pattern\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Sorry, cannot leave this empty!\n                    </utils-alert>\n                </div>\n            </div>\n        </div>\n        <div class=\"mb-3\" *ngIf=\"!isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Post\" (click)=\"createNewComment()\">\n        </div>\n        <div class=\"mb-3\" *ngIf=\"isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Update\" (click)=\"updateComment()\">\n        </div>\n    </form>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
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
                }] }, { type: CommentsService }, { type: i2.Location }, { type: i2$1.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
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

class CommentListViewComponent {
    constructor() {
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    selectItem(entity) {
        this.onSelectItem.emit(entity);
    }
}
CommentListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CommentListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentListViewComponent, selector: "comment-list-view", inputs: { comments: "comments", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"comments\">\n    <div *ngFor=\"let x of comments\" class=\"bg-light\">\n        <ng-container \n            [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: x, list: this }\">\n        </ng-container>\n    </div>\n</ng-container>\n<ng-container *ngIf=\"!comments\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item>\n    <div class=\"created\"> {{item.owner}} commented on {{ item.createdOn | prettyDate }}.</div>\n    <p class=\"posttext \">\n      {{item.text}} \n    </p>\n    <hr class=\"my-4\">\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No comments yet!\n</ng-template>\n", styles: [""], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "prettyDate": i3.PrettyDatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'comment-list-view',
                    templateUrl: './comment-list-view.component.html',
                    styleUrls: ['./comment-list-view.component.css']
                }]
        }], propDecorators: { comments: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });

class CommentListComponent {
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
CommentListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentListComponent, deps: [{ token: CommentsService }, { token: i2$1.Router }, { token: i2$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
CommentListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentListComponent, selector: "blog-comment-list", inputs: { postId: "postId", noContentsTemplate: "noContentsTemplate", itemTemplate: "itemTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate" }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"true\">\n        <p>\n            The specified request could not be completed!\n        </p>\n        <hr>\n        <p class=\"mb-0\">Error Details: </p>\n        <p>{{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    <comment-list-view\n        [comments]=\"items\"\n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\">\n    </comment-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }, { type: CommentListViewComponent, selector: "comment-list-view", inputs: ["comments", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: CommentListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-comment-list',
                    templateUrl: './comment-list.component.html',
                    styleUrls: ['./comment-list.component.css']
                }]
        }], ctorParameters: function () { return [{ type: CommentsService }, { type: i2$1.Router }, { type: i2$1.ActivatedRoute }]; }, propDecorators: { postId: [{
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

class BlogPostViewComponent {
    constructor() {
        this.enableComments = true;
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    get postId() {
        return this.post.id;
    }
    selectItem(item, opcode) {
        this.onSelectItem.emit({
            opcode: opcode,
            item: item
        });
    }
}
BlogPostViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BlogPostViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostViewComponent, selector: "blog-post-view", inputs: { post: "post", topics: "topics", enableComments: "enableComments", headerTemplate: "headerTemplate", contentTemplate: "contentTemplate", footerTemplate: "footerTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<div *ngIf=\"post\" class=\"bg-light p-4\">\n\n  <ng-container \n    [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n    [ngTemplateOutletContext]=\"{ $implicit: post, list: this }\">\n  </ng-container>\n\n  <ng-container \n    [ngTemplateOutlet]=\"contentTemplate || defaultContentTemplate\"\n    [ngTemplateOutletContext]=\"{ $implicit: post, list: this }\">\n  </ng-container>\n\n  <ng-container \n    [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n    [ngTemplateOutletContext]=\"{ $implicit: post, list: this }\">\n  </ng-container>\n\n</div>\n\n<ng-template #defaultContentTemplate let-item let-parent=\"list\">\n  <p class=\"posttext \">\n    {{item.text}}\n  </p>\n  <h5>Posted under Topics:</h5>\n  <blog-topic-list-view [topics]=\"topics\"></blog-topic-list-view>\n  <hr class=\"my-4\">\n  <ng-container *ngIf=\"parent.enableComments\">\n    <comment-editor [updateMode]=\"false\" *authRequireLogin=\"true\"></comment-editor>\n    <hr class=\"my-4\">\n    <h5>Comments:</h5>\n    <div class=\"mb-3 col-sm-12\">\n      <blog-comment-list [postId]=\"postId\"></blog-comment-list>\n    </div>\n  </ng-container>\n</ng-template>\n\n<ng-template #defaultHeaderTemplate let-item let-parent=\"list\">\n  <div class=\"d-flex justify-content-between\">\n    <div>\n      <h2 class=\"blog-post-list-post-title\">{{item.title}}</h2>\n      <div class=\"created\"> {{item.owner}} created the post on {{item.createdOn | prettyDate }}.</div>\n    </div>\n    <div class=\"d-flex justify-content-between\">\n      <div class=\"ml-1\" *authRequireOwner=\"item.owner\">\n        <a class=\"btn btn-success\" role=\"button\" (click)=\"parent.selectItem(item, 'edit')\">Edit</a>\n      </div>\n      <div class=\"ml-1\" *authRequireOwner=\"item.owner\">\n        <a class=\"btn btn-success\" role=\"button\" (click)=\"parent.selectItem(item, 'delete')\">Delete</a>\n      </div>\n    </div>\n  </div>\n  <hr class=\"my-4\">\n</ng-template>\n\n<ng-template #defaultFooterTemplate let-item>\n  <div class=\"d-flex\">\n  </div>\n  <hr class=\"my-4\">\n</ng-template>\n", styles: [""], components: [{ type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: CommentEditorComponent, selector: "comment-editor", inputs: ["headerTemplate", "postId", "commentId", "updateMode"] }, { type: CommentListComponent, selector: "blog-comment-list", inputs: ["postId", "noContentsTemplate", "itemTemplate", "headerTemplate", "footerTemplate"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5$1.RequireLoginDirective, selector: "[authRequireLogin]", inputs: ["authRequireLogin", "authRequireLoginElse", "authRequireLoginThen"] }, { type: i5$1.RequireOwnerDirective, selector: "[authRequireOwner]", inputs: ["authRequireOwner", "authRequireOwnerElse", "authRequireOwnerThen"] }], pipes: { "prettyDate": i3.PrettyDatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-post-view',
                    templateUrl: './blog-post-view.component.html',
                    styleUrls: ['./blog-post-view.component.scss']
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { post: [{
                type: Input
            }], topics: [{
                type: Input
            }], enableComments: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });

class BlogPostComponent {
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
BlogPostComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostComponent, deps: [{ token: PostsService }, { token: i2$1.Router }, { token: i2$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
BlogPostComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostComponent, selector: "blog-post", inputs: { headerTemplate: "headerTemplate", contentTemplate: "contentTemplate", footerTemplate: "footerTemplate" }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc; else viewer\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #viewer>\n    <blog-post-view \n        [post]=\"postItem\" \n        [topics]=\"postItem?.topics\"\n        [headerTemplate]=\"headerTemplate\"\n        [contentTemplate]=\"contentTemplate\"\n        [footerTemplate]=\"footerTemplate\"\n        (onSelectItem)=\"handleViewEvent($event)\">\n    </blog-post-view>\n</ng-template>", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: BlogPostViewComponent, selector: "blog-post-view", inputs: ["post", "topics", "enableComments", "headerTemplate", "contentTemplate", "footerTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-post',
                    templateUrl: './blog-post.component.html',
                    styleUrls: ['./blog-post.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: PostsService }, { type: i2$1.Router }, { type: i2$1.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }] } });

function uniqueSlugValidator(postService) {
    return (control) => {
        var slug = control.value;
        if (!slug || control.pristine) {
            return of(null);
        }
        return postService.findBySlug("", slug).pipe(map(response => !!response.page.totalElements ? { 'slugExists': true } : null));
    };
}

class TopicsService {
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.onChange = new Subject();
    }
    all(endpoint, pageable) {
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}`, {
            params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    one(endpoint, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(map(data => {
            return data;
        }));
    }
    findByCaption(endpoint, caption, pageable) {
        const query = {
            "conditions": [
                { "attribute": "caption", "operator": "eq", "value": `%${caption}%` }
            ]
        };
        return this.search(endpoint, query, pageable);
    }
    findMatchingCaption(endpoint, caption, pageable) {
        const query = {
            "conditions": [
                { "attribute": "caption", "operator": "like", "value": `%${caption}%` }
            ]
        };
        return this.search(endpoint, query, pageable);
    }
    search(endpoint, query, pageable) {
        const page = pageable ? pageable.page : 0;
        const pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .get(`${this.config.serviceBaseUrl}/${apiEndpoint}/search`, {
            "params": {
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "caption,asc"
            }
        })
            .pipe(map(data => {
            return data;
        }));
    }
    create(endpoint, caption) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const topicRepr = {
            "caption": caption
        };
        return this.httpClient
            .post(`${this.config.serviceBaseUrl}/${apiEndpoint}`, topicRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    update(endpoint, id, caption) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        const topicRepr = {
            "caption": caption
        };
        return this.httpClient
            .put(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`, topicRepr)
            .pipe(map(data => {
            return data;
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
    delete(endpoint, id) {
        const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
        return this.httpClient
            .delete(`${this.config.serviceBaseUrl}/${apiEndpoint}/${id}`)
            .pipe(catchError((error) => {
            return throwError(new Error(error.status));
        }), tap({
            next: x => { this.onChange.next(x); }
        }));
    }
}
TopicsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicsService, deps: [{ token: TopicsServiceConfigToken }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
TopicsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [TopicsServiceConfigToken]
                }] }, { type: i1.HttpClient }]; } });

class TopicListComponent {
    constructor(topicsService, router, activatedRoute) {
        this.topicsService = topicsService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.enableSearch = true;
        this.filterText = '';
        this.onSelect = (item) => this.navigateToTopicPosts(item);
        this.errorDesc = "";
        this.loading = false;
        this.filter = "";
        this.subscription = new Subscription();
        this.responseHandler = {
            next: (result) => {
                this.response = result;
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                console.log(this.errorDesc);
            }
        };
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
        this.subscription.add(this.topicsService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onApplyFilter(text) {
        this.filterText = text;
        this.fetchPage(0);
    }
    fetchPage(pageNum) {
        this.pageable.page = pageNum;
        if (!!this.filterText) {
            this.topicsService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
        }
        else {
            this.topicsService.all("", this.pageable).subscribe(this.responseHandler);
        }
    }
    get items() {
        var _a, _b;
        if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.topics))
            return [];
        return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.topics;
    }
    get page() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
    }
    get hasItems() {
        var _a;
        return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
    }
    handleListViewEvent(evt) {
        switch (evt.opcode) {
            case 'select':
                this.onSelect(evt.item);
                break;
        }
    }
    navigateToTopicPosts(topic) {
        this.router.navigate(['/topics', topic.id, "posts"], {
            state: { "endpoint": `topics/${topic.id}/posts` }
        });
    }
    gotoPage(evt) {
        this.fetchPage(evt - 1);
    }
}
TopicListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicListComponent, deps: [{ token: TopicsService }, { token: i2$1.Router }, { token: i2$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
TopicListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicListComponent, selector: "blog-topic-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectTopic", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the topics list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-search-box (onApplyFilter)=\"onApplyFilter($event)\" *ngIf=\"enableSearch\">\n    </utils-search-box>\n    <blog-topic-list-view \n        [topics]=\"items\" \n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\"\n        (onSelectItem)=\"handleListViewEvent($event)\">\n    </blog-topic-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\">\n    </utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-topic-list',
                    templateUrl: './topic-list.component.html',
                    styleUrls: ['./topic-list.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: TopicsService }, { type: i2$1.Router }, { type: i2$1.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
                type: Input
            }], filterText: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], onSelect: [{
                type: Input,
                args: ['onSelectTopic']
            }] } });

class TopicSelectorComponent {
    constructor() {
        this.maxTopics = 10;
        this.maxTopicsError = false;
        this.initialTopics = [];
        this.selectedTopics = [];
        this.topicClicked = (item) => {
            if (this.isTopicSelected(item))
                this.unselectTopic(item);
            else
                this.selectTopic(item);
        };
    }
    ngOnInit() {
        this.selectedTopics = this.initialTopics;
    }
    isTopicSelected(topic) {
        return this.selectedTopics.findIndex(i => i.caption.toUpperCase() === topic.caption.toUpperCase()) > -1;
    }
    selectTopic(topic) {
        this.maxTopicsError = (!!this.maxTopics && this.selectedTopics.length >= this.maxTopics);
        if (this.maxTopicsError) {
            return;
        }
        this.selectedTopics.push(topic);
        this.selectedTopics.sort((a, b) => a.caption.toUpperCase().localeCompare(b.caption.toUpperCase()));
    }
    unselectTopic(topic) {
        this.selectedTopics = this.selectedTopics.filter(i => i.caption.toUpperCase() !== topic.caption.toUpperCase());
        this.maxTopicsError = (!!this.maxTopics && this.selectedTopics.length >= this.maxTopics);
    }
}
TopicSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TopicSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicSelectorComponent, selector: "topic-selector", inputs: { maxTopics: "maxTopics", initialTopics: "initialTopics", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, ngImport: i0, template: "\n\n<label class=\"form-label\">Selected Topics:</label>\n<div>\n    <blog-topic-list-view [topics]=\"selectedTopics\"></blog-topic-list-view>\n    <utils-alert *ngIf=\"maxTopicsError\" [dismissable]=\"true\" [minimal]=\"true\">\n        Sorry, cannot select more than {{maxTopics}} topics for a post.\n    </utils-alert>\n</div>\n<label class=\"form-label\">Available Topics:</label>\n<blog-topic-list \n    [itemTemplate]=\"itemTemplate\"\n    [noContentsTemplate]=\"noContentsTemplate\"\n    [onSelectTopic]=\"topicClicked\">\n</blog-topic-list>\n", styles: [""], components: [{ type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: TopicListComponent, selector: "blog-topic-list", inputs: ["enableSearch", "filterText", "itemTemplate", "noContentsTemplate", "headerTemplate", "footerTemplate", "onSelectTopic"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'topic-selector',
                    templateUrl: './topic-selector.component.html',
                    styleUrls: ['./topic-selector.component.css']
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { maxTopics: [{
                type: Input
            }], initialTopics: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }] } });

class TopicEditorComponent {
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
TopicEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicEditorComponent, deps: [{ token: TopicsService }, { token: i2$1.Router }, { token: i2.Location }, { token: i2$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
TopicEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicEditorComponent, selector: "topic-editor", inputs: { headerTemplate: "headerTemplate", paramTopicId: ["topicId", "paramTopicId"], updateMode: "updateMode" }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #defaultTitleTemplate let-item>\n    <div class=\"d-flex justify-content-between\">\n        <div>\n            <h5>CREATE A NEW TOPIC</h5>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #contents>\n    <ng-container \n        [ngTemplateOutlet]=\"headerTemplate || defaultTitleTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n    <utils-alert *ngIf=\"errorDesc; else editor\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #editor>\n    <form [formGroup]=\"form\" novalidate onSubmit=\"return false;\">\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-9\">\n                <input type=\"text\" class=\"form-control\" id=\"caption\" placeholder=\"Topic name ... \"\n                    formControlName=\"caption\" required>\n\n                <div *ngIf=\"caption?.invalid && (caption?.dirty || caption?.touched)\">\n                    <utils-alert *ngIf=\"caption?.errors?.required\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Name is required.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"caption?.errors?.topicExists\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Topic name is already taken!\n                    </utils-alert>\n                </div>\n\n            </div>\n            <div class=\"mb-3 col-sm-3\" *ngIf=\"!isUpdateMode\">\n                <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Create\" (click)=\"createNewTopic()\">\n            </div>\n            <div class=\"mb-3 col-sm-3\" *ngIf=\"isUpdateMode\">\n                <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Update\" (click)=\"updateTopic()\">\n            </div>\n        </div>\n    </form>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: TopicEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'topic-editor',
                    templateUrl: './topic-editor.component.html',
                    styleUrls: ['./topic-editor.component.css']
                }]
        }], ctorParameters: function () { return [{ type: TopicsService }, { type: i2$1.Router }, { type: i2.Location }, { type: i2$1.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
                type: Input
            }], paramTopicId: [{
                type: Input,
                args: ["topicId"]
            }], updateMode: [{
                type: Input
            }] } });

function slugify(text) {
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    const to = "aaaaaeeeeeiiiiooooouuuunc------";
    const newText = text.split('').map((letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)));
    return newText
        .toString() // Cast to string
        .toLowerCase() // Convert the string to lowercase letters
        .trim() // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-y-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
class BlogPostEditorComponent {
    constructor(config, postService, location, activatedRoute) {
        this.config = config;
        this.postService = postService;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.updateMode = true;
        this.post = null;
        this.successDesc = "";
        this.errorDesc = "";
        this.loading = false;
        this.fetchResponseHandler = {
            next: (result) => {
                this.blogPost = result;
                this.updateForm();
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                return false;
            }
        };
        this.updateResponseHandler = {
            next: (result) => {
                this.blogPost = result;
                this.assignTopics();
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                return false;
            }
        };
    }
    ngOnInit() {
        var _a;
        this.form = new FormGroup({
            "title": new FormControl("", [
                Validators.required,
                Validators.maxLength(this.config.maxTitleLength),
            ]),
            "slug": new FormControl("", [
                Validators.required,
                Validators.maxLength(this.config.maxTitleLength),
                Validators.pattern(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)
            ], uniqueSlugValidator(this.postService)),
            "text": new FormControl("", [
                Validators.required,
                Validators.maxLength(this.config.maxContentLength)
            ]),
        });
        (_a = this.title) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(val => {
            var _a, _b;
            if (!((_a = this.slug) === null || _a === void 0 ? void 0 : _a.touched) || !((_b = this.slug) === null || _b === void 0 ? void 0 : _b.value)) {
                this.generateSlug();
            }
        });
        this.activatedRoute.params.subscribe(params => {
            var _a;
            this.postId = (_a = params.postId) !== null && _a !== void 0 ? _a : this.paramPostId;
            if (this.isUpdateMode)
                this.fetchPost(this.postId);
        });
    }
    get isUpdateMode() {
        return this.updateMode && this.postId !== undefined;
    }
    get title() { return this.form.get('title'); }
    get slug() { return this.form.get('slug'); }
    get text() { return this.form.get('text'); }
    get selectedTopics() {
        var _a;
        return ((_a = this.post) === null || _a === void 0 ? void 0 : _a.topics) || [];
    }
    set blogPost(item) {
        var _a;
        this.post = this.updateMode ? item : null;
        this.postId = this.updateMode ? (_a = this.post) === null || _a === void 0 ? void 0 : _a.id : undefined;
        console.info("Got post id: " + this.postId);
    }
    generateSlug() {
        var _a, _b;
        (_a = this.slug) === null || _a === void 0 ? void 0 : _a.setValue(slugify((_b = this.title) === null || _b === void 0 ? void 0 : _b.value));
    }
    updateForm() {
        var _a, _b, _c;
        this.title.setValue((_a = this.post) === null || _a === void 0 ? void 0 : _a.title);
        this.slug.setValue((_b = this.post) === null || _b === void 0 ? void 0 : _b.slug);
        this.text.setValue((_c = this.post) === null || _c === void 0 ? void 0 : _c.text);
    }
    fetchPost(postId) {
        this.loading = true;
        this.postService
            .one("posts", postId)
            .subscribe(this.fetchResponseHandler);
    }
    createNewPost() {
        var _a, _b, _c;
        this.postService
            .create("posts", (_a = this.slug) === null || _a === void 0 ? void 0 : _a.value, (_b = this.title) === null || _b === void 0 ? void 0 : _b.value, (_c = this.text) === null || _c === void 0 ? void 0 : _c.value)
            .subscribe(this.updateResponseHandler);
    }
    updatePost() {
        var _a, _b, _c;
        this.postService
            .update("posts", this.postId, (_a = this.slug) === null || _a === void 0 ? void 0 : _a.value, (_b = this.title) === null || _b === void 0 ? void 0 : _b.value, (_c = this.text) === null || _c === void 0 ? void 0 : _c.value)
            .subscribe(this.updateResponseHandler);
    }
    assignTopics() {
        const selectedTopics = this.topicSelector.selectedTopics.map(i => i.id);
        console.info(selectedTopics);
        this.postService
            .assignTopics("posts", this.postId, selectedTopics)
            .subscribe({
            next: () => {
                this.updateForm();
                this.successDesc = "Post updated successfully!";
                this.loading = false;
            },
            error: (err) => {
                this.errorDesc = err.message;
                this.loading = false;
                return false;
            }
        });
    }
    cancel() {
        this.location.back();
    }
}
BlogPostEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostEditorComponent, deps: [{ token: PostsServiceConfigToken }, { token: PostsService }, { token: i2.Location }, { token: i2$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
BlogPostEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostEditorComponent, selector: "blog-post-editor", inputs: { headerTemplate: "headerTemplate", paramPostId: ["postId", "paramPostId"], updateMode: "updateMode" }, viewQueries: [{ propertyName: "topicSelector", first: true, predicate: ["topicSelector"], descendants: true }], ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #defaultTitleTemplate let-item>\n    <div class=\"d-flex justify-content-between\">\n        <div>\n            <h5>WRITE A POST</h5>\n        </div>\n        <div><a class=\"btn btn-success\" role=\"button\" (click)=\"cancel()\">Cancel</a></div>\n    </div>\n    <hr class=\"my-4\">\n</ng-template>\n\n<ng-template #contents>\n    <ng-container \n        [ngTemplateOutlet]=\"headerTemplate || defaultTitleTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n    <utils-alert *ngIf=\"successDesc\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>{{ successDesc }}</p>\n    </utils-alert>\n    <utils-alert *ngIf=\"errorDesc; else editor\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #editor>\n    <form [formGroup]=\"form\" novalidate onSubmit=\"return false;\">\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <label for=\"title\" class=\"form-label\">Title</label>\n                <input type=\"text\" class=\"form-control\" id=\"title\" \n                    placeholder=\"Title of your post ... \"\n                    formControlName=\"title\" required>\n\n                <div *ngIf=\"title?.invalid && (title?.dirty || title?.touched)\">\n                    <utils-alert *ngIf=\"title?.errors?.required\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Title is required.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"title?.errors?.maxLength\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Title length exceeds limit.\n                    </utils-alert>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <label for=\"slug\" class=\"form-label\">Slug</label>\n                <div class=\"d-flex justify-content-between\">\n                    <input type=\"text\" class=\"form-control\" id=\"slug\" \n                        placeholder=\"Slug goes here ... e.g. this-is-a-valid-slug\"\n                        formControlName=\"slug\" required>\n                    <input class=\"btn btn-primary ml-1\" type=\"button\" [disabled]=\"loading\" value=\"Auto Generate\" (click)=\"generateSlug()\">\n                </div>\n                <div *ngIf=\"slug?.invalid && (slug?.dirty || slug?.touched)\">\n                    <utils-alert *ngIf=\"slug?.errors?.required\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Slug is required.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"slug?.errors?.maxLength\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Slug length exceeds limit.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"slug?.errors?.pattern\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Only clean url like expressions are allowed in slugs e.g. this-is-a-valid-slug\n                    </utils-alert>\n                    <utils-alert *ngIf=\"slug?.errors?.slugExists\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Slug is already taken!\n                    </utils-alert>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-6\">\n                <label for=\"text\" class=\"form-label\">Write your story here:</label>\n                <textarea class=\"form-control\" id=\"postText\" rows=\"3\" formControlName=\"text\" required></textarea>\n\n                <div *ngIf=\"text?.invalid && (text?.dirty || text?.touched)\">\n                    <utils-alert *ngIf=\"text?.errors?.pattern\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Sorry, cannot leave this empty!\n                    </utils-alert>\n                    <utils-alert *ngIf=\"text?.errors?.maxLength\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Conent length exceeds limit.\n                    </utils-alert>\n                </div>\n\n            </div>\n            <div class=\"mb-3 col-sm-6\">\n                <label class=\"form-label\">Preview</label>\n                <markdown class=\"variable-binding\" [data]=\"text?.value\"></markdown>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <topic-selector #topicSelector \n                    [initialTopics]=\"selectedTopics\"\n                    [noContentsTemplate]=\"topicsNotFoundTemplate\">\n                </topic-selector>\n            </div>\n        </div>\n        <div class=\"mb-3\" *ngIf=\"!isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Post\" (click)=\"createNewPost()\">\n        </div>\n        <div class=\"mb-3\" *ngIf=\"isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Update\" (click)=\"updatePost()\">\n        </div>\n    </form>\n</ng-template>\n\n<ng-template #topicsNotFoundTemplate let-item>\n    No topic found!\n    <topic-editor *authRequireRole=\"'admin'\"></topic-editor>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i5$2.MarkdownComponent, selector: "markdown, [markdown]", inputs: ["data", "src", "emoji", "katex", "katexOptions", "lineHighlight", "line", "lineOffset", "lineNumbers", "start"], outputs: ["error", "load", "ready"] }, { type: TopicSelectorComponent, selector: "topic-selector", inputs: ["maxTopics", "initialTopics", "itemTemplate", "noContentsTemplate"] }, { type: TopicEditorComponent, selector: "topic-editor", inputs: ["headerTemplate", "topicId", "updateMode"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5$1.RequireRoleDirective, selector: "[authRequireRole]", inputs: ["authRequireRole", "authRequireRoleElse", "authRequireRoleThen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-post-editor',
                    templateUrl: './blog-post-editor.component.html',
                    styleUrls: ['./blog-post-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PostsServiceConfigToken]
                }] }, { type: PostsService }, { type: i2.Location }, { type: i2$1.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
                type: Input
            }], paramPostId: [{
                type: Input,
                args: ["postId"]
            }], updateMode: [{
                type: Input
            }], topicSelector: [{
                type: ViewChild,
                args: ['topicSelector']
            }] } });

class BlogPostListViewComponent {
    constructor() {
        this.onSelectItem = new EventEmitter();
    }
    ngOnInit() { }
    selectItem(item, opcode) {
        this.onSelectItem.emit({
            opcode: opcode,
            item: item
        });
    }
}
BlogPostListViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BlogPostListViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostListViewComponent, selector: "blog-post-list-view", inputs: { posts: "posts", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0, template: "<ng-container *ngIf=\"posts\">\n    <div *ngFor=\"let x of posts\" class=\"bg-light\">\n        <ng-container [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: x, list: this }\">\n        </ng-container>\n    </div>\n</ng-container>\n<ng-container *ngIf=\"!posts\">\n    <ng-container [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <div class=\"p-1\">\n        <a (click)=\"parent.selectItem(item, 'select')\"><h4 class=\"blog-post-list-post-title\">{{item.title}}</h4></a>\n        <div class=\"created\"> {{item.owner}} created the post on {{item.createdOn | prettyDate }}.</div>\n        <p class=\"posttext \">\n            {{item.text}}\n        </p>\n        <p>\n            <blog-topic-list-view [topics]=\"item.topics\"></blog-topic-list-view>\n        </p>\n        <button class=\"btn btn-success\" (click)=\"parent.selectItem(item, 'select')\">Read More...</button>\n        <hr class=\"my-4\">\n    </div>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No blog posts found! Why not create one?\n</ng-template>", styles: [".created{padding-top:5px;padding-bottom:5px}.posttext{padding-top:10px;padding-bottom:10px}.blog-post-list-post-title{cursor:pointer;text-decoration:underline}"], components: [{ type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "prettyDate": i3.PrettyDatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostListViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-post-list-view',
                    templateUrl: './blog-post-list-view.component.html',
                    styleUrls: ['./blog-post-list-view.component.scss'],
                }]
        }], propDecorators: { posts: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], noContentsTemplate: [{
                type: Input
            }], onSelectItem: [{
                type: Output
            }] } });

class BlogPostListComponent {
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
BlogPostListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostListComponent, deps: [{ token: PostsService }, { token: i2$1.Router }, { token: i2$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
BlogPostListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostListComponent, selector: "blog-post-list", inputs: { noContentsTemplate: "noContentsTemplate", itemTemplate: "itemTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectPost", "onSelect"] }, ngImport: i0, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"true\">\n        <p>\n            The specified request could not be completed!\n        </p>\n        <hr>\n        <p class=\"mb-0\">Error Details: </p>\n        <p>{{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    <blog-post-list-view\n        [posts]=\"items\"\n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\"\n        (onSelectItem)=\"handleListViewEvent($event)\">\n    </blog-post-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }, { type: BlogPostListViewComponent, selector: "blog-post-list-view", inputs: ["posts", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogPostListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'blog-post-list',
                    templateUrl: './blog-post-list.component.html',
                    styleUrls: ['./blog-post-list.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: PostsService }, { type: i2$1.Router }, { type: i2$1.ActivatedRoute }]; }, propDecorators: { noContentsTemplate: [{
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

/*
 * Public API Surface of bookmarks
 */

/*
 * Public API Surface of blog
 */

class BlogModule {
    static forRoot(config) {
        return {
            ngModule: BlogModule,
            providers: [
                PostsService,
                TopicsService,
                {
                    provide: PostsServiceConfigToken,
                    useValue: config.posts
                },
                {
                    provide: CommentsServiceConfigToken,
                    useValue: config.comments
                },
                {
                    provide: TopicsServiceConfigToken,
                    useValue: config.topics
                }
            ]
        };
    }
}
BlogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogModule, declarations: [BlogPostListViewComponent,
        BlogPostListComponent,
        TopicListViewComponent,
        TopicListComponent,
        BlogPostEditorComponent,
        BlogPostComponent,
        BlogPostViewComponent,
        TopicSelectorComponent,
        TopicEditorComponent,
        CommentListComponent,
        CommentListViewComponent,
        CommentEditorComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule, i5$2.MarkdownModule, i5$1.OidcAuthModule, UtilsModule], exports: [BlogPostListViewComponent,
        BlogPostListComponent,
        TopicListViewComponent,
        TopicListComponent,
        BlogPostEditorComponent,
        BlogPostComponent,
        BlogPostViewComponent] });
BlogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            MarkdownModule.forChild(),
            OidcAuthModule.forChild(),
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        BlogPostListViewComponent,
                        BlogPostListComponent,
                        TopicListViewComponent,
                        TopicListComponent,
                        BlogPostEditorComponent,
                        BlogPostComponent,
                        BlogPostViewComponent,
                        TopicSelectorComponent,
                        TopicEditorComponent,
                        CommentListComponent,
                        CommentListViewComponent,
                        CommentEditorComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        MarkdownModule.forChild(),
                        OidcAuthModule.forChild(),
                        UtilsModule
                    ],
                    exports: [
                        BlogPostListViewComponent,
                        BlogPostListComponent,
                        TopicListViewComponent,
                        TopicListComponent,
                        BlogPostEditorComponent,
                        BlogPostComponent,
                        BlogPostViewComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of blog
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BlogModule, BlogModuleConfigToken, BlogPostComponent, BlogPostEditorComponent, BlogPostListComponent, BlogPostListViewComponent, BlogPostViewComponent, CommentListComponent, CommentListViewComponent, CommentsServiceConfigToken, PostsService, PostsServiceConfigToken, TopicListComponent, TopicListViewComponent, TopicsService, TopicsServiceConfigToken };
//# sourceMappingURL=blog.js.map
