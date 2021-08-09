import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { BookmarkListComponent, BookmarkListViewComponent, BookmarkOptionComponent, BookmarkOptionViewComponent } from './components/public-api';
import { BookmarksServiceConfig, BookmarksServiceConfigToken } from './config/service-config';
import { BookmarksService } from './services/bookmarks.service';

@NgModule({
  declarations: [
    BookmarkListViewComponent,
    BookmarkListComponent,
    BookmarkOptionViewComponent,
    BookmarkOptionComponent
  ],
  imports: [
    CommonModule,
    OidcAuthModule.forChild(),
    UtilsModule
  ],
  exports: [
    BookmarkListViewComponent,
    BookmarkListComponent,
    BookmarkOptionViewComponent,
    BookmarkOptionComponent
  ]
})
export class BookmarksModule { 

  static forRoot(config: BookmarksServiceConfig): ModuleWithProviders<BookmarksModule> {
    return {
      ngModule: BookmarksModule,
      providers: [
        BookmarksService,
        {
          provide: BookmarksServiceConfigToken,
          useValue: config
        }
      ]
    }
  }

}
