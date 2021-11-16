import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'auth-oidc';
import { AppPostEditorComponent } from './components/app-post-editor/app-post-editor.component';
import { AppPostComponent } from './components/app-post/app-post.component';
import { AppPostsListComponent } from './components/app-posts-list/app-posts-list.component';
import { AppTopicPostsListComponent } from './components/app-topic-posts-list/app-topic-posts-list.component';
import { AppUserPostsListComponent } from './components/app-user-posts-list/app-user-posts-list.component';
import { AppUserProfileEditorComponent } from './components/app-user-profile-editor/app-user-profile-editor.component';
import { AppUserProfileComponent } from './components/app-user-profile/app-user-profile.component';

const routes: Routes = [

  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: AppPostsListComponent, pathMatch: 'full' },

  { path: 'posts/new', component: AppPostEditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'posts/edit/:postId', component: AppPostEditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'posts/:pageNum', component: AppPostsListComponent },

  { path: 'users/:userId/posts', component: AppUserPostsListComponent, pathMatch: 'full' },
  { path: 'users/:userId/posts/:pageNum', component: AppUserPostsListComponent },

  { path: 'users/:userId', component: AppUserProfileComponent, pathMatch: 'full' },
  { path: 'users/edit/:userId', component: AppUserProfileEditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  
  { path: 'topics/:topicId/posts', component: AppTopicPostsListComponent, pathMatch: 'full' },
  { path: 'topics/:topicId/posts/:pageNum', component: AppTopicPostsListComponent },

  { path: 'posts/:postId/:slug', component: AppPostComponent, pathMatch: 'full' },

  //{ path: 'bookmarks', component: BookmarkListViewComponent }, //
  { path: 'login', component: AppPostsListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'logout', redirectTo: '/oidc-auth/logout', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
