import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyDatePipe } from './pipes/pretty-date.pipe';
import { PagerComponent } from './components/pager/pager.component';
import { AlertComponent } from './components/alert/alert.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BadgeComponent } from './components/badge/badge.component';
import * as i0 from "@angular/core";
export class UtilsModule {
}
UtilsModule.ɵfac = function UtilsModule_Factory(t) { return new (t || UtilsModule)(); };
UtilsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: UtilsModule });
UtilsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            CommonModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UtilsModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(UtilsModule, { declarations: [PrettyDatePipe,
        PagerComponent,
        AlertComponent,
        SearchBoxComponent,
        LoaderComponent,
        BadgeComponent], imports: [CommonModule], exports: [PrettyDatePipe,
        PagerComponent,
        AlertComponent,
        SearchBoxComponent,
        LoaderComponent,
        BadgeComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvdXRpbHMvc3JjL2xpYi91dGlscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7QUF5QnBFLE1BQU0sT0FBTyxXQUFXOztzRUFBWCxXQUFXOzZEQUFYLFdBQVc7aUVBWmI7WUFDUCxZQUFZO1NBQ2I7dUZBVVUsV0FBVztjQXJCdkIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsY0FBYztpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsY0FBYztvQkFDZCxjQUFjO29CQUNkLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQixlQUFlO29CQUNmLGNBQWM7aUJBQ2Y7YUFDRjs7d0ZBQ1ksV0FBVyxtQkFuQnBCLGNBQWM7UUFDZCxjQUFjO1FBQ2QsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixlQUFlO1FBQ2YsY0FBYyxhQUdkLFlBQVksYUFHWixjQUFjO1FBQ2QsY0FBYztRQUNkLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIsZUFBZTtRQUNmLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJzsgIFxuaW1wb3J0IHsgUHJldHR5RGF0ZVBpcGUgfSBmcm9tICcuL3BpcGVzL3ByZXR0eS1kYXRlLnBpcGUnO1xuaW1wb3J0IHsgUGFnZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGFnZXIvcGFnZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFsZXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hCb3hDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2VhcmNoLWJveC9zZWFyY2gtYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFkZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYmFkZ2UvYmFkZ2UuY29tcG9uZW50JztcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFByZXR0eURhdGVQaXBlLFxuICAgIFBhZ2VyQ29tcG9uZW50LFxuICAgIEFsZXJ0Q29tcG9uZW50LFxuICAgIFNlYXJjaEJveENvbXBvbmVudCxcbiAgICBMb2FkZXJDb21wb25lbnQsXG4gICAgQmFkZ2VDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUHJldHR5RGF0ZVBpcGUsXG4gICAgUGFnZXJDb21wb25lbnQsXG4gICAgQWxlcnRDb21wb25lbnQsXG4gICAgU2VhcmNoQm94Q29tcG9uZW50LFxuICAgIExvYWRlckNvbXBvbmVudCxcbiAgICBCYWRnZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFV0aWxzTW9kdWxlIHsgfVxuIl19