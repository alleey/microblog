import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { CountersServiceConfigToken, StatsModuleConfig } from './config/config';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    OidcAuthModule.forChild(),
    UtilsModule
  ],
  exports: [
  ]
})
export class StatsModule {

  static forRoot(config: StatsModuleConfig): ModuleWithProviders<StatsModule> {
    return {
      ngModule: StatsModule,
      providers: [
        {
          provide: CountersServiceConfigToken,
          useValue: config.counters
        }
      ]
    }
  }

 }
