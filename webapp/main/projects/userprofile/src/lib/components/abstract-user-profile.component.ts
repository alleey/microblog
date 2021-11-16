import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { UserProfileModel, UserProfileResponseModel } from '../models/user-profile';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileBadgeViewEvent } from './user-profile-badge-view/user-profile-badge-view.component';

export type UserProfileEvent = UserProfileBadgeViewEvent;

@Directive()
export class AbstractUserProfileComponent implements OnInit, OnDestroy, OnChanges {

  @Input() userId?: string;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() noContentTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<UserProfileEvent>();

  viewModel = new ViewModelHolder<UserProfileResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(private service: UserProfileService) 
  { }

  ngOnInit(): void {
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ 
        next: (notif) => {
          if(this.userId === notif.id) 
            this.fetchUserProfile();
        } 
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const changed = (changes['userId']);
    if(changed) {
      this.fetchUserProfile();
    }
  }

  fetchUserProfile(): void {
    this.service
      .one("", this.userId!)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  get userProfile(): UserProfileModel | undefined {
    return this.viewModel.Model;
  }

  handleViewEvent(evt: UserProfileBadgeViewEvent) {
    this.onEvent.emit(evt);
  }
}
