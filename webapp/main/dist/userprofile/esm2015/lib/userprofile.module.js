import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UtilsModule } from 'utils';
import { UserProfileServiceConfigToken } from './config/config';
import { UserProfileService } from './services/user-profile.service';
import { UserProfileBadgeViewComponent } from './components/user-profile-badge-view/user-profile-badge-view.component';
import { UserProfileBadgeComponent } from './components/user-profile-badge/user-profile-badge.component';
import * as i0 from "@angular/core";
export class UserProfileModule {
    static forRoot(config) {
        return {
            ngModule: UserProfileModule,
            providers: [
                UserProfileService,
                {
                    provide: UserProfileServiceConfigToken,
                    useValue: config.userProfiles
                }
            ]
        };
    }
}
UserProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileModule, declarations: [UserProfileBadgeViewComponent,
        UserProfileBadgeComponent], imports: [CommonModule,
        UtilsModule], exports: [UserProfileBadgeViewComponent,
        UserProfileBadgeComponent] });
UserProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileModule, imports: [[
            CommonModule,
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: UserProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        UserProfileBadgeViewComponent,
                        UserProfileBadgeComponent
                    ],
                    imports: [
                        CommonModule,
                        UtilsModule
                    ],
                    exports: [
                        UserProfileBadgeViewComponent,
                        UserProfileBadgeComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnByb2ZpbGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvdXNlcnByb2ZpbGUvc3JjL2xpYi91c2VycHJvZmlsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDcEMsT0FBTyxFQUEyQiw2QkFBNkIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDOztBQWdCekcsTUFBTSxPQUFPLGlCQUFpQjtJQUU1QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQStCO1FBQzVDLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxrQkFBa0I7Z0JBQ2xCO29CQUNFLE9BQU8sRUFBRSw2QkFBNkI7b0JBQ3RDLFFBQVEsRUFBRSxNQUFNLENBQUMsWUFBWTtpQkFDOUI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOzs4R0FiVSxpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFaMUIsNkJBQTZCO1FBQzdCLHlCQUF5QixhQUd6QixZQUFZO1FBQ1osV0FBVyxhQUdYLDZCQUE2QjtRQUM3Qix5QkFBeUI7K0dBR2hCLGlCQUFpQixZQVRuQjtZQUNQLFlBQVk7WUFDWixXQUFXO1NBQ1o7MkZBTVUsaUJBQWlCO2tCQWQ3QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWiw2QkFBNkI7d0JBQzdCLHlCQUF5QjtxQkFDMUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVztxQkFDWjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsNkJBQTZCO3dCQUM3Qix5QkFBeUI7cUJBQzFCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVdGlsc01vZHVsZSB9IGZyb20gJ3V0aWxzJztcbmltcG9ydCB7IFVzZXJQcm9maWxlTW9kdWxlQ29uZmlnLCBVc2VyUHJvZmlsZVNlcnZpY2VDb25maWdUb2tlbiB9IGZyb20gJy4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItcHJvZmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJQcm9maWxlQmFkZ2VWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3VzZXItcHJvZmlsZS1iYWRnZS12aWV3L3VzZXItcHJvZmlsZS1iYWRnZS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZUJhZGdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3VzZXItcHJvZmlsZS1iYWRnZS91c2VyLXByb2ZpbGUtYmFkZ2UuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVXNlclByb2ZpbGVCYWRnZVZpZXdDb21wb25lbnQsXG4gICAgVXNlclByb2ZpbGVCYWRnZUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFV0aWxzTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBVc2VyUHJvZmlsZUJhZGdlVmlld0NvbXBvbmVudCxcbiAgICBVc2VyUHJvZmlsZUJhZGdlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVXNlclByb2ZpbGVNb2R1bGUgeyBcblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFVzZXJQcm9maWxlTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxVc2VyUHJvZmlsZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVXNlclByb2ZpbGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVXNlclByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVXNlclByb2ZpbGVTZXJ2aWNlQ29uZmlnVG9rZW4sXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy51c2VyUHJvZmlsZXNcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG59XG4iXX0=