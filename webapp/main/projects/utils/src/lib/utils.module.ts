import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { BadgeComponent } from './components/badge/badge.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PagerComponent } from './components/pager/pager.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { UtilsModuleConfig, UtilsModuleConfigToken } from './config/config';
import { PrettyDatePipe } from './pipes/pretty-date.pipe';



@NgModule({
  declarations: [
    PrettyDatePipe,
    PagerComponent,
    AlertComponent,
    SearchBoxComponent,
    LoaderComponent,
    BadgeComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrettyDatePipe,
    PagerComponent,
    AlertComponent,
    SearchBoxComponent,
    LoaderComponent,
    BadgeComponent,
  ]
})
export class UtilsModule { 

  static forRoot(config: UtilsModuleConfig): ModuleWithProviders<UtilsModule> {
    return {
      ngModule: UtilsModule,
      providers: [
        {
          provide: UtilsModuleConfigToken,
          useValue: config
        }
      ]
    }
  }
}
