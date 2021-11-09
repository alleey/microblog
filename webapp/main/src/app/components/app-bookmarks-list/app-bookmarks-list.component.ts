import { Component, OnInit } from '@angular/core';
import { BookmarkListEvent, BookmarkModel, BookmarksService } from 'bookmarks';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './app-bookmarks-list.component.html',
  styleUrls: ['./app-bookmarks-list.component.scss']
})
export class AppBookmarksListComponent implements OnInit {

  destroyed$ = new Subject();
  viewModel = new ViewModelHolder<any>();

  constructor(
    private service: BookmarksService) { }

  ngOnInit(): void { }

  handleListViewEvent(evt: BookmarkListEvent) {
    switch(evt.opcode) {
      case 'select': this.navigateBookmark(evt.item); break;
      case 'delete': this.deleteBookmark(evt.item); break;
    }
  }

  deleteBookmark(bookmark: BookmarkModel): void {
    this.service
      .delete("", bookmark.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectUndefined());
  }

  navigateBookmark(bookmark: BookmarkModel): void {
    console.info(`Navigate to ${bookmark.url}`)
    window.location.href = bookmark.url;
  }
}
