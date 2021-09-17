import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { CountersServiceConfigToken, StatsModuleConfig } from './config/config';
import { CounterStatsComponent } from './components/counter-stats/counter-stats.component';
import { CountersService } from './services/counters.service';
import { ToggleCounterBadgeComponent } from './components/toggle-counter-badge/toggle-counter-badge.component';
import { SetCounterDirective } from './directives/set-counter.directive';

@NgModule({
  declarations: [
    CounterStatsComponent,
    ToggleCounterBadgeComponent,
    SetCounterDirective
  ],
  imports: [
    CommonModule,
    OidcAuthModule.forChild(),
    UtilsModule
  ],
  exports: [
    CounterStatsComponent,
    ToggleCounterBadgeComponent,
    SetCounterDirective
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
