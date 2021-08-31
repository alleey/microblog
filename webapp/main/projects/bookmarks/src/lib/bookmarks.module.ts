import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { BookmarkListComponent, BookmarkListViewComponent, BookmarkBadgeComponent } from './components/public-api';
import { BookmarksModuleConfig, BookmarksServiceConfigToken } from './config/config';
import { BookmarksService } from './services/bookmarks.service';

@NgModule({
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
})
export class BookmarksModule { 

  static forRoot(config: BookmarksModuleConfig): ModuleWithProviders<BookmarksModule> {
    return {
      ngModule: BookmarksModule,
      providers: [
        BookmarksService,
        {
          provide: BookmarksServiceConfigToken,
          useValue: config.bookmarks
        }
      ]
    }
  }

}
