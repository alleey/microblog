import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { FollowingServiceConfigToken } from './config/config';
import { FollowingService } from './services/public-api';
import { FollowersListViewComponent } from './components/followed-by-list-view/followed-by-list-view.component';
import { FollowersListComponent } from './components/followed-by-list/followed-by-list.component';
import { FollowingListViewComponent } from './components/following-list-view/following-list-view.component';
import { FollowingListComponent } from './components/following-list/following-list.component';
import { FollowedByBadgeComponent } from './components/followed-by-badge/followed-by-badge.component';
import { FollowingBadgeComponent } from './components/following-badge/following-badge.component';
import * as i0 from "@angular/core";
import * as i1 from "auth-oidc";
export class FollowersModule {
    static forRoot(config) {
        return {
            ngModule: FollowersModule,
            providers: [
                FollowingService,
                {
                    provide: FollowingServiceConfigToken,
                    useValue: config.followers
                }
            ]
        };
    }
}
FollowersModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FollowersModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersModule, declarations: [FollowersListViewComponent,
        FollowersListComponent,
        FollowingListViewComponent,
        FollowingListComponent,
        FollowedByBadgeComponent,
        FollowingBadgeComponent], imports: [CommonModule, i1.OidcAuthModule, UtilsModule], exports: [FollowersListViewComponent,
        FollowersListComponent,
        FollowingListViewComponent,
        FollowingListComponent,
        FollowedByBadgeComponent,
        FollowingBadgeComponent] });
FollowersModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersModule, imports: [[
            CommonModule,
            OidcAuthModule.forChild(),
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FollowersModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FollowersListViewComponent,
                        FollowersListComponent,
                        FollowingListViewComponent,
                        FollowingListComponent,
                        FollowedByBadgeComponent,
                        FollowingBadgeComponent,
                    ],
                    imports: [
                        CommonModule,
                        OidcAuthModule.forChild(),
                        UtilsModule
                    ],
                    exports: [
                        FollowersListViewComponent,
                        FollowersListComponent,
                        FollowingListViewComponent,
                        FollowingListComponent,
                        FollowedByBadgeComponent,
                        FollowingBadgeComponent,
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93ZXJzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2ZvbGxvd2Vycy9zcmMvbGliL2ZvbGxvd2Vycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNwQyxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDaEgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDNUcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7OztBQXlCakcsTUFBTSxPQUFPLGVBQWU7SUFFMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUE2QjtRQUMxQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULGdCQUFnQjtnQkFDaEI7b0JBQ0UsT0FBTyxFQUFFLDJCQUEyQjtvQkFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2lCQUMzQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7OzRHQWJVLGVBQWU7NkdBQWYsZUFBZSxpQkFyQnhCLDBCQUEwQjtRQUMxQixzQkFBc0I7UUFDdEIsMEJBQTBCO1FBQzFCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsdUJBQXVCLGFBR3ZCLFlBQVkscUJBRVosV0FBVyxhQUdYLDBCQUEwQjtRQUMxQixzQkFBc0I7UUFDdEIsMEJBQTBCO1FBQzFCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsdUJBQXVCOzZHQUdkLGVBQWUsWUFkakI7WUFDUCxZQUFZO1lBQ1osY0FBYyxDQUFDLFFBQVEsRUFBRTtZQUN6QixXQUFXO1NBQ1o7MkZBVVUsZUFBZTtrQkF2QjNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLDBCQUEwQjt3QkFDMUIsc0JBQXNCO3dCQUN0QiwwQkFBMEI7d0JBQzFCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4Qix1QkFBdUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGNBQWMsQ0FBQyxRQUFRLEVBQUU7d0JBQ3pCLFdBQVc7cUJBQ1o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLDBCQUEwQjt3QkFDMUIsc0JBQXNCO3dCQUN0QiwwQkFBMEI7d0JBQzFCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4Qix1QkFBdUI7cUJBQ3hCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPaWRjQXV0aE1vZHVsZSB9IGZyb20gJ2F1dGgtb2lkYyc7XG5pbXBvcnQgeyBVdGlsc01vZHVsZSB9IGZyb20gJ3V0aWxzJztcbmltcG9ydCB7IEZvbGxvd2Vyc01vZHVsZUNvbmZpZywgRm9sbG93aW5nU2VydmljZUNvbmZpZ1Rva2VuIH0gZnJvbSAnLi9jb25maWcvY29uZmlnJztcbmltcG9ydCB7IEZvbGxvd2luZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3B1YmxpYy1hcGknO1xuaW1wb3J0IHsgRm9sbG93ZXJzTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9sbG93ZWQtYnktbGlzdC12aWV3L2ZvbGxvd2VkLWJ5LWxpc3Qtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9sbG93ZXJzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb2xsb3dlZC1ieS1saXN0L2ZvbGxvd2VkLWJ5LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZvbGxvd2luZ0xpc3RWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZvbGxvd2luZy1saXN0LXZpZXcvZm9sbG93aW5nLWxpc3Qtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9sbG93aW5nTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb2xsb3dpbmctbGlzdC9mb2xsb3dpbmctbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9sbG93ZWRCeUJhZGdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZvbGxvd2VkLWJ5LWJhZGdlL2ZvbGxvd2VkLWJ5LWJhZGdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb2xsb3dpbmdCYWRnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb2xsb3dpbmctYmFkZ2UvZm9sbG93aW5nLWJhZGdlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEZvbGxvd2Vyc0xpc3RWaWV3Q29tcG9uZW50LFxuICAgIEZvbGxvd2Vyc0xpc3RDb21wb25lbnQsXG4gICAgRm9sbG93aW5nTGlzdFZpZXdDb21wb25lbnQsXG4gICAgRm9sbG93aW5nTGlzdENvbXBvbmVudCxcbiAgICBGb2xsb3dlZEJ5QmFkZ2VDb21wb25lbnQsXG4gICAgRm9sbG93aW5nQmFkZ2VDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT2lkY0F1dGhNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBVdGlsc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRm9sbG93ZXJzTGlzdFZpZXdDb21wb25lbnQsXG4gICAgRm9sbG93ZXJzTGlzdENvbXBvbmVudCxcbiAgICBGb2xsb3dpbmdMaXN0Vmlld0NvbXBvbmVudCxcbiAgICBGb2xsb3dpbmdMaXN0Q29tcG9uZW50LFxuICAgIEZvbGxvd2VkQnlCYWRnZUNvbXBvbmVudCxcbiAgICBGb2xsb3dpbmdCYWRnZUNvbXBvbmVudCxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGb2xsb3dlcnNNb2R1bGUgeyBcblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEZvbGxvd2Vyc01vZHVsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Rm9sbG93ZXJzTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBGb2xsb3dlcnNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRm9sbG93aW5nU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZvbGxvd2luZ1NlcnZpY2VDb25maWdUb2tlbixcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLmZvbGxvd2Vyc1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==