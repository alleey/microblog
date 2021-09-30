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
  CommentEditorComponent, 
  CommentListComponent, 
  CommentListViewComponent, 
  TopicEditorComponent, 
  TopicListComponent,
  TopicListViewComponent, 
  TopicSelectorComponent
} from './components/public-api';
import { BlogModuleConfig, CommentsServiceConfigToken, PostsServiceConfigToken, TopicsServiceConfigToken } from './config/config';
import { PostsService } from './services/posts.service';
import { TopicsService } from './services/topics.service';

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
    BlogPostViewComponent,
    TopicSelectorComponent,
    TopicEditorComponent,
    CommentListComponent,
    CommentListViewComponent,
    CommentEditorComponent
  ]
})
export class BlogModule {

  static forRoot(config: BlogModuleConfig): ModuleWithProviders<BlogModule> {
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
    }
  }

}
