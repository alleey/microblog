import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable, PageModel } from 'utils';
import { FollowsListResponseModel, FollowsModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';
import { FollowingListViewEvent } from '../following-list-view/following-list-view.component';

@Component({
  selector: 'following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent implements OnInit {

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() noContentsTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  @Input() onSelect: (topic: FollowsModel) => void = (item) => {};
        
  pageable: Pageable; 
  response : FollowsListResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
      private service: FollowingService, 
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
      this.service.onChange.subscribe({ next: () => this.fetchPage(this.pageable.page) })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  responseHandler = {
    next: (result: FollowsListResponseModel) => {
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
    this.service.following("", "", this.pageable).subscribe(this.responseHandler);
  }

  get items(): FollowsModel[] | undefined {
    return this.response?._embedded?.follows;
  }

  get page(): PageModel|undefined {
    return this.response?.page;
  }

  get hasItems(): boolean {
    return !!(this.page?.totalElements);
  }

  handleListViewEvent(evt: FollowingListViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
    }
  }

  gotoPage(evt:any): void {
    this.fetchPage(evt-1);
  }}