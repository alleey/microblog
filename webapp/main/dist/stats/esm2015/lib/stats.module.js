import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { CountersServiceConfigToken } from './config/config';
import * as i0 from "@angular/core";
import * as i1 from "auth-oidc";
export class StatsModule {
    static forRoot(config) {
        return {
            ngModule: StatsModule,
            providers: [
                {
                    provide: CountersServiceConfigToken,
                    useValue: config.counters
                }
            ]
        };
    }
}
StatsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StatsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StatsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StatsModule, imports: [CommonModule, i1.OidcAuthModule, UtilsModule] });
StatsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StatsModule, imports: [[
            CommonModule,
            OidcAuthModule.forChild(),
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: StatsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        CommonModule,
                        OidcAuthModule.forChild(),
                        UtilsModule
                    ],
                    exports: []
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RhdHMvc3JjL2xpYi9zdGF0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNwQyxPQUFPLEVBQUUsMEJBQTBCLEVBQXFCLE1BQU0saUJBQWlCLENBQUM7OztBQWFoRixNQUFNLE9BQU8sV0FBVztJQUV0QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXlCO1FBQ3RDLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLDBCQUEwQjtvQkFDbkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7O3dHQVpVLFdBQVc7eUdBQVgsV0FBVyxZQVBwQixZQUFZLHFCQUVaLFdBQVc7eUdBS0YsV0FBVyxZQVJiO1lBQ1AsWUFBWTtZQUNaLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDekIsV0FBVztTQUNaOzJGQUlVLFdBQVc7a0JBWHZCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYyxDQUFDLFFBQVEsRUFBRTt3QkFDekIsV0FBVztxQkFDWjtvQkFDRCxPQUFPLEVBQUUsRUFDUjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2lkY0F1dGhNb2R1bGUgfSBmcm9tICdhdXRoLW9pZGMnO1xuaW1wb3J0IHsgVXRpbHNNb2R1bGUgfSBmcm9tICd1dGlscyc7XG5pbXBvcnQgeyBDb3VudGVyc1NlcnZpY2VDb25maWdUb2tlbiwgU3RhdHNNb2R1bGVDb25maWcgfSBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBPaWRjQXV0aE1vZHVsZS5mb3JDaGlsZCgpLFxuICAgIFV0aWxzTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdGF0c01vZHVsZSB7XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTdGF0c01vZHVsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RhdHNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0YXRzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDb3VudGVyc1NlcnZpY2VDb25maWdUb2tlbixcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLmNvdW50ZXJzXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuIH1cbiJdfQ==