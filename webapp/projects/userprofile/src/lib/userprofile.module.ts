import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { UtilsModule } from 'utils';
import { UserProfileModuleConfig, UserProfileServiceConfigToken } from './config/config';
import { UserProfileService } from './services/user-profile.service';
import { UserProfileBadgeViewComponent } from './components/user-profile-badge-view/user-profile-badge-view.component';
import { UserProfileBadgeComponent } from './components/user-profile-badge/user-profile-badge.component';

@NgModule({
  declarations: [
    UserProfileBadgeViewComponent,
    UserProfileBadgeComponent
  ],
  imports: [
    CommonModule,
    UtilsModule
  ],
  exports: [
    UserProfileBadgeViewComponent,
    UserProfileBadgeComponent
  ]
})
export class UserProfileModule { 

  static forRoot(config: UserProfileModuleConfig): ModuleWithProviders<UserProfileModule> {
    return {
      ngModule: UserProfileModule,
      providers: [
        UserProfileService,
        {
          provide: UserProfileServiceConfigToken,
          useValue: config.userProfiles
        }
      ]
    }
  }

}
