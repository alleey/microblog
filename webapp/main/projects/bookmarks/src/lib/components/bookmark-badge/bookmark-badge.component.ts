import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewModelHolder } from 'utils';
import { BookmarkModel, BookmarkResponseModel } from '../../models/bookmark';
import { BookmarksService } from '../../services/bookmarks.service';

@Component({
  selector: 'bookmark-badge',
  templateUrl: './bookmark-badge.component.html',
  styleUrls: ['./bookmark-badge.component.scss']
})
export class BookmarkBadgeComponent implements OnInit, OnDestroy {

  @Input() url: string = "";
  @Input() caption: string = "";

  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  viewModel = new ViewModelHolder<BookmarkResponseModel>();
  subscription: Subscription = new Subscription();

  constructor(private service: BookmarksService) { }

  ngOnInit(): void {
    this.checkStatus();
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ next: () => this.checkStatus() })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get isActive(): boolean {
    return this.viewModel.Model?.id != undefined;
  }

  checkStatus() {
    this.service
      .findByUrl("", this.url)
      .subscribe(this.viewModel.expectModel());
  }

  createBookmark(): void {
    this.service
      .create("", this.caption, this.url)
      .subscribe(this.viewModel.expectModel());
  }

  deleteBookmark(): void {
    this.service
      .delete("", this.viewModel.Model!.id)
      .subscribe(this.viewModel.expectNothing());
  }
}
