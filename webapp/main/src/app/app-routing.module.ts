import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'auth-oidc';
import { BlogPostEditorComponent } from 'blog';
import { AppPostComponent } from './components/app-post/app-post.component';
import { AppPostsListComponent } from './components/app-posts-list/app-posts-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: AppPostsListComponent, pathMatch: 'full' },

  { path: 'posts/new', component: BlogPostEditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'posts/edit/:postId', component: BlogPostEditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'posts/:pageNum', component: AppPostsListComponent },

  { path: 'user/:userId/posts', component: AppPostsListComponent, pathMatch: 'full' },
  { path: 'user/:userId/posts/:pageNum', component: AppPostsListComponent },

  { path: 'topics/:topicId/posts', component: AppPostsListComponent, pathMatch: 'full' },
  { path: 'topics/:topicId/posts/:pageNum', component: AppPostsListComponent },

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
