import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookmarkListComponent, BookmarkListEvent, BookmarkModel } from 'bookmarks';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './app-bookmarks-list.component.html',
  styleUrls: ['./app-bookmarks-list.component.scss']
})
export class AppBookmarksListComponent implements OnInit {

  pageNum: number = 0;
  
  @ViewChild('bookmarksList')
  bookmarksListComponent!: BookmarkListComponent;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.paramMap.subscribe(params => {
      this.pageNum = Number(params.get("pageNum")) || 0;
    });
  }

  handleListViewEvent(evt: BookmarkListEvent) {
    switch(evt.opcode) {
      case 'select': this.navigateBookmark(evt.item); break;
      case 'delete': this.deleteBookmark(evt.item); break;
    }
  }

  deleteBookmark(bookmark: BookmarkModel): void {
    this.bookmarksListComponent.deleteBookmark(bookmark);
  }

  navigateBookmark(bookmark: BookmarkModel): void {
    console.info(`Navigate to ${bookmark.url}`)
    window.location.href = bookmark.url;
  }
}
