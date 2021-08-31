import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { BookmarkListComponent, BookmarkListViewComponent, BookmarkBadgeComponent } from './components/public-api';
import { BookmarksServiceConfigToken } from './config/config';
import { BookmarksService } from './services/bookmarks.service';
import * as i0 from "@angular/core";
import * as i1 from "auth-oidc";
export class BookmarksModule {
    static forRoot(config) {
        return {
            ngModule: BookmarksModule,
            providers: [
                BookmarksService,
                {
                    provide: BookmarksServiceConfigToken,
                    useValue: config.bookmarks
                }
            ]
        };
    }
}
BookmarksModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BookmarksModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksModule, declarations: [BookmarkListViewComponent,
        BookmarkListComponent,
        BookmarkBadgeComponent], imports: [CommonModule, i1.OidcAuthModule, UtilsModule], exports: [BookmarkListViewComponent,
        BookmarkListComponent,
        BookmarkBadgeComponent] });
BookmarksModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksModule, imports: [[
            CommonModule,
            OidcAuthModule.forChild(),
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BookmarksModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        BookmarkListViewComponent,
                        BookmarkListComponent,
                        BookmarkBadgeComponent
                    ],
                    imports: [
                        CommonModule,
                        OidcAuthModule.forChild(),
                        UtilsModule
                    ],
                    exports: [
                        BookmarkListViewComponent,
                        BookmarkListComponent,
                        BookmarkBadgeComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmtzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2Jvb2ttYXJrcy9zcmMvbGliL2Jvb2ttYXJrcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNwQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUseUJBQXlCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuSCxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7OztBQW1CaEUsTUFBTSxPQUFPLGVBQWU7SUFFMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUE2QjtRQUMxQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULGdCQUFnQjtnQkFDaEI7b0JBQ0UsT0FBTyxFQUFFLDJCQUEyQjtvQkFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2lCQUMzQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7OzRHQWJVLGVBQWU7NkdBQWYsZUFBZSxpQkFmeEIseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQixzQkFBc0IsYUFHdEIsWUFBWSxxQkFFWixXQUFXLGFBR1gseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQixzQkFBc0I7NkdBR2IsZUFBZSxZQVhqQjtZQUNQLFlBQVk7WUFDWixjQUFjLENBQUMsUUFBUSxFQUFFO1lBQ3pCLFdBQVc7U0FDWjsyRkFPVSxlQUFlO2tCQWpCM0IsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1oseUJBQXlCO3dCQUN6QixxQkFBcUI7d0JBQ3JCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYyxDQUFDLFFBQVEsRUFBRTt3QkFDekIsV0FBVztxQkFDWjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AseUJBQXlCO3dCQUN6QixxQkFBcUI7d0JBQ3JCLHNCQUFzQjtxQkFDdkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9pZGNBdXRoTW9kdWxlIH0gZnJvbSAnYXV0aC1vaWRjJztcbmltcG9ydCB7IFV0aWxzTW9kdWxlIH0gZnJvbSAndXRpbHMnO1xuaW1wb3J0IHsgQm9va21hcmtMaXN0Q29tcG9uZW50LCBCb29rbWFya0xpc3RWaWV3Q29tcG9uZW50LCBCb29rbWFya0JhZGdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3B1YmxpYy1hcGknO1xuaW1wb3J0IHsgQm9va21hcmtzTW9kdWxlQ29uZmlnLCBCb29rbWFya3NTZXJ2aWNlQ29uZmlnVG9rZW4gfSBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuaW1wb3J0IHsgQm9va21hcmtzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYm9va21hcmtzLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBCb29rbWFya0xpc3RWaWV3Q29tcG9uZW50LFxuICAgIEJvb2ttYXJrTGlzdENvbXBvbmVudCxcbiAgICBCb29rbWFya0JhZGdlQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT2lkY0F1dGhNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBVdGlsc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQm9va21hcmtMaXN0Vmlld0NvbXBvbmVudCxcbiAgICBCb29rbWFya0xpc3RDb21wb25lbnQsXG4gICAgQm9va21hcmtCYWRnZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJvb2ttYXJrc01vZHVsZSB7IFxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQm9va21hcmtzTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxCb29rbWFya3NNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJvb2ttYXJrc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBCb29rbWFya3NTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQm9va21hcmtzU2VydmljZUNvbmZpZ1Rva2VuLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuYm9va21hcmtzXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxufVxuIl19