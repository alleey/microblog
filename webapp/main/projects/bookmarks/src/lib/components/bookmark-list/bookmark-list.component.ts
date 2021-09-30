import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookmarkModel, BookmarkListResponseModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';
import { Pageable, PageModel, ViewModelHolder } from 'utils';
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

  @Input() onSelect: (topic: BookmarkModel) => void = (item) => {};
        
  pageable: Pageable; 
  viewModel = new ViewModelHolder<BookmarkListResponseModel>();
  subscription: Subscription = new Subscription();

  constructor(
      private service: BookmarksService, 
      private activatedRoute: ActivatedRoute) 
  { 
    this.pageable = {
      page: 0
    };
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const pageNum = <number> (params.get("pageNum") ?? 0);
      this.fetchPage(pageNum);
    });
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onApplyFilter(text: string): void {
    this.filterText = text;
    this.fetchPage(0);
  }

  fetchPage(pageNum: number): void {
    this.pageable.page = pageNum;
    if(!!this.filterText)
    {
      this.service
        .findMatchingCaption("", this.filterText, this.pageable)
        .subscribe(this.viewModel.expectModel());
    }
    else
    {
      this.service
        .all("", this.pageable)
        .subscribe(this.viewModel.expectModel());
    }
  }

  get items(): BookmarkModel[]|undefined {
    return this.viewModel.Model?._embedded?.bookmarks;
  }

  get page(): PageModel|undefined {
    return this.viewModel.Model?.page;
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

  deleteBookmark(bookmark: BookmarkModel): void {
    this.service
      .delete("", bookmark.id)
      .subscribe(this.viewModel.expectUndefined());
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
