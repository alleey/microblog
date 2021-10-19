import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { UserProfileModel, UserProfileResponseModel } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfileBadgeViewEvent } from '../user-profile-badge-view/user-profile-badge-view.component';

export type UserProfileBadgeEvent = UserProfileBadgeViewEvent;

@Component({
  selector: 'user-profile-badge',
  templateUrl: './user-profile-badge.component.html',
  styleUrls: ['./user-profile-badge.component.css']
})
export class UserProfileBadgeComponent implements OnInit, OnDestroy {

  @Input("userid") paramUserId?: string;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  
  @Output() onEvent = new EventEmitter<UserProfileBadgeEvent>();

  userId?: string;
  viewModel = new ViewModelHolder<UserProfileResponseModel>();
  destroyed$ = new Subject();

  constructor(
    private userProfileService: UserProfileService, 
    private activatedRoute: ActivatedRoute) 
  { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get("userId") ?? this.paramUserId;
      this.fetchUserProfile(this.userId!);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchUserProfile(userId: string): void {
    this.userId = userId;
    this.userProfileService
      .one("", this.userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  get userProfileItem(): UserProfileModel {
    return this.viewModel.Model!;
  }

  handleViewEvent(evt: UserProfileBadgeViewEvent) {
    this.onEvent.emit(evt);
  }
}
