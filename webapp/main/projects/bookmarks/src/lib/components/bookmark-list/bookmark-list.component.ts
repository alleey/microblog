import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageModel, ViewModelHolder } from 'utils';
import { BookmarkListResponseModel, BookmarkModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarkListViewEvent } from '../bookmark-list-view/bookmark-list-view.component';

export type BookmarkListEvent = BookmarkListViewEvent;

@Component({
  selector: 'bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() enableSearch: boolean = true;
  @Input() filter: string = '';
  @Input() pageNum: number = 0;

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<BookmarkListEvent>();

  filterText: string = '';
  viewModel = new ViewModelHolder<BookmarkListResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(private service: BookmarksService) 
  { }

  ngOnInit(): void {
    this.filterText = this.filter;
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ next: () => this.fetchPage(this.pageNum) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changed = (changes['pageNum']);
    if(changed) {
      this.fetchPage(this.pageNum!);
    }
  }

  onApplyFilter(text: string): void {
    this.filterText = text;
    this.fetchPage(this.pageNum);
  }

  fetchPage(pageNum: number): void {
    if(!!this.filterText)
    {
      this.service
        .findMatchingCaption("", this.filterText, { page: pageNum })
        .pipe(takeUntil(this.destroyed$))
        .subscribe(this.viewModel.expectModel());
    }
    else
    {
      this.service
        .all("", { page: pageNum })
        .pipe(takeUntil(this.destroyed$))
        .subscribe(this.viewModel.expectModel());
    }
  }

  public get items(): BookmarkModel[]|undefined {
    return this.viewModel.Model?._embedded?.bookmarks;
  }

  public get page(): PageModel|undefined {
    return this.viewModel.Model?.page;
  }

  public get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: BookmarkListViewEvent) {
    this.onEvent.emit(evt);
  }

  public gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }

  public deleteBookmark(bookmark: BookmarkModel): void {
    this.service
      .delete("", bookmark.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectUndefined());
  }
}
