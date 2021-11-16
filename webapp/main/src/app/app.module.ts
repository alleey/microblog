import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OidcAuthModule } from 'auth-oidc';
import { BlogModule } from 'blog';
import { BookmarksModule } from 'bookmarks';
import { FollowersModule } from 'followers';
import { MarkdownModule } from 'ngx-markdown';
import { ResourcesModule } from 'resources';
import { StatsModule } from 'stats';
import { UserProfileModule } from 'userprofile';
import { UtilsModule } from 'utils';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBookmarksListComponent } from './components/app-bookmarks-list/app-bookmarks-list.component';
import { AppPostComponent } from './components/app-post/app-post.component';
import { AppPostsListComponent } from './components/app-posts-list/app-posts-list.component';
import { AppTopicPostsListComponent } from './components/app-topic-posts-list/app-topic-posts-list.component';
import { AppUserPostsListComponent } from './components/app-user-posts-list/app-user-posts-list.component';
import { AppUserProfileComponent } from './components/app-user-profile/app-user-profile.component';
import { AppUserProfileEditorComponent } from './components/app-user-profile-editor/app-user-profile-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppPostEditorComponent } from './components/app-post-editor/app-post-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    AppPostsListComponent,
    AppPostComponent,
    AppBookmarksListComponent,
    AppTopicPostsListComponent,
    AppUserPostsListComponent,
    AppUserProfileComponent,
    AppUserProfileEditorComponent,
    AppPostEditorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BlogModule.forRoot(environment.services),
    BookmarksModule.forRoot(environment.services),
    FollowersModule.forRoot(environment.services),
    ResourcesModule.forRoot(environment.services),
    StatsModule.forRoot(environment.services),
    UserProfileModule.forRoot(environment.services),
    UtilsModule,
    MarkdownModule.forRoot(),
    OidcAuthModule.forRoot(environment.oidc),
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
