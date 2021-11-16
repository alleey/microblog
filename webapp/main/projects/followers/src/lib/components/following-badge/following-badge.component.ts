import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { FollowsResponseModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'following-badge',
  templateUrl: './following-badge.component.html',
  styleUrls: ['./following-badge.component.css']
})
export class FollowingBadgeComponent implements OnInit, OnDestroy, OnChanges {

  @Input() userId?: string;
  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  viewModel = new ViewModelHolder<FollowsResponseModel>();
  destroyed$ = new Subject();
  subscription: Subscription = new Subscription();

  constructor(private service: FollowingService) 
    { }

  ngOnInit(): void { 
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ 
        next: (id) => {
          if(id.userId === this.userId || id.followedById === this.userId)
            this.checkStatus();
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
      this.checkStatus();
    }
  }

  get isActive(): boolean {
    return !!this.viewModel.Model?.userId;
  }

  checkStatus() {
    this.service
      .findFollowing("", "", this.userId!)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  follow(): void {
    this.service
      .follow("", "", this.userId!)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  unfollow(): void {
    this.service
      .unfollow("", "", this.userId!)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectUndefined());
  }
}
