import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'auth-oidc';
import { BlogPostListComponent, BlogPostComponent, BlogPostEditorComponent } from 'blog';
import { AllPostsComponent } from './components/all-posts/all-posts.component';

const routes: Routes = [

  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: AllPostsComponent, pathMatch: 'full' },

  { path: 'posts/new', component: BlogPostEditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'posts/edit/:postId', component: BlogPostEditorComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'posts/:pageNum', component: AllPostsComponent },

  { path: 'user/:userId/posts', component: AllPostsComponent, pathMatch: 'full' },
  { path: 'user/:userId/posts/:pageNum', component: AllPostsComponent },

  { path: 'topics/:topicId/posts', component: AllPostsComponent, pathMatch: 'full' },
  { path: 'topics/:topicId/posts/:pageNum', component: AllPostsComponent },

  { path: 'posts/:postId/:slug', component: BlogPostComponent, pathMatch: 'full' },

  //{ path: 'bookmarks', component: BookmarkListViewComponent }, //
  { path: 'login', component: AllPostsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'logout', redirectTo: '/oidc-auth/logout', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
