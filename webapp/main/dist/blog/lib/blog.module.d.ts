import { ModuleWithProviders } from '@angular/core';
import { BlogModuleConfig } from './config/config';
import * as i0 from "@angular/core";
import * as i1 from "./components/blog-post-list-view/blog-post-list-view.component";
import * as i2 from "./components/blog-post-list/blog-post-list.component";
import * as i3 from "./components/topic-list-view/topic-list-view.component";
import * as i4 from "./components/topic-list/topic-list.component";
import * as i5 from "./components/blog-post-editor/blog-post-editor.component";
import * as i6 from "./components/blog-post/blog-post.component";
import * as i7 from "./components/blog-post-view/blog-post-view.component";
import * as i8 from "./components/topic-selector/topic-selector.component";
import * as i9 from "./components/topic-editor/topic-editor.component";
import * as i10 from "./components/comment-list/comment-list.component";
import * as i11 from "./components/comment-list-view/comment-list-view.component";
import * as i12 from "./components/comment-editor/comment-editor.component";
import * as i13 from "@angular/common";
import * as i14 from "@angular/forms";
import * as i15 from "@angular/router";
import * as i16 from "ngx-markdown";
import * as i17 from "auth-oidc";
import * as i18 from "utils";
export declare class BlogModule {
    static forRoot(config: BlogModuleConfig): ModuleWithProviders<BlogModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlogModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BlogModule, [typeof i1.BlogPostListViewComponent, typeof i2.BlogPostListComponent, typeof i3.TopicListViewComponent, typeof i4.TopicListComponent, typeof i5.BlogPostEditorComponent, typeof i6.BlogPostComponent, typeof i7.BlogPostViewComponent, typeof i8.TopicSelectorComponent, typeof i9.TopicEditorComponent, typeof i10.CommentListComponent, typeof i11.CommentListViewComponent, typeof i12.CommentEditorComponent], [typeof i13.CommonModule, typeof i14.FormsModule, typeof i14.ReactiveFormsModule, typeof i15.RouterModule, typeof i16.MarkdownModule, typeof i17.OidcAuthModule, typeof i18.UtilsModule], [typeof i1.BlogPostListViewComponent, typeof i2.BlogPostListComponent, typeof i3.TopicListViewComponent, typeof i4.TopicListComponent, typeof i5.BlogPostEditorComponent, typeof i6.BlogPostComponent, typeof i7.BlogPostViewComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BlogModule>;
}
