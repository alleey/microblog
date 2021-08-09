import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OidcAuthModule } from 'auth-oidc';
import { MarkdownModule } from 'ngx-markdown';
import { UtilsModule } from 'utils';
import { 
  BlogPostComponent, 
  BlogPostEditorComponent, 
  BlogPostListComponent, 
  BlogPostListViewComponent, 
  BlogPostViewComponent, 
  TopicListComponent, 
  TopicListViewComponent 
} from './components/public-api';
import { BlogServiceConfig, BlogServiceConfigToken } from './config/service-config';
import { PostsService } from './services/posts.service';
import { TopicsService } from './services/topics.service';
import { TopicSelectorComponent } from './components/topic-selector/topic-selector.component';
import { TopicEditorComponent } from './components/topic-editor/topic-editor.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentListViewComponent } from './components/comment-list-view/comment-list-view.component';
import { CommentEditorComponent } from './components/comment-editor/comment-editor.component';

@NgModule({
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
})
export class BlogModule {

  static forRoot(config: BlogServiceConfig): ModuleWithProviders<BlogModule> {
    return {
      ngModule: BlogModule,
      providers: [
        PostsService,
        TopicsService,
        {
          provide: BlogServiceConfigToken,
          useValue: config
        }
      ]
    }
  }

}
