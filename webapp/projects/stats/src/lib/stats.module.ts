import { ModuleWithProviders, NgModule } from '@angular/core';
import { CountersServiceConfigToken, StatsModuleConfig } from './config/config';

@NgModule({
  declarations: [
  ],
  imports: [
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
