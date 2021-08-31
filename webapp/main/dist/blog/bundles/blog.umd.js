(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/router'), require('utils'), require('@angular/common'), require('@angular/forms'), require('auth-oidc'), require('ngx-markdown')) :
    typeof define === 'function' && define.amd ? define('blog', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common/http', '@angular/router', 'utils', '@angular/common', '@angular/forms', 'auth-oidc', 'ngx-markdown'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.blog = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common.http, global.ng.router, global.i3, global.ng.common, global.ng.forms, global.i5$1, global.i5$2));
}(this, (function (exports, i0, rxjs, operators, i1, i2$1, i3, i2, i5, i5$1, i5$2) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i5__namespace$1 = /*#__PURE__*/_interopNamespace(i5$1);
    var i5__namespace$2 = /*#__PURE__*/_interopNamespace(i5$2);

    var PostsServiceConfigToken = new i0.InjectionToken("PostsServiceConfig");
    ;
    var CommentsServiceConfigToken = new i0.InjectionToken("CommentsServiceConfig");
    ;
    var TopicsServiceConfigToken = new i0.InjectionToken("TopicsServiceConfig");
    var BlogModuleConfigToken = new i0.InjectionToken("BlogModuleConfig");

    /*
     * Public API Surface of bookmarks
     */

    /*
     * Public API Surface of blog
     */

    var PostsService = /** @class */ (function () {
        function PostsService(config, httpClient) {
            this.config = config;
            this.httpClient = httpClient;
            this.onChange = new rxjs.Subject();
        }
        PostsService.prototype.all = function (endpoint, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint, {
                params: {
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "createdOn,desc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        PostsService.prototype.one = function (endpoint, id) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id)
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        PostsService.prototype.findBySlug = function (endpoint, slug) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var query = {
                "conditions": [
                    { "attribute": "slug", "operator": "eq", "value": slug }
                ]
            };
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/search", {
                "params": { "q": JSON.stringify(query) }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        PostsService.prototype.create = function (endpoint, slug, title, text) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var postRepr = {
                "slug": slug, "title": title, "text": text
            };
            return this.httpClient
                .post(this.config.serviceBaseUrl + "/" + apiEndpoint, postRepr)
                .pipe(operators.map(function (data) {
                return data;
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        PostsService.prototype.update = function (endpoint, id, slug, title, text) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var postRepr = {
                "slug": slug, "title": title, "text": text
            };
            return this.httpClient
                .put(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id, postRepr)
                .pipe(operators.map(function (data) {
                return data;
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        PostsService.prototype.delete = function (endpoint, id) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .delete(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id)
                .pipe(operators.catchError(function (error) {
                return rxjs.throwError(new Error(error.status));
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        PostsService.prototype.assignTopics = function (endpoint, id, topicIds) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .put(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id + "/topics", topicIds)
                .pipe(operators.catchError(function (error) {
                return rxjs.throwError(new Error(error.status));
            }));
        };
        return PostsService;
    }());
    PostsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: PostsService, deps: [{ token: PostsServiceConfigToken }, { token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    PostsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: PostsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: PostsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [PostsServiceConfigToken]
                        }] }, { type: i1__namespace.HttpClient }];
        } });

    var TopicListViewComponent = /** @class */ (function () {
        function TopicListViewComponent() {
            this.onSelectItem = new i0.EventEmitter();
        }
        TopicListViewComponent.prototype.ngOnInit = function () { };
        TopicListViewComponent.prototype.selectItem = function (item, opcode) {
            this.onSelectItem.emit({
                opcode: opcode,
                item: item
            });
        };
        return TopicListViewComponent;
    }());
    TopicListViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicListViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    TopicListViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: { topics: "topics", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"topics\">\n    <ng-container *ngFor=\"let x of topics; index as i\">\n        <ng-container \n            [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: x, index: i, list: this }\">\n        </ng-container>\n    </ng-container>\n</ng-container>\n<ng-container *ngIf=\"!topics\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <a class=\"btn btn-danger m-1\" role=\"button\" (click)=\"parent.selectItem(item, 'select')\">{{item.caption}}</a>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No topic found!\n</ng-template>", styles: [""], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicListViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'blog-topic-list-view',
                        templateUrl: './topic-list-view.component.html',
                        styleUrls: ['./topic-list-view.component.scss']
                    }]
            }], propDecorators: { topics: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], onSelectItem: [{
                    type: i0.Output
                }] } });

    var CommentsService = /** @class */ (function () {
        function CommentsService(config, httpClient) {
            this.config = config;
            this.httpClient = httpClient;
            this.onChange = new rxjs.Subject();
        }
        CommentsService.prototype.all = function (endpoint, postId, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + postId + "/comments", {
                params: {
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "createdOn,desc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        CommentsService.prototype.one = function (endpoint, postId, id) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + postId + "/comments/" + id)
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        CommentsService.prototype.create = function (endpoint, postId, text) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var commentRepr = {
                "text": text
            };
            return this.httpClient
                .post(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + postId + "/comments", commentRepr)
                .pipe(operators.map(function (data) {
                return data;
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        CommentsService.prototype.update = function (endpoint, postId, id, text) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var commentRepr = {
                "text": text
            };
            return this.httpClient
                .put(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + postId + "/comments/" + id, commentRepr)
                .pipe(operators.map(function (data) {
                return data;
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        CommentsService.prototype.delete = function (endpoint, postId, id) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .delete(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + postId + "/comments/" + id)
                .pipe(operators.catchError(function (error) {
                return rxjs.throwError(new Error(error.status));
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        return CommentsService;
    }());
    CommentsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentsService, deps: [{ token: CommentsServiceConfigToken }, { token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    CommentsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [CommentsServiceConfigToken]
                        }] }, { type: i1__namespace.HttpClient }];
        } });

    var CommentEditorComponent = /** @class */ (function () {
        function CommentEditorComponent(config, commentsService, location, activatedRoute) {
            var _this = this;
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
                next: function (result) {
                    _this.blogComment = result;
                    _this.updateForm();
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    return false;
                }
            };
        }
        CommentEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.form = new i5.FormGroup({
                "text": new i5.FormControl("", [
                    i5.Validators.required,
                    i5.Validators.maxLength(this.config.maxContentLength)
                ]),
            });
            this.activatedRoute.params.subscribe(function (params) {
                var _a, _b;
                _this.postId = (_a = params.postId) !== null && _a !== void 0 ? _a : _this.paramPostId;
                _this.commentId = (_b = params.commentId) !== null && _b !== void 0 ? _b : _this.paramCommentId;
                if (_this.isUpdateMode)
                    _this.fetchComment(_this.commentId);
            });
        };
        Object.defineProperty(CommentEditorComponent.prototype, "isUpdateMode", {
            get: function () {
                return this.updateMode && this.commentId !== undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommentEditorComponent.prototype, "text", {
            get: function () { return this.form.get('text'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommentEditorComponent.prototype, "blogComment", {
            set: function (item) {
                var _a;
                this.comment = this.updateMode ? item : null;
                this.commentId = this.updateMode ? (_a = this.comment) === null || _a === void 0 ? void 0 : _a.id : undefined;
                console.info("Got comment id: " + this.commentId);
            },
            enumerable: false,
            configurable: true
        });
        CommentEditorComponent.prototype.updateForm = function () {
            var _a;
            this.text.setValue((_a = this.comment) === null || _a === void 0 ? void 0 : _a.text);
        };
        CommentEditorComponent.prototype.fetchComment = function (commentId) {
            this.loading = true;
            this.commentsService
                .one("", this.postId, commentId)
                .subscribe(this.fetchResponseHandler);
        };
        CommentEditorComponent.prototype.createNewComment = function () {
            var _a;
            this.commentsService
                .create("", this.postId, (_a = this.text) === null || _a === void 0 ? void 0 : _a.value)
                .subscribe(this.fetchResponseHandler);
        };
        CommentEditorComponent.prototype.updateComment = function () {
            var _a;
            this.commentsService
                .update("", this.postId, this.commentId, (_a = this.text) === null || _a === void 0 ? void 0 : _a.value)
                .subscribe(this.fetchResponseHandler);
        };
        CommentEditorComponent.prototype.cancel = function () {
            this.location.back();
        };
        return CommentEditorComponent;
    }());
    CommentEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentEditorComponent, deps: [{ token: CommentsServiceConfigToken }, { token: CommentsService }, { token: i2__namespace.Location }, { token: i2__namespace$1.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CommentEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentEditorComponent, selector: "comment-editor", inputs: { headerTemplate: "headerTemplate", paramPostId: ["postId", "paramPostId"], paramCommentId: ["commentId", "paramCommentId"], updateMode: "updateMode" }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #defaultTitleTemplate let-item>\n    <div class=\"d-flex justify-content-between\">\n        <div>\n            <h5>POST A COMMENT</h5>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #contents>\n    <ng-container \n        [ngTemplateOutlet]=\"headerTemplate || defaultTitleTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n    <utils-alert *ngIf=\"successDesc\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>{{ successDesc }}</p>\n    </utils-alert>\n    <utils-alert *ngIf=\"errorDesc; else editor\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #editor>\n    <form [formGroup]=\"form\" novalidate onSubmit=\"return false;\">\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <textarea class=\"form-control\" id=\"postText\" rows=\"3\" formControlName=\"text\" required></textarea>\n                <div *ngIf=\"text?.invalid && (text?.dirty || text?.touched)\">\n                    <utils-alert *ngIf=\"text?.errors?.pattern\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Sorry, cannot leave this empty!\n                    </utils-alert>\n                </div>\n            </div>\n        </div>\n        <div class=\"mb-3\" *ngIf=\"!isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Post\" (click)=\"createNewComment()\">\n        </div>\n        <div class=\"mb-3\" *ngIf=\"isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Update\" (click)=\"updateComment()\">\n        </div>\n    </form>\n</ng-template>\n", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5__namespace.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'comment-editor',
                        templateUrl: './comment-editor.component.html',
                        styleUrls: ['./comment-editor.component.css']
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [CommentsServiceConfigToken]
                        }] }, { type: CommentsService }, { type: i2__namespace.Location }, { type: i2__namespace$1.ActivatedRoute }];
        }, propDecorators: { headerTemplate: [{
                    type: i0.Input
                }], paramPostId: [{
                    type: i0.Input,
                    args: ["postId"]
                }], paramCommentId: [{
                    type: i0.Input,
                    args: ["commentId"]
                }], updateMode: [{
                    type: i0.Input
                }] } });

    var CommentListViewComponent = /** @class */ (function () {
        function CommentListViewComponent() {
            this.onSelectItem = new i0.EventEmitter();
        }
        CommentListViewComponent.prototype.ngOnInit = function () { };
        CommentListViewComponent.prototype.selectItem = function (entity) {
            this.onSelectItem.emit(entity);
        };
        return CommentListViewComponent;
    }());
    CommentListViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentListViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    CommentListViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentListViewComponent, selector: "comment-list-view", inputs: { comments: "comments", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"comments\">\n    <div *ngFor=\"let x of comments\" class=\"bg-light\">\n        <ng-container \n            [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: x, list: this }\">\n        </ng-container>\n    </div>\n</ng-container>\n<ng-container *ngIf=\"!comments\">\n    <ng-container \n        [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item>\n    <div class=\"created\"> {{item.owner}} commented on {{ item.createdOn | prettyDate }}.</div>\n    <p class=\"posttext \">\n      {{item.text}} \n    </p>\n    <hr class=\"my-4\">\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No comments yet!\n</ng-template>\n", styles: [""], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "prettyDate": i3__namespace.PrettyDatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentListViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'comment-list-view',
                        templateUrl: './comment-list-view.component.html',
                        styleUrls: ['./comment-list-view.component.css']
                    }]
            }], propDecorators: { comments: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], onSelectItem: [{
                    type: i0.Output
                }] } });

    var CommentListComponent = /** @class */ (function () {
        function CommentListComponent(commentsService, router, activatedRoute) {
            var _a;
            this.commentsService = commentsService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.errorDesc = "";
            this.loading = false;
            this.subscription = new rxjs.Subscription();
            this.state = (_a = this.router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras.state;
            this.response = null;
            this.pageable = {
                page: 0
            };
        }
        CommentListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
                _this.fetchPage(pageNum);
            });
            // Requery when the backend data changes
            this.subscription.add(this.commentsService.onChange.subscribe({ next: function () { return _this.fetchPage(0); } }));
        };
        CommentListComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        CommentListComponent.prototype.fetchPage = function (pageNum) {
            var _this = this;
            var _a;
            //const routeParams = this.route.snapshot.paramMap;
            //this.organizationId = routeParams.get('orgId') as string;  
            this.pageable.page = pageNum;
            this.loading = true;
            this.commentsService.all((_a = this.state) === null || _a === void 0 ? void 0 : _a.endpoint, this.postId, this.pageable)
                .subscribe({
                next: function (result) {
                    _this.response = result;
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    console.log(_this.errorDesc);
                }
            });
        };
        Object.defineProperty(CommentListComponent.prototype, "items", {
            get: function () {
                var _a, _b;
                if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.comments))
                    return [];
                return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.comments;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommentListComponent.prototype, "page", {
            get: function () {
                var _a;
                return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
            },
            enumerable: false,
            configurable: true
        });
        CommentListComponent.prototype.gotoPage = function (evt) {
            this.fetchPage(evt - 1);
        };
        return CommentListComponent;
    }());
    CommentListComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentListComponent, deps: [{ token: CommentsService }, { token: i2__namespace$1.Router }, { token: i2__namespace$1.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    CommentListComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: CommentListComponent, selector: "blog-comment-list", inputs: { postId: "postId", noContentsTemplate: "noContentsTemplate", itemTemplate: "itemTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate" }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"true\">\n        <p>\n            The specified request could not be completed!\n        </p>\n        <hr>\n        <p class=\"mb-0\">Error Details: </p>\n        <p>{{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    <comment-list-view\n        [comments]=\"items\"\n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\">\n    </comment-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3__namespace.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }, { type: CommentListViewComponent, selector: "comment-list-view", inputs: ["comments", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: CommentListComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'blog-comment-list',
                        templateUrl: './comment-list.component.html',
                        styleUrls: ['./comment-list.component.css']
                    }]
            }], ctorParameters: function () { return [{ type: CommentsService }, { type: i2__namespace$1.Router }, { type: i2__namespace$1.ActivatedRoute }]; }, propDecorators: { postId: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], headerTemplate: [{
                    type: i0.Input
                }], footerTemplate: [{
                    type: i0.Input
                }] } });

    var BlogPostViewComponent = /** @class */ (function () {
        function BlogPostViewComponent() {
            this.enableComments = true;
            this.onSelectItem = new i0.EventEmitter();
        }
        BlogPostViewComponent.prototype.ngOnInit = function () { };
        Object.defineProperty(BlogPostViewComponent.prototype, "postId", {
            get: function () {
                return this.post.id;
            },
            enumerable: false,
            configurable: true
        });
        BlogPostViewComponent.prototype.selectItem = function (item, opcode) {
            this.onSelectItem.emit({
                opcode: opcode,
                item: item
            });
        };
        return BlogPostViewComponent;
    }());
    BlogPostViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    BlogPostViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostViewComponent, selector: "blog-post-view", inputs: { post: "post", topics: "topics", enableComments: "enableComments", headerTemplate: "headerTemplate", contentTemplate: "contentTemplate", footerTemplate: "footerTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0__namespace, template: "<div *ngIf=\"post\" class=\"bg-light p-4\">\n\n  <ng-container \n    [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n    [ngTemplateOutletContext]=\"{ $implicit: post, list: this }\">\n  </ng-container>\n\n  <ng-container \n    [ngTemplateOutlet]=\"contentTemplate || defaultContentTemplate\"\n    [ngTemplateOutletContext]=\"{ $implicit: post, list: this }\">\n  </ng-container>\n\n  <ng-container \n    [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n    [ngTemplateOutletContext]=\"{ $implicit: post, list: this }\">\n  </ng-container>\n\n</div>\n\n<ng-template #defaultContentTemplate let-item let-parent=\"list\">\n  <p class=\"posttext \">\n    {{item.text}}\n  </p>\n  <h5>Posted under Topics:</h5>\n  <blog-topic-list-view [topics]=\"topics\"></blog-topic-list-view>\n  <hr class=\"my-4\">\n  <ng-container *ngIf=\"parent.enableComments\">\n    <comment-editor [updateMode]=\"false\" *authRequireLogin=\"true\"></comment-editor>\n    <hr class=\"my-4\">\n    <h5>Comments:</h5>\n    <div class=\"mb-3 col-sm-12\">\n      <blog-comment-list [postId]=\"postId\"></blog-comment-list>\n    </div>\n  </ng-container>\n</ng-template>\n\n<ng-template #defaultHeaderTemplate let-item let-parent=\"list\">\n  <div class=\"d-flex justify-content-between\">\n    <div>\n      <h2 class=\"blog-post-list-post-title\">{{item.title}}</h2>\n      <div class=\"created\"> {{item.owner}} created the post on {{item.createdOn | prettyDate }}.</div>\n    </div>\n    <div class=\"d-flex justify-content-between\">\n      <div class=\"ml-1\" *authRequireOwner=\"item.owner\">\n        <a class=\"btn btn-success\" role=\"button\" (click)=\"parent.selectItem(item, 'edit')\">Edit</a>\n      </div>\n      <div class=\"ml-1\" *authRequireOwner=\"item.owner\">\n        <a class=\"btn btn-success\" role=\"button\" (click)=\"parent.selectItem(item, 'delete')\">Delete</a>\n      </div>\n    </div>\n  </div>\n  <hr class=\"my-4\">\n</ng-template>\n\n<ng-template #defaultFooterTemplate let-item>\n  <div class=\"d-flex\">\n  </div>\n  <hr class=\"my-4\">\n</ng-template>\n", styles: [""], components: [{ type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: CommentEditorComponent, selector: "comment-editor", inputs: ["headerTemplate", "postId", "commentId", "updateMode"] }, { type: CommentListComponent, selector: "blog-comment-list", inputs: ["postId", "noContentsTemplate", "itemTemplate", "headerTemplate", "footerTemplate"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5__namespace$1.RequireLoginDirective, selector: "[authRequireLogin]", inputs: ["authRequireLogin", "authRequireLoginElse", "authRequireLoginThen"] }, { type: i5__namespace$1.RequireOwnerDirective, selector: "[authRequireOwner]", inputs: ["authRequireOwner", "authRequireOwnerElse", "authRequireOwnerThen"] }], pipes: { "prettyDate": i3__namespace.PrettyDatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'blog-post-view',
                        templateUrl: './blog-post-view.component.html',
                        styleUrls: ['./blog-post-view.component.scss']
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { post: [{
                    type: i0.Input
                }], topics: [{
                    type: i0.Input
                }], enableComments: [{
                    type: i0.Input
                }], headerTemplate: [{
                    type: i0.Input
                }], contentTemplate: [{
                    type: i0.Input
                }], footerTemplate: [{
                    type: i0.Input
                }], onSelectItem: [{
                    type: i0.Output
                }] } });

    var BlogPostComponent = /** @class */ (function () {
        function BlogPostComponent(postService, router, activatedRoute) {
            this.postService = postService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.permalink = "";
            this.errorDesc = "";
            this.loading = false;
            this.response = null;
        }
        BlogPostComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.activatedRoute.params.subscribe(function (params) {
                _this.fetchPost(params.postId, params.slug);
            });
        };
        BlogPostComponent.prototype.fetchPost = function (postId, postSlug) {
            var _this = this;
            this.postId = postId;
            this.postSlug = postSlug;
            this.loading = true;
            this.postService.one("posts", this.postId)
                .subscribe({
                next: function (result) {
                    _this.postItem = result;
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    console.log(_this.errorDesc);
                }
            });
        };
        Object.defineProperty(BlogPostComponent.prototype, "postItem", {
            get: function () {
                return this.response;
            },
            set: function (item) {
                this.response = item;
                this.response.permalink = window.location.origin + this.router.url;
                this.postId = this.response.id;
                this.postSlug = this.response.slug;
            },
            enumerable: false,
            configurable: true
        });
        BlogPostComponent.prototype.handleViewEvent = function (evt) {
            switch (evt.opcode) {
                case 'edit':
                    this.editPost(evt.item);
                    break;
                case 'delete':
                    this.deletePost(evt.item);
                    break;
            }
        };
        BlogPostComponent.prototype.editPost = function (post) {
            this.router.navigate(['/posts', 'edit', post.id]);
        };
        BlogPostComponent.prototype.deletePost = function (post) {
        };
        return BlogPostComponent;
    }());
    BlogPostComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostComponent, deps: [{ token: PostsService }, { token: i2__namespace$1.Router }, { token: i2__namespace$1.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    BlogPostComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostComponent, selector: "blog-post", inputs: { headerTemplate: "headerTemplate", contentTemplate: "contentTemplate", footerTemplate: "footerTemplate" }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc; else viewer\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #viewer>\n    <blog-post-view \n        [post]=\"postItem\" \n        [topics]=\"postItem?.topics\"\n        [headerTemplate]=\"headerTemplate\"\n        [contentTemplate]=\"contentTemplate\"\n        [footerTemplate]=\"footerTemplate\"\n        (onSelectItem)=\"handleViewEvent($event)\">\n    </blog-post-view>\n</ng-template>", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: BlogPostViewComponent, selector: "blog-post-view", inputs: ["post", "topics", "enableComments", "headerTemplate", "contentTemplate", "footerTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'blog-post',
                        templateUrl: './blog-post.component.html',
                        styleUrls: ['./blog-post.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: PostsService }, { type: i2__namespace$1.Router }, { type: i2__namespace$1.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
                    type: i0.Input
                }], contentTemplate: [{
                    type: i0.Input
                }], footerTemplate: [{
                    type: i0.Input
                }] } });

    function uniqueSlugValidator(postService) {
        return function (control) {
            var slug = control.value;
            if (!slug || control.pristine) {
                return rxjs.of(null);
            }
            return postService.findBySlug("", slug).pipe(operators.map(function (response) { return !!response.page.totalElements ? { 'slugExists': true } : null; }));
        };
    }

    var TopicsService = /** @class */ (function () {
        function TopicsService(config, httpClient) {
            this.config = config;
            this.httpClient = httpClient;
            this.onChange = new rxjs.Subject();
        }
        TopicsService.prototype.all = function (endpoint, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint, {
                params: {
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "caption,asc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        TopicsService.prototype.one = function (endpoint, id) {
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id)
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        TopicsService.prototype.findByCaption = function (endpoint, caption, pageable) {
            var query = {
                "conditions": [
                    { "attribute": "caption", "operator": "eq", "value": "%" + caption + "%" }
                ]
            };
            return this.search(endpoint, query, pageable);
        };
        TopicsService.prototype.findMatchingCaption = function (endpoint, caption, pageable) {
            var query = {
                "conditions": [
                    { "attribute": "caption", "operator": "like", "value": "%" + caption + "%" }
                ]
            };
            return this.search(endpoint, query, pageable);
        };
        TopicsService.prototype.search = function (endpoint, query, pageable) {
            var page = pageable ? pageable.page : 0;
            var pageSize = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .get(this.config.serviceBaseUrl + "/" + apiEndpoint + "/search", {
                "params": {
                    "q": JSON.stringify(query),
                    "page": page.toString(),
                    "size": pageSize.toString(),
                    "sort": "caption,asc"
                }
            })
                .pipe(operators.map(function (data) {
                return data;
            }));
        };
        TopicsService.prototype.create = function (endpoint, caption) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var topicRepr = {
                "caption": caption
            };
            return this.httpClient
                .post(this.config.serviceBaseUrl + "/" + apiEndpoint, topicRepr)
                .pipe(operators.map(function (data) {
                return data;
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        TopicsService.prototype.update = function (endpoint, id, caption) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            var topicRepr = {
                "caption": caption
            };
            return this.httpClient
                .put(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id, topicRepr)
                .pipe(operators.map(function (data) {
                return data;
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        TopicsService.prototype.delete = function (endpoint, id) {
            var _this = this;
            var apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
            return this.httpClient
                .delete(this.config.serviceBaseUrl + "/" + apiEndpoint + "/" + id)
                .pipe(operators.catchError(function (error) {
                return rxjs.throwError(new Error(error.status));
            }), operators.tap({
                next: function (x) { _this.onChange.next(x); }
            }));
        };
        return TopicsService;
    }());
    TopicsService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicsService, deps: [{ token: TopicsServiceConfigToken }, { token: i1__namespace.HttpClient }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    TopicsService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicsService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicsService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [TopicsServiceConfigToken]
                        }] }, { type: i1__namespace.HttpClient }];
        } });

    var TopicListComponent = /** @class */ (function () {
        function TopicListComponent(topicsService, router, activatedRoute) {
            var _this = this;
            this.topicsService = topicsService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.enableSearch = true;
            this.filterText = '';
            this.onSelect = function (item) { return _this.navigateToTopicPosts(item); };
            this.errorDesc = "";
            this.loading = false;
            this.filter = "";
            this.subscription = new rxjs.Subscription();
            this.responseHandler = {
                next: function (result) {
                    _this.response = result;
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    console.log(_this.errorDesc);
                }
            };
            this.response = null;
            this.pageable = {
                page: 0
            };
        }
        TopicListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
                _this.fetchPage(pageNum);
            });
            // Requery when the backend data changes
            this.subscription.add(this.topicsService.onChange.subscribe({ next: function () { return _this.fetchPage(_this.pageable.page); } }));
        };
        TopicListComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        TopicListComponent.prototype.onApplyFilter = function (text) {
            this.filterText = text;
            this.fetchPage(0);
        };
        TopicListComponent.prototype.fetchPage = function (pageNum) {
            this.pageable.page = pageNum;
            if (!!this.filterText) {
                this.topicsService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
            }
            else {
                this.topicsService.all("", this.pageable).subscribe(this.responseHandler);
            }
        };
        Object.defineProperty(TopicListComponent.prototype, "items", {
            get: function () {
                var _a, _b;
                if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.topics))
                    return [];
                return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.topics;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TopicListComponent.prototype, "page", {
            get: function () {
                var _a;
                return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TopicListComponent.prototype, "hasItems", {
            get: function () {
                var _a;
                return !!((_a = this.page) === null || _a === void 0 ? void 0 : _a.totalElements);
            },
            enumerable: false,
            configurable: true
        });
        TopicListComponent.prototype.handleListViewEvent = function (evt) {
            switch (evt.opcode) {
                case 'select':
                    this.onSelect(evt.item);
                    break;
            }
        };
        TopicListComponent.prototype.navigateToTopicPosts = function (topic) {
            this.router.navigate(['/topics', topic.id, "posts"], {
                state: { "endpoint": "topics/" + topic.id + "/posts" }
            });
        };
        TopicListComponent.prototype.gotoPage = function (evt) {
            this.fetchPage(evt - 1);
        };
        return TopicListComponent;
    }());
    TopicListComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicListComponent, deps: [{ token: TopicsService }, { token: i2__namespace$1.Router }, { token: i2__namespace$1.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TopicListComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicListComponent, selector: "blog-topic-list", inputs: { enableSearch: "enableSearch", filterText: "filterText", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectTopic", "onSelect"] }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"false\" [minimal]=\"true\">\n        <p>An error occurred fetching the topics list: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-search-box (onApplyFilter)=\"onApplyFilter($event)\" *ngIf=\"enableSearch\">\n    </utils-search-box>\n    <blog-topic-list-view \n        [topics]=\"items\" \n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\"\n        (onSelectItem)=\"handleListViewEvent($event)\">\n    </blog-topic-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\">\n    </utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n  \n<ng-template #defaultFooterTemplate>\n</ng-template>\n  ", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3__namespace.SearchBoxComponent, selector: "utils-search-box", inputs: ["debounceTime"], outputs: ["onApplyFilter"] }, { type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3__namespace.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicListComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'blog-topic-list',
                        templateUrl: './topic-list.component.html',
                        styleUrls: ['./topic-list.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: TopicsService }, { type: i2__namespace$1.Router }, { type: i2__namespace$1.ActivatedRoute }]; }, propDecorators: { enableSearch: [{
                    type: i0.Input
                }], filterText: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], headerTemplate: [{
                    type: i0.Input
                }], footerTemplate: [{
                    type: i0.Input
                }], onSelect: [{
                    type: i0.Input,
                    args: ['onSelectTopic']
                }] } });

    var TopicSelectorComponent = /** @class */ (function () {
        function TopicSelectorComponent() {
            var _this = this;
            this.maxTopics = 10;
            this.maxTopicsError = false;
            this.initialTopics = [];
            this.selectedTopics = [];
            this.topicClicked = function (item) {
                if (_this.isTopicSelected(item))
                    _this.unselectTopic(item);
                else
                    _this.selectTopic(item);
            };
        }
        TopicSelectorComponent.prototype.ngOnInit = function () {
            this.selectedTopics = this.initialTopics;
        };
        TopicSelectorComponent.prototype.isTopicSelected = function (topic) {
            return this.selectedTopics.findIndex(function (i) { return i.caption.toUpperCase() === topic.caption.toUpperCase(); }) > -1;
        };
        TopicSelectorComponent.prototype.selectTopic = function (topic) {
            this.maxTopicsError = (!!this.maxTopics && this.selectedTopics.length >= this.maxTopics);
            if (this.maxTopicsError) {
                return;
            }
            this.selectedTopics.push(topic);
            this.selectedTopics.sort(function (a, b) { return a.caption.toUpperCase().localeCompare(b.caption.toUpperCase()); });
        };
        TopicSelectorComponent.prototype.unselectTopic = function (topic) {
            this.selectedTopics = this.selectedTopics.filter(function (i) { return i.caption.toUpperCase() !== topic.caption.toUpperCase(); });
            this.maxTopicsError = (!!this.maxTopics && this.selectedTopics.length >= this.maxTopics);
        };
        return TopicSelectorComponent;
    }());
    TopicSelectorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicSelectorComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    TopicSelectorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicSelectorComponent, selector: "topic-selector", inputs: { maxTopics: "maxTopics", initialTopics: "initialTopics", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, ngImport: i0__namespace, template: "\n\n<label class=\"form-label\">Selected Topics:</label>\n<div>\n    <blog-topic-list-view [topics]=\"selectedTopics\"></blog-topic-list-view>\n    <utils-alert *ngIf=\"maxTopicsError\" [dismissable]=\"true\" [minimal]=\"true\">\n        Sorry, cannot select more than {{maxTopics}} topics for a post.\n    </utils-alert>\n</div>\n<label class=\"form-label\">Available Topics:</label>\n<blog-topic-list \n    [itemTemplate]=\"itemTemplate\"\n    [noContentsTemplate]=\"noContentsTemplate\"\n    [onSelectTopic]=\"topicClicked\">\n</blog-topic-list>\n", styles: [""], components: [{ type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: TopicListComponent, selector: "blog-topic-list", inputs: ["enableSearch", "filterText", "itemTemplate", "noContentsTemplate", "headerTemplate", "footerTemplate", "onSelectTopic"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicSelectorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'topic-selector',
                        templateUrl: './topic-selector.component.html',
                        styleUrls: ['./topic-selector.component.css']
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { maxTopics: [{
                    type: i0.Input
                }], initialTopics: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }] } });

    var TopicEditorComponent = /** @class */ (function () {
        function TopicEditorComponent(topicService, router, location, activatedRoute) {
            var _this = this;
            this.topicService = topicService;
            this.router = router;
            this.location = location;
            this.activatedRoute = activatedRoute;
            this.updateMode = true;
            this.topic = null;
            this.errorDesc = "";
            this.loading = false;
            this.fetchResponseHandler = {
                next: function (result) {
                    _this.theTopic = result;
                    _this.updateForm();
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    return false;
                }
            };
        }
        TopicEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.form = new i5.FormGroup({
                "caption": new i5.FormControl("", i5.Validators.required)
            });
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                _this.topicId = (_a = params.topicId) !== null && _a !== void 0 ? _a : _this.paramTopicId;
                if (_this.isUpdateMode)
                    _this.fetchTopic(_this.topicId);
            });
        };
        Object.defineProperty(TopicEditorComponent.prototype, "isUpdateMode", {
            get: function () {
                return this.updateMode && this.topicId !== undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TopicEditorComponent.prototype, "caption", {
            get: function () { return this.form.get('caption'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TopicEditorComponent.prototype, "theTopic", {
            set: function (item) {
                var _a;
                this.topic = this.updateMode ? item : null;
                this.topicId = this.updateMode ? (_a = this.topic) === null || _a === void 0 ? void 0 : _a.id : undefined;
                console.info("Got post id: " + this.topicId);
            },
            enumerable: false,
            configurable: true
        });
        TopicEditorComponent.prototype.updateForm = function () {
            var _a;
            this.caption.setValue((_a = this.topic) === null || _a === void 0 ? void 0 : _a.caption);
        };
        TopicEditorComponent.prototype.fetchTopic = function (topicId) {
            this.loading = true;
            this.topicService
                .one("", topicId)
                .subscribe(this.fetchResponseHandler);
        };
        TopicEditorComponent.prototype.createNewTopic = function () {
            var _a;
            this.topicService
                .create("", (_a = this.caption) === null || _a === void 0 ? void 0 : _a.value)
                .subscribe(this.fetchResponseHandler);
        };
        TopicEditorComponent.prototype.updateTopic = function () {
            var _a;
            this.topicService
                .update("", this.topicId, (_a = this.caption) === null || _a === void 0 ? void 0 : _a.value)
                .subscribe(this.fetchResponseHandler);
        };
        TopicEditorComponent.prototype.cancel = function () {
            this.location.back();
        };
        return TopicEditorComponent;
    }());
    TopicEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicEditorComponent, deps: [{ token: TopicsService }, { token: i2__namespace$1.Router }, { token: i2__namespace.Location }, { token: i2__namespace$1.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TopicEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: TopicEditorComponent, selector: "topic-editor", inputs: { headerTemplate: "headerTemplate", paramTopicId: ["topicId", "paramTopicId"], updateMode: "updateMode" }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #defaultTitleTemplate let-item>\n    <div class=\"d-flex justify-content-between\">\n        <div>\n            <h5>CREATE A NEW TOPIC</h5>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #contents>\n    <ng-container \n        [ngTemplateOutlet]=\"headerTemplate || defaultTitleTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n    <utils-alert *ngIf=\"errorDesc; else editor\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #editor>\n    <form [formGroup]=\"form\" novalidate onSubmit=\"return false;\">\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-9\">\n                <input type=\"text\" class=\"form-control\" id=\"caption\" placeholder=\"Topic name ... \"\n                    formControlName=\"caption\" required>\n\n                <div *ngIf=\"caption?.invalid && (caption?.dirty || caption?.touched)\">\n                    <utils-alert *ngIf=\"caption?.errors?.required\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Name is required.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"caption?.errors?.topicExists\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Topic name is already taken!\n                    </utils-alert>\n                </div>\n\n            </div>\n            <div class=\"mb-3 col-sm-3\" *ngIf=\"!isUpdateMode\">\n                <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Create\" (click)=\"createNewTopic()\">\n            </div>\n            <div class=\"mb-3 col-sm-3\" *ngIf=\"isUpdateMode\">\n                <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Update\" (click)=\"updateTopic()\">\n            </div>\n        </div>\n    </form>\n</ng-template>\n", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5__namespace.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: TopicEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'topic-editor',
                        templateUrl: './topic-editor.component.html',
                        styleUrls: ['./topic-editor.component.css']
                    }]
            }], ctorParameters: function () { return [{ type: TopicsService }, { type: i2__namespace$1.Router }, { type: i2__namespace.Location }, { type: i2__namespace$1.ActivatedRoute }]; }, propDecorators: { headerTemplate: [{
                    type: i0.Input
                }], paramTopicId: [{
                    type: i0.Input,
                    args: ["topicId"]
                }], updateMode: [{
                    type: i0.Input
                }] } });

    function slugify(text) {
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
        var newText = text.split('').map(function (letter, i) { return letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)); });
        return newText
            .toString() // Cast to string
            .toLowerCase() // Convert the string to lowercase letters
            .trim() // Remove whitespace from both sides of a string
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/&/g, '-y-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-'); // Replace multiple - with single -
    }
    var BlogPostEditorComponent = /** @class */ (function () {
        function BlogPostEditorComponent(config, postService, location, activatedRoute) {
            var _this = this;
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
                next: function (result) {
                    _this.blogPost = result;
                    _this.updateForm();
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    return false;
                }
            };
            this.updateResponseHandler = {
                next: function (result) {
                    _this.blogPost = result;
                    _this.assignTopics();
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    return false;
                }
            };
        }
        BlogPostEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            this.form = new i5.FormGroup({
                "title": new i5.FormControl("", [
                    i5.Validators.required,
                    i5.Validators.maxLength(this.config.maxTitleLength),
                ]),
                "slug": new i5.FormControl("", [
                    i5.Validators.required,
                    i5.Validators.maxLength(this.config.maxTitleLength),
                    i5.Validators.pattern(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)
                ], uniqueSlugValidator(this.postService)),
                "text": new i5.FormControl("", [
                    i5.Validators.required,
                    i5.Validators.maxLength(this.config.maxContentLength)
                ]),
            });
            (_a = this.title) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (val) {
                var _a, _b;
                if (!((_a = _this.slug) === null || _a === void 0 ? void 0 : _a.touched) || !((_b = _this.slug) === null || _b === void 0 ? void 0 : _b.value)) {
                    _this.generateSlug();
                }
            });
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                _this.postId = (_a = params.postId) !== null && _a !== void 0 ? _a : _this.paramPostId;
                if (_this.isUpdateMode)
                    _this.fetchPost(_this.postId);
            });
        };
        Object.defineProperty(BlogPostEditorComponent.prototype, "isUpdateMode", {
            get: function () {
                return this.updateMode && this.postId !== undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BlogPostEditorComponent.prototype, "title", {
            get: function () { return this.form.get('title'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BlogPostEditorComponent.prototype, "slug", {
            get: function () { return this.form.get('slug'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BlogPostEditorComponent.prototype, "text", {
            get: function () { return this.form.get('text'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BlogPostEditorComponent.prototype, "selectedTopics", {
            get: function () {
                var _a;
                return ((_a = this.post) === null || _a === void 0 ? void 0 : _a.topics) || [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BlogPostEditorComponent.prototype, "blogPost", {
            set: function (item) {
                var _a;
                this.post = this.updateMode ? item : null;
                this.postId = this.updateMode ? (_a = this.post) === null || _a === void 0 ? void 0 : _a.id : undefined;
                console.info("Got post id: " + this.postId);
            },
            enumerable: false,
            configurable: true
        });
        BlogPostEditorComponent.prototype.generateSlug = function () {
            var _a, _b;
            (_a = this.slug) === null || _a === void 0 ? void 0 : _a.setValue(slugify((_b = this.title) === null || _b === void 0 ? void 0 : _b.value));
        };
        BlogPostEditorComponent.prototype.updateForm = function () {
            var _a, _b, _c;
            this.title.setValue((_a = this.post) === null || _a === void 0 ? void 0 : _a.title);
            this.slug.setValue((_b = this.post) === null || _b === void 0 ? void 0 : _b.slug);
            this.text.setValue((_c = this.post) === null || _c === void 0 ? void 0 : _c.text);
        };
        BlogPostEditorComponent.prototype.fetchPost = function (postId) {
            this.loading = true;
            this.postService
                .one("posts", postId)
                .subscribe(this.fetchResponseHandler);
        };
        BlogPostEditorComponent.prototype.createNewPost = function () {
            var _a, _b, _c;
            this.postService
                .create("posts", (_a = this.slug) === null || _a === void 0 ? void 0 : _a.value, (_b = this.title) === null || _b === void 0 ? void 0 : _b.value, (_c = this.text) === null || _c === void 0 ? void 0 : _c.value)
                .subscribe(this.updateResponseHandler);
        };
        BlogPostEditorComponent.prototype.updatePost = function () {
            var _a, _b, _c;
            this.postService
                .update("posts", this.postId, (_a = this.slug) === null || _a === void 0 ? void 0 : _a.value, (_b = this.title) === null || _b === void 0 ? void 0 : _b.value, (_c = this.text) === null || _c === void 0 ? void 0 : _c.value)
                .subscribe(this.updateResponseHandler);
        };
        BlogPostEditorComponent.prototype.assignTopics = function () {
            var _this = this;
            var selectedTopics = this.topicSelector.selectedTopics.map(function (i) { return i.id; });
            console.info(selectedTopics);
            this.postService
                .assignTopics("posts", this.postId, selectedTopics)
                .subscribe({
                next: function () {
                    _this.updateForm();
                    _this.successDesc = "Post updated successfully!";
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    return false;
                }
            });
        };
        BlogPostEditorComponent.prototype.cancel = function () {
            this.location.back();
        };
        return BlogPostEditorComponent;
    }());
    BlogPostEditorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostEditorComponent, deps: [{ token: PostsServiceConfigToken }, { token: PostsService }, { token: i2__namespace.Location }, { token: i2__namespace$1.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    BlogPostEditorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostEditorComponent, selector: "blog-post-editor", inputs: { headerTemplate: "headerTemplate", paramPostId: ["postId", "paramPostId"], updateMode: "updateMode" }, viewQueries: [{ propertyName: "topicSelector", first: true, predicate: ["topicSelector"], descendants: true }], ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #defaultTitleTemplate let-item>\n    <div class=\"d-flex justify-content-between\">\n        <div>\n            <h5>WRITE A POST</h5>\n        </div>\n        <div><a class=\"btn btn-success\" role=\"button\" (click)=\"cancel()\">Cancel</a></div>\n    </div>\n    <hr class=\"my-4\">\n</ng-template>\n\n<ng-template #contents>\n    <ng-container \n        [ngTemplateOutlet]=\"headerTemplate || defaultTitleTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n    <utils-alert *ngIf=\"successDesc\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>{{ successDesc }}</p>\n    </utils-alert>\n    <utils-alert *ngIf=\"errorDesc; else editor\" [dismissable]=\"false\" [minimal]=\"false\">\n        <p>An error occurred accessing the post: {{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #editor>\n    <form [formGroup]=\"form\" novalidate onSubmit=\"return false;\">\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <label for=\"title\" class=\"form-label\">Title</label>\n                <input type=\"text\" class=\"form-control\" id=\"title\" \n                    placeholder=\"Title of your post ... \"\n                    formControlName=\"title\" required>\n\n                <div *ngIf=\"title?.invalid && (title?.dirty || title?.touched)\">\n                    <utils-alert *ngIf=\"title?.errors?.required\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Title is required.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"title?.errors?.maxLength\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Title length exceeds limit.\n                    </utils-alert>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <label for=\"slug\" class=\"form-label\">Slug</label>\n                <div class=\"d-flex justify-content-between\">\n                    <input type=\"text\" class=\"form-control\" id=\"slug\" \n                        placeholder=\"Slug goes here ... e.g. this-is-a-valid-slug\"\n                        formControlName=\"slug\" required>\n                    <input class=\"btn btn-primary ml-1\" type=\"button\" [disabled]=\"loading\" value=\"Auto Generate\" (click)=\"generateSlug()\">\n                </div>\n                <div *ngIf=\"slug?.invalid && (slug?.dirty || slug?.touched)\">\n                    <utils-alert *ngIf=\"slug?.errors?.required\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Slug is required.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"slug?.errors?.maxLength\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Slug length exceeds limit.\n                    </utils-alert>\n                    <utils-alert *ngIf=\"slug?.errors?.pattern\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Only clean url like expressions are allowed in slugs e.g. this-is-a-valid-slug\n                    </utils-alert>\n                    <utils-alert *ngIf=\"slug?.errors?.slugExists\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Slug is already taken!\n                    </utils-alert>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-6\">\n                <label for=\"text\" class=\"form-label\">Write your story here:</label>\n                <textarea class=\"form-control\" id=\"postText\" rows=\"3\" formControlName=\"text\" required></textarea>\n\n                <div *ngIf=\"text?.invalid && (text?.dirty || text?.touched)\">\n                    <utils-alert *ngIf=\"text?.errors?.pattern\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Sorry, cannot leave this empty!\n                    </utils-alert>\n                    <utils-alert *ngIf=\"text?.errors?.maxLength\" [dismissable]=\"false\" [minimal]=\"true\">\n                        Conent length exceeds limit.\n                    </utils-alert>\n                </div>\n\n            </div>\n            <div class=\"mb-3 col-sm-6\">\n                <label class=\"form-label\">Preview</label>\n                <markdown class=\"variable-binding\" [data]=\"text?.value\"></markdown>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"mb-3 col-sm-12\">\n                <topic-selector #topicSelector \n                    [initialTopics]=\"selectedTopics\"\n                    [noContentsTemplate]=\"topicsNotFoundTemplate\">\n                </topic-selector>\n            </div>\n        </div>\n        <div class=\"mb-3\" *ngIf=\"!isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Post\" (click)=\"createNewPost()\">\n        </div>\n        <div class=\"mb-3\" *ngIf=\"isUpdateMode\">\n            <input class=\"btn btn-primary\" type=\"button\" [disabled]=\"loading || !form.valid\" value=\"Update\" (click)=\"updatePost()\">\n        </div>\n    </form>\n</ng-template>\n\n<ng-template #topicsNotFoundTemplate let-item>\n    No topic found!\n    <topic-editor *authRequireRole=\"'admin'\"></topic-editor>\n</ng-template>\n", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i5__namespace$2.MarkdownComponent, selector: "markdown, [markdown]", inputs: ["data", "src", "emoji", "katex", "katexOptions", "lineHighlight", "line", "lineOffset", "lineNumbers", "start"], outputs: ["error", "load", "ready"] }, { type: TopicSelectorComponent, selector: "topic-selector", inputs: ["maxTopics", "initialTopics", "itemTemplate", "noContentsTemplate"] }, { type: TopicEditorComponent, selector: "topic-editor", inputs: ["headerTemplate", "topicId", "updateMode"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5__namespace.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i5__namespace.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5__namespace$1.RequireRoleDirective, selector: "[authRequireRole]", inputs: ["authRequireRole", "authRequireRoleElse", "authRequireRoleThen"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostEditorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'blog-post-editor',
                        templateUrl: './blog-post-editor.component.html',
                        styleUrls: ['./blog-post-editor.component.scss']
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [PostsServiceConfigToken]
                        }] }, { type: PostsService }, { type: i2__namespace.Location }, { type: i2__namespace$1.ActivatedRoute }];
        }, propDecorators: { headerTemplate: [{
                    type: i0.Input
                }], paramPostId: [{
                    type: i0.Input,
                    args: ["postId"]
                }], updateMode: [{
                    type: i0.Input
                }], topicSelector: [{
                    type: i0.ViewChild,
                    args: ['topicSelector']
                }] } });

    var BlogPostListViewComponent = /** @class */ (function () {
        function BlogPostListViewComponent() {
            this.onSelectItem = new i0.EventEmitter();
        }
        BlogPostListViewComponent.prototype.ngOnInit = function () { };
        BlogPostListViewComponent.prototype.selectItem = function (item, opcode) {
            this.onSelectItem.emit({
                opcode: opcode,
                item: item
            });
        };
        return BlogPostListViewComponent;
    }());
    BlogPostListViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostListViewComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    BlogPostListViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostListViewComponent, selector: "blog-post-list-view", inputs: { posts: "posts", itemTemplate: "itemTemplate", noContentsTemplate: "noContentsTemplate" }, outputs: { onSelectItem: "onSelectItem" }, ngImport: i0__namespace, template: "<ng-container *ngIf=\"posts\">\n    <div *ngFor=\"let x of posts\" class=\"bg-light\">\n        <ng-container [ngTemplateOutlet]=\"itemTemplate || defaultItemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: x, list: this }\">\n        </ng-container>\n    </div>\n</ng-container>\n<ng-container *ngIf=\"!posts\">\n    <ng-container [ngTemplateOutlet]=\"noContentsTemplate || defaultNoContentsTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n</ng-container>\n\n<ng-template #defaultItemTemplate let-item let-parent=\"list\">\n    <div class=\"p-1\">\n        <a (click)=\"parent.selectItem(item, 'select')\"><h4 class=\"blog-post-list-post-title\">{{item.title}}</h4></a>\n        <div class=\"created\"> {{item.owner}} created the post on {{item.createdOn | prettyDate }}.</div>\n        <p class=\"posttext \">\n            {{item.text}}\n        </p>\n        <p>\n            <blog-topic-list-view [topics]=\"item.topics\"></blog-topic-list-view>\n        </p>\n        <button class=\"btn btn-success\" (click)=\"parent.selectItem(item, 'select')\">Read More...</button>\n        <hr class=\"my-4\">\n    </div>\n</ng-template>\n\n<ng-template #defaultNoContentsTemplate let-item>\n    No blog posts found! Why not create one?\n</ng-template>", styles: [".created{padding-top:5px;padding-bottom:5px}.posttext{padding-top:10px;padding-bottom:10px}.blog-post-list-post-title{cursor:pointer;text-decoration:underline}"], components: [{ type: TopicListViewComponent, selector: "blog-topic-list-view", inputs: ["topics", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "prettyDate": i3__namespace.PrettyDatePipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostListViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'blog-post-list-view',
                        templateUrl: './blog-post-list-view.component.html',
                        styleUrls: ['./blog-post-list-view.component.scss'],
                    }]
            }], propDecorators: { posts: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], noContentsTemplate: [{
                    type: i0.Input
                }], onSelectItem: [{
                    type: i0.Output
                }] } });

    var BlogPostListComponent = /** @class */ (function () {
        function BlogPostListComponent(postService, router, activatedRoute) {
            var _this = this;
            var _a;
            this.postService = postService;
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.onSelect = function (item) { return _this.navigateToPost(item); };
            this.errorDesc = "";
            this.loading = false;
            this.subscription = new rxjs.Subscription();
            this.state = (_a = this.router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras.state;
            this.response = null;
            this.pageable = {
                page: 0
            };
        }
        BlogPostListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.activatedRoute.params.subscribe(function (params) {
                var _a;
                var pageNum = (_a = params.pageNum) !== null && _a !== void 0 ? _a : 0;
                _this.fetchPage(pageNum);
            });
            // Requery when the backend data changes
            this.subscription.add(this.postService.onChange.subscribe({ next: function () { return _this.fetchPage(0); } }));
        };
        BlogPostListComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        BlogPostListComponent.prototype.fetchPage = function (pageNum) {
            var _this = this;
            var _a;
            //const routeParams = this.route.snapshot.paramMap;
            //this.organizationId = routeParams.get('orgId') as string;  
            this.pageable.page = pageNum;
            this.loading = true;
            this.postService.all((_a = this.state) === null || _a === void 0 ? void 0 : _a.endpoint, this.pageable)
                .subscribe({
                next: function (result) {
                    _this.response = result;
                    _this.loading = false;
                },
                error: function (err) {
                    _this.errorDesc = err.message;
                    _this.loading = false;
                    console.log(_this.errorDesc);
                }
            });
        };
        Object.defineProperty(BlogPostListComponent.prototype, "items", {
            get: function () {
                var _a, _b;
                if (!((_a = this.response) === null || _a === void 0 ? void 0 : _a._embedded.posts))
                    return [];
                return (_b = this.response) === null || _b === void 0 ? void 0 : _b._embedded.posts;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BlogPostListComponent.prototype, "page", {
            get: function () {
                var _a;
                return (_a = this.response) === null || _a === void 0 ? void 0 : _a.page;
            },
            enumerable: false,
            configurable: true
        });
        BlogPostListComponent.prototype.handleListViewEvent = function (evt) {
            switch (evt.opcode) {
                case 'select':
                    this.onSelect(evt.item);
                    break;
            }
        };
        BlogPostListComponent.prototype.navigateToPost = function (post) {
            this.router.navigate(["/posts", post.id, post.slug]);
        };
        BlogPostListComponent.prototype.gotoPage = function (evt) {
            this.fetchPage(evt - 1);
        };
        return BlogPostListComponent;
    }());
    BlogPostListComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostListComponent, deps: [{ token: PostsService }, { token: i2__namespace$1.Router }, { token: i2__namespace$1.ActivatedRoute }], target: i0__namespace.ɵɵFactoryTarget.Component });
    BlogPostListComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: BlogPostListComponent, selector: "blog-post-list", inputs: { noContentsTemplate: "noContentsTemplate", itemTemplate: "itemTemplate", headerTemplate: "headerTemplate", footerTemplate: "footerTemplate", onSelect: ["onSelectPost", "onSelect"] }, ngImport: i0__namespace, template: "<div *ngIf=\"loading; else contents\">\n    <utils-loader></utils-loader>\n</div>\n\n<ng-template #contents>\n    <utils-alert *ngIf=\"errorDesc;else itemsList\" [dismissable]=\"true\">\n        <p>\n            The specified request could not be completed!\n        </p>\n        <hr>\n        <p class=\"mb-0\">Error Details: </p>\n        <p>{{ errorDesc }}</p>\n    </utils-alert>\n</ng-template>\n\n<ng-template #itemsList>\n\n    <ng-container\n        [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n    <blog-post-list-view\n        [posts]=\"items\"\n        [itemTemplate]=\"itemTemplate\"\n        [noContentsTemplate]=\"noContentsTemplate\"\n        (onSelectItem)=\"handleListViewEvent($event)\">\n    </blog-post-list-view>\n    <utils-pager [page]=\"page\" (onSelectPage)=\"gotoPage($event)\"></utils-pager>\n\n    <ng-container\n        [ngTemplateOutlet]=\"footerTemplate || defaultFooterTemplate\"\n        [ngTemplateOutletContext]=\"{ $implicit: this }\">\n    </ng-container>\n\n</ng-template>\n\n<ng-template #defaultHeaderTemplate>\n</ng-template>\n\n<ng-template #defaultFooterTemplate>\n</ng-template>\n", styles: [""], components: [{ type: i3__namespace.LoaderComponent, selector: "utils-loader", inputs: ["controlTemplate"] }, { type: i3__namespace.AlertComponent, selector: "utils-alert", inputs: ["minimal", "dismissable", "title", "kind", "controlTemplate"], outputs: ["onClosed"] }, { type: i3__namespace.PagerComponent, selector: "utils-pager", inputs: ["prevNextLinks", "maxPageLinks", "page"], outputs: ["onSelectPage"] }, { type: BlogPostListViewComponent, selector: "blog-post-list-view", inputs: ["posts", "itemTemplate", "noContentsTemplate"], outputs: ["onSelectItem"] }], directives: [{ type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogPostListComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'blog-post-list',
                        templateUrl: './blog-post-list.component.html',
                        styleUrls: ['./blog-post-list.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: PostsService }, { type: i2__namespace$1.Router }, { type: i2__namespace$1.ActivatedRoute }]; }, propDecorators: { noContentsTemplate: [{
                    type: i0.Input
                }], itemTemplate: [{
                    type: i0.Input
                }], headerTemplate: [{
                    type: i0.Input
                }], footerTemplate: [{
                    type: i0.Input
                }], onSelect: [{
                    type: i0.Input,
                    args: ['onSelectPost']
                }] } });

    /*
     * Public API Surface of bookmarks
     */

    /*
     * Public API Surface of blog
     */

    var BlogModule = /** @class */ (function () {
        function BlogModule() {
        }
        BlogModule.forRoot = function (config) {
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
        };
        return BlogModule;
    }());
    BlogModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BlogModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogModule, declarations: [BlogPostListViewComponent,
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
            CommentEditorComponent], imports: [i2.CommonModule,
            i5.FormsModule,
            i5.ReactiveFormsModule,
            i2$1.RouterModule, i5__namespace$2.MarkdownModule, i5__namespace$1.OidcAuthModule, i3.UtilsModule], exports: [BlogPostListViewComponent,
            BlogPostListComponent,
            TopicListViewComponent,
            TopicListComponent,
            BlogPostEditorComponent,
            BlogPostComponent,
            BlogPostViewComponent] });
    BlogModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogModule, imports: [[
                i2.CommonModule,
                i5.FormsModule,
                i5.ReactiveFormsModule,
                i2$1.RouterModule,
                i5$2.MarkdownModule.forChild(),
                i5$1.OidcAuthModule.forChild(),
                i3.UtilsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0__namespace, type: BlogModule, decorators: [{
                type: i0.NgModule,
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
                            i2.CommonModule,
                            i5.FormsModule,
                            i5.ReactiveFormsModule,
                            i2$1.RouterModule,
                            i5$2.MarkdownModule.forChild(),
                            i5$1.OidcAuthModule.forChild(),
                            i3.UtilsModule
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

    exports.BlogModule = BlogModule;
    exports.BlogModuleConfigToken = BlogModuleConfigToken;
    exports.BlogPostComponent = BlogPostComponent;
    exports.BlogPostEditorComponent = BlogPostEditorComponent;
    exports.BlogPostListComponent = BlogPostListComponent;
    exports.BlogPostListViewComponent = BlogPostListViewComponent;
    exports.BlogPostViewComponent = BlogPostViewComponent;
    exports.CommentListComponent = CommentListComponent;
    exports.CommentListViewComponent = CommentListViewComponent;
    exports.CommentsServiceConfigToken = CommentsServiceConfigToken;
    exports.PostsService = PostsService;
    exports.PostsServiceConfigToken = PostsServiceConfigToken;
    exports.TopicListComponent = TopicListComponent;
    exports.TopicListViewComponent = TopicListViewComponent;
    exports.TopicsService = TopicsService;
    exports.TopicsServiceConfigToken = TopicsServiceConfigToken;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=blog.umd.js.map
