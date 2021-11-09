import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { CountersServiceConfigToken, StatsModuleConfig } from './config/config';
import { CounterStatsComponent } from './components/counter-stats/counter-stats.component';
import { CountersService } from './services/counters.service';
import { ToggleCounterComponent } from './components/toggle-counter/toggle-counter.component';
import { SetCounterDirective } from './directives/set-counter.directive';
import { RatingCounterComponent } from './components/rating-counter/rating-counter.component';

@NgModule({
  declarations: [
    CounterStatsComponent,
    ToggleCounterComponent,
    RatingCounterComponent,
    SetCounterDirective,
  ],
  imports: [
    CommonModule,
    OidcAuthModule.forChild(),
    UtilsModule
  ],
  exports: [
    CounterStatsComponent,
    ToggleCounterComponent,
    RatingCounterComponent,
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
