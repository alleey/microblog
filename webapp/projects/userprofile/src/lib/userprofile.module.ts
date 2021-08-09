import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { UtilsModule } from 'utils';
import { UserProfileServiceConfig, UserProfileServiceConfigToken } from './config/service-config';
import { UserProfileService } from './services/user-profile.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UtilsModule
  ],
  exports: [
  ]
})
export class UserProfileModule { 

  static forRoot(config: UserProfileServiceConfig): ModuleWithProviders<UserProfileModule> {
    return {
      ngModule: UserProfileModule,
      providers: [
        UserProfileService,
        {
          provide: UserProfileServiceConfigToken,
          useValue: config
        }
      ]
    }
  }

}
