import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { BlogModule } from 'blog';
import { BookmarksModule } from 'bookmarks';
import { UserProfileModule } from 'userprofile';
import { AllPostsComponent } from './components/all-posts/all-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BlogModule.forRoot(environment.services),
    BookmarksModule.forRoot(environment.services.bookmarks),
    UserProfileModule.forRoot(environment.services.userProfiles),
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
