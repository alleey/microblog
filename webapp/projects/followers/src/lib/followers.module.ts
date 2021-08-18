import { ModuleWithProviders, NgModule } from '@angular/core';
import { FollowersModuleConfig, FollowersServiceConfigToken } from './config/config';
import { FollowersService } from './services/public-api';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})
export class FollowersModule { 

  static forRoot(config: FollowersModuleConfig): ModuleWithProviders<FollowersModule> {
    return {
      ngModule: FollowersModule,
      providers: [
        FollowersService,
        {
          provide: FollowersServiceConfigToken,
          useValue: config.followers
        }
      ]
    }
  }

}
