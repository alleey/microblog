import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarkModel, BookmarkResponseModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';

@Component({
  selector: 'bookmark-badge',
  templateUrl: './bookmark-badge.component.html',
  styleUrls: ['./bookmark-badge.component.scss']
})
export class BookmarkBadgeComponent implements OnInit {

  @Input() url: string = "";
  @Input() caption: string = "";

  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  item?: BookmarkModel;
  loading: boolean = false;

  constructor(private service: BookmarksService) { }

  ngOnInit(): void {
    this.checkStatus();
  }

  get isActive(): boolean {
    return this.item?.id != undefined;
  }

  responseHandler = {
    next: (result: BookmarkResponseModel) => {
      this.item = result;
      this.loading = false;
      console.log(result);

    },
    error: (err: any) => {
      this.loading = false;
      console.log(err.message);
    }
  };

  checkStatus() {
    this.service.findByUrl("bookmarks", this.url).subscribe(this.responseHandler);
  }

  createBookmark(): void {
    this.service.create("bookmarks", this.caption, this.url).subscribe(this.responseHandler);
  }

  deleteBookmark(): void {
    if(this.item)
      this.service.delete("bookmarks", this.item.id).subscribe({
        next: () => {},
        error: (err: any) => {
          console.log(err.message);
        }
      });
  }
}
