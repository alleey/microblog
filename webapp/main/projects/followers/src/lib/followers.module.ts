import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { FollowersModuleConfig, FollowingServiceConfigToken } from './config/config';
import { FollowingService } from './services/public-api';
import { FollowersListViewComponent } from './components/followed-by-list-view/followed-by-list-view.component';
import { FollowersListComponent } from './components/followed-by-list/followed-by-list.component';
import { FollowingListViewComponent } from './components/following-list-view/following-list-view.component';
import { FollowingListComponent } from './components/following-list/following-list.component';
import { FollowedByBadgeComponent } from './components/followed-by-badge/followed-by-badge.component';
import { FollowingBadgeComponent } from './components/following-badge/following-badge.component';

@NgModule({
  declarations: [
    FollowersListViewComponent,
    FollowersListComponent,
    FollowingListViewComponent,
    FollowingListComponent,
    FollowedByBadgeComponent,
    FollowingBadgeComponent,
  ],
  imports: [
    CommonModule,
    OidcAuthModule.forChild(),
    UtilsModule
  ],
  exports: [
    FollowersListViewComponent,
    FollowersListComponent,
    FollowingListViewComponent,
    FollowingListComponent,
    FollowedByBadgeComponent,
    FollowingBadgeComponent,
  ]
})
export class FollowersModule { 

  static forRoot(config: FollowersModuleConfig): ModuleWithProviders<FollowersModule> {
    return {
      ngModule: FollowersModule,
      providers: [
        FollowingService,
        {
          provide: FollowingServiceConfigToken,
          useValue: config.followers
        }
      ]
    }
  }

}
