import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { PrettyDatePipe } from './pipes/pretty-date.pipe';
import { PagerComponent } from './components/pager/pager.component';
import { AlertComponent } from './components/alert/alert.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BadgeComponent } from './components/badge/badge.component';



@NgModule({
  declarations: [
    PrettyDatePipe,
    PagerComponent,
    AlertComponent,
    SearchBoxComponent,
    LoaderComponent,
    BadgeComponent
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
    BadgeComponent
  ]
})
export class UtilsModule { }
