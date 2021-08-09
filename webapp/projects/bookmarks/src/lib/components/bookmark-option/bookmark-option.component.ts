import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarkModel, BookmarkResponseModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';

@Component({
  selector: 'bookmark-option',
  templateUrl: './bookmark-option.component.html',
  styleUrls: ['./bookmark-option.component.scss']
})
export class BookmarkOptionComponent implements OnInit {

  @Input() url: string = "";
  @Input() caption: string = "";

  bookmark?: BookmarkModel;
  loading: boolean = false;

  constructor(
    private service: BookmarksService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) 
  { 
  }

  ngOnInit(): void {
    this.checkBookmarkStatus();
  }

  get isBookmarked(): boolean {
    return this.bookmark?.id != undefined;
  }

  responseHandler = {
    next: (result: BookmarkResponseModel) => {
      this.bookmark = result;
      this.loading = false;
      console.log(result);

    },
    error: (err: any) => {
      this.loading = false;
      console.log(err.message);
    }
  };

  checkBookmarkStatus() {
    this.service.findByUrl("bookmarks", this.url).subscribe(this.responseHandler);
  }

  createBookmark(): void {
    this.service.create("bookmarks", this.caption, this.url).subscribe(this.responseHandler);
  }

  deleteBookmark(): void {
    if(this.bookmark)
      this.service.delete("bookmarks", this.bookmark.id).subscribe(this.responseHandler);
  }
}
