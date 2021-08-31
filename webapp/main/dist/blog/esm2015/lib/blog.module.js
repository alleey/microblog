import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OidcAuthModule } from 'auth-oidc';
import { MarkdownModule } from 'ngx-markdown';
import { UtilsModule } from 'utils';
import { BlogPostComponent, BlogPostEditorComponent, BlogPostListComponent, BlogPostListViewComponent, BlogPostViewComponent, TopicListComponent, TopicListViewComponent } from './components/public-api';
import { CommentsServiceConfigToken, PostsServiceConfigToken, TopicsServiceConfigToken } from './config/config';
import { PostsService } from './services/posts.service';
import { TopicsService } from './services/topics.service';
import { TopicSelectorComponent } from './components/topic-selector/topic-selector.component';
import { TopicEditorComponent } from './components/topic-editor/topic-editor.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentListViewComponent } from './components/comment-list-view/comment-list-view.component';
import { CommentEditorComponent } from './components/comment-editor/comment-editor.component';
import * as i0 from "@angular/core";
import * as i1 from "ngx-markdown";
import * as i2 from "auth-oidc";
export class BlogModule {
    static forRoot(config) {
        return {
            ngModule: BlogModule,
            providers: [
                PostsService,
                TopicsService,
                {
                    provide: PostsServiceConfigToken,
                    useValue: config.posts
                },
                {
                    provide: CommentsServiceConfigToken,
                    useValue: config.comments
                },
                {
                    provide: TopicsServiceConfigToken,
                    useValue: config.topics
                }
            ]
        };
    }
}
BlogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogModule, declarations: [BlogPostListViewComponent,
        BlogPostListComponent,
        TopicListViewComponent,
        TopicListComponent,
        BlogPostEditorComponent,
        BlogPostComponent,
        BlogPostViewComponent,
        TopicSelectorComponent,
        TopicEditorComponent,
        CommentListComponent,
        CommentListViewComponent,
        CommentEditorComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule, i1.MarkdownModule, i2.OidcAuthModule, UtilsModule], exports: [BlogPostListViewComponent,
        BlogPostListComponent,
        TopicListViewComponent,
        TopicListComponent,
        BlogPostEditorComponent,
        BlogPostComponent,
        BlogPostViewComponent] });
BlogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            MarkdownModule.forChild(),
            OidcAuthModule.forChild(),
            UtilsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: BlogModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        BlogPostListViewComponent,
                        BlogPostListComponent,
                        TopicListViewComponent,
                        TopicListComponent,
                        BlogPostEditorComponent,
                        BlogPostComponent,
                        BlogPostViewComponent,
                        TopicSelectorComponent,
                        TopicEditorComponent,
                        CommentListComponent,
                        CommentListViewComponent,
                        CommentEditorComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        MarkdownModule.forChild(),
                        OidcAuthModule.forChild(),
                        UtilsModule
                    ],
                    exports: [
                        BlogPostListViewComponent,
                        BlogPostListComponent,
                        TopicListViewComponent,
                        TopicListComponent,
                        BlogPostEditorComponent,
                        BlogPostComponent,
                        BlogPostViewComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9ibG9nL3NyYy9saWIvYmxvZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDcEMsT0FBTyxFQUNMLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6QixxQkFBcUIsRUFDckIsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN2QixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBb0IsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsSSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDOzs7O0FBb0M5RixNQUFNLE9BQU8sVUFBVTtJQUVyQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXdCO1FBQ3JDLE9BQU87WUFDTCxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUU7Z0JBQ1QsWUFBWTtnQkFDWixhQUFhO2dCQUNiO29CQUNFLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSztpQkFDdkI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLDBCQUEwQjtvQkFDbkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO2lCQUMxQjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsd0JBQXdCO29CQUNqQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU07aUJBQ3hCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7dUdBdEJVLFVBQVU7d0dBQVYsVUFBVSxpQkFoQ25CLHlCQUF5QjtRQUN6QixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQix1QkFBdUI7UUFDdkIsaUJBQWlCO1FBQ2pCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQix3QkFBd0I7UUFDeEIsc0JBQXNCLGFBR3RCLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVksd0NBR1osV0FBVyxhQUdYLHlCQUF5QjtRQUN6QixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQix1QkFBdUI7UUFDdkIsaUJBQWlCO1FBQ2pCLHFCQUFxQjt3R0FHWixVQUFVLFlBbkJaO1lBQ1AsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsWUFBWTtZQUNaLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDekIsY0FBYyxDQUFDLFFBQVEsRUFBRTtZQUN6QixXQUFXO1NBQ1o7MkZBV1UsVUFBVTtrQkFsQ3RCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHlCQUF5Qjt3QkFDekIscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsdUJBQXVCO3dCQUN2QixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0QixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsd0JBQXdCO3dCQUN4QixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLGNBQWMsQ0FBQyxRQUFRLEVBQUU7d0JBQ3pCLGNBQWMsQ0FBQyxRQUFRLEVBQUU7d0JBQ3pCLFdBQVc7cUJBQ1o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHlCQUF5Qjt3QkFDekIscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsdUJBQXVCO3dCQUN2QixpQkFBaUI7d0JBQ2pCLHFCQUFxQjtxQkFDdEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9pZGNBdXRoTW9kdWxlIH0gZnJvbSAnYXV0aC1vaWRjJztcbmltcG9ydCB7IE1hcmtkb3duTW9kdWxlIH0gZnJvbSAnbmd4LW1hcmtkb3duJztcbmltcG9ydCB7IFV0aWxzTW9kdWxlIH0gZnJvbSAndXRpbHMnO1xuaW1wb3J0IHsgXG4gIEJsb2dQb3N0Q29tcG9uZW50LCBcbiAgQmxvZ1Bvc3RFZGl0b3JDb21wb25lbnQsIFxuICBCbG9nUG9zdExpc3RDb21wb25lbnQsIFxuICBCbG9nUG9zdExpc3RWaWV3Q29tcG9uZW50LCBcbiAgQmxvZ1Bvc3RWaWV3Q29tcG9uZW50LCBcbiAgVG9waWNMaXN0Q29tcG9uZW50LCBcbiAgVG9waWNMaXN0Vmlld0NvbXBvbmVudCBcbn0gZnJvbSAnLi9jb21wb25lbnRzL3B1YmxpYy1hcGknO1xuaW1wb3J0IHsgQmxvZ01vZHVsZUNvbmZpZywgQ29tbWVudHNTZXJ2aWNlQ29uZmlnVG9rZW4sIFBvc3RzU2VydmljZUNvbmZpZ1Rva2VuLCBUb3BpY3NTZXJ2aWNlQ29uZmlnVG9rZW4gfSBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuaW1wb3J0IHsgUG9zdHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wb3N0cy5zZXJ2aWNlJztcbmltcG9ydCB7IFRvcGljc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RvcGljcy5zZXJ2aWNlJztcbmltcG9ydCB7IFRvcGljU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdG9waWMtc2VsZWN0b3IvdG9waWMtc2VsZWN0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRvcGljRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RvcGljLWVkaXRvci90b3BpYy1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1lbnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbW1lbnQtbGlzdC9jb21tZW50LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1lbnRMaXN0Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb21tZW50LWxpc3Qtdmlldy9jb21tZW50LWxpc3Qtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbWVudEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb21tZW50LWVkaXRvci9jb21tZW50LWVkaXRvci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBCbG9nUG9zdExpc3RWaWV3Q29tcG9uZW50LFxuICAgIEJsb2dQb3N0TGlzdENvbXBvbmVudCxcbiAgICBUb3BpY0xpc3RWaWV3Q29tcG9uZW50LFxuICAgIFRvcGljTGlzdENvbXBvbmVudCxcbiAgICBCbG9nUG9zdEVkaXRvckNvbXBvbmVudCxcbiAgICBCbG9nUG9zdENvbXBvbmVudCxcbiAgICBCbG9nUG9zdFZpZXdDb21wb25lbnQsXG4gICAgVG9waWNTZWxlY3RvckNvbXBvbmVudCxcbiAgICBUb3BpY0VkaXRvckNvbXBvbmVudCxcbiAgICBDb21tZW50TGlzdENvbXBvbmVudCxcbiAgICBDb21tZW50TGlzdFZpZXdDb21wb25lbnQsXG4gICAgQ29tbWVudEVkaXRvckNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIE1hcmtkb3duTW9kdWxlLmZvckNoaWxkKCksXG4gICAgT2lkY0F1dGhNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBVdGlsc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQmxvZ1Bvc3RMaXN0Vmlld0NvbXBvbmVudCxcbiAgICBCbG9nUG9zdExpc3RDb21wb25lbnQsXG4gICAgVG9waWNMaXN0Vmlld0NvbXBvbmVudCxcbiAgICBUb3BpY0xpc3RDb21wb25lbnQsXG4gICAgQmxvZ1Bvc3RFZGl0b3JDb21wb25lbnQsXG4gICAgQmxvZ1Bvc3RDb21wb25lbnQsXG4gICAgQmxvZ1Bvc3RWaWV3Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQmxvZ01vZHVsZSB7XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBCbG9nTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxCbG9nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCbG9nTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFBvc3RzU2VydmljZSxcbiAgICAgICAgVG9waWNzU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFBvc3RzU2VydmljZUNvbmZpZ1Rva2VuLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcucG9zdHNcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENvbW1lbnRzU2VydmljZUNvbmZpZ1Rva2VuLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuY29tbWVudHNcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFRvcGljc1NlcnZpY2VDb25maWdUb2tlbixcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLnRvcGljc1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==