import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { CountersServiceConfigToken, StatsModuleConfig } from './config/config';
import { SwitchCounterComponent } from './components/switch-counter/switch-counter.component';
import { CountersService } from './services/counters.service';

@NgModule({
  declarations: [
    SwitchCounterComponent
  ],
  imports: [
    CommonModule,
    OidcAuthModule.forChild(),
    UtilsModule
  ],
  exports: [
    SwitchCounterComponent
  ]
})
export class StatsModule {

  static forRoot(config: StatsModuleConfig): ModuleWithProviders<StatsModule> {
    return {
      ngModule: StatsModule,
      providers: [
        CountersService,
        {
          provide: CountersServiceConfigToken,
          useValue: config.counters
        }
      ]
    }
  }

 }
