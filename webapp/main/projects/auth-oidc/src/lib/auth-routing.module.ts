import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginCallbackComponent } from './components/login-callback.component';
import { LoginRedirectComponent } from './components/login-redirect.component';
import { LogoutCallbackComponent } from './components/logout-callback.component';
import { LogoutRedirectComponent } from './components/logout-redirect.component';

const routes: Routes = [
  {
    path: 'oidc-auth/login',
    component: LoginRedirectComponent
  },
  {
    path: 'oidc-auth/login-callback',
    component: LoginCallbackComponent
  },
  {
    path: 'oidc-auth/logout',
    component: LogoutRedirectComponent
  },
  {
    path: 'oidc-auth/logout-callback',
    component: LogoutCallbackComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
