import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable, PageModel, ViewModelHolder } from 'utils';
import { FollowingService } from '../../services/following.service';
import { FollowsListResponseModel, FollowsModel } from '../../models/follows';
import { FollowerListViewEvent } from '../follower-list-view/follower-list-view.component';

@Component({
  selector: 'follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowersListComponent implements OnInit {

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Input() onSelect: (topic: FollowsModel) => void = (item) => {};
        
  pageable: Pageable; 
  viewModel = new ViewModelHolder<FollowsListResponseModel>();
  subscription: Subscription = new Subscription();

  constructor(
      private followersService: FollowingService, 
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
      this.followersService.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchPage(pageNum: number): void {
    this.pageable.page = pageNum;
    this.followersService
      .followers("", "", this.pageable)
      .subscribe(this.viewModel.expectModel());
  }

  get items(): FollowsModel[] | undefined {
    return this.viewModel.Model?._embedded?.follows;
  }

  get page(): PageModel|undefined {
    return this.viewModel.Model?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: FollowerListViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
    }
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }
}
