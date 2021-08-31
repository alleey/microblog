import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookmarkModel, BookmarkListResponseModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';
import { Pageable, PageModel } from 'utils';
import { BookmarkListViewEvent } from '../bookmark-list-view/bookmark-list-view.component';

@Component({
  selector: 'bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit, OnDestroy {

  @Input() enableSearch: boolean = true;
  @Input() filterText: string = '';

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Input('onSelectBookmark') 
  onSelect: (topic: BookmarkModel) => void = 
    (item) => this.navigateBookmark(item);
        
  pageable: Pageable; 
  response : BookmarkListResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
      private bookmarksService: BookmarksService, 
      private router: Router, 
      private activatedRoute: ActivatedRoute) 
  { 
    this.response = null;
    this.pageable = {
      page: 0
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const pageNum = params.pageNum ?? 0;
      this.fetchPage(pageNum);
    });
    // Requery when the backend data changes
    this.subscription.add(
      this.bookmarksService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onApplyFilter(text: string): void {
    this.filterText = text;
    this.fetchPage(0);
  }

  responseHandler = {
    next: (result: BookmarkListResponseModel) => {
      this.response = result;
      this.loading = false;
    },
    error: (err: any) => {
      this.errorDesc = err.message;
      this.loading = false;
      console.log(this.errorDesc);
    }
  }

  fetchPage(pageNum: number): void {
    this.pageable.page = pageNum;
    if(!!this.filterText)
    {
      this.bookmarksService.findMatchingCaption("", this.filterText, this.pageable).subscribe(this.responseHandler);
    }
    else
    {
      this.bookmarksService.all("", this.pageable).subscribe(this.responseHandler);
    }
  }

  get items(): BookmarkModel[]|undefined {
    return this.response?._embedded?.bookmarks;
  }

  get page(): PageModel|undefined {
    return this.response?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: BookmarkListViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
      case 'delete': this.deleteBookmark(evt.item); break;
    }
  }

  navigateBookmark(bookmark: BookmarkModel): void {
    console.info(`Navigate to ${bookmark.url}`)
    window.location.href = bookmark.url;
  }

  deleteBookmark(bookmark: BookmarkModel): void {
    this.bookmarksService.delete("", bookmark.id)
      .subscribe(
        {
          error: (err: any) => {
            this.errorDesc = err.message;
          }
        }
      );
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
