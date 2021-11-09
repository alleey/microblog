import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from 'utils';
import { UserProfileBadgeViewComponent } from './components/user-profile-badge-view/user-profile-badge-view.component';
import { UserProfileBadgeComponent } from './components/user-profile-badge/user-profile-badge.component';
import { UserProfileEditorComponent } from './components/user-profile-editor/user-profile-editor.component';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileModuleConfig, UserProfileServiceConfigToken } from './config/config';
import { UserProfileService } from './services/user-profile.service';

@NgModule({
  declarations: [
    UserProfileBadgeViewComponent,
    UserProfileBadgeComponent,
    UserProfileViewComponent,
    UserProfileComponent,
    UserProfileEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule
  ],
  exports: [
    UserProfileBadgeViewComponent,
    UserProfileBadgeComponent,
    UserProfileViewComponent,
    UserProfileComponent,
    UserProfileEditorComponent
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
