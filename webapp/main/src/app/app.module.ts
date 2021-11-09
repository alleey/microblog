import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { MarkdownModule } from 'ngx-markdown';
import { BlogModule } from 'blog';
import { BookmarksModule } from 'bookmarks';
import { FollowersModule } from 'followers';
import { StatsModule } from 'stats';
import { UserProfileModule } from 'userprofile';

import { AppComponent } from './app.component';
import { AppPostsListComponent } from './components/app-posts-list/app-posts-list.component';
import { AppPostComponent } from './components/app-post/app-post.component';
import { AppBookmarksListComponent } from './components/app-bookmarks-list/app-bookmarks-list.component';
import { AppTopicPostsListComponent } from './components/app-topic-posts-list/app-topic-posts-list.component';
import { AppUserPostsListComponent } from './components/app-user-posts-list/app-user-posts-list.component';
import { AppUserProfileComponent } from './components/app-user-profile/app-user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AppPostsListComponent,
    AppPostComponent,
    AppBookmarksListComponent,
    AppTopicPostsListComponent,
    AppUserPostsListComponent,
    AppUserProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BlogModule.forRoot(environment.services),
    BookmarksModule.forRoot(environment.services),
    FollowersModule.forRoot(environment.services),
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
