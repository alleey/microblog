import { InjectionToken } from '@angular/core';
import { CalendarSpec } from 'moment';

export interface UtilsModuleConfig {
  calenderSpec: CalendarSpec
}
export const UtilsModuleConfigToken = new InjectionToken<UtilsModuleConfig>("UtilsModuleConfigToken");
