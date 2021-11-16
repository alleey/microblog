import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { FollowsResponseModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'follower-badge',
  templateUrl: './follower-badge.component.html',
  styleUrls: ['./follower-badge.component.css']
})
export class FollowerBadgeComponent implements OnInit, OnDestroy, OnChanges {

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
    return this.viewModel.Model?.userId != undefined;
  }

  checkStatus() {
    this.service
      .findFollower("", "", this.userId!)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }
}
